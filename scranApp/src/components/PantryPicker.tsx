type Props = { pantryItems:string[]; alreadyHave:Set<string>; onToggle:(ingredientName:string)=>void };
export function PantryPicker({ pantryItems, alreadyHave, onToggle }: Props) {
  return <section className="panel"><div className="section-heading"><h2>Already have / pantry</h2><p>Tick things you don’t want on the shopping list.</p></div><div className="chip-grid">{pantryItems.map(item=><label key={item} className="chip"><input type="checkbox" checked={alreadyHave.has(item)} onChange={()=>onToggle(item)} />{item}</label>)}</div></section>;
}
