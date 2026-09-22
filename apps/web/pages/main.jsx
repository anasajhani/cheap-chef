import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { defaults, profileSchema, pantrySchema, generate, swap, shopping } from '../../api/src/planner.js';
import { ingredients, proteinNames } from '../../api/src/catalog.js';
import '../src/style.css';

const KEY = 'cheap-chef-pages-v1';
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const equipment = { stovetop: 'Stovetop', microwave: 'Microwave', oven: 'Oven', airfryer: 'Air fryer', blender: 'Blender', toaster: 'Toaster', knife: 'Knife & cutting board', slowcooker: 'Slow cooker' };
const money = (cents, currency = 'USD') => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
const photo = `${import.meta.env.BASE_URL}assets/meal-prep.png`;

function readSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { profile: profileSchema.parse(saved.profile || defaults), pantry: pantrySchema.parse(saved.pantry || {}), plan: saved.plan || null, previous: saved.previous || [] };
  } catch { return { profile: defaults, pantry: {}, plan: null, previous: [] }; }
}

function Group({ title, options, values, change }) {
  return <fieldset><legend>{title}</legend><div className="checklist">{options.map(option => { const [value, label] = Array.isArray(option) ? option : [option, option]; return <label key={value}><input type="checkbox" checked={values.includes(value)} onChange={event => change(event.target.checked ? [...values, value] : values.filter(item => item !== value))}/>{label}</label>; })}</div></fieldset>;
}

