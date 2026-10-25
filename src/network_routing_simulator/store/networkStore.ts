"use client";

import { create } from "zustand";
import type { NetworkLink, NetworkTopology, LogEvent, RouteResult } from "@/types/network";
import type { AlgorithmName } from "@/types/simulation";
import { sampleTopology, makeTopology } from "@/lib/graph/sampleTopologies";
import { dijkstra } from "@/lib/algorithms/dijkstra";
import { distanceVector } from "@/lib/algorithms/distanceVector";
import { setLinkCost } from "@/lib/simulation/congestionModel";
import { makeEvent } from "@/lib/simulation/eventLogger";

type Store = {
  topology: NetworkTopology;
  source: string;
  destination: string;
  algorithm: AlgorithmName;
  route: RouteResult | null;
  events: LogEvent[];
  metrics: Record<string, string | number | boolean>[];
  setSource: (value: string) => void;
  setDestination: (value: string) => void;
  setAlgorithm: (value: AlgorithmName) => void;
  addRouter: () => void;
  addLink: (source: string, target: string, cost?: number) => void;
  updateLinkCost: (id: string, cost: number) => void;
  toggleLink: (id: string) => void;
  removeLink: (id: string) => void;
  loadPreset: (kind: "sample" | "star" | "ring" | "mesh" | "partition") => void;
  loadTopology: (topology: NetworkTopology) => void;
  runRoute: () => void;
  addEvent: (message: string, type?: LogEvent["type"]) => void;
  reset: () => void;
};

const initial = structuredClone(sampleTopology);
const initialState = {
  topology: initial, source: "R1", destination: "R5",
  algorithm: "Dijkstra" as AlgorithmName, route: null, events: [] as LogEvent[],
  metrics: [] as Record<string, string | number | boolean>[]
};

export const useNetworkStore = create<Store>((set, get) => ({
  ...initialState,
  setSource: (source) => set({ source }),
  setDestination: (destination) => set({ destination }),
  setAlgorithm: (algorithm) => set({ algorithm }),
  addEvent: (message, type = "info") => set((s) => ({ events: [makeEvent(message, type), ...s.events].slice(0, 100) })),
  addRouter: () => {
    const s = get();
    const n = s.topology.routers.length + 1;
    const id = `R${n}`;
    set({ topology: { ...s.topology, routers: [...s.topology.routers, { id, label: `Router ${n}` }] } });
    get().addEvent(`Added router ${id}.`);
  },
  addLink: (source, target, cost = 1) => {
    if (source === target || !Number.isFinite(cost) || cost < 0) return;
    const s = get();
    if (s.topology.links.some((l) => (l.source === source && l.target === target) || (l.source === target && l.target === source))) return;
    const link: NetworkLink = { id: `L${Date.now()}`, source, target, cost, active: true };
    set({ topology: { ...s.topology, links: [...s.topology.links, link] } });
    get().addEvent(`Added link ${source}–${target} with cost ${cost}.`);
  },
  updateLinkCost: (id, cost) => {
    if (!Number.isFinite(cost) || cost < 0) return;
    const s = get();
    set({ topology: { ...s.topology, links: setLinkCost(s.topology.links, id, cost) } });
    get().addEvent(`Changed ${id} cost to ${cost} (simulated congestion metric).`, "warning");
  },
  toggleLink: (id) => {
    const s = get();
    const link = s.topology.links.find((l) => l.id === id);
    if (!link) return;
    set({ topology: { ...s.topology, links: s.topology.links.map((l) => l.id === id ? { ...l, active: !l.active } : l) } });
    get().addEvent(`Link ${id} ${link.active ? "failed" : "restored"}.`, link.active ? "warning" : "success");
  },
  removeLink: (id) => {
    const s = get();
    set({ topology: { ...s.topology, links: s.topology.links.filter((l) => l.id !== id) } });
    get().addEvent(`Removed link ${id}.`, "warning");
  },
  loadPreset: (kind) => {
    const topology = makeTopology(kind);
    set({ topology, route: null, source: topology.routers[0]?.id ?? "R1", destination: topology.routers.at(-1)?.id ?? "R5" });
    get().addEvent(`Loaded ${kind} topology.`);
  },
  loadTopology: (topology) => {
    if (!topology.routers.length) {
      get().addEvent("Topology file was empty or invalid.", "error");
      return;
    }
    set({ topology, route: null, source: topology.routers[0].id, destination: topology.routers.at(-1)?.id ?? topology.routers[0].id });
    get().addEvent(`Loaded ${topology.routers.length} routers and ${topology.links.length} links from a JSON topology file.`);
  },
  runRoute: () => {
    const s = get();
    let route: RouteResult;
    if (s.algorithm === "Dijkstra") {
      route = dijkstra(s.topology.routers, s.topology.links, s.source, s.destination);
    } else {
      const result = distanceVector(s.topology.routers, s.topology.links);
      const entry = result.tables[s.source]?.find((e) => e.destination === s.destination);
      const pathResult = dijkstra(s.topology.routers, s.topology.links, s.source, s.destination);
      route = entry?.reachable ? { ...pathResult, totalCost: entry.cost } : { path: [], totalCost: Infinity, hops: 0, reachable: false };
      get().addEvent(`Distance Vector converged: ${result.converged ? "yes" : "no"} after ${result.rounds} rounds.`);
    }
    set({ route, metrics: [...s.metrics, {
      source: s.source, destination: s.destination, algorithm: s.algorithm,
      path: route.path.join(" -> "), cost: route.reachable ? route.totalCost : "unreachable",
      hops: route.hops, calculationMs: route.calculationMs ?? 0, reachable: route.reachable,
      timestamp: new Date().toISOString()
    }] });
    get().addEvent(route.reachable ? `Route found: ${route.path.join(" → ")} (cost ${route.totalCost}).` : `No route from ${s.source} to ${s.destination}.`, route.reachable ? "success" : "error");
  },
  reset: () => set({ ...initialState, topology: structuredClone(sampleTopology), source: "R1", destination: "R5" })
}));