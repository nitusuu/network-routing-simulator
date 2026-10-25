import { describe, it, expect } from "vitest";
import { loadScenario } from "../src/lib/scenarios/scenarioPresets";

describe("Scenario presets", () => {
  it("loads a partitioned topology", () => {
    const topology = loadScenario("Network partition");
    expect(topology.links.length).toBe(3);
  });
});