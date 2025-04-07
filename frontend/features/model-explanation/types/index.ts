/*
========================================
File: frontend/features/model-explanation/types/index.ts (NEW - Dummy)
========================================
*/

// Types specific to the Model Explanation feature

export interface FeatureImportance {
  name: string;
  importance: number; // e.g., percentage 0-100
  value: string | number; // The actual value for the property being explained
  impact: "positive" | "negative" | "neutral";
}

export interface ComparableProperty {
  address: string;
  price: number;
  size: number;
  age: number;
  // Add other relevant comparison fields if needed
}

export interface PropertyBaseDetails {
  address: string;
  type: string;
  size: number;
  bedrooms?: number;
  bathrooms?: number;
  age: number;
  floor?: number;
  amenities?: string[];
  predictedPrice: number;
}

export interface EnvironmentalFactors {
  floodRisk: "low" | "moderate" | "high" | "unknown";
  airQuality: "good" | "moderate" | "poor" | "unknown";
  noiseLevel: "low" | "moderate" | "high" | "unknown";
  // Add other factors like proximity scores etc.
}

export interface ModelExplanationData {
  propertyDetails: PropertyBaseDetails;
  similarProperties: ComparableProperty[];
  features: FeatureImportance[];
  environmentalFactors: EnvironmentalFactors;
  confidence: number; // e.g., 0.92 for 92%
  priceRange: { lower: number; upper: number };
}
