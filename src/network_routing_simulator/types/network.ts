export type Router = { id: string; label: string };
export type NetworkLink = {
  id: string;
  source: string;
  target: string;
  cost: number;
  active: boolean;
  load?: number;
};
export type NetworkTopology = { routers: Router[]; links: NetworkLink[] };
export type RouteResult = {
  path: string[];
  totalCost: number;
  hops: number;
  reachable: boolean;
  calculationMs?: number;
};
export type RoutingEntry = {
  destination: string;
  nextHop: string | null;
  cost: number;
  reachable: boolean;
};
export type LogEvent = {
  id: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "error";
  message: string;
};