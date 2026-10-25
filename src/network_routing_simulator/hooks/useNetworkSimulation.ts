"use client";
import { useNetworkStore } from "@/store/networkStore";

export function useNetworkSimulation() {
  const topology = useNetworkStore((s) => s.topology);
  const route = useNetworkStore((s) => s.route);
  const runRoute = useNetworkStore((s) => s.runRoute);
  const toggleLink = useNetworkStore((s) => s.toggleLink);
  const updateLinkCost = useNetworkStore((s) => s.updateLinkCost);
  return { topology, route, runRoute, toggleLink, updateLinkCost };
}