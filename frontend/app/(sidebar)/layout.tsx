"use client";
import Sidebar from "@/components/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    );

}