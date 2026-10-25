"use client";
import { useCallback, useMemo } from "react";
import { ReactFlow, Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState, type Connection, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import RouterNode from "./RouterNode";
import NetworkEdge from "./NetworkEdge";
import { useNetworkStore } from "@/store/networkStore";

export default function NetworkCanvas() {
  const topology = useNetworkStore((s) => s.topology);
  const route = useNetworkStore((s) => s.route);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const nodeTypes = useMemo(() => ({ router: RouterNode }), []);
  const edgeTypes = useMemo(() => ({ network: NetworkEdge }), []);

  // Derive the canvas from the shared graph; positions are deterministic for the current topology.
  const graphNodes = useMemo(() => topology.routers.map((r, i) => {
    const angle = (2 * Math.PI * i) / Math.max(topology.routers.length, 1);
    const onRoute = route?.path.includes(r.id);
    return { id: r.id, type: "router", position: { x: 280 + Math.cos(angle) * 220, y: 210 + Math.sin(angle) * 145 }, data: { label: r.id }, className: onRoute ? "route-node" : "" };
  }), [topology.routers, route]);
  const graphEdges = useMemo(() => topology.links.map((l) => {
    const onRoute = route?.path.some((id, i) => i < route.path.length - 1 && ((route.path[i] === l.source && route.path[i + 1] === l.target) || (route.path[i] === l.target && route.path[i + 1] === l.source)));
    return { id: l.id, source: l.source, target: l.target, type: "network", data: { cost: l.cost, active: l.active }, style: { stroke: onRoute ? "#31b987" : undefined, strokeWidth: onRoute ? 4 : 2 } };
  }), [topology.links, route]);

  const onConnect = useCallback((connection: Connection) => {
    if (connection.source && connection.target) {
      useNetworkStore.getState().addLink(connection.source, connection.target, 1);
    }
  }, []);

  return <div className="network-canvas"><ReactFlow nodes={graphNodes} edges={graphEdges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView><Background/><Controls/><MiniMap/></ReactFlow></div>;
}