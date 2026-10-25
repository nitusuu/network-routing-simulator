import { describe, it, expect } from "vitest";
import { setLinkCost } from "../src/lib/simulation/congestionModel";
import { dijkstra } from "../src/lib/algorithms/dijkstra";
import { sampleTopology } from "../src/lib/graph/sampleTopologies";

describe("Congestion cost", () => {
  it("can cause a route to change", () => {
    const links = setLinkCost(sampleTopology.links, "L5", 10);
    const result = dijkstra(sampleTopology.routers, links, "R1", "R5");
    expect(result.totalCost).toBe(7);
    expect(result.path).toEqual(["R1", "R2", "R4", "R5"]);
  });
});