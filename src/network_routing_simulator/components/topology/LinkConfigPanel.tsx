"use client";
import { useNetworkStore } from "@/store/networkStore";
export default function LinkConfigPanel() {
  const links = useNetworkStore((s) => s.topology.links);
  const update = useNetworkStore((s) => s.updateLinkCost);
  const toggle = useNetworkStore((s) => s.toggleLink);
  const remove = useNetworkStore((s) => s.removeLink);
  return <section className="card"><h2>Link configuration</h2><p className="muted">Adjust cost to model congestion, or toggle a link to simulate failure.</p><div className="link-list">{links.map((l) => <div className="link-row" key={l.id}><div className="link-title"><strong>{l.source} — {l.target}</strong><span className={`tag ${l.active ? "tag-green" : "tag-red"}`}>{l.active ? "Active" : "Failed"}</span></div><label>Cost <input type="number" min="0" step="0.5" value={l.cost} onChange={(e) => update(l.id, Number(e.target.value))}/></label><div className="row-actions"><button className="button small" onClick={() => toggle(l.id)}>{l.active ? "Disable link" : "Restore link"}</button><button className="button small danger" onClick={() => remove(l.id)}>Remove</button></div></div>)}</div></section>;
}