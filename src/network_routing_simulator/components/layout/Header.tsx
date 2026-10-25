"use client";
import { usePathname } from "next/navigation";
const names: Record<string, string> = { "/": "Dashboard", "/topology": "Topology editor", "/simulator": "Route simulator", "/routing-tables": "Routing tables", "/analytics": "Analytics", "/scenarios": "Scenario lab" };
export default function Header() {
  const path = usePathname();
  return <header className="topbar"><div><p className="eyebrow">NETWORK LAB / SIMULATION WORKSPACE</p><h1>{names[path] ?? "Network simulator"}</h1></div><span className="status-pill"><span className="status-dot"/> Simulation ready</span></header>;
}