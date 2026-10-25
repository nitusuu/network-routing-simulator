import { describe, it, expect } from "vitest";
import { dijkstra } from "../src/lib/algorithms/dijkstra";
import { sampleTopology } from "../src/lib/graph/sampleTopologies";

describe("Failure recovery", () => {
  it("avoids a failed link and finds an alternate route", () => {
    const links = sampleTopology.links.map((l) => l.id === "L5" ? { ...l, active: false } : l);
    const result = dijkstra(sampleTopology.routers, links, "R1", "R5");
    expect(result.reachable).toBe(true);
    expect(result.totalCost).toBe(7);
    expect(result.path).not.toContain("R3");
  });
});