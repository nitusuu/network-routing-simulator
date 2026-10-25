"use client";
import { useNetworkStore } from "@/store/networkStore";
export default function EventLog() {
  const events = useNetworkStore((s) => s.events);
  return <section className="card"><div className="section-heading"><h2>Event log</h2><span className="tag">{events.length} events</span></div>{events.length === 0 ? <p className="muted">Events will appear here as you edit and simulate the network.</p> : <div className="event-list">{events.map((e) => <div className="event-item" key={e.id}><span className={`event-dot ${e.type}`}/><div><p>{e.message}</p><time>{new Date(e.timestamp).toLocaleTimeString()}</time></div></div>)}</div>}</section>;
}