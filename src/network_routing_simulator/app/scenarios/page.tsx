import ScenarioSelector from "@/components/scenarios/ScenarioSelector";
import NetworkCanvas from "@/components/topology/NetworkCanvas";
import EventLog from "@/components/events/EventLog";

export default function ScenariosPage() {
  return (
    <div className="stack">
      <div className="page-intro">
        <h2>Scenario studio</h2>
        <p>Load repeatable conditions for congestion, failures, and partitions in a single click.</p>
      </div>

      <ScenarioSelector />

      <section className="card">
        <h2>Loaded scenario topology</h2>
        <NetworkCanvas />
      </section>

      <EventLog />
    </div>
  );
}