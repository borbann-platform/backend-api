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
  registerOverlay: (id: OverlayId, initialState: Partial<OverlayState>) => void;
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
const defaultOverlayState: Omit<OverlayState, "id" | "title"> = {
  isOpen: false,
  isMinimized: false,
  position: "bottom-right",
  zIndex: 10,
};

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [overlays, setOverlays] = useState<Record<OverlayId, OverlayState>>({});
  const maxZIndexRef = useRef(10);

  // Get the next z-index value using a ref so it doesn't trigger re-renders
  const getNextZIndex = useCallback(() => {
    maxZIndexRef.current++;
    return maxZIndexRef.current;
  }, []);

  // Register a new overlay
  const registerOverlay = useCallback((id: OverlayId, initialState: Partial<OverlayState>) => {
    setOverlays((prev) => {
      if (prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...defaultOverlayState,
          id,
          title: id,
          ...initialState,
        },
      };
    });
  }, []);

  // Unregister an overlay
  const unregisterOverlay = useCallback((id: OverlayId) => {
    setOverlays((prev) => {
      const newOverlays = { ...prev };
      delete newOverlays[id];
      return newOverlays;
    });
  }, []);

  // Open an overlay
  const openOverlay = useCallback(
    (id: OverlayId) => {
      setOverlays((prev) => {
        if (!prev[id]) return prev;
        return {
          ...prev,
          [id]: {
            ...prev[id],
            isOpen: true,
            isMinimized: false,
            zIndex: getNextZIndex(),
          },
        };
      });
    },
    [getNextZIndex]
  );

  // Close an overlay
  const closeOverlay = useCallback((id: OverlayId) => {
    setOverlays((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
        },
      };
    });
  }, []);

  // Toggle an overlay
  const toggleOverlay = useCallback(
    (id: OverlayId) => {
      setOverlays((prev) => {
        if (!prev[id]) return prev;
        const newState = {
          ...prev[id],
          isOpen: !prev[id].isOpen,
        };
        if (newState.isOpen) {
          newState.isMinimized = false;
          newState.zIndex = getNextZIndex();
        }
        return {
          ...prev,
          [id]: newState,
        };
      });
    },
    [getNextZIndex]
  );

  // Minimize an overlay
  const minimizeOverlay = useCallback((id: OverlayId) => {
    setOverlays((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true,
        },
      };
    });
  }, []);

  // Maximize an overlay
  const maximizeOverlay = useCallback(
    (id: OverlayId) => {
      setOverlays((prev) => {
        if (!prev[id]) return prev;
        return {
          ...prev,
          [id]: {
            ...prev[id],
            isMinimized: false,
            zIndex: getNextZIndex(),
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
        [id]: {
          ...prev[id],
          position,
        },
      };
    });
  }, []);

  // Bring an overlay to the front
  const bringToFront = useCallback(
    (id: OverlayId) => {
      setOverlays((prev) => {
        if (!prev[id]) return prev;
        return {
          ...prev,
          [id]: {
            ...prev[id],
            zIndex: getNextZIndex(),
          },
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

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
}

