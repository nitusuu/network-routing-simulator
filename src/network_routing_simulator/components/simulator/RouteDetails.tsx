"use client";
import { useNetworkStore } from "@/store/networkStore";
export default function RouteDetails() {
  const route = useNetworkStore((s) => s.route);
  if (!route) return <section className="card"><h2>Route result</h2><p className="muted">Run a simulation to see the selected route.</p></section>;
  return <section className="card"><h2>Route result</h2>{route.reachable ? <><p className="route-path">{route.path.join(" → ")}</p><div className="metric-grid"><div className="metric"><span>Total cost</span><strong>{route.totalCost}</strong></div><div className="metric"><span>Hops</span><strong>{route.hops}</strong></div><div className="metric"><span>Calculation</span><strong>{(route.calculationMs ?? 0).toFixed(3)} ms</strong></div></div><p className="success-text">Destination is reachable.</p></> : <p className="error-text">Destination is unreachable with the current active links.</p>}</section>;
}