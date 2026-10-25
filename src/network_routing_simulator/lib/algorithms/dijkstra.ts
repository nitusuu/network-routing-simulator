import type { AlgorithmTraceStep } from "@/types/simulation";
import type { NetworkLink, RouteResult, Router } from "@/types/network";

export function dijkstra(
  routers: Router[], links: NetworkLink[], source: string, destination: string
): RouteResult {
  const start = performance.now();
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const known = new Set(routers.map((r) => r.id));
  if (!known.has(source) || !known.has(destination)) {
    return { path: [], totalCost: Infinity, hops: 0, reachable: false, calculationMs: performance.now() - start };
  }
  for (const r of routers) { distances[r.id] = Infinity; previous[r.id] = null; }
  distances[source] = 0;
  const unvisited = new Set(known);
  while (unvisited.size) {
    let current: string | null = null;
    for (const id of unvisited) {
      if (current === null || distances[id] < distances[current]) current = id;
    }
    if (current === null || distances[current] === Infinity) break;
    unvisited.delete(current);
    if (current === destination) break;
    for (const link of links) {
      if (!link.active) continue;
      if (!Number.isFinite(link.cost) || link.cost < 0) throw new Error("Dijkstra requires finite non-negative link costs.");
      const neighbor = link.source === current ? link.target : link.target === current ? link.source : null;
      if (!neighbor || !unvisited.has(neighbor)) continue;
      const candidate = distances[current] + link.cost;
      if (candidate < distances[neighbor]) {
        distances[neighbor] = candidate;
        previous[neighbor] = current;
      }
    }
  }
  if (distances[destination] === Infinity) {
    return { path: [], totalCost: Infinity, hops: 0, reachable: false, calculationMs: performance.now() - start };
  }
  const path: string[] = [];
  let cursor: string | null = destination;
  while (cursor) { path.unshift(cursor); cursor = previous[cursor]; }
  if (path[0] !== source) return { path: [], totalCost: Infinity, hops: 0, reachable: false, calculationMs: performance.now() - start };
  return { path, totalCost: distances[destination], hops: path.length - 1, reachable: true, calculationMs: performance.now() - start };
}

export function traceDijkstra(
  routers: Router[], links: NetworkLink[], source: string
): AlgorithmTraceStep[] {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const visited = new Set<string>();
  for (const r of routers) { distances[r.id] = Infinity; previous[r.id] = null; }
  if (!(source in distances)) return [];
  distances[source] = 0;
  const trace: AlgorithmTraceStep[] = [{ current: source, distances: { ...distances }, previous: { ...previous }, note: `Initialize ${source} to cost 0.` }];
  while (visited.size < routers.length) {
    let current: string | null = null;
    for (const r of routers) if (!visited.has(r.id) && (current === null || distances[r.id] < distances[current])) current = r.id;
    if (!current || distances[current] === Infinity) break;
    visited.add(current);
    for (const l of links) {
      if (!l.active) continue;
      const n = l.source === current ? l.target : l.target === current ? l.source : null;
      if (!n || visited.has(n)) continue;
      const candidate = distances[current] + l.cost;
      if (candidate < distances[n]) { distances[n] = candidate; previous[n] = current; }
    }
    trace.push({ current, distances: { ...distances }, previous: { ...previous }, note: `Processed ${current}; updated tentative distances.` });
  }
  return trace;
}