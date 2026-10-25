import type { NetworkLink, NetworkTopology } from "@/types/network";

export function getNeighbors(nodeId: string, links: NetworkLink[]) {
  return links.filter((l) => l.active && (l.source === nodeId || l.target === nodeId))
    .map((l) => ({ node: l.source === nodeId ? l.target : l.source, cost: l.cost, linkId: l.id }));
}

export function validateTopology(topology: NetworkTopology): string[] {
  const errors: string[] = [];
  const ids = new Set(topology.routers.map((r) => r.id));
  if (ids.size !== topology.routers.length) errors.push("Router IDs must be unique.");
  const linkIds = new Set<string>();
  for (const link of topology.links) {
    if (linkIds.has(link.id)) errors.push(`Duplicate link ID: ${link.id}`);
    linkIds.add(link.id);
    if (!ids.has(link.source) || !ids.has(link.target)) errors.push(`Link ${link.id} references an unknown router.`);
    if (link.source === link.target) errors.push(`Link ${link.id} cannot connect a router to itself.`);
    if (!Number.isFinite(link.cost) || link.cost < 0) errors.push(`Link ${link.id} must have a finite non-negative cost.`);
  }
  return errors;
}

export function routeCost(path: string[], links: NetworkLink[]): number {
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const link = links.find((l) => l.active &&
      ((l.source === path[i] && l.target === path[i + 1]) ||
       (l.target === path[i] && l.source === path[i + 1])));
    if (!link) return Infinity;
    total += link.cost;
  }
  return total;
}