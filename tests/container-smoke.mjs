import assert from 'node:assert/strict';
const base='http://localhost:4000/api';
let healthy=false;
for(let i=0;i<45;i++){
 try{const response=await fetch(base+'/health');if(response.ok){healthy=true;break;}}catch{}
 await new Promise(resolve=>setTimeout(resolve,1000));
}
assert.ok(healthy,'Container must become healthy within 45 seconds');
let cookie='';
async function request(endpoint,body,method=body===undefined?'GET':'POST'){
 const response=await fetch(base+endpoint,{method,headers:{Origin:'http://localhost:4000','Content-Type':'application/json',Cookie:cookie},body:body===undefined?undefined:JSON.stringify(body)});
 if(response.headers.get('set-cookie'))cookie=response.headers.get('set-cookie').split(';')[0];
 const result=await response.json();
 assert.ok(response.ok,`${endpoint}: ${response.status} ${JSON.stringify(result)}`);
 return result;
}
await request('/register',{email:'container-check@example.com',password:'container smoke test password'});
const config=await request('/config');
await request('/profile',{...config.defaults,budget:200},'PUT');
const plan=await request('/plans',{});
assert.equal(plan.meals.length,21);
await request('/plans/purchased',{});
await request('/plans/cooked',{index:0});
const user=await request('/me');
assert.ok(user.plan.completed.includes(0));
await request('/account',{password:'container smoke test password'},'DELETE');
console.log('Container + PostgreSQL smoke check passed: registration, plan, purchases, pantry deduction and deletion.');
