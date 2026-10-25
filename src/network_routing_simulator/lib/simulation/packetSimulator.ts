import type { RouteResult } from "@/types/network";

export type PacketJourney = {
  route: string[];
  currentIndex: number;
  currentRouter: string | null;
  nextHop: string | null;
  delivered: boolean;
  status: "ready" | "in-transit" | "delivered" | "unreachable";
};

export function createPacketJourney(route: RouteResult): PacketJourney {
  if (!route.reachable || route.path.length === 0) {
    return { route: [], currentIndex: 0, currentRouter: null, nextHop: null, delivered: false, status: "unreachable" };
  }
  return {
    route: route.path, currentIndex: 0, currentRouter: route.path[0],
    nextHop: route.path[1] ?? null, delivered: route.path.length === 1, status: route.path.length === 1 ? "delivered" : "ready"
  };
}

export function advancePacket(journey: PacketJourney): PacketJourney {
  if (journey.status === "unreachable" || journey.delivered) return journey;
  const nextIndex = Math.min(journey.currentIndex + 1, journey.route.length - 1);
  const delivered = nextIndex === journey.route.length - 1;
  return {
    ...journey, currentIndex: nextIndex, currentRouter: journey.route[nextIndex],
    nextHop: journey.route[nextIndex + 1] ?? null, delivered,
    status: delivered ? "delivered" : "in-transit"
  };
}