import { describe, it, expect } from "vitest";
import { distanceVector } from "../src/lib/algorithms/distanceVector";
import { sampleTopology } from "../src/lib/graph/sampleTopologies";

describe("Distance Vector", () => {
  it("converges and calculates R1 to R5 cost", () => {
    const result = distanceVector(sampleTopology.routers, sampleTopology.links);
    expect(result.converged).toBe(true);
    expect(result.tables.R1.find((e) => e.destination === "R5")?.cost).toBe(6);
  });
});