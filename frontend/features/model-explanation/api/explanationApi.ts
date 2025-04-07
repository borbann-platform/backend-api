/*
========================================
File: frontend/features/model-explanation/api/explanationApi.ts (NEW - Dummy)
========================================
*/
import apiClient from "@/services/apiClient";
import type { APIResponse } from "@/types/api";
import type { ModelExplanationData, FeatureImportance } from "../types";

/**
 * DUMMY: Fetches data needed for the model explanation page.
 */
export async function fetchModelExplanation(propertyId: string): Promise<APIResponse<ModelExplanationData>> {
  console.log(`DUMMY API: Fetching model explanation for property ID: ${propertyId}`);
  // return apiClient.get<ModelExplanationData>(`/properties/${propertyId}/explanation`);

  // Simulate response
  await new Promise((resolve) => setTimeout(resolve, 700));
  const dummyExplanation: ModelExplanationData = {
    propertyDetails: {
      address: `Dummy Property ${propertyId}`,
      type: "Condo",
      size: 120,
      bedrooms: 2,
      bathrooms: 2,
      age: 3,
      floor: 10,
      amenities: ["Pool", "Gym"],
      predictedPrice: 12500000,
    },
    similarProperties: [
      { address: "Comp 1", price: 12000000, size: 115, age: 4 },
      { address: "Comp 2", price: 13500000, size: 130, age: 2 },
    ],
    features: [
      { name: "Location", importance: 40, value: "Near BTS", impact: "positive" },
      { name: "Size", importance: 30, value: "120 sqm", impact: "positive" },
      { name: "Age", importance: 15, value: "3 years", impact: "neutral" },
      { name: "Amenities", importance: 10, value: "Pool, Gym", impact: "positive" },
      { name: "Floor", importance: 5, value: "10th", impact: "positive" },
    ],
    environmentalFactors: {
      floodRisk: "low",
      airQuality: "moderate",
      noiseLevel: "low",
    },
    confidence: 0.91,
    priceRange: { lower: 11800000, upper: 13200000 },
  };
  return { success: true, data: dummyExplanation };
}
