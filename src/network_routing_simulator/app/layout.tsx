import type { Metadata } from "next";
import "./globals.css";
import "@xyflow/react/dist/style.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "RouteLab | Network Routing Simulator",
  description: "Interactive educational network routing simulator."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="app-shell"><Sidebar/><main className="main-area"><Header/><PageContainer>{children}</PageContainer></main></div></body></html>;
}