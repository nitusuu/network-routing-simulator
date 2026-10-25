"use client";
import { useNetworkStore } from "@/store/networkStore";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
export default function ComparisonCharts() {
  const metrics = useNetworkStore((s) => s.metrics);
  const data = metrics.slice(-10).map((m, i) => ({ run: `Run ${Math.max(1, metrics.length - Math.min(10, metrics.length) + i + 1)}`, cost: typeof m.cost === "number" ? m.cost : 0, hops: Number(m.hops ?? 0), ms: Number(m.calculationMs ?? 0) }));
  return <section className="card"><h2>Recent route costs</h2>{data.length ? <div className="chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="run"/><YAxis/><Tooltip/><Bar dataKey="cost" fill="#4b8dff" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div> : <p className="muted">Run a few simulations to populate this chart.</p>}</section>;
}