/*
========================================
File: frontend/features/map/types/index.ts (NEW - Dummy)
========================================
*/
// Types specific only to the Map feature

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapLocation {
  lat: number;
  lng: number;
  name?: string;
  zoom?: number;
}

// Example type for map layer configuration
export interface MapLayerConfig {
  id: string;
  name: string;
  url: string; // e.g., Tile server URL template
  type: "raster" | "vector" | "geojson";
  visible: boolean;
  opacity?: number;
}

// Example type for data displayed on the map
export interface MapPropertyData {
  id: string;
  coordinates: [number, number]; // [lng, lat]
  price: number;
  type: string;
}

// Re-export relevant shared types if needed for convenience
// export type { PointOfInterest } from '@/types/api';
