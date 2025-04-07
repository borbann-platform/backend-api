/*
========================================
File: frontend/app/(routes)/map/page.tsx
========================================
*/
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Import common components
import { Button } from "@/components/ui/button";
// NOTE: ThemeProvider and ThemeController are in the root layout or a higher common layout now

// Import feature-specific components/contexts/types
import { MapContainer } from "@/features/map/components/map-container";
// MapSidebar might be part of the layout now, if shared, otherwise import here
// import { MapSidebar } from "@/features/map/components/map-sidebar";
import { MapHeader } from "@/features/map/components/map-header"; // Map specific header
import { OverlayProvider } from "@/features/map/components/overlay-system/overlay-context";
import { OverlayDock } from "@/features/map/components/overlay-system/overlay-dock";
import { AnalyticsOverlay } from "@/features/map/components/analytics-overlay";
import { FiltersOverlay } from "@/features/map/components/filters-overlay";
import { ChatOverlay } from "@/features/map/components/chat-overlay";
import type { MapLocation } from "@/features/map/types";

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation>({
    lat: 13.7563,
    lng: 100.5018,
    name: "Bangkok",
  });

  // Main page structure remains similar, but imports are updated
  return (
    // ThemeProvider/Controller likely moved to root layout
    // SidebarProvider might be moved too, depending on its scope
    // Assuming OverlayProvider is specific to this map page context
    <OverlayProvider>
      {/* The outer div with flex, h-screen etc. should be handled by the layout file or a common PageLayout */}
      <div className="flex h-full w-full flex-col overflow-hidden">
        {" "}
        {/* Simplified for page content */}
        <MapHeader />
        <div className="relative flex-1 overflow-hidden">
          <MapContainer selectedLocation={selectedLocation} />

          {/* Prediction model banner */}
          <div className="absolute left-1/2 top-4 -translate-x-1/2 z-10">
            <div className="flex items-center gap-2 rounded-lg bg-card/95 backdrop-blur-xs border border-border/50 px-4 py-2 shadow-lg">
              <div>
                <h3 className="font-medium">Price Prediction: 15,000,000 ฿</h3>
                <p className="text-xs text-muted-foreground">Based on our AI model analysis</p>
              </div>
              <Link href="/model-explanation">
                <Button size="sm" variant="outline" className="gap-1">
                  Explain <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Overlay System */}
          <AnalyticsOverlay />
          <FiltersOverlay />
          <ChatOverlay />
          <OverlayDock position="bottom" />
        </div>
      </div>
    </OverlayProvider>
  );
}
