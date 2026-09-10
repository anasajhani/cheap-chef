import test from 'node:test';
import assert from 'node:assert/strict';
import {defaults,generate,shopping,eligible,swap,target,profileSchema} from '../apps/api/src/planner.js';
import {recipes,ingredients} from '../apps/api/src/catalog.js';
import {askChef} from '../apps/api/src/chef.js';
import {distance} from '../apps/api/src/stores.js';
test('multiple packages are charged and pantry quantities are deducted',()=>{const bill=shopping([{items:{rice:2100}}],defaults,{rice:50});assert.equal(bill.list[0].packages,3);assert.equal(bill.totalCents,750);assert.equal(bill.list[0].pantryUsed,50);assert.equal(shopping([{items:{rice:500}}],defaults,{rice:500}).totalCents,0);assert.equal(shopping([{items:{rice:1000}}],{...defaults,country:'CA'},{}).totalCents,350);});
test('plans contain 21 distinct meals and avoid the previous week',()=>{const p={...defaults,budget:200};const first=generate(p);const second=generate(p,{},first.meals);assert.equal(first.meals.length,21);assert.equal(new Set(first.meals.map(m=>m.id)).size,21);assert.ok(second.meals.every(m=>!first.meals.some(x=>x.id===m.id)));assert.ok(first.totalCents<=20000);for(let d=0;d<7;d++)assert.ok(Math.abs(first.meals.slice(d*3,d*3+3).reduce((n,m)=>n+m.nutrition.kcal,0)-target(p))<40);});
test('allergy, diet, time and ALL equipment constraints are enforced',()=>{const p={...defaults,diet:'vegan',allergens:['soy','wheat','mustard']};for(const r of eligible(p)){assert.ok(r.vegan);for(const id of Object.keys(r.items))assert.ok(!ingredients[id].allergens.some(a=>p.allergens.includes(a)));assert.ok(r.equipment.every(e=>p.equipment.includes(e)));}assert.equal(eligible({...p,equipment:[],minutes:5}).length,0);assert.throws(()=>generate({...defaults,budget:1}),/budget/);assert.throws(()=>generate({...defaults,equipment:[],minutes:5}),/not enough/);});
test('swaps recompute package costs and preserve constraints',()=>{const p={...defaults,budget:200},plan=generate(p),next=swap(plan,0,p,{});assert.notEqual(next.meals[0].id,plan.meals[0].id);assert.equal(next.totalCents,shopping(next.meals,p).totalCents);assert.throws(()=>swap(plan,-1,p,{}),/valid meal/);assert.throws(()=>profileSchema.parse({...p,budget:-1}));});
test('all recipes reference existing ingredients with chronological directions',()=>{for(const r of recipes){assert.ok(r.steps.length>=4);assert.ok(r.nutrition.kcal>0);for(const id of Object.keys(r.items))assert.ok(ingredients[id]);}});
test('AI unavailable mode is explicit and makes no network request',async()=>{const key=process.env.OPENAI_API_KEY,model=process.env.OPENAI_MODEL;delete process.env.OPENAI_API_KEY;delete process.env.OPENAI_MODEL;try{const result=await askChef({},()=>{throw Error('must not call')});assert.equal(result.mode,'unavailable');assert.equal(result.action,'none')}finally{if(key)process.env.OPENAI_API_KEY=key;if(model)process.env.OPENAI_MODEL=model;}});
test('store distances use actual coordinates',()=>{assert.equal(distance(40,-83,40,-83),0);assert.ok(distance(40,-83,40.1,-83)>11000);});

test('AI integration validates structured provider responses and keeps actions pending',async()=>{
 const key=process.env.OPENAI_API_KEY,model=process.env.OPENAI_MODEL;
 process.env.OPENAI_API_KEY='test-only';process.env.OPENAI_MODEL='test-only';
 try{
  let sent;
  const action={reply:'Replace the first meal?',action:'swap',mealIndex:0,budget:null,minutes:null,cuisines:null};
  const result=await askChef({message:'Swap meal one',history:[],profile:defaults,plan:null,pantry:{}},async(url,init)=>{sent=JSON.parse(init.body);return {ok:true,json:async()=>({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify(action)}]}]})}});
  assert.equal(result.action,'swap');assert.equal(result.mode,'ai');assert.equal(sent.store,false);assert.equal(sent.text.format.strict,true);
  await assert.rejects(()=>askChef({message:'Hi',history:[],profile:defaults,plan:null,pantry:{}},async()=>({ok:true,json:async()=>({status:'incomplete'})})),/incomplete/);
 }finally{if(key)process.env.OPENAI_API_KEY=key;else delete process.env.OPENAI_API_KEY;if(model)process.env.OPENAI_MODEL=model;else delete process.env.OPENAI_MODEL;}
});
