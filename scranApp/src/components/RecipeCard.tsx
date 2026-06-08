import type { Recipe } from '../domain/types';
type Props = { recipe: Recipe; selected: boolean; servings: number; onToggle: () => void; onServingsChange: (servings:number)=>void };
export function RecipeCard({ recipe, selected, servings, onToggle, onServingsChange }: Props) {
  return <article className={`recipe-card ${selected ? 'selected' : ''}`}>
    <label className="recipe-card__main">
      <input type="checkbox" checked={selected} onChange={onToggle} />
      <span><strong>{recipe.name}</strong><small>{recipe.description}</small><span className="tags">{recipe.tags.map(t=><span key={t}>{t}</span>)}</span></span>
    </label>
    <label className="servings-control"><span>Servings</span><select value={servings} onChange={e=>onServingsChange(Number(e.target.value))}>{[1,2,3,4,5,6,7,8].map(v=><option key={v} value={v}>{v}</option>)}</select></label>
  </article>;
}
