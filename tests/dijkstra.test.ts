import { describe, it, expect } from "vitest";
import { dijkstra } from "../src/lib/algorithms/dijkstra";
import { sampleTopology } from "../src/lib/graph/sampleTopologies";

describe("Dijkstra", () => {
  it("finds the expected minimum-cost route", () => {
    const result = dijkstra(sampleTopology.routers, sampleTopology.links, "R1", "R5");
    expect(result.reachable).toBe(true);
    expect(result.totalCost).toBe(6);
    expect(result.path).toEqual(["R1", "R2", "R3", "R4", "R5"]);
  });
  it("reports unreachable destinations", () => {
    const links = sampleTopology.links.map((l) => ({ ...l, active: !["L6", "L7"].includes(l.id) }));
    const result = dijkstra(sampleTopology.routers, links, "R1", "R5");
    expect(result.reachable).toBe(false);
  });
});