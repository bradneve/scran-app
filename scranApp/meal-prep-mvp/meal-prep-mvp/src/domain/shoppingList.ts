import type { PlannedMeal, Recipe, ShoppingListItem } from './types';
export function buildShoppingList(recipes: Recipe[], plannedMeals: PlannedMeal[], alreadyHave: Set<string>): ShoppingListItem[] {
  const byId = new Map(recipes.map((r) => [r.id, r]));
  const totals = new Map<string, ShoppingListItem>();
  for (const meal of plannedMeals) {
    const recipe = byId.get(meal.recipeId); if (!recipe) continue;
    const multiplier = meal.servings / recipe.defaultServings;
    for (const ingredient of recipe.ingredients) {
      if (alreadyHave.has(ingredient.name)) continue;
      const key = `${ingredient.name.toLowerCase()}|${ingredient.unit.toLowerCase()}|${ingredient.category}`;
      const existing = totals.get(key);
      if (existing) existing.quantity += ingredient.quantity * multiplier;
      else totals.set(key, { name: ingredient.name, quantity: ingredient.quantity * multiplier, unit: ingredient.unit, category: ingredient.category });
    }
  }
  return [...totals.values()].sort((a,b) => a.category === b.category ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category));
}
export function formatQuantity(q: number): string { return Math.abs(q - Math.round(q)) < 0.05 ? String(Math.round(q)) : String(Math.round(q * 10) / 10); }
export function groupShoppingList(items: ShoppingListItem[]) { return items.reduce<Record<string, ShoppingListItem[]>>((g,i)=>{(g[i.category]??=[]).push(i); return g;},{}); }
