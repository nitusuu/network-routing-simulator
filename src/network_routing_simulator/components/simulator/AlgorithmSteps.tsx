"use client";
import { useMemo, useState } from "react";
import { traceDijkstra } from "@/lib/algorithms/dijkstra";
import { useNetworkStore } from "@/store/networkStore";
export default function AlgorithmSteps() {
  const topology = useNetworkStore((s) => s.topology);
  const source = useNetworkStore((s) => s.source);
  const steps = useMemo(() => traceDijkstra(topology.routers, topology.links, source), [topology, source]);
  const [index, setIndex] = useState(0);
  const step = steps[Math.min(index, Math.max(steps.length - 1, 0))];
  return <section className="card"><div className="section-heading"><h2>Algorithm trace</h2><span className="tag">{steps.length ? `Step ${Math.min(index + 1, steps.length)} / ${steps.length}` : "No steps"}</span></div><p className="muted">{step?.note ?? "Choose a valid source router."}</p><div className="row-actions"><button className="button small" onClick={() => setIndex(0)}>Reset</button><button className="button small" onClick={() => setIndex((i) => Math.max(0, i - 1))}>Previous</button><button className="button small primary" onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))} disabled={!steps.length || index >= steps.length - 1}>Next step</button></div><div className="distance-grid">{Object.entries(step?.distances ?? {}).map(([id, cost]) => <div className="distance-item" key={id}><strong>{id}</strong><span>{Number.isFinite(cost) ? cost : "∞"}</span></div>)}</div></section>;
}