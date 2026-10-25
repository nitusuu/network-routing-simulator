"use client";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Router as RouterIcon } from "lucide-react";
export default function RouterNode({ data, selected }: NodeProps) {
  const label = String((data as { label?: string }).label ?? "Router");
  return <div className={`router-node ${selected ? "selected" : ""}`}><Handle type="target" position={Position.Top}/><RouterIcon size={20}/><strong>{label}</strong><small>Network router</small><Handle type="source" position={Position.Bottom}/></div>;
}