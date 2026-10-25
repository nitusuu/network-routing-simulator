import type { NetworkLink, RouteResult, Router } from "@/types/network";
import { dijkstra } from "@/lib/algorithms/dijkstra";

export function toggleLink(links: NetworkLink[], linkId: string, active: boolean): NetworkLink[] {
  return links.map((l) => l.id === linkId ? { ...l, active } : l);
}

export function recoverRoute(
  routers: Router[], links: NetworkLink[], source: string, destination: string
): { previous: RouteResult; current: RouteResult; recovered: boolean } {
  const previous = dijkstra(routers, links.map((l) => ({ ...l, active: true })), source, destination);
  const current = dijkstra(routers, links, source, destination);
  return { previous, current, recovered: current.reachable };
}