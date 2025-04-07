/*
========================================
File: frontend/features/map/components/overlay-system/overlay-dock.tsx
========================================
*/
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useOverlay } from "./overlay-context";
import { cn } from "@/lib/utils";

interface OverlayDockProps {
  position?: "bottom" | "right" | "left" | "top"; // Added more positions
  className?: string;
}

export function OverlayDock({ position = "bottom", className }: OverlayDockProps) {
  const { overlays, toggleOverlay } = useOverlay();

  // Filter overlays that have icons defined (and potentially are registered)
  const dockableOverlays = Object.values(overlays).filter((overlay) => overlay.icon);

  // No need to render if there are no dockable overlays
  if (dockableOverlays.length === 0) return null;

  // Define CSS classes for different positions
  const positionClasses = {
    bottom: "fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-row gap-2 z-50",
    right: "fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50",
    left: "fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50",
    top: "fixed top-4 left-1/2 -translate-x-1/2 flex flex-row gap-2 z-50",
  };

  const tooltipSide = {
    bottom: "top",
    top: "bottom",
    left: "right",
    right: "left",
  } as const;

  return (
    <TooltipProvider>
      <div className={cn(positionClasses[position], className)}>
        {dockableOverlays.map((overlay) => (
          <div key={overlay.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={overlay.isOpen && !overlay.isMinimized ? "default" : "outline"} // Highlight if open and not minimized
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-md"
                  onClick={() => toggleOverlay(overlay.id)}>
                  {overlay.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent side={tooltipSide[position]}>
                {overlay.isOpen ? `Hide ${overlay.title}` : `Show ${overlay.title}`}
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
