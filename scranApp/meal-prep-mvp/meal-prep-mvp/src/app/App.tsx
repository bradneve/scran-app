import { useMemo, useState } from 'react';
import { CookPreview } from '../components/CookPreview';
import { PantryPicker } from '../components/PantryPicker';
import { RecipeCard } from '../components/RecipeCard';
import { ShoppingList } from '../components/ShoppingList';
import { recipes } from '../data/recipes';
import { buildShoppingList } from '../domain/shoppingList';
import type { PlannedMeal } from '../domain/types';
function getDefaultPantryItems() { return recipes.flatMap(r=>r.ingredients).filter(i=>i.pantryDefault).map(i=>i.name).filter((n,i,a)=>a.indexOf(n)===i).sort((a,b)=>a.localeCompare(b)); }
export function App() {
 const [plannedMeals,setPlannedMeals]=useState<PlannedMeal[]>([]);
 const [alreadyHave,setAlreadyHave]=useState<Set<string>>(()=>new Set(getDefaultPantryItems()));
 const shoppingList=useMemo(()=>buildShoppingList(recipes,plannedMeals,alreadyHave),[plannedMeals,alreadyHave]);
 const selectedRecipe=recipes.find(r=>r.id===plannedMeals[0]?.recipeId);
 function toggleMeal(recipeId:string){setPlannedMeals(cur=>{const exists=cur.some(m=>m.recipeId===recipeId); if(exists) return cur.filter(m=>m.recipeId!==recipeId); const r=recipes.find(x=>x.id===recipeId); return r?[...cur,{recipeId,servings:r.defaultServings}]:cur;});}
 function updateServings(recipeId:string,servings:number){setPlannedMeals(cur=>cur.map(m=>m.recipeId===recipeId?{...m,servings}:m));}
 function toggleAlreadyHave(name:string){setAlreadyHave(cur=>{const next=new Set(cur); next.has(name)?next.delete(name):next.add(name); return next;});}
 function getServings(id:string,fallback:number){return plannedMeals.find(m=>m.recipeId===id)?.servings ?? fallback;}
 function isSelected(id:string){return plannedMeals.some(m=>m.recipeId===id);}
 return <main className="app-shell"><header className="hero"><div><p className="eyebrow">Brad & Grace Meal Bank</p><h1>Pick meals. Get the shop list.</h1><p>MVP focused on the thing that matters: choose 2–3 meals and get a combined list in seconds.</p></div><div className="hero-card"><strong>{plannedMeals.length}</strong><span>meals picked</span></div></header><div className="layout"><section className="panel"><div className="section-heading"><h2>Recipes</h2><p>Choose meals and adjust servings.</p></div><div className="recipe-list">{recipes.map(r=><RecipeCard key={r.id} recipe={r} selected={isSelected(r.id)} servings={getServings(r.id,r.defaultServings)} onToggle={()=>toggleMeal(r.id)} onServingsChange={(s)=>updateServings(r.id,s)} />)}</div></section><aside className="side-stack"><PantryPicker pantryItems={getDefaultPantryItems()} alreadyHave={alreadyHave} onToggle={toggleAlreadyHave}/><ShoppingList items={shoppingList}/><CookPreview recipe={selectedRecipe}/></aside></div></main>;
}
