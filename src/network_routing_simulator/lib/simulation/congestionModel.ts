import type { NetworkLink } from "@/types/network";

// Congestion is represented by a user-adjustable cost proxy, not real measured traffic.
export function setLinkCost(links: NetworkLink[], linkId: string, cost: number): NetworkLink[] {
  if (!Number.isFinite(cost) || cost < 0) throw new Error("Link cost must be finite and non-negative.");
  return links.map((l) => l.id === linkId ? { ...l, cost } : l);
}

export function costFromLoad(baseCost: number, loadPercent: number): number {
  const load = Math.max(0, Math.min(100, loadPercent));
  return Math.max(0, baseCost * (1 + load / 100));
}