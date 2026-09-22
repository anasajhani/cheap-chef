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

Object.assign(ingredients, {
 turkey:{name:'Lean ground turkey',pack:500,usd:5,cad:7,kcal:150,protein:20,carbs:0,fat:8,allergens:[]},
 beef:{name:'Lean ground beef',pack:500,usd:6,cad:8,kcal:172,protein:21,carbs:0,fat:10,allergens:[]},
 fish:{name:'Boneless white fish',pack:500,usd:6,cad:8,kcal:85,protein:18,carbs:0,fat:1,allergens:['fish']},
 onion:{name:'Onions',pack:1000,usd:2,cad:3,kcal:40,protein:1,carbs:9,fat:0,allergens:[]},
 spinach:{name:'Frozen spinach',pack:400,usd:2,cad:3,kcal:23,protein:3,carbs:4,fat:0,allergens:[]},
 ginger:{name:'Fresh ginger',pack:100,usd:1,cad:1.5,kcal:80,protein:2,carbs:18,fat:1,allergens:[]},
 garlic:{name:'Garlic',pack:100,usd:1,cad:1.5,kcal:149,protein:6,carbs:33,fat:1,allergens:[]},
 garam:{name:'Garam masala (check label)',pack:40,usd:2,cad:3,kcal:300,protein:10,carbs:50,fat:10,allergens:['mustard']},
 peas:{name:'Frozen peas',pack:500,usd:1.5,cad:2,kcal:81,protein:5,carbs:14,fat:0,allergens:[]}
});
export const cuisines=['American','Italian','Mexican','Middle Eastern','Asian','Indian','British'];
export const proteinNames={chicken:'Chicken',turkey:'Turkey',beef:'Beef',fish:'White fish',tofu:'Tofu',chickpeas:'Chickpea',lentils:'Lentil',beans:'Black bean'};
const plants=['tofu','chickpeas','lentils','beans'];
const recipes=[];
function cookProtein(protein){
 if(protein==='chicken')return 'Use a separate board for raw chicken. Cut into bite-size pieces, wash hands and clean surfaces. Cook in the measured oil until the thickest piece reaches 165°F (74°C).';
 if(protein==='turkey'||protein==='beef')return `Brown the ground ${protein} in the measured oil, breaking it into small pieces. Check with a food thermometer: ${protein==='turkey'?'165°F (74°C)':'160°F (71°C)'}.`;
 if(protein==='fish')return 'Check fish for bones. Cook in the measured oil, turning carefully, until its center reaches 145°F (63°C); flake into large pieces.';
 if(protein==='tofu')return 'Drain and cube the tofu. Cook in the measured oil for 6–8 minutes, turning until lightly golden.';
 return 'Drain and rinse the canned legumes. Warm them in the measured oil for 3–4 minutes.';
}
function addMain(family,cuisine,title,grain,spice,method='simmer',options={}){
 for(const protein of options.proteins||Object.keys(proteinNames)){
  const items={[grain]:grain==='potatoes'?300:75,[protein]:170,vegetables:160,onion:60,garlic:5,oil:7,[spice]:2,...(method==='pilaf'?{peas:80}:{tomatoes:120}),...(options.spinach?{spinach:100}:{}),...(cuisine==='Indian'?{ginger:8}:{})};
  const grainStep=grain==='potatoes'?'Cut the potatoes into small, even cubes. Boil in water for 15–20 minutes until fork-tender; drain.':`Cook the measured ${grain} according to its package directions, using water. Drain excess water.`;
  let finish=method==='mash'?'Mash the cooked potatoes with a splash of hot water. Spoon over the thick vegetable and protein filling; serve with the vegetables.':method==='pilaf'?`Fold the cooked ${grain} into the seasoned protein and vegetables. Cover on low heat for 2 minutes, then fluff and serve.`:`Serve the thick sauce and protein over the cooked ${grain}.`;
  recipes.push({id:`${family}-${protein}`,family,protein,mealType:'main',name:title.replace('{protein}',proteinNames[protein]),cuisine,minutes:method==='mash'?40:35,equipment:['stovetop','knife'],vegan:plants.includes(protein),items,nutrition:nutrients(items),image:'/assets/meal-prep.png',imageNote:'Illustrative meal-prep photo; not a photograph of this dish.',steps:[grainStep,cookProtein(protein),`Transfer the protein to a clean plate. In the same pan, soften the chopped onion and garlic${cuisine==='Indian'?' and grated ginger':''} with a splash of water for 5 minutes. Stir in the measured ${ingredients[spice].name.toLowerCase()} for 30 seconds.`,`Add the vegetables${method==='pilaf'?' and peas':', crushed tomatoes'}${options.spinach?' and spinach':''}, plus 100 ml water. Simmer for 8–10 minutes until vegetables are cooked and the sauce thickens. Return the cooked protein and heat through.`,finish,'Refrigerate leftovers promptly. Use the ingredient quantities shown for your portion; water can be adjusted to prevent sticking.']});
 }
}
// Named dishes with protein-specific instructions; adaptations are labeled explicitly.
for(const row of [
 ['masala','Indian','{protein} tomato masala with rice','rice','garam','simmer'],
 ['saag','Indian','{protein} saag-style spinach with rice','rice','cumin','simmer',{spinach:true}],
 ['keema','Indian','{protein} keema-style peas and potatoes','potatoes','garam','pilaf'],
 ['pulao','Indian','{protein} and vegetable pulao-style rice','rice','cumin','pilaf'],
 ['aloo','Indian','{protein} aloo-style potato curry','potatoes','curry','simmer'],
 ['ginger-curry','Indian','Ginger {protein} curry with quinoa','quinoa','garam','simmer'],
 ['dal','Indian','{protein} dal-style tomato stew with rice','rice','cumin','simmer',{proteins:['lentils','chickpeas','beans']}],
 ['spinach-potato','Indian','{protein} spinach and potato masala','potatoes','garam','simmer',{spinach:true}],
 ['cottage','British','{protein} cottage-pie-style mash bowl','potatoes','herbs','mash'],
 ['hotpot','British','{protein} and vegetable stovetop hotpot','potatoes','herbs','simmer'],
 ['garden','British','{protein} with garden peas and potatoes','potatoes','herbs','pilaf'],
 ['tomato-stew','British','{protein} tomato and vegetable stew with rice','rice','herbs','simmer'],
 ['pepper-potato','British','{protein} paprika potato hash','potatoes','paprika','pilaf'],
 ['spinach-mash','British','{protein} spinach and potato supper','potatoes','herbs','mash',{spinach:true}],
 ['savoury-rice','British','{protein} savoury rice with peas','rice','herbs','pilaf'],
 ['curry-rice','British','{protein} mild curry-house rice bowl','rice','curry','simmer'],
 ['ragu','Italian','{protein} tomato ragu with whole-wheat pasta','pasta','herbs','simmer'],
 ['italian-stew','Italian','{protein} Italian-style vegetable stew','potatoes','herbs','simmer'],
 ['burrito','Mexican','{protein} burrito bowl with rice and vegetables','rice','cumin','simmer'],
 ['mexican-quinoa','Mexican','{protein} smoky quinoa bowl','quinoa','paprika','simmer'],
 ['spiced-rice','Middle Eastern','{protein} cumin rice with vegetables','rice','cumin','pilaf'],
 ['spiced-potato','Middle Eastern','{protein} paprika potato skillet','potatoes','paprika','simmer'],
 ['ginger-rice','Asian','{protein} ginger vegetable rice','rice','cumin','pilaf'],
 ['american-hash','American','{protein} vegetable and potato hash','potatoes','paprika','pilaf']
])addMain(...row);
for(const fruit of ['banana','berries','apple'])for(const extra of ['seeds','soyMilk'])for(const method of ['microwave','stovetop']){
 const items={oats:85,[fruit]:150,[extra]:extra==='seeds'?25:200,cinnamon:1};
 recipes.push({id:`oats-${fruit}-${extra}-${method}`,family:`oats-${fruit}-${extra}`,mealType:'breakfast',name:`${fruit==='berries'?'Berry':fruit==='apple'?'Apple':'Banana'} ${extra==='seeds'?'pumpkin-seed':'creamy soy'} porridge`,cuisine:'American',minutes:12,equipment:[method,...(fruit==='berries'?[]:['knife'])],vegan:true,items,nutrition:nutrients(items),image:'/assets/meal-prep.png',imageNote:'Illustrative meal-prep photo; not a photograph of this porridge.',steps:[`Combine oats with ${extra==='soyMilk'?'soy milk and 100 ml water':'250 ml water'} in a large ${method==='microwave'?'microwave-safe bowl':'saucepan'}.`,method==='microwave'?'Microwave for 2 minutes, stir, then heat in 30-second intervals until cooked.':'Simmer for 5–7 minutes, stirring and adding water as needed.',fruit==='berries'?'Heat berries according to package instructions.':`Wash or peel and slice the ${fruit}.`,`Stir in the fruit and cinnamon${extra==='seeds'?' and seeds':''}; let cool slightly.`]});
}
export {recipes};
