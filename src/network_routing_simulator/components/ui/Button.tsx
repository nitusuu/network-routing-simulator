"use client";
import type { ButtonHTMLAttributes, ReactNode } from "react";
export default function Button({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return <button className={`button ${className}`} {...props}>{children}</button>;
}