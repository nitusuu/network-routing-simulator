import { makeTopology } from "@/lib/graph/sampleTopologies";

export type ScenarioName = "Normal operation" | "Congestion" | "Single-link failure" | "Network partition";

function findCentralLink(topology: ReturnType<typeof makeTopology>) {
  const candidate = topology.links.find((link) => link.source === "R3" && link.target === "R4")
    ?? topology.links.find((link) => link.source === "R2" && link.target === "R3")
    ?? topology.links[0];

  return candidate;
}

export function loadScenario(name: ScenarioName) {
  const topology = makeTopology(name === "Network partition" ? "partition" : "sample");
  if (name === "Congestion") {
    const link = findCentralLink(topology);
    if (link) link.cost = Math.max(10, link.cost * 3);
  }
  if (name === "Single-link failure") {
    const link = findCentralLink(topology);
    if (link) link.active = false;
  }
  return topology;
}