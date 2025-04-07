/*
========================================
File: frontend/types/api.ts (NEW - Dummy Shared Types)
========================================
*/

/** Generic API Response Structure */
export type APIResponse<T> = { success: true; data: T } | { success: false; error: string; details?: any };

/** Represents a Point of Interest (can be property, cafe, etc.) */
export interface PointOfInterest {
  id: string;
  lat: number;
  lng: number;
  name: string;
  type: string; // e.g., 'property', 'cafe', 'park', 'station'
  price?: number; // Optional: for properties
  rating?: number; // Optional: for amenities
  // Add other relevant shared fields
}

/** Basic Property Information */
export interface PropertySummary {
  id: string;
  address: string;
  lat: number;
  lng: number;
  price: number;
  type: string; // e.g., 'Condo', 'House'
  size?: number; // sqm
}

/** User representation */
export interface User {
  id: string;
  username: string;
  email: string;
  // Add roles or other relevant fields
}

// Add other globally shared types (e.g., PipelineStatus, DataSourceType if needed FE side)
