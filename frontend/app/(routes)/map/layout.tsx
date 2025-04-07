/*
========================================
File: frontend/app/(routes)/map/layout.tsx
========================================
*/
import type React from "react";
// import { PageLayout } from "@/components/common/PageLayout"; // Example using a common layout

// This layout is specific to the map feature's route group
export default function MapFeatureLayout({ children }: { children: React.ReactNode }) {
  return (
    // <PageLayout className="flex flex-row"> {/* Example using common layout */}
    // The MapSidebar might be rendered here if it's part of the layout
    <div className="relative flex-1 h-full w-full">
      {" "}
      {/* Ensure content takes up space */}
      {children}
    </div>
    // </PageLayout>
  );
}
