import Link from "next/link";
import { ArrowUpRight, Network, Route, ShieldCheck, Activity } from "lucide-react";
import MetricsCards from "@/components/analytics/MetricsCards";
import EventLog from "@/components/events/EventLog";

export default function DashboardPage() {
  return (
    <div className="stack">
      <section className="hero">
        <div>
          <p className="eyebrow">ROUTING LABORATORY</p>
          <h2>Understand every route in motion.</h2>
          <p>
            Design a network, tune link costs, simulate traffic, and observe how packets find their way through changing conditions.
          </p>
          <Link className="button primary" href="/topology">
            Open topology editor <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="hero-icon">
          <Network size={82} />
        </div>
      </section>

      <MetricsCards />

      <div className="quick-grid">
        <Link href="/topology" className="quick-card">
          <Network />
          <strong>Topology editor</strong>
          <span>Create routers, links, and failover states.</span>
        </Link>
        <Link href="/simulator" className="quick-card">
          <Route />
          <strong>Route simulator</strong>
          <span>Run Dijkstra or distance-vector comparisons.</span>
        </Link>
        <Link href="/routing-tables" className="quick-card">
          <ShieldCheck />
          <strong>Routing tables</strong>
          <span>Inspect next hops, costs, and reachability.</span>
        </Link>
        <Link href="/analytics" className="quick-card">
          <Activity />
          <strong>Analytics</strong>
          <span>Compare simulation runs side by side.</span>
        </Link>
      </div>

      <EventLog />
    </div>
  );
}