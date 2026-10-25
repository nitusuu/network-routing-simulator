"use client";
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from "@xyflow/react";
export default function NetworkEdge(props: EdgeProps) {
  const [path, labelX, labelY] = getBezierPath(props);
  const data = props.data as { cost?: number; active?: boolean } | undefined;
  return <><BaseEdge path={path} markerEnd={props.markerEnd} style={{ stroke: data?.active === false ? "#e35d6a" : "#607a9a", strokeWidth: 2, strokeDasharray: data?.active === false ? "5 4" : undefined }}/><EdgeLabelRenderer><div className="edge-label" style={{ transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)` }}>{data?.active === false ? "DOWN · " : ""}{data?.cost ?? ""}</div></EdgeLabelRenderer></>;
}