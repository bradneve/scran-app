import { formatQuantity, groupShoppingList } from '../domain/shoppingList';
import type { ShoppingListItem } from '../domain/types';
type Props = { items: ShoppingListItem[] };
export function ShoppingList({ items }: Props) {
  const grouped = groupShoppingList(items);
  async function copyList() {
    const text = Object.entries(grouped).map(([cat, arr]) => [cat, ...arr.map(i=>`- ${i.name} — ${formatQuantity(i.quantity)} ${i.unit}`.trim())].join('\n')).join('\n\n');
    await navigator.clipboard.writeText(text);
  }
  if (!items.length) return <section className="panel empty-state"><h2>Shopping list</h2><p>Pick meals and untick anything you need to buy.</p></section>;
  return <section className="panel"><div className="section-heading section-heading--row"><div><h2>Shopping list</h2><p>{items.length} grouped items</p></div><button className="button button--small" onClick={copyList}>Copy</button></div><div className="shopping-groups">{Object.entries(grouped).map(([cat, arr])=><div className="shopping-group" key={cat}><h3>{cat}</h3><ul>{arr.map(i=><li key={`${i.name}-${i.unit}-${i.category}`}><span>{i.name}</span><strong>{formatQuantity(i.quantity)} {i.unit}</strong></li>)}</ul></div>)}</div></section>;
}
