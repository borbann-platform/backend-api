/*
========================================
File: frontend/features/map/components/overlay-system/overlay.tsx
========================================
*/
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { X, Minimize2, Maximize2, Move } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useOverlay, type OverlayId, type OverlayPosition } from "./overlay-context";

interface OverlayProps {
  id: OverlayId;
  title: string;
  icon?: React.ReactNode;
  initialPosition?: OverlayPosition;
  initialIsOpen?: boolean;
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
  showMinimize?: boolean;
  width?: string;
  height?: string; // Can be 'auto' or specific value like '400px'
  maxHeight?: string; // e.g., '80vh'
}

export function Overlay({
  id,
  title,
  icon,
  initialPosition = "bottom-right",
  initialIsOpen = false,
  className,
  children,
  onClose,
  showMinimize = true,
  width = "350px",
  height = "auto",
  maxHeight = "80vh", // Default max height
}: OverlayProps) {
  const {
    overlays,
    registerOverlay,
    unregisterOverlay,
    closeOverlay,
    minimizeOverlay,
    maximizeOverlay,
    bringToFront,
    // Add setPosition if dragging is implemented
  } = useOverlay();

  const overlayRef = useRef<HTMLDivElement>(null);
  // State for dragging logic (Optional, basic example commented out)
  // const [isDragging, setIsDragging] = useState(false);
  // const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Register overlay on mount
  useEffect(() => {
    registerOverlay(id, {
      title,
      icon,
      position: initialPosition,
      isOpen: initialIsOpen,
      // Add initial zIndex if needed, otherwise context handles it
    });

    // Unregister on unmount
    return () => unregisterOverlay(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, registerOverlay, unregisterOverlay]); // Only run once on mount/unmount

  // Get the current state of this overlay
  const overlay = overlays[id];

  // --- Optional Dragging Logic ---
  // const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!overlayRef.current) return;
  //   bringToFront(id);
  //   setIsDragging(true);
  //   const rect = overlayRef.current.getBoundingClientRect();
  //   setOffset({
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top,
  //   });
  //   // Prevent text selection during drag
  //   e.preventDefault();
  // }, [bringToFront, id]);

  // const handleMouseMove = useCallback((e: MouseEvent) => {
  //   if (!isDragging || !overlayRef.current) return;
  //   overlayRef.current.style.left = `${e.clientX - offset.x}px`;
  //   overlayRef.current.style.top = `${e.clientY - offset.y}px`;
  //   // Remove fixed positioning classes if dragging manually
  //   overlayRef.current.classList.remove(...Object.values(positionClasses));
  // }, [isDragging, offset]);

  // const handleMouseUp = useCallback(() => {
  //   if (isDragging) {
  //     setIsDragging(false);
  //     // Optional: Snap to edge or update position state in context
  //   }
  // }, [isDragging]);

  // useEffect(() => {
  //   if (isDragging) {
  //     window.addEventListener("mousemove", handleMouseMove);
  //     window.addEventListener("mouseup", handleMouseUp);
  //   } else {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //   }
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, [isDragging, handleMouseMove, handleMouseUp]);
  // --- End Optional Dragging Logic ---

  // If the overlay isn't registered yet or isn't open, don't render anything
  if (!overlay || !overlay.isOpen) return null;

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering bringToFront if clicking close
    closeOverlay(id);
    if (onClose) onClose();
  };

  const handleMinimizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeOverlay(id);
  };

  const handleMaximizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    maximizeOverlay(id);
  };

  const handleHeaderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    bringToFront(id);
    // handleMouseDown(e); // Uncomment if implementing dragging
  };

  // Define position classes based on the current state
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  // Render minimized state in the dock (handled by OverlayDock now)
  if (overlay.isMinimized) {
    // Minimized state is now handled by the OverlayDock component based on context state
    // This component only renders the full overlay or nothing.
    return null;
  }

  // Render full overlay
  return (
    <div
      ref={overlayRef}
      className={cn(
        "fixed z-10", // z-index is managed by inline style
        positionClasses[overlay.position], // Apply position classes
        // Add transition for position changes if needed: 'transition-all duration-300 ease-out'
        className
      )}
      style={{ zIndex: overlay.zIndex }} // Apply dynamic z-index
      onClick={() => bringToFront(id)} // Bring to front on any click within the overlay
      aria-labelledby={`${id}-title`}
      role="dialog" // Use appropriate role
    >
      <Card
        className={cn(
          "shadow-lg bg-card/95 backdrop-blur-sm border border-border/50 overflow-hidden flex flex-col", // Added flex flex-col
          className
        )}
        style={{
          width,
          height, // Use height directly
          maxHeight, // Use maxHeight
          maxWidth: "calc(100vw - 32px)", // Prevent overlay exceeding viewport width
        }}>
        {/* Make header draggable */}
        <CardHeader
          className="pb-2 flex flex-row items-center justify-between cursor-move flex-shrink-0" // Added flex-shrink-0
          //   onMouseDown={handleHeaderMouseDown} // Uncomment if implementing dragging
        >
          <CardTitle id={`${id}-title`} className="text-sm font-medium flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            {title}
            {/* <Move className="h-3 w-3 text-muted-foreground ml-1 cursor-move" /> */} {/* Optional move icon */}
          </CardTitle>
          <div className="flex items-center gap-1">
            {showMinimize && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0"
                onClick={handleMinimizeClick}
                title="Minimize">
                <Minimize2 className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={handleCloseClick} title="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        {/* Ensure content area takes remaining space and scrolls if needed */}
        <CardContent className="p-0 flex-1 min-h-0 overflow-auto">{children}</CardContent>
      </Card>
    </div>
  );
}
