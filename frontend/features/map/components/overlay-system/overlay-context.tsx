/*
========================================
File: frontend/features/map/components/overlay-system/overlay-context.tsx
========================================
*/
"use client";

import React, { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";

// Define overlay types and positions
export type OverlayId = string;
export type OverlayPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

// Interface for overlay state
export interface OverlayState {
  id: OverlayId;
  isOpen: boolean;
  isMinimized: boolean;
  position: OverlayPosition;
  zIndex: number;
  title: string;
  icon?: React.ReactNode;
}

// Interface for the overlay context
interface OverlayContextType {
  overlays: Record<OverlayId, OverlayState>;
  registerOverlay: (id: OverlayId, initialState: Partial<Omit<OverlayState, "id" | "zIndex">>) => void;
  unregisterOverlay: (id: OverlayId) => void;
  openOverlay: (id: OverlayId) => void;
  closeOverlay: (id: OverlayId) => void;
  toggleOverlay: (id: OverlayId) => void;
  minimizeOverlay: (id: OverlayId) => void;
  maximizeOverlay: (id: OverlayId) => void;
  setPosition: (id: OverlayId, position: OverlayPosition) => void;
  bringToFront: (id: OverlayId) => void;
  getNextZIndex: () => number;
}

// Create the context
const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

// Default values for overlay state
const defaultOverlayState: Omit<OverlayState, "id" | "title" | "icon"> = {
  isOpen: false,
  isMinimized: false,
  position: "bottom-right", // Default position
  zIndex: 10, // Starting z-index
};

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [overlays, setOverlays] = useState<Record<OverlayId, OverlayState>>({});
  const maxZIndexRef = useRef(10); // Start z-index from 10

  // Get the next z-index value
  const getNextZIndex = useCallback(() => {
    maxZIndexRef.current += 1;
    return maxZIndexRef.current;
  }, []);

  // Register a new overlay
  const registerOverlay = useCallback(
    (id: OverlayId, initialState: Partial<Omit<OverlayState, "id" | "zIndex">>) => {
      setOverlays((prev) => {
        if (prev[id]) {
          console.warn(`Overlay with id "${id}" already registered.`);
          return prev;
        }
        const newZIndex = initialState.isOpen ? getNextZIndex() : defaultOverlayState.zIndex;
        return {
          ...prev,
          [id]: {
            ...defaultOverlayState,
            id,
            title: id, // Default title to id
            ...initialState,
            zIndex: newZIndex, // Set initial z-index
          },
        };
      });
    },
    [getNextZIndex]
  );

  // Unregister an overlay
  const unregisterOverlay = useCallback((id: OverlayId) => {
    setOverlays((prev) => {
      const { [id]: _, ...rest } = prev; // Use destructuring to remove the key
      return rest;
    });
  }, []);

  // Open an overlay
  const openOverlay = useCallback(
    (id: OverlayId) => {
      setOverlays((prev) => {
        if (!prev[id] || prev[id].isOpen) return prev;
        return {
          ...prev,
          [id]: {
            ...prev[id],
            isOpen: true,
            isMinimized: false, // Ensure not minimized when opened
            zIndex: getNextZIndex(), // Bring to front
          },
        };
      });
    },
    [getNextZIndex]
  );

  // Close an overlay
  const closeOverlay = useCallback((id: OverlayId) => {
    setOverlays((prev) => {
      if (!prev[id] || !prev[id].isOpen) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], isOpen: false },
      };
    });
  }, []);

  // Toggle an overlay's open/closed state
  const toggleOverlay = useCallback(
    (id: OverlayId) => {
      setOverlays((prev) => {
        if (!prev[id]) return prev; // Don't toggle non-existent overlays

        const willBeOpen = !prev[id].isOpen;
        const newZIndex = willBeOpen ? getNextZIndex() : prev[id].zIndex; // Bring to front only if opening

        return {
          ...prev,
          [id]: {
            ...prev[id],
            isOpen: willBeOpen,
            isMinimized: willBeOpen ? false : prev[id].isMinimized, // Maximize when toggling open
            zIndex: newZIndex,
          },
        };
      });
    },
    [getNextZIndex]
  );

  // Minimize an overlay
  const minimizeOverlay = useCallback((id: OverlayId) => {
    setOverlays((prev) => {
      if (!prev[id] || !prev[id].isOpen || prev[id].isMinimized) return prev; // Only minimize open, non-minimized overlays
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true,
          // Optionally send to back when minimized: zIndex: defaultOverlayState.zIndex
        },
      };
    });
  }, []);

  // Maximize an overlay
  const maximizeOverlay = useCallback(
    (id: OverlayId) => {
      setOverlays((prev) => {
        if (!prev[id] || !prev[id].isOpen || !prev[id].isMinimized) return prev; // Only maximize minimized overlays
        return {
          ...prev,
          [id]: {
            ...prev[id],
            isMinimized: false,
            zIndex: getNextZIndex(), // Bring to front when maximized
          },
        };
      });
    },
    [getNextZIndex]
  );

  // Set the position of an overlay
  const setPosition = useCallback((id: OverlayId, position: OverlayPosition) => {
    setOverlays((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], position },
      };
    });
  }, []);

  // Bring an overlay to the front
  const bringToFront = useCallback(
    (id: OverlayId) => {
      setOverlays((prev) => {
        if (!prev[id] || !prev[id].isOpen) return prev; // Only bring open overlays to front
        // Avoid getting new zIndex if already on top
        if (prev[id].zIndex === maxZIndexRef.current) return prev;
        return {
          ...prev,
          [id]: { ...prev[id], zIndex: getNextZIndex() },
        };
      });
    },
    [getNextZIndex]
  );

  const value = {
    overlays,
    registerOverlay,
    unregisterOverlay,
    openOverlay,
    closeOverlay,
    toggleOverlay,
    minimizeOverlay,
    maximizeOverlay,
    setPosition,
    bringToFront,
    getNextZIndex,
  };

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}

// Hook to use the overlay context
export function useOverlay() {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
}
