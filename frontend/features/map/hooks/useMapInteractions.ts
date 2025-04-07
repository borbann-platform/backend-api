/*
========================================
File: frontend/features/map/hooks/useMapInteractions.ts (NEW - Dummy)
========================================
*/
import { useState, useCallback } from "react";
import type { MapLocation } from "../types";

/**
 * DUMMY Hook: Manages map interaction state like selected markers, zoom level etc.
 */
export function useMapInteractions(initialLocation: MapLocation) {
  const [currentLocation, setCurrentLocation] = useState<MapLocation>(initialLocation);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const handleMapMove = useCallback((newLocation: MapLocation) => {
    console.log("DUMMY Hook: Map moved to", newLocation);
    setCurrentLocation(newLocation);
  }, []);

  const handleMarkerClick = useCallback((markerId: string) => {
    console.log("DUMMY Hook: Marker clicked", markerId);
    setSelectedMarkerId(markerId);
    // Potentially fetch details for this marker via API
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedMarkerId(null);
  }, []);

  return {
    currentLocation,
    selectedMarkerId,
    handleMapMove,
    handleMarkerClick,
    clearSelection,
  };
}
