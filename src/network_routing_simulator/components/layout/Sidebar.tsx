"use client";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { Activity, ChartNoAxesCombined, LayoutDashboard, Network, Route as RouteIcon, TableProperties, FlaskConical } from "lucide-react";

const items: ReadonlyArray<{ href: Route; label: string; Icon: typeof LayoutDashboard }> = [
  { href: "/", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/topology", label: "Topology editor", Icon: Network },
  { href: "/simulator", label: "Route simulator", Icon: RouteIcon },
  { href: "/routing-tables", label: "Routing tables", Icon: TableProperties },
  { href: "/analytics", label: "Analytics", Icon: ChartNoAxesCombined },
  { href: "/scenarios", label: "Scenarios", Icon: FlaskConical }
];

export default function Sidebar() {
  const pathname = usePathname();
  return <aside className="sidebar"><Link href="/" className="brand"><Network size={24}/> <span>RouteLab</span></Link><nav>{items.map(({ href, label, Icon }) => <Link key={href} className={`nav-link ${pathname === href ? "active" : ""}`} href={href}><Icon size={18}/>{label}</Link>)}</nav><div className="sidebar-note"><Activity size={16}/> Educational network simulation</div></aside>;
}