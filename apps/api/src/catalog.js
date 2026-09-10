// Planning estimates, not live retailer offers. Quantities are grams; nutrients per 100 g.
export const ingredients = {
 rice:{name:'Dry rice',pack:1000,usd:2.5,cad:3.5,kcal:365,protein:7,carbs:80,fat:1,allergens:[]},
 pasta:{name:'Dry whole-wheat pasta',pack:454,usd:1.8,cad:2.5,kcal:350,protein:13,carbs:70,fat:2,allergens:['wheat']},
 quinoa:{name:'Dry quinoa',pack:454,usd:4,cad:5.5,kcal:368,protein:14,carbs:64,fat:6,allergens:[]},
 potatoes:{name:'Potatoes',pack:2000,usd:4,cad:5.5,kcal:77,protein:2,carbs:17,fat:.1,allergens:[]},
 chickpeas:{name:'Canned chickpeas, drained',pack:240,usd:.9,cad:1.3,kcal:139,protein:7,carbs:22,fat:2,allergens:[]},
 beans:{name:'Canned black beans, drained',pack:240,usd:.9,cad:1.3,kcal:132,protein:9,carbs:24,fat:.5,allergens:[]},
 lentils:{name:'Canned lentils, drained',pack:240,usd:1,cad:1.4,kcal:116,protein:9,carbs:20,fat:.4,allergens:[]},
 tofu:{name:'Firm tofu',pack:400,usd:2.5,cad:3.5,kcal:144,protein:17,carbs:3,fat:9,allergens:['soy']},
 chicken:{name:'Boneless chicken breast',pack:1000,usd:8,cad:12,kcal:120,protein:23,carbs:0,fat:3,allergens:[]},
 vegetables:{name:'Frozen mixed vegetables',pack:1000,usd:2.5,cad:3.5,kcal:60,protein:3,carbs:11,fat:.5,allergens:[]},
 tomatoes:{name:'Canned crushed tomatoes',pack:400,usd:1,cad:1.5,kcal:25,protein:1,carbs:5,fat:.2,allergens:[]},
 oil:{name:'Olive oil',pack:450,usd:5,cad:7,kcal:884,protein:0,carbs:0,fat:100,allergens:[]},
 cumin:{name:'Ground cumin',pack:40,usd:1.5,cad:2,kcal:375,protein:18,carbs:44,fat:22,allergens:[]},
 paprika:{name:'Paprika',pack:40,usd:1.5,cad:2,kcal:282,protein:14,carbs:54,fat:13,allergens:[]},
 herbs:{name:'Dried Italian herbs',pack:30,usd:1.5,cad:2,kcal:250,protein:9,carbs:60,fat:4,allergens:[]},
 curry:{name:'Curry powder (check label)',pack:40,usd:1.5,cad:2,kcal:325,protein:14,carbs:55,fat:14,allergens:['mustard']},
 oats:{name:'Rolled oats (certified gluten-free if needed)',pack:1000,usd:3,cad:4.5,kcal:389,protein:17,carbs:66,fat:7,allergens:[]},
 banana:{name:'Bananas, edible portion',pack:600,usd:1.5,cad:2,kcal:89,protein:1,carbs:23,fat:.3,allergens:[]},
 berries:{name:'Frozen berries',pack:500,usd:3,cad:4.5,kcal:50,protein:1,carbs:12,fat:.4,allergens:[]},
 apple:{name:'Apples, edible portion',pack:1000,usd:3,cad:4,kcal:52,protein:.3,carbs:14,fat:.2,allergens:[]},
 soyMilk:{name:'Unsweetened soy milk',pack:1000,usd:2.5,cad:3.5,kcal:33,protein:3,carbs:1,fat:2,allergens:['soy']},
 seeds:{name:'Pumpkin seeds',pack:250,usd:3,cad:4,kcal:559,protein:30,carbs:11,fat:49,allergens:[]},
 cinnamon:{name:'Ground cinnamon',pack:40,usd:1.5,cad:2,kcal:247,protein:4,carbs:81,fat:1,allergens:[]}
};
export function nutrients(items){const result={kcal:0,protein:0,carbs:0,fat:0};for(const [id,g] of Object.entries(items))for(const k of Object.keys(result))result[k]+=ingredients[id][k]*g/100;return Object.fromEntries(Object.entries(result).map(([k,v])=>[k,Math.round(v)]));}
const recipes=[];
const flavors=[['Italian','herbs','herbed tomato'],['Mexican','cumin','smoky cumin'],['Middle Eastern','paprika','paprika tomato'],['Asian','curry','curried']];
for(const protein of ['chickpeas','beans','lentils','tofu','chicken'])for(const grain of ['rice','pasta','quinoa','potatoes'])for(const [cuisine,spice,flavor] of flavors){
 const items={[grain]:grain==='potatoes'?320:85,[protein]:170,vegetables:180,tomatoes:100,oil:8,[spice]:2};
 const id=`${protein}-${grain}-${spice}`;
 recipes.push({id,name:`${flavor[0].toUpperCase()+flavor.slice(1)} ${protein==='beans'?'black bean':protein} ${grain==='pasta'?'pasta':grain==='potatoes'?'potato plate':grain+' bowl'}`,cuisine,minutes:35,equipment:['stovetop','knife'],vegan:protein!=='chicken',items,nutrition:nutrients(items),image:'/assets/meal-prep.png',imageNote:'Illustrative meal-prep photo; the finished recipe will differ.',steps:[grain==='potatoes'?'Cut potatoes into 2 cm cubes. Cover with water in a saucepan; boil for 15–20 minutes until fork-tender, then drain.':`Bring water to a boil and cook the ${grain} according to the package directions, usually 12–20 minutes. Drain any excess water.`,protein==='chicken'?'Use a separate board for raw chicken. Cut into small pieces, wash hands and clean surfaces, then heat the measured oil in a pan and cook the chicken until the center reaches 165°F (74°C).':protein==='tofu'?'Drain the tofu and cut into cubes. Heat the measured oil in a large pan and cook the tofu for 6–8 minutes, turning gently.':'Drain and rinse the canned legumes. Heat the measured oil in a large pan and add them.',`Add the frozen vegetables, crushed tomatoes and measured ${ingredients[spice].name.toLowerCase()}. Cover and simmer for 8–10 minutes, stirring until the vegetables are hot throughout.`,`Combine with the cooked ${grain} and serve. Refrigerate leftovers promptly.`]});
}
for(const fruit of ['banana','berries','apple'])for(const extra of ['seeds','soyMilk'])for(const method of ['microwave','stovetop']){
 const items={oats:85,[fruit]:150,[extra]:extra==='seeds'?25:200,cinnamon:1};
 recipes.push({id:`oats-${fruit}-${extra}-${method}`,name:`${fruit==='berries'?'Berry':fruit==='apple'?'Apple':'Banana'} ${extra==='seeds'?'pumpkin-seed':'creamy soy'} porridge (${method})`,cuisine:'American',minutes:12,equipment:[method,...(fruit==='berries'?[]:['knife'])],vegan:true,items,nutrition:nutrients(items),image:'/assets/meal-prep.png',imageNote:'Illustrative meal-prep photo; not a photograph of this porridge.',steps:[`Combine the measured oats with ${extra==='soyMilk'?'the soy milk and 100 ml water':'250 ml water'} in ${method==='microwave'?'a large microwave-safe bowl':'a saucepan'}.`,method==='microwave'?'Microwave for 2 minutes, stir, then heat in 30-second intervals until cooked; use a deep bowl to avoid boiling over.':'Simmer over medium-low heat for 5–7 minutes, stirring regularly and adding water as needed.',fruit==='berries'?'Heat frozen berries according to package instructions, then stir into the porridge.':`Wash or peel the ${fruit}, slice, and stir into the porridge.`,`Add cinnamon${extra==='seeds'?' and pumpkin seeds':''}. Let cool slightly before eating.`]});
}
export {recipes};
