/*
========================================
File: frontend/features/map/api/mapApi.ts
========================================
*/
import apiClient from "@/services/apiClient";
import type { APIResponse, PointOfInterest } from "@/types/api"; // Shared types
import type { MapBounds } from "../types"; // Feature-specific types

interface FetchPOIsParams {
  bounds: MapBounds;
  filters?: Record<string, any>;
}

/**
 * DUMMY: Fetches Points of Interest based on map bounds and filters.
 */
export async function fetchPointsOfInterest(
  params: FetchPOIsParams
): Promise<APIResponse<PointOfInterest[]>> {
  console.log("DUMMY API: Fetching POIs with params:", params);

  // Simulate building query parameters
  const queryParams = new URLSearchParams({
    north: params.bounds.north.toString(),
    south: params.bounds.south.toString(),
    east: params.bounds.east.toString(),
    west: params.bounds.west.toString(),
  });
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.set(key, String(value));
      }
    });
  }

  // Use the dummy apiClient
  const response = await apiClient.get<PointOfInterest[]>(`/map/pois?${queryParams.toString()}`);

  if (response.success) {
    // Simulate adding more data if needed for testing
    const dummyData: PointOfInterest[] = [
      { id: "poi1", lat: params.bounds.north - 0.01, lng: params.bounds.west + 0.01, name: "Dummy Cafe", type: "cafe" },
      { id: "poi2", lat: params.bounds.south + 0.01, lng: params.bounds.east - 0.01, name: "Dummy Park", type: "park" },
      ...(response.data || []) // Include data if apiClient simulation provides it
    ];
     return { success: true, data: dummyData };
  } else {
    return response; // Forward the error response
  }
}

// Add other map-related API functions here
export async function fetchMapAnalytics(bounds: MapBounds): Promise<APIResponse<any>> {
    console.log("DUMMY API: Fetching Map Analytics with params:", bounds);
    // Simulate building query parameters
    const queryParams = new URLSearchParams({
        north: bounds.north.toString(),
        south: bounds.south.toString(),
        east: bounds.east.toString(),
        west: bounds.west.toString(),
      });
    return apiClient.get(`/map/analytics?${queryParams.toString()}`);
}