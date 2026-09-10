import { z } from 'zod';
import { ingredients } from '../../api/src/catalog.js';
import { defaults, profileSchema, pantrySchema, generate, swap } from '../../api/src/planner.js';

const json = (data, status=200, headers={}) => new Response(JSON.stringify(data), {status, headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...headers}});
const parseJSON = value => { try { return JSON.parse(value || '{}'); } catch { return {}; } };
const getCookies = request => Object.fromEntries((request.headers.get('cookie')||'').split(';').map(x=>x.trim().split('=').map(decodeURIComponent)).filter(x=>x.length===2));
const toHex = bytes => [...new Uint8Array(bytes)].map(x=>x.toString(16).padStart(2,'0')).join('');
const fromHex = hex => Uint8Array.from(hex.match(/.{2}/g)||[], x=>parseInt(x,16));
const actionSchema=z.object({reply:z.string().max(5000),action:z.enum(['none','generate','swap','preferences']),mealIndex:z.number().int().min(0).max(27).nullable(),budget:z.number().min(1).max(2000).nullable(),minutes:z.number().int().min(5).max(180).nullable(),cuisines:z.array(z.enum(['American','Italian','Mexican','Middle Eastern','Asian'])).max(5).nullable()});

async function digest(value){return toHex(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)));}
async function passwordHash(password,salt=crypto.getRandomValues(new Uint8Array(16))){
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
  const first=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt,iterations:100000},key,256);
  const secondKey=await crypto.subtle.importKey('raw',first,'PBKDF2',false,['deriveBits']);
  const secondSalt=new Uint8Array(await crypto.subtle.digest('SHA-256',new Uint8Array([...salt,67,104,101,97,112,67,104,101,102])));
  const hash=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:secondSalt,iterations:100000},secondKey,256);
  return `${toHex(salt)}:${toHex(hash)}`;
}
async function passwordMatches(password,stored){
  const [salt,want]=stored.split(':');
  if(!salt||!want)return false;
  const got=(await passwordHash(password,fromHex(salt))).split(':')[1];
  let diff=want.length^got.length;
  for(let i=0;i<Math.min(want.length,got.length);i++)diff|=want.charCodeAt(i)^got.charCodeAt(i);
  return diff===0;
}
async function readBody(request,schema){
  let value;
  try{value=await request.json();}catch{throw new Error('Invalid request.');}
  return schema.parse(value);
}
async function currentUser(request,env){
  const raw=getCookies(request).cc_session;
  if(!raw)return null;
  const row=await env.DB.prepare('SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token=? AND s.expires_at>CURRENT_TIMESTAMP').bind(await digest(raw)).first();
  return row?{...row,profile:parseJSON(row.profile),pantry:parseJSON(row.pantry)}:null;
}
async function checkLimit(env,bucket,limit,windowMs){
  const now=Date.now(),expires=new Date(now+windowMs).toISOString();
  await env.DB.prepare('DELETE FROM rate_limits WHERE bucket=? AND expires_at<=CURRENT_TIMESTAMP').bind(bucket).run();
  const current=await env.DB.prepare('SELECT count FROM rate_limits WHERE bucket=?').bind(bucket).first();
  if(current&&current.count>=limit)return false;
  await env.DB.prepare('INSERT INTO rate_limits(bucket,count,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=count+1').bind(bucket,expires).run();
  return true;
}
async function plans(env,userId){
  const rows=(await env.DB.prepare('SELECT id,data FROM plans WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 2').bind(userId).all()).results;
  return rows.map(x=>({...x,data:parseJSON(x.data)}));
}
async function savePlan(env,userId,data,id){
  if(id)await env.DB.prepare('UPDATE plans SET data=? WHERE id=? AND user_id=?').bind(JSON.stringify(data),id,userId).run();
  else{id=crypto.randomUUID();await env.DB.prepare('INSERT INTO plans(id,user_id,data) VALUES(?,?,?)').bind(id,userId,JSON.stringify(data)).run();}
  return {id,...data};
}
function safeError(error){
  if(error instanceof z.ZodError)return error.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join('; ');
  if(/^(No |There |The |Choose |Generate |Start |These |This |Pantry |Search |Enter |Location |Invalid |Your |That |Account|Unable )/.test(error.message))return error.message;
  console.error(error);
  return 'Something went wrong. Please try again.';
}
function distance(a,b,c,d){const rad=Math.PI/180,h=Math.sin((c-a)*rad/2)**2+Math.cos(a*rad)*Math.cos(c*rad)*Math.sin((d-b)*rad/2)**2;return Math.round(6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h))));}
async function mapJSON(url,init={}){
  const response=await fetch(url,{...init,headers:{'User-Agent':'CheapChef/1.0 (https://github.com/anasajhani/cheap-chef)',...init.headers}});
  if(!response.ok)throw new Error('The map service is temporarily unavailable. Please try again later.');
  return response.json();
}
async function findStores(input){
  let {country,location,lat,lon}=input;
  if(lat===undefined){
    if(!location?.trim())throw new Error('Enter a city, ZIP or postal code, or use your location.');
    const found=await mapJSON('https://nominatim.openstreetmap.org/search?'+new URLSearchParams({q:location,countrycodes:country.toLowerCase(),format:'jsonv2',limit:'1'}));
    if(!found.length)throw new Error('Location not found. Try your city and state/province.');
    lat=Number(found[0].lat);lon=Number(found[0].lon);
  }
  const query=`[out:json][timeout:20];(nwr["shop"~"^(supermarket|grocery|wholesale|department_store|general)$"](around:15000,${lat},${lon});nwr["brand"~"Walmart|Target|Kroger|Costco|Sam's Club|ALDI",i]["shop"~"^(supermarket|grocery|wholesale|department_store|general)$"](around:15000,${lat},${lon}););out center tags;`;
  const data=await mapJSON('https://overpass-api.de/api/interpreter',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({data:query})});
  const stores=(data.elements||[]).map(e=>{const t=e.tags||{},y=e.lat??e.center?.lat,x=e.lon??e.center?.lon;return{id:`osm:${e.type}:${e.id}`,name:t.name||t.brand||'Grocery store',address:[t['addr:housenumber'],t['addr:street'],t['addr:city'],t['addr:state'],t['addr:postcode']].filter(Boolean).join(' ')||'Address not listed in OpenStreetMap',distance:distance(lat,lon,y,x),lat:y,lon:x,warehouse:/costco|sam.s club/i.test(t.name||t.brand||'')}}).filter(s=>Number.isFinite(s.lat)&&Number.isFinite(s.lon)).sort((a,b)=>a.distance-b.distance).filter((s,i,a)=>!a.slice(0,i).some(p=>p.name.toLowerCase()===s.name.toLowerCase()&&distance(p.lat,p.lon,s.lat,s.lon)<100)).slice(0,60);
  return{stores,source:'OpenStreetMap contributors',attribution:'https://www.openstreetmap.org/copyright',note:'Within 15 km; distances are straight-line. Coverage may be incomplete. No live prices or inventory.'};
}
async function askAI(env,{message,history,profile,plan,pantry}){
  if(!env.OPENAI_API_KEY||!env.OPENAI_MODEL)return{reply:'The AI chef is not connected yet. You can still use preferences, pantry, nearby stores, meal plans and swaps.',action:'none',mealIndex:null,budget:null,minutes:null,cuisines:null,mode:'unavailable'};
  const schema={type:'object',additionalProperties:false,properties:{reply:{type:'string'},action:{type:'string',enum:['none','generate','swap','preferences']},mealIndex:{type:['integer','null']},budget:{type:['number','null']},minutes:{type:['integer','null']},cuisines:{type:['array','null'],items:{type:'string',enum:['American','Italian','Mexican','Middle Eastern','Asian']}}},required:['reply','action','mealIndex','budget','minutes','cuisines']};
  const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${env.OPENAI_API_KEY}`,'content-type':'application/json'},body:JSON.stringify({model:env.OPENAI_MODEL,store:false,max_output_tokens:1200,instructions:'You are Cheap Chef. Help adults with their saved meal plan. Never loosen diet, allergy, equipment or budget limits. Do not claim live prices or inventory. Direct changes to the visible planner controls. Return structured JSON.',input:[{role:'user',content:JSON.stringify({profile:{...profile,location:undefined,stores:profile.stores.map(s=>({name:s.name}))},plan,pantry})},...history.slice(-10).map(x=>({role:x.role,content:x.text})),{role:'user',content:message}],text:{format:{type:'json_schema',name:'chef_action',strict:true,schema}}})});
  if(!response.ok)throw new Error('The AI provider could not respond. Try again later; your plan has not changed.');
  const result=await response.json(),text=result.output?.flatMap(x=>x.content||[]).find(x=>x.type==='output_text')?.text;
  if(!text)throw new Error('The AI could not answer. Your plan has not changed.');
  return{...actionSchema.parse(JSON.parse(text)),mode:'ai'};
}

async function handleApi(request,env,path){
  const method=request.method;
  if(path==='/api/health')return json({ok:true});
  if(path==='/api/config')return json({ai:!!(env.OPENAI_API_KEY&&env.OPENAI_MODEL),ingredients,defaults});
  const credentials=z.object({email:z.string().email().max(254).transform(x=>x.toLowerCase()),password:z.string().min(12).max(128)});
  if(path==='/api/register'&&method==='POST'){
    const ip=request.headers.get('cf-connecting-ip')||'unknown';if(!await checkLimit(env,`auth:${ip}`,20,15*60000))return json({error:'Too many sign-in attempts. Try again in 15 minutes.'},429);
    const value=await readBody(request,credentials),id=crypto.randomUUID(),password=await passwordHash(value.password);
    try{await env.DB.prepare('INSERT INTO users(id,email,password,profile) VALUES(?,?,?,?)').bind(id,value.email,password,JSON.stringify(defaults)).run();}catch{throw new Error('Unable to create that account. Try signing in instead.');}
    const token=toHex(crypto.getRandomValues(new Uint8Array(32)));
    await env.DB.prepare('INSERT INTO sessions(token,user_id,expires_at) VALUES(?,?,?)').bind(await digest(token),id,new Date(Date.now()+7*86400000).toISOString()).run();
    return json({ok:true},201,{'set-cookie':`cc_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`});
  }
  if(path==='/api/login'&&method==='POST'){
    const ip=request.headers.get('cf-connecting-ip')||'unknown';if(!await checkLimit(env,`auth:${ip}`,20,15*60000))return json({error:'Too many sign-in attempts. Try again in 15 minutes.'},429);
    const value=await readBody(request,credentials),user=await env.DB.prepare('SELECT * FROM users WHERE email=?').bind(value.email).first();
    if(!user||!await passwordMatches(value.password,user.password))return json({error:'Email or password is incorrect.'},401);
    const token=toHex(crypto.getRandomValues(new Uint8Array(32)));
    await env.DB.prepare('INSERT INTO sessions(token,user_id,expires_at) VALUES(?,?,?)').bind(await digest(token),user.id,new Date(Date.now()+7*86400000).toISOString()).run();
    return json({ok:true},200,{'set-cookie':`cc_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`});
  }
  const user=await currentUser(request,env);
  if(!user)return json({error:'Please sign in.'},401);
  if(path==='/api/me'&&method==='GET'){
    const savedPlans=await plans(env,user.id),chats=(await env.DB.prepare('SELECT role,text FROM chats WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 24').bind(user.id).all()).results.reverse();
    return json({email:user.email,profile:user.profile,pantry:user.pantry,plan:savedPlans[0]?{id:savedPlans[0].id,...savedPlans[0].data}:null,chats});
  }
  if(path==='/api/logout'&&method==='POST'){
    const raw=getCookies(request).cc_session;if(raw)await env.DB.prepare('DELETE FROM sessions WHERE token=?').bind(await digest(raw)).run();
    return json({ok:true},200,{'set-cookie':'cc_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'});
  }
  if(path==='/api/profile'&&method==='PUT'){
    const p=await readBody(request,profileSchema),trusted=[...(user.profile.stores||[])];
    const search=await env.DB.prepare('SELECT data FROM store_results WHERE user_id=? AND expires_at>CURRENT_TIMESTAMP').bind(user.id).first();if(search)trusted.push(...(parseJSON(search.data).stores||[]));
    p.stores=p.stores.map(s=>{const verified=trusted.find(x=>x.id===s.id);if(!verified)throw new Error('Search for nearby stores before selecting them.');return verified;});
    await env.DB.prepare('UPDATE users SET profile=? WHERE id=?').bind(JSON.stringify(p),user.id).run();return json(p);
  }
  if(path==='/api/pantry'&&method==='PUT'){const p=await readBody(request,pantrySchema);await env.DB.prepare('UPDATE users SET pantry=? WHERE id=?').bind(JSON.stringify(p),user.id).run();return json(p);}
  if(path==='/api/plans'&&method==='POST'){const old=await plans(env,user.id);return json(await savePlan(env,user.id,generate(profileSchema.parse(user.profile),user.pantry,old[0]?.data.meals||[])));}
  if(path==='/api/plans/swap'&&method==='POST'){
    const {index}=await readBody(request,z.object({index:z.number().int().min(0).max(27)})),saved=await plans(env,user.id);
    if(!saved[0])throw new Error('Generate a plan first.');
    if(saved[0].data.purchased||saved[0].data.completed?.length)throw new Error('Start a new plan to make changes after shopping or cooking.');
    return json(await savePlan(env,user.id,swap(saved[0].data,index,profileSchema.parse(user.profile),user.pantry,saved[1]?.data.meals||[]),saved[0].id));
  }
  if(path==='/api/plans/purchased'&&method==='POST'){
    const saved=await plans(env,user.id),plan=saved[0]?.data;if(!plan)throw new Error('Generate a plan first.');if(plan.purchased)throw new Error('These purchases have already been added.');
    const pantry={...user.pantry};for(const x of plan.list)pantry[x.id]=(pantry[x.id]||0)+x.buyGrams;plan.purchased=true;
    await env.DB.batch([env.DB.prepare('UPDATE users SET pantry=? WHERE id=?').bind(JSON.stringify(pantry),user.id),env.DB.prepare('UPDATE plans SET data=? WHERE id=? AND user_id=?').bind(JSON.stringify(plan),saved[0].id,user.id)]);
    return json({ok:true});
  }
  if(path==='/api/plans/cooked'&&method==='POST'){
    const {index}=await readBody(request,z.object({index:z.number().int().min(0).max(27)})),saved=await plans(env,user.id),plan=saved[0]?.data;
    if(!plan?.meals[index])throw new Error('Choose a valid meal.');if(plan.completed.includes(index))throw new Error('This meal is already marked cooked.');
    const pantry={...user.pantry};for(const [id,g] of Object.entries(plan.meals[index].items)){if((pantry[id]||0)<g)throw new Error('Pantry stock is too low. Record purchases or update your pantry first.');pantry[id]-=g;}plan.completed.push(index);
    await env.DB.batch([env.DB.prepare('UPDATE users SET pantry=? WHERE id=?').bind(JSON.stringify(pantry),user.id),env.DB.prepare('UPDATE plans SET data=? WHERE id=? AND user_id=?').bind(JSON.stringify(plan),saved[0].id,user.id)]);
    return json({ok:true});
  }
  if(path==='/api/stores'&&method==='POST'){
    if(!await checkLimit(env,`stores:${user.id}`,5,60000))return json({error:'Please wait a minute before searching again.'},429);
    const input=await readBody(request,z.object({country:z.enum(['US','CA']),location:z.string().max(150).optional(),lat:z.number().min(-90).max(90).optional(),lon:z.number().min(-180).max(180).optional()}).refine(x=>(x.lat===undefined)===(x.lon===undefined)));
    const result=await findStores(input);await env.DB.prepare('INSERT INTO store_results(user_id,data,expires_at) VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET data=excluded.data,expires_at=excluded.expires_at').bind(user.id,JSON.stringify(result),new Date(Date.now()+3600000).toISOString()).run();return json(result);
  }
  if(path==='/api/chat'&&method==='POST'){
    if(!await checkLimit(env,`chat:${user.id}`,8,60000))return json({error:'Please wait a minute before asking again.'},429);
    const {message}=await readBody(request,z.object({message:z.string().trim().min(1).max(2000)})),saved=await plans(env,user.id),history=(await env.DB.prepare('SELECT role,text FROM chats WHERE user_id=? ORDER BY created_at DESC,id DESC LIMIT 12').bind(user.id).all()).results.reverse();
    if(env.OPENAI_API_KEY&&env.OPENAI_MODEL){const day=new Date().toISOString().slice(0,10),used=await env.DB.prepare('INSERT INTO usage(user_id,day,calls) VALUES(?,?,1) ON CONFLICT(user_id,day) DO UPDATE SET calls=calls+1 RETURNING calls').bind(user.id,day).first();if(used.calls>Number(env.AI_DAILY_LIMIT||20))return json({error:'You have reached today’s AI message allowance. Meal-planning controls are still available.'},429);}
    const answer=await askAI(env,{message,history,profile:user.profile,pantry:user.pantry,plan:saved[0]?.data||null});
    await env.DB.batch([env.DB.prepare('INSERT INTO chats(id,user_id,role,text) VALUES(?,?,?,?)').bind(crypto.randomUUID(),user.id,'user',message),env.DB.prepare('INSERT INTO chats(id,user_id,role,text) VALUES(?,?,?,?)').bind(crypto.randomUUID(),user.id,'assistant',answer.reply)]);
    let actionToken=null;if(answer.action!=='none'){actionToken=crypto.randomUUID();await env.DB.prepare('INSERT INTO pending_actions(user_id,token,data,plan_id,plan_hash,profile_hash,expires_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET token=excluded.token,data=excluded.data,plan_id=excluded.plan_id,plan_hash=excluded.plan_hash,profile_hash=excluded.profile_hash,expires_at=excluded.expires_at').bind(user.id,actionToken,JSON.stringify(answer),saved[0]?.id||null,await digest(JSON.stringify(saved[0]?.data||null)),await digest(JSON.stringify(user.profile)),new Date(Date.now()+600000).toISOString()).run();}
    return json({...answer,actionToken});
  }
  if(path==='/api/chat/confirm'&&method==='POST'){
    const {token}=await readBody(request,z.object({token:z.string().uuid()})),pending=await env.DB.prepare('SELECT * FROM pending_actions WHERE user_id=? AND token=? AND expires_at>CURRENT_TIMESTAMP').bind(user.id,token).first();if(!pending)throw new Error('That suggestion expired. Ask the chef again.');
    const a=actionSchema.parse(parseJSON(pending.data)),saved=await plans(env,user.id);if((pending.plan_id||null)!==(saved[0]?.id||null)||pending.plan_hash!==await digest(JSON.stringify(saved[0]?.data||null))||pending.profile_hash!==await digest(JSON.stringify(user.profile)))throw new Error('Your settings or plan changed. Ask the chef for a new suggestion.');
    await env.DB.prepare('DELETE FROM pending_actions WHERE user_id=?').bind(user.id).run();let p=profileSchema.parse(user.profile);
    if(a.action==='preferences'){p=profileSchema.parse({...p,...(a.budget!==null?{budget:a.budget}:{}),...(a.minutes!==null?{minutes:a.minutes}:{}),...(a.cuisines!==null?{cuisines:a.cuisines}:{})});await env.DB.prepare('UPDATE users SET profile=? WHERE id=?').bind(JSON.stringify(p),user.id).run();return json({message:'Preferences saved. Generate a new week to apply them.'});}
    if(a.action==='generate'){await savePlan(env,user.id,generate(p,user.pantry,saved[0]?.data.meals||[]));return json({message:'Your new meal plan and shopping list are ready.'});}
    if(a.action==='swap'){if(!saved[0]||saved[0].data.purchased||saved[0].data.completed?.length)throw new Error('Generate a new plan before making this change.');await savePlan(env,user.id,swap(saved[0].data,a.mealIndex,p,user.pantry,saved[1]?.data.meals||[]),saved[0].id);return json({message:'Meal replaced and shopping list updated.'});}
    return json({message:'No change requested.'});
  }
  if(path==='/api/account'&&method==='DELETE'){
    const {password}=await readBody(request,z.object({password:z.string().max(128)}));if(!await passwordMatches(password,user.password))return json({error:'Password is incorrect.'},401);
    await env.DB.prepare('DELETE FROM users WHERE id=?').bind(user.id).run();
    return json({ok:true},200,{'set-cookie':'cc_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'});
  }
  return json({error:'Not found.'},404);
}

export default {
  async fetch(request,env){
    const url=new URL(request.url);
    try{
      if(url.pathname.startsWith('/api/'))return await handleApi(request,env,url.pathname);
      return env.ASSETS.fetch(request);
    }catch(error){return json({error:safeError(error)},error instanceof z.ZodError?400:422);}
  }
};
