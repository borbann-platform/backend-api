/*
========================================
File: frontend/features/map/components/map-container.tsx
========================================
*/
"use client";

import React, { useEffect, useRef } from "react";
import type { MapLocation } from "../types"; // Feature-specific type

interface MapContainerProps {
  selectedLocation: MapLocation;
}

export function MapContainer({ selectedLocation }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mapElement = mapRef.current;
    console.log("DUMMY MAP: Initializing/updating for:", selectedLocation);

    if (mapElement) {
      // Placeholder for actual map library integration (e.g., Leaflet, Mapbox GL JS, Google Maps API)
      mapElement.innerHTML = `
        <div style="
          width: 100%; height: 100%;
          background-image: url('/placeholder.svg?height=800&width=1200'); /* Using placeholder */
          background-size: cover;
          background-position: center;
          display: flex; align-items: center; justify-content: center;
          font-family: sans-serif; color: #555;
          border: 1px dashed #aaa;
          position: relative; /* Needed for marker positioning */
        ">
          Map Placeholder: Centered on ${selectedLocation.name || "location"} (${selectedLocation.lat.toFixed(
        4
      )}, ${selectedLocation.lng.toFixed(4)})
          <div style="
            position: absolute;
            left: 50%; top: 50%;
            transform: translate(-50%, -50%);
            width: 24px; height: 24px;
            border-radius: 50%;
            background-color: red;
            border: 4px solid rgba(255, 100, 100, 0.5);
            animation: pulse 1.5s infinite;
          "></div>
        </div>
        <style>
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
          }
        </style>
      `;
      // In a real app, you'd initialize the map library here, set view, add layers/markers.
    }

    // Cleanup function
    return () => {
      console.log("DUMMY MAP: Cleaning up map instance");
      if (mapElement) {
        mapElement.innerHTML = ""; // Clear placeholder
        // In a real app, you'd properly destroy the map instance here.
      }
    };
  }, [selectedLocation]); // Re-run effect if location changes

  return (
    <div ref={mapRef} className="absolute inset-0 h-full w-full bg-muted/20 dark:bg-muted/10">
      {/* The map library will render into this div */}
    </div>
  );
}
