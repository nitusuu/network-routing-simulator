import type { RouteResult } from "@/types/network";

export type MetricSnapshot = {
  source: string; destination: string; algorithm: string; path: string;
  routeCost: number | string; hops: number; calculationMs: number; reachable: boolean; timestamp: string;
};

export function snapshotMetrics(source: string, destination: string, algorithm: string, route: RouteResult): MetricSnapshot {
  return {
    source, destination, algorithm, path: route.path.join(" -> "),
    routeCost: route.reachable ? route.totalCost : "unreachable",
    hops: route.hops, calculationMs: route.calculationMs ?? 0,
    reachable: route.reachable, timestamp: new Date().toISOString()
  };
}

export function successRate(successes: number, attempts: number): number {
  return attempts === 0 ? 0 : (successes / attempts) * 100;
}