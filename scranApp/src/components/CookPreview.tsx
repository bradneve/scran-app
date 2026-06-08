import type { Recipe } from '../domain/types';
type Props = { recipe?: Recipe };
export function CookPreview({ recipe }: Props) {
  if (!recipe) return <section className="panel"><div className="section-heading"><h2>Cook mode</h2><p>Select a recipe to preview the step-by-step flow.</p></div></section>;
  return <section className="panel"><div className="section-heading"><h2>Cook mode preview</h2><p>{recipe.name}</p></div><ol className="steps">{recipe.steps.map((s,i)=><li key={s}><span>{i+1}</span>{s}</li>)}</ol></section>;
}
