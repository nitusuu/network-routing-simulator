import type { NetworkLink, Router, RoutingEntry } from "@/types/network";

export type DistanceVectorResult = {
  tables: Record<string, RoutingEntry[]>;
  rounds: number;
  converged: boolean;
};

export function distanceVector(routers: Router[], links: NetworkLink[], maxRounds = 100): DistanceVectorResult {
  const ids = routers.map((r) => r.id);
  let costs: Record<string, Record<string, number>> = {};
  let next: Record<string, Record<string, string | null>> = {};
  for (const x of ids) {
    costs[x] = {};
    next[x] = {};
    for (const y of ids) { costs[x][y] = x === y ? 0 : Infinity; next[x][y] = x === y ? null : null; }
  }
  for (const l of links) {
    if (!l.active) continue;
    costs[l.source][l.target] = Math.min(costs[l.source][l.target] ?? Infinity, l.cost);
    costs[l.target][l.source] = Math.min(costs[l.target][l.source] ?? Infinity, l.cost);
    next[l.source][l.target] = l.target;
    next[l.target][l.source] = l.source;
  }
  let converged = false;
  let rounds = 0;
  for (; rounds < maxRounds; rounds++) {
    let changed = false;
    const newCosts = Object.fromEntries(ids.map((x) => [x, { ...costs[x] }])) as typeof costs;
    const newNext = Object.fromEntries(ids.map((x) => [x, { ...next[x] }])) as typeof next;
    for (const x of ids) {
      const neighbors = links.filter((l) => l.active && (l.source === x || l.target === x))
        .map((l) => ({ id: l.source === x ? l.target : l.source, cost: l.cost }));
      for (const y of ids) {
        if (x === y) continue;
        for (const n of neighbors) {
          const advertised = costs[n.id]?.[y] ?? Infinity;
          const candidate = n.cost + advertised;
          if (candidate < newCosts[x][y]) {
            newCosts[x][y] = candidate;
            newNext[x][y] = n.id;
            changed = true;
          }
        }
      }
    }
    costs = newCosts;
    next = newNext;
    if (!changed) { converged = true; rounds++; break; }
  }
  const tables: Record<string, RoutingEntry[]> = {};
  for (const x of ids) {
    tables[x] = ids.map((y) => ({
      destination: y,
      nextHop: x === y ? null : next[x][y],
      cost: costs[x][y],
      reachable: Number.isFinite(costs[x][y])
    }));
  }
  return { tables, rounds, converged };
}