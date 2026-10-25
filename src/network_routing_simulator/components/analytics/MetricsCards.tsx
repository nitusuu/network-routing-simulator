"use client";
import { useNetworkStore } from "@/store/networkStore";
export default function MetricsCards() {
  const topology = useNetworkStore((s) => s.topology);
  const metrics = useNetworkStore((s) => s.metrics);
  const events = useNetworkStore((s) => s.events);
  const success = metrics.filter((m) => m.reachable === true).length;
  return <div className="metric-grid"><div className="metric"><span>Routers</span><strong>{topology.routers.length}</strong></div><div className="metric"><span>Active links</span><strong>{topology.links.filter((l) => l.active).length}</strong></div><div className="metric"><span>Simulation runs</span><strong>{metrics.length}</strong></div><div className="metric"><span>Successful routes</span><strong>{success}</strong></div><div className="metric"><span>Success rate</span><strong>{metrics.length ? `${Math.round(success / metrics.length * 100)}%` : "—"}</strong></div><div className="metric"><span>Logged events</span><strong>{events.length}</strong></div></div>;
}