export type IngredientCategory = 'Bakery'|'Carbs'|'Dairy'|'Fish'|'Frozen'|'Fruit'|'Herbs'|'Meat'|'Pantry'|'Snacks'|'Tins'|'Veg';
export type Ingredient = { name:string; quantity:number; unit:string; category:IngredientCategory; pantryDefault?:boolean };
export type Recipe = { id:string; name:string; description:string; defaultServings:number; tags:string[]; ingredients:Ingredient[]; steps:string[] };
export type PlannedMeal = { recipeId:string; servings:number };
export type ShoppingListItem = { name:string; quantity:number; unit:string; category:IngredientCategory };