function App() {
  const [saved, setSaved] = useState(readSaved);
  const [profile, setProfile] = useState(saved.profile);
  const [pantry, setPantry] = useState(saved.pantry);
  const [tab, setTab] = useState('Preferences');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [step, setStep] = useState(0);
  const [proteinChoice, setProteinChoice] = useState({});

  function persist(next) {
    localStorage.setItem(KEY, JSON.stringify(next));
    setSaved(next);
  }
  function perform(fn) {
    setError(''); setNotice('');
    try { fn(); } catch (issue) { setError(issue.message || 'Could not save your change.'); }
  }
  function field(key, value) { setProfile(current => ({ ...current, [key]: value })); }
  function saveProfile() {
    const valid = profileSchema.parse(profile);
    persist({ ...saved, profile: valid });
    setNotice('Preferences saved in this browser. Build a new week to use them.');
  }
  function savePantry() {
    const valid = pantrySchema.parse(pantry);
    persist({ ...saved, pantry: valid });
    setNotice('Pantry saved in this browser.');
  }
  function buildWeek() {
    const valid = profileSchema.parse(profile);
    const plan = generate(valid, saved.pantry, saved.plan?.meals || []);
    persist({ ...saved, profile: valid, plan, previous: saved.plan?.meals || [] });
    setTab('My week'); setNotice('Your new week is ready and saved in this browser.');
  }
  function changeMeal(index, protein) {
    const plan = swap(saved.plan, index, saved.plan.settings, saved.pantry, saved.previous, protein);
    persist({ ...saved, plan });
    setNotice(protein ? 'Protein changed. Grocery costs updated.' : 'Dish swapped. Grocery costs updated.');
  }
  function boughtFood() {
    if (!saved.plan || saved.plan.purchased) return;
    const updatedPantry = { ...saved.pantry };
    for (const item of saved.plan.list) updatedPantry[item.id] = (updatedPantry[item.id] || 0) + item.buyGrams;
    const updatedPlan = { ...saved.plan, purchased: true, spentCents: (saved.plan.spentCents || 0) + (saved.plan.additionalCents ?? saved.plan.totalCents) };
    persist({ ...saved, pantry: updatedPantry, plan: updatedPlan });
    setPantry(updatedPantry); setNotice('Purchased quantities added to your pantry.');
  }
  function cookedMeal(index) {
    const plan = saved.plan;
    if (plan.completed.includes(index)) throw new Error('This meal is already marked cooked.');
    const updatedPantry = { ...saved.pantry };
    for (const [id, grams] of Object.entries(plan.meals[index].items)) {
      if ((updatedPantry[id] || 0) < grams) throw new Error('Pantry stock is too low. Record purchases or update your pantry first.');
      updatedPantry[id] -= grams;
    }
    const completed = [...plan.completed, index];
    const remaining = plan.meals.filter((_, mealIndex) => !completed.includes(mealIndex));
    const bill = shopping(remaining, plan.settings, updatedPantry);
    persist({ ...saved, pantry: updatedPantry, plan: { ...plan, ...bill, completed, totalCents: (plan.spentCents || 0) + bill.totalCents, additionalCents: bill.totalCents } });
    setPantry(updatedPantry); setRecipe(null); setNotice('Meal marked cooked. Pantry updated.');
  }
  const plan = saved.plan;
  const currency = profile.country === 'CA' ? 'CAD' : 'USD';
  return <><header><a className="brand" href={import.meta.env.BASE_URL}>CC <span>Cheap Chef</span></a><span className="muted">Your plans stay in this browser</span></header><main>
    <section className="intro"><div><p className="eyebrow">YOUR WEEK, MADE SIMPLER</p><h1>Eat well.<br/>Spend smart.</h1><p>Make a healthy weekly meal plan around your budget, food preferences, and pantry. Swap dishes whenever you want.</p><button onClick={() => perform(buildWeek)}>Build a new week →</button></div><img src={photo} alt="Prepared meals and fresh ingredients"/></section>
    <p className="muted">This GitHub Pages edition saves data only on this device and browser. It has no account or AI chat. Clearing browser storage removes your saved plan.</p>
    {error && <div role="alert" className="error">{error}</div>}{notice && <div role="status" className="success">{notice}</div>}
    <nav aria-label="Kitchen sections">{['Preferences', 'Pantry', 'My week', 'Shopping list'].map(name => <button key={name} className={tab === name ? 'active' : ''} aria-current={tab === name ? 'page' : undefined} onClick={() => setTab(name)}>{name}</button>)}</nav>
    {tab === 'Preferences' && <section className="panel"><h2>Make it yours.</h2><div className="grid">
      <label>First name<input value={profile.name} maxLength="80" onChange={e => field('name', e.target.value)}/></label>
      <label>Country<select value={profile.country} onChange={e => field('country', e.target.value)}><option value="US">United States · USD</option><option value="CA">Canada · CAD</option></select></label>
      <label>Weekly grocery budget ({currency})<input type="number" min="1" max="2000" step=".01" value={profile.budget} onChange={e => field('budget', +e.target.value)}/></label>
      <label>Maximum cooking time (minutes)<input type="number" min="5" max="180" value={profile.minutes} onChange={e => field('minutes', +e.target.value)}/></label>
      <label>Meals per day<select value={profile.meals} onChange={e => field('meals', +e.target.value)}>{[1, 2, 3, 4].map(number => <option key={number} value={number}>{number}</option>)}</select></label>
      <label>Weight (kg)<input type="number" min="40" max="250" value={profile.weight} onChange={e => field('weight', +e.target.value)}/></label>
      <label>Height (cm)<input type="number" min="130" max="230" value={profile.height} onChange={e => field('height', +e.target.value)}/></label>
      <label>Nutrition goal<select value={profile.goal} onChange={e => field('goal', e.target.value)}><option value="maintain">Maintain weight</option><option value="lose">Lose weight</option><option value="gain">Gain weight</option></select></label>
      <label>Diet<select value={profile.diet} onChange={e => field('diet', e.target.value)}>{['none', 'vegan', 'vegetarian', 'halal', 'kosher'].map(value => <option key={value} value={value}>{value === 'none' ? 'No preference' : value}</option>)}</select></label>
    </div>
    <Group title="Available kitchen equipment" options={Object.entries(equipment)} values={profile.equipment} change={value => field('equipment', value)}/>
    <Group title="Ingredients to avoid" options={['wheat','soy','milk','eggs','peanuts','tree nuts','fish','shellfish','sesame','mustard','pork']} values={profile.allergens} change={value => field('allergens', value)}/>
    <Group title="Preferred cuisines (leave empty for all)" options={['American','Italian','Mexican','Middle Eastern','Asian','Indian','British']} values={profile.cuisines} change={value => field('cuisines', value)}/>
    <p className="muted">Nutrition and prices are estimates. Check food labels for allergens and dietary certification.</p>
    <div className="row"><button onClick={() => perform(saveProfile)}>Save preferences</button><button className="secondary" onClick={() => perform(buildWeek)}>Build a new week</button></div></section>}
    {tab === 'Pantry' && <section className="panel"><h2>Use what you already have.</h2><p>Enter quantities in grams. Missing amounts go on your next shopping list.</p><div className="grid">{Object.entries(ingredients).map(([id, item]) => <label key={id}>{item.name}<input type="number" min="0" max="100000" step="1" value={pantry[id] || 0} onChange={e => setPantry(current => ({ ...current, [id]: +e.target.value }))}/><span className="muted">grams · typical pack {item.pack} g</span></label>)}</div><button onClick={() => perform(savePantry)}>Save pantry</button></section>}
    {['My week', 'Shopping list'].includes(tab) && (!plan ? <section className="panel"><h2>Your first week is waiting.</h2><button onClick={() => perform(buildWeek)}>Build my week</button></section> : <><section className="panel"><div className="grid"><div><p className="muted">Estimated grocery total</p><p className="stat">{money(plan.totalCents, plan.currency)}</p></div><div><p className="muted">Budget remaining</p><p className="stat">{money(Math.round(plan.settings.budget * 100) - plan.totalCents, plan.currency)}</p></div><div><p className="muted">Approximate daily calorie target</p><p className="stat">{plan.targetCalories} kcal</p></div></div><p className="muted">{plan.priceNote}</p></section>
      {tab === 'My week' ? days.map((day, dayIndex) => <section key={day}><h2>{day}</h2><div className="grid">{plan.meals.slice(dayIndex * plan.settings.meals, (dayIndex + 1) * plan.settings.meals).map((meal, slot) => { const index = dayIndex * plan.settings.meals + slot; return <article className="card meal" key={index}><img src={photo} alt="Illustrative meal preparation" loading="lazy"/><p className="small muted">Illustrative photo</p><h3>{meal.name}</h3><p><span className="tag">{meal.mealSlot || meal.mealType}</span><span className="tag">{meal.minutes} min</span><span className="tag">{meal.nutrition.kcal} kcal</span></p><p className="muted">{meal.nutrition.protein} g protein · {meal.nutrition.carbs} g carbs · {meal.nutrition.fat} g fat</p><div className="row"><button onClick={() => { setRecipe({ meal, index }); setStep(0); }}>Let's cook</button><button className="secondary" disabled={plan.completed.includes(index)} onClick={() => perform(() => changeMeal(index))}>Swap dish</button></div>{meal.mealType === 'main' && <div className="row"><label>Change protein<select value={proteinChoice[index] || ''} onChange={e => setProteinChoice(current => ({ ...current, [index]: e.target.value }))}><option value="">Choose protein</option>{Object.entries(proteinNames).map(([protein, name]) => <option key={protein} value={protein}>{name}</option>)}</select></label><button className="secondary" disabled={!proteinChoice[index] || plan.completed.includes(index)} onClick={() => perform(() => changeMeal(index, proteinChoice[index]))}>Change</button></div>}{plan.completed.includes(index) && <p className="success">Cooked · pantry updated</p>}</article>; })}</div></section>) : <section className="panel"><h2>Your shopping list.</h2><p className="muted">Illustrative package prices, not store quotes.</p>{plan.list.filter(item => item.packages > 0).map(item => <label className="card row" key={item.id}><input type="checkbox"/>{item.name} · {item.packages} × {item.packGrams} g · {money(item.cents, plan.currency)}</label>)}{plan.list.every(item => !item.packages) && <p>Your pantry covers this week.</p>}<div className="row"><button disabled={plan.purchased} onClick={() => perform(boughtFood)}>{plan.purchased ? 'Purchases recorded' : 'I bought everything — update pantry'}</button><button className="secondary" onClick={() => window.print()}>Print list</button></div></section>}</>)}
    <footer>Cheap Chef beta · Your data stays in this browser. Planning estimates are not live store quotes. <a href="https://github.com/anasajhani/cheap-chef">Project on GitHub ↗</a></footer>
    {recipe && <dialog open onClick={event => { if (event.target === event.currentTarget) setRecipe(null); }}><div className="row" style={{justifyContent:'space-between'}}><h2>{recipe.meal.name}</h2><button className="secondary" onClick={() => setRecipe(null)}>Close</button></div><p>{recipe.meal.minutes} minutes · {recipe.meal.nutrition.kcal} kcal</p><h3>Ingredients for your portion</h3><ul>{Object.entries(recipe.meal.items).map(([id, grams]) => <li key={id}>{grams} g {ingredients[id].name.toLowerCase()}</li>)}</ul><h3>Step {step + 1} of {recipe.meal.steps.length}</h3><p className="card">{recipe.meal.steps[step]}</p><div className="row"><button className="secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>Previous</button>{step < recipe.meal.steps.length - 1 ? <button onClick={() => setStep(step + 1)}>Next step →</button> : <button disabled={plan.completed.includes(recipe.index)} onClick={() => perform(() => cookedMeal(recipe.index))}>I cooked this — update pantry</button>}</div></dialog>}
  </main></>;
}

createRoot(document.getElementById('root')).render(<App/>);
