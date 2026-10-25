"use client";
import { useRef, useState, type ChangeEvent } from "react";
import { useNetworkStore } from "@/store/networkStore";
import { loadTopologyFromJson } from "@/lib/graph/sampleTopologies";

export default function TopologyToolbar() {
  const routers = useNetworkStore((s) => s.topology.routers);
  const addRouter = useNetworkStore((s) => s.addRouter);
  const addLink = useNetworkStore((s) => s.addLink);
  const load = useNetworkStore((s) => s.loadPreset);
  const applyTopology = useNetworkStore((s) => s.loadTopology);
  const addEvent = useNetworkStore((s) => s.addEvent);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [source, setSource] = useState("R1");
  const [target, setTarget] = useState("R2");

  const handleJsonUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const topology = loadTopologyFromJson(text);
      applyTopology(topology);
      const nextSource = topology.routers[0]?.id ?? "R1";
      const nextTarget = topology.routers[1]?.id ?? nextSource;
      setSource(nextSource);
      setTarget(nextTarget);
      addEvent(`Loaded topology from ${file.name}.`, "success");
    } catch (error) {
      addEvent(error instanceof Error ? error.message : "Topology JSON is invalid.", "error");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <section className="toolbar card">
      <div>
        <strong>Topology tools</strong>
        <p className="muted">Build routes by hand, load a real topology file, or start from a preset.</p>
      </div>

      <button className="button" onClick={addRouter}>+ Add router</button>

      <label>
        From
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          {routers.map((r) => <option key={r.id} value={r.id}>{r.id}</option>)}
        </select>
      </label>

      <label>
        To
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          {routers.map((r) => <option key={r.id} value={r.id}>{r.id}</option>)}
        </select>
      </label>

      <button className="button" disabled={source === target} onClick={() => addLink(source, target, 1)}>
        + Connect
      </button>

      <label>
        Preset
        <select onChange={(e) => load(e.target.value as "sample" | "star" | "ring" | "mesh" | "partition")} defaultValue="sample">
          <option value="sample">Sample</option>
          <option value="star">Star</option>
          <option value="ring">Ring</option>
          <option value="mesh">Mesh</option>
          <option value="partition">Partition</option>
        </select>
      </label>

      <button className="button primary" onClick={() => fileInputRef.current?.click()}>
        Load JSON topology
      </button>
      <input ref={fileInputRef} type="file" accept=".json,application/json" hidden onChange={handleJsonUpload} />
    </section>
  );
}