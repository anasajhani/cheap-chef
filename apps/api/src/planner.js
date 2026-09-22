import {z} from 'zod';
import {ingredients,recipes,nutrients} from './catalog.js';
export const profileSchema=z.object({name:z.string().trim().max(80).default(''),country:z.enum(['US','CA']).default('US'),location:z.string().max(150).default(''),weight:z.number().min(40).max(250).default(70),height:z.number().min(130).max(230).default(170),goal:z.enum(['lose','maintain','gain']).default('maintain'),budget:z.number().min(1).max(2000).default(75),minutes:z.number().int().min(5).max(180).default(45),meals:z.number().int().min(1).max(4).default(3),equipment:z.array(z.enum(['stovetop','microwave','oven','airfryer','blender','toaster','knife','slowcooker'])).max(8).default(['stovetop','knife']),diet:z.enum(['none','vegan','vegetarian','halal','kosher']).default('none'),allergens:z.array(z.enum(['wheat','soy','milk','eggs','peanuts','tree nuts','fish','shellfish','sesame','mustard','pork'])).max(11).default([]),cuisines:z.array(z.enum(['American','Italian','Mexican','Middle Eastern','Asian','Indian','British'])).max(7).default([]),memberships:z.array(z.enum(['Costco',"Sam's Club"])).max(2).default([]),stores:z.array(z.object({id:z.string().max(100),name:z.string().max(200),address:z.string().max(400),distance:z.number().min(0).nullable(),lat:z.number().min(-90).max(90),lon:z.number().min(-180).max(180),warehouse:z.boolean()})).max(10).default([]),adult:z.literal(true).default(true)});
export const defaults=profileSchema.parse({});
export const pantrySchema=z.partialRecord(z.enum(Object.keys(ingredients)),z.number().min(0).max(100000));
export function target(p){return Math.round(Math.min(3600,Math.max(1600,(10*p.weight+6.25*p.height-150)*1.4+(p.goal==='lose'?-250:p.goal==='gain'?250:0)))/50)*50;}
export function eligible(p){return recipes.filter(r=>r.minutes<=p.minutes&&r.equipment.every(e=>p.equipment.includes(e))&&(p.diet==='none'||r.vegan)&&!Object.keys(r.items).some(k=>ingredients[k].allergens.some(a=>p.allergens.includes(a)))&&(!p.cuisines.length||p.cuisines.includes(r.cuisine)));}
export function portion(r,p){const scale=target(p)/p.meals/r.nutrition.kcal;if(scale<.4||scale>3.5)return null;const items=Object.fromEntries(Object.entries(r.items).map(([k,v])=>[k,Math.round(v*scale)]));return {...r,items,nutrition:nutrients(items),portionScale:Math.round(scale*100)/100};}
export function shopping(meals,p,pantry={}){const need={};for(const m of meals)for(const [id,g] of Object.entries(m.items))need[id]=(need[id]||0)+g;const list=Object.entries(need).map(([id,g])=>{const item=ingredients[id],stock=pantry[id]||0,missing=Math.max(0,g-stock),packages=Math.ceil(missing/item.pack),unitPrice=Math.round(item[p.country==='CA'?'cad':'usd']*100);return {id,name:item.name,needed:g,pantryUsed:Math.min(g,stock),packages,packGrams:item.pack,buyGrams:packages*item.pack,leftover:Math.max(0,stock-g)+packages*item.pack-missing,cents:packages*unitPrice};});return {list,totalCents:list.reduce((n,x)=>n+x.cents,0),currency:p.country==='CA'?'CAD':'USD',priceNote:'Illustrative package prices, not store quotes. Taxes, deposits, membership fees and local price changes are not included.',stores:p.stores};}
export function validatePlan(meals,p,pantry){const compatible=m=>m.minutes<=p.minutes&&m.equipment.every(e=>p.equipment.includes(e))&&(p.diet==='none'||m.vegan)&&!Object.keys(m.items).some(k=>!ingredients[k]||ingredients[k].allergens.some(a=>p.allergens.includes(a)))&&(!p.cuisines.length||p.cuisines.includes(m.cuisine));if(meals.length!==7*p.meals||meals.some(m=>!compatible(m)))throw new Error('The requested plan does not meet your meal, diet, time or equipment settings.');const bill=shopping(meals,p,pantry);if(bill.totalCents>Math.floor(p.budget*100))throw new Error('No plan found within your budget and current preferences. Try a larger budget or different cuisines/equipment. Your existing plan has not changed.');return bill;}

export function mealSlot(index,count){return count<=2?(index%count===0?'Lunch':'Dinner'):['Breakfast','Lunch','Dinner','Extra meal'][index%count];}
const fitsSlot=(r,index,p)=>mealSlot(index,p.meals)==='Breakfast'||r.mealType!=='breakfast';
export function generate(p,pantry={},previous=[]){
 const old=new Set(previous.map(m=>m.id)),oldFamilies=new Set(previous.map(m=>m.family));
 const pool=eligible(p).filter(r=>!old.has(r.id)).map(r=>portion(r,p)).filter(Boolean);
 let best;
 for(let attempt=0;attempt<80;attempt++){
  const chosen=[],used=new Set(),families=new Map();
  for(let i=0;i<7*p.meals;i++){
   let options=pool.filter(r=>!used.has(r.id)&&fitsSlot(r,i,p));
   if(!options.length)break;
   const breakfast=mealSlot(i,p.meals)==='Breakfast';
   const ranked=options.map(r=>({r,score:shopping([r],p,pantry).totalCents*(.35+Math.random()*1.3)+(families.get(r.family)||0)*650+(oldFamilies.has(r.family)?150:0)+(breakfast&&r.mealType!=='breakfast'?200:0)})).sort((a,b)=>a.score-b.score);
   const m={...ranked[0].r,mealSlot:mealSlot(i,p.meals)};chosen.push(m);used.add(m.id);families.set(m.family,(families.get(m.family)||0)+1);
  }
  if(chosen.length!==7*p.meals)continue;
  const bill=shopping(chosen,p,pantry);
  if(!best||bill.totalCents<best.totalCents)best={meals:chosen,...bill};
  if(bill.totalCents<=p.budget*100)break;
 }
 if(!best)throw new Error('There are not enough different recipes for a full week without repeating the previous plan. Broaden cuisines or equipment, or reduce meals per day.');
 validatePlan(best.meals,p,pantry);
 return {...best,targetCalories:target(p),settings:p,completed:[],spentCents:0,createdAt:new Date().toISOString()};
}
export function swap(plan,index,p,pantry,previous=[],protein){
 if(!Number.isInteger(index)||index<0||index>=plan.meals.length)throw new Error('Choose a valid meal to replace.');
 if(plan.completed?.includes(index))throw new Error('This meal is already cooked. Choose an uncooked meal or build a new week.');
 const current=plan.meals[index],excluded=new Set([...plan.meals,...previous].map(m=>m.id));
 const candidates=eligible(p).filter(r=>!excluded.has(r.id)&&fitsSlot(r,index,p)&&(!protein||r.protein===protein));
 // Prefer another dish for a full swap, or the same dish with the requested protein.
 candidates.sort((a,b)=>((protein?a.family!==current.family:a.family===current.family)?1:0)-((protein?b.family!==current.family:b.family===current.family)?1:0));
 const shuffled=candidates.map(r=>({r,t:Math.random(),group:protein?(r.family===current.family?0:1):(r.family===current.family?1:0)})).sort((a,b)=>a.group-b.group||a.t-b.t);
 for(const {r} of shuffled){
  const m=portion(r,p);if(!m)continue;
  const meals=plan.meals.map((x,i)=>i===index?{...m,mealSlot:mealSlot(i,p.meals)}:x);
  try{
   const spent=plan.spentCents??(plan.purchased?plan.totalCents:0);
   const started=plan.purchased||plan.completed?.length||spent>0;
   // Completed meals have already consumed their pantry stock. Never buy them again.
   const bill=started?shopping(meals.filter((_,i)=>!plan.completed?.includes(i)),p,pantry):validatePlan(meals,p,pantry);
   const total=spent+bill.totalCents;
   if(total>Math.floor(p.budget*100))continue;
   return {...plan,...bill,meals,totalCents:total,additionalCents:bill.totalCents,spentCents:spent,purchased:false,settings:p};
  }catch{}
 }
 throw new Error('No replacement fits your protein choice, meal type, current constraints and remaining budget. Try another protein or adjust preferences.');
}
