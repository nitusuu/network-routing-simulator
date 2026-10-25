"use client";
import { useNetworkStore } from "@/store/networkStore";
import { loadScenario, type ScenarioName } from "@/lib/scenarios/scenarioPresets";
export default function ScenarioSelector() {
  const loadPreset = useNetworkStore((s) => s.loadPreset);
  const addEvent = useNetworkStore((s) => s.addEvent);
  const choices: ScenarioName[] = ["Normal operation", "Congestion", "Single-link failure", "Network partition"];
  const apply = (name: ScenarioName) => {
    const topology = loadScenario(name);
    useNetworkStore.setState({ topology, route: null });
    addEvent(`Scenario loaded: ${name}.`, "info");
  };
  return <section className="card"><h2>Scenario presets</h2><p className="muted">Load repeatable test cases for your demonstration.</p><div className="scenario-grid">{choices.map((name) => <button className="scenario-button" key={name} onClick={() => apply(name)}><strong>{name}</strong><span>{name === "Normal operation" ? "Baseline route calculation" : name === "Congestion" ? "Higher cost on a central link" : name === "Single-link failure" ? "Test alternate path recovery" : "Test unreachable destinations"}</span></button>)}</div></section>;
}