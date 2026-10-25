"use client";
import { useState } from "react";
import { advancePacket, createPacketJourney, type PacketJourney } from "@/lib/simulation/packetSimulator";
import { useNetworkStore } from "@/store/networkStore";
export default function PacketAnimation() {
  const route = useNetworkStore((s) => s.route);
  const addEvent = useNetworkStore((s) => s.addEvent);
  const [journey, setJourney] = useState<PacketJourney | null>(null);
  const start = () => {
    if (!route) return;
    const next = createPacketJourney(route);
    setJourney(next);
    addEvent(next.status === "unreachable" ? "Packet could not start: destination unreachable." : `Packet journey started at ${next.currentRouter}.`, next.status === "unreachable" ? "error" : "info");
  };
  const step = () => {
    if (!journey) return;
    const next = advancePacket(journey);
    setJourney(next);
    if (next.delivered) addEvent(`Packet delivered to ${next.currentRouter}.`, "success");
    else if (next.currentRouter) addEvent(`Packet moved to ${next.currentRouter}.`, "info");
  };
  return <section className="card"><h2>Packet journey</h2><p className="muted">This is simulated packet forwarding, not real network traffic.</p><div className="row-actions"><button className="button primary" onClick={start} disabled={!route}>Start / reset</button><button className="button" onClick={step} disabled={!journey || journey.delivered || journey.status === "unreachable"}>Next hop</button></div>{journey && <div className="packet-status"><strong>{journey.status.toUpperCase()}</strong><p>Path: {journey.route.join(" → ") || "No valid route"}</p><p>Current router: {journey.currentRouter ?? "—"} · Next hop: {journey.nextHop ?? "—"}</p><div className="packet-track">{journey.route.map((r, i) => <div key={r} className={`packet-node ${i <= journey.currentIndex ? "visited" : ""}`}>{r}</div>)}</div></div>}</section>;
}