import test from 'node:test';
import assert from 'node:assert/strict';
import {defaults,generate,swap,shopping,profileSchema} from '../apps/api/src/planner.js';
import {recipes} from '../apps/api/src/catalog.js';

test('Indian and British weeks rotate and lunch/dinner never contain breakfast recipes',()=>{
 for(const cuisine of ['Indian','British']){
  const p=profileSchema.parse({...defaults,cuisines:[cuisine],budget:500});
  const first=generate(p),second=generate(p,{},first.meals);
  assert.equal(first.meals.length,21);
  assert.ok(second.meals.every(m=>m.cuisine===cuisine&&!first.meals.some(old=>old.id===m.id)));
 }
 const plan=generate({...defaults,budget:500});
 for(const [i,m] of plan.meals.entries())if(i%3!==0)assert.notEqual(m.mealType,'breakfast');
});

test('protein swaps recalculate recipe, allergy eligibility and shopping costs',()=>{
 const p={...defaults,budget:500},plan=generate(p);
 const next=swap(plan,1,p,{},[],'fish');
 assert.equal(next.meals[1].protein,'fish');
 assert.ok(next.meals[1].steps.some(s=>s.includes('145°F')));
 assert.equal(next.totalCents,shopping(next.meals,p).totalCents);
 assert.throws(()=>swap(plan,1,{...p,allergens:['fish']},{},[],'fish'),/No replacement/);
 assert.throws(()=>swap(plan,1,{...p,diet:'vegan'},{},[],'chicken'),/No replacement/);
});

test('post-purchase swaps retain pantry, charge only additional groceries and protect cooked meals',()=>{
 const p={...defaults,budget:500},plan=generate(p),pantry={};
 for(const x of plan.list)pantry[x.id]=x.buyGrams;
 plan.purchased=true;plan.spentCents=plan.totalCents;
 for(const [id,g] of Object.entries(plan.meals[0].items))pantry[id]-=g;
 plan.completed=[0];
 const before=JSON.stringify(pantry),next=swap(plan,1,p,pantry,[],'turkey');
 const remaining=shopping(next.meals.filter((_,i)=>i!==0),p,pantry);
 assert.equal(JSON.stringify(pantry),before);
 assert.equal(next.totalCents,plan.spentCents+remaining.totalCents);
 assert.deepEqual(next.completed,[0]);assert.equal(next.purchased,false);
 assert.throws(()=>swap(next,0,p,pantry),/already cooked/);
 assert.ok(recipes.filter(r=>r.cuisine==='Indian').length>=40);
});
