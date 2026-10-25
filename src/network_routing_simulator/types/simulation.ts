import type { RouteResult } from "./network";
export type AlgorithmName = "Dijkstra" | "Distance Vector";
export type SimulationStatus = "idle" | "running" | "delivered" | "unreachable" | "paused";
export type SimulationResult = {
  source: string;
  destination: string;
  algorithm: AlgorithmName;
  route: RouteResult;
  timestamp: string;
};
export type AlgorithmTraceStep = {
  current: string;
  distances: Record<string, number>;
  previous: Record<string, string | null>;
  note: string;
};