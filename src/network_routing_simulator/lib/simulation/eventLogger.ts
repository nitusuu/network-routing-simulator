import type { LogEvent } from "@/types/network";

export function makeEvent(message: string, type: LogEvent["type"] = "info"): LogEvent {
  return { id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, timestamp: new Date().toISOString(), type, message };
}