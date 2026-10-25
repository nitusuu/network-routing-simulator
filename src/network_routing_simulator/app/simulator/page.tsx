import NetworkCanvas from "@/components/topology/NetworkCanvas";
import SimulationControls from "@/components/simulator/SimulationControls";
import RouteDetails from "@/components/simulator/RouteDetails";
import AlgorithmSteps from "@/components/simulator/AlgorithmSteps";
import PacketAnimation from "@/components/simulator/PacketAnimation";
import EventLog from "@/components/events/EventLog";

export default function SimulatorPage() {
  return (
    <div className="stack">
      <div className="page-intro">
        <h2>Run a routing experiment</h2>
        <p>Choose endpoints, compare algorithms, and observe how packets travel across the network.</p>
      </div>

      <SimulationControls />
      <RouteDetails />

      <section className="card">
        <h2>Topology and selected route</h2>
        <NetworkCanvas />
      </section>

      <div className="two-col">
        <AlgorithmSteps />
        <PacketAnimation />
      </div>

      <EventLog />
    </div>
  );
}