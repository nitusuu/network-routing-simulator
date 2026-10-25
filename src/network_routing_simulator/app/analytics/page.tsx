"use client";
import MetricsCards from "@/components/analytics/MetricsCards";
import ComparisonCharts from "@/components/analytics/ComparisonCharts";
import EventLog from "@/components/events/EventLog";
import { useNetworkStore } from "@/store/networkStore";
import { exportCSV } from "@/lib/export/exportCSV";
export default function AnalyticsPage() {
  const metrics = useNetworkStore((s) => s.metrics);
  return <div className="stack"><div className="page-intro"><h2>Performance analytics</h2>  <p>These are measurements from this application&apos;s simulations, not real network measurements.</p></div><MetricsCards/><ComparisonCharts/><section className="card"><div className="section-heading"><h2>Recorded simulation runs</h2><button className="button" onClick={() => exportCSV(metrics, "routing-simulation-results.csv")} disabled={!metrics.length}>Export CSV</button></div>{metrics.length ? <div className="table-wrap"><table><thead><tr><th>Source</th><th>Destination</th><th>Algorithm</th><th>Path</th><th>Cost</th><th>Hops</th><th>Time (ms)</th></tr></thead><tbody>{metrics.map((m, i) => <tr key={`${String(m.timestamp)}-${i}`}><td>{String(m.source)}</td><td>{String(m.destination)}</td><td>{String(m.algorithm)}</td><td>{String(m.path)}</td><td>{String(m.cost)}</td><td>{String(m.hops)}</td><td>{Number(m.calculationMs).toFixed(3)}</td></tr>)}</tbody></table></div> : <p className="muted">No runs recorded yet. Open the simulator and run a route first.</p>}</section><EventLog/></div>;
}