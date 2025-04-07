/*
========================================
File: frontend/store/mapStore.ts (NEW - Dummy using Zustand)
========================================
*/
import { create } from "zustand";
import type { MapLocation, MapLayerConfig } from "@/features/map/types"; // Import types

interface MapState {
  currentLocation: MapLocation;
  zoomLevel: number;
  activeLayers: MapLayerConfig[];
  isLoading: boolean;
  setLocation: (location: MapLocation) => void;
  setZoom: (zoom: number) => void;
  toggleLayer: (layerId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useMapStore = create<MapState>((set) => ({
  // Initial State
  currentLocation: { lat: 13.7563, lng: 100.5018, name: "Bangkok" },
  zoomLevel: 12,
  activeLayers: [
    // Example initial layer
    { id: "base-tiles", name: "Base Map", url: "dummy-tile-url", type: "raster", visible: true },
  ],
  isLoading: false,

  // Actions
  setLocation: (location) => set({ currentLocation: location }),
  setZoom: (zoom) => set({ zoomLevel: zoom }),
  toggleLayer: (layerId) =>
    set((state) => ({
      activeLayers: state.activeLayers.map((layer) =>
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      ),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// Usage in a component:
// const { currentLocation, setLocation, isLoading } = useMapStore();
