"use client";
import { useMemo, useState } from "react";
import { buildRoutingTable } from "@/lib/algorithms/routingTables";
import { distanceVector } from "@/lib/algorithms/distanceVector";
import { useNetworkStore } from "@/store/networkStore";
export default function RoutingTable() {
  const topology = useNetworkStore((s) => s.topology);
  const [router, setRouter] = useState("R1");
  const [algorithm, setAlgorithm] = useState<"Dijkstra" | "Distance Vector">("Dijkstra");
  const dv = useMemo(() => distanceVector(topology.routers, topology.links), [topology]);
  const rows = algorithm === "Dijkstra" ? buildRoutingTable(topology.routers, topology.links, router) : (dv.tables[router] ?? []);
  return <section className="card"><div className="controls-grid"><label>Router<select value={router} onChange={(e) => setRouter(e.target.value)}>{topology.routers.map((r) => <option key={r.id}>{r.id}</option>)}</select></label><label>Algorithm<select value={algorithm} onChange={(e) => setAlgorithm(e.target.value as "Dijkstra" | "Distance Vector")}><option>Dijkstra</option><option>Distance Vector</option></select></label></div>{algorithm === "Distance Vector" && <p className="muted">Converged: {dv.converged ? "yes" : "no"} · Update rounds: {dv.rounds}</p>}<div className="table-wrap"><table><thead><tr><th>Destination</th><th>Next hop</th><th>Cost</th><th>Status</th></tr></thead><tbody>{rows.map((r) => <tr key={r.destination}><td>{r.destination}</td><td>{r.nextHop ?? "—"}</td><td>{Number.isFinite(r.cost) ? r.cost : "∞"}</td><td><span className={`tag ${r.reachable ? "tag-green" : "tag-red"}`}>{r.reachable ? "Reachable" : "Unreachable"}</span></td></tr>)}</tbody></table></div></section>;
}