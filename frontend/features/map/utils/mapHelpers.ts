/*
========================================
File: frontend/features/map/utils/mapHelpers.ts (NEW - Dummy)
========================================
*/

import type { MapBounds, MapLocation } from "../types";

/**
 * DUMMY Utility: Calculates the center of given map bounds.
 */
export function calculateBoundsCenter(bounds: MapBounds): MapLocation {
  const centerLat = (bounds.north + bounds.south) / 2;
  const centerLng = (bounds.east + bounds.west) / 2;
  console.log("DUMMY Util: Calculating center for bounds:", bounds);
  return { lat: centerLat, lng: centerLng };
}

/**
 * DUMMY Utility: Formats coordinates for display.
 */
export function formatCoords(location: MapLocation): string {
  return `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`;
}

// Add other map-specific utility functions here
