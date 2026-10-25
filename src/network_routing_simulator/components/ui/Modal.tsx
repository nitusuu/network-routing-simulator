"use client";
import type { ReactNode } from "react";
export default function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return <div className="modal-backdrop"><section className="modal"><header><h2>{title}</h2><button className="button" onClick={onClose}>Close</button></header>{children}</section></div>;
}