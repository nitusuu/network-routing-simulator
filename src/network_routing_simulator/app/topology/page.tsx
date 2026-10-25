import NetworkCanvas from "@/components/topology/NetworkCanvas";
import TopologyToolbar from "@/components/topology/TopologyToolbar";
import LinkConfigPanel from "@/components/topology/LinkConfigPanel";
import EventLog from "@/components/events/EventLog";

export default function TopologyPage() {
  return (
    <div className="stack">
      <div className="page-intro">
        <h2>Design your network</h2>
        <p>
          Add routers, connect links, tune costs, and simulate outages with a clean visual topology editor.
        </p>
      </div>

      <TopologyToolbar />

      <section className="card">
        <div className="section-heading">
          <h2>Network canvas</h2>
          <span className="tag">Interactive graph</span>
        </div>
        <NetworkCanvas />
      </section>

      <LinkConfigPanel />
      <EventLog />
    </div>
  );
}