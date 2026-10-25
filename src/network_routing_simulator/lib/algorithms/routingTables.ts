import type { NetworkLink, Router, RoutingEntry } from "@/types/network";
import { dijkstra } from "./dijkstra";

export function buildRoutingTable(routers: Router[], links: NetworkLink[], source: string): RoutingEntry[] {
  return routers.map((destination) => {
    if (destination.id === source) return { destination: destination.id, nextHop: null, cost: 0, reachable: true };
    const result = dijkstra(routers, links, source, destination.id);
    return { destination: destination.id, nextHop: result.path[1] ?? null, cost: result.totalCost, reachable: result.reachable };
  });
}