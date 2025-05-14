/* === src/types/api.ts === */
/**
 * General API Response Types
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiErrorResponse {
  message: string;
  details?: Record<string, any> | string[]; // Can be an object or array of strings
  code?: string; // Optional error code
}

/**
 * Represents a generic successful API operation, possibly with no specific data.
 */
export interface SuccessResponse {
  success: boolean;
  message?: string;
}

/**
 * Property Data Types
 */
export type PropertyType =
  | "Condominium"
  | "House"
  | "Townhouse"
  | "Land"
  | "Apartment"
  | "Other";
export type OwnershipType = "Freehold" | "Leasehold";
export type FurnishingStatus =
  | "Unfurnished"
  | "Partly Furnished"
  | "Fully Furnished";

export interface PriceHistoryEntry {
  date: string; // Consider using Date object after parsing
  price: number;
}

export interface MarketTrendData {
  areaGrowthPercentage: number;
  similarPropertiesCount: number;
  averagePrice: number;
  averagePricePerSqm: number;
  priceTrend?: "Rising" | "Falling" | "Stable"; // Optional trend indicator
}

export interface EnvironmentalFactor {
  type: "Flood Risk" | "Air Quality" | "Noise Level";
  level: "Low" | "Moderate" | "High" | "Good" | "Fair" | "Poor"; // Adjust levels as needed
  details?: string;
}

export interface NearbyFacility {
  name: string;
  type: "Transport" | "Shopping" | "Park" | "Hospital" | "School" | "Other";
  distanceMeters: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: string; // e.g., 'THB', 'USD'
  location: {
    address: string;
    city: string;
    district?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
  };
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  propertyType: PropertyType;
  images: string[]; // Array of image URLs
  yearBuilt?: number;
  floorLevel?: number;
  totalFloors?: number;
  parkingSpaces?: number;
  furnishing: FurnishingStatus;
  ownership: OwnershipType;
  availabilityDate?: string; // Consider using Date object
  isPremium: boolean;
  features: string[];
  amenities: string[];
  priceHistory?: PriceHistoryEntry[];
  marketTrends?: MarketTrendData;
  environmentalFactors?: EnvironmentalFactor[];
  nearbyFacilities?: NearbyFacility[];
  agent?: {
    // Optional agent info
    id: string;
    name: string;
    contact: string;
  };
  dataSource?: string; // Origin of the data
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

/**
 * Data Pipeline Types
 */
export type PipelineStatus = "active" | "paused" | "error" | "idle" | "running";
export type SourceType = "Website" | "API" | "File Upload" | "Database";

export interface DataSource {
  id: string;
  name: string;
  type: SourceType;
  url?: string; // For Website/API
  lastUpdated: string;
  recordCount: number;
  status: "connected" | "error" | "pending";
}

export interface DataPipeline {
  id: string;
  name: string;
  description: string;
  status: PipelineStatus;
  lastRunAt: string | null;
  nextRunAt: string | null;
  runFrequency: string; // e.g., "Daily", "Hourly", "Manual"
  sources: DataSource[];
  totalRecords: number;
  aiPowered: boolean;
  errorDetails?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Model Types
 */
export type ModelType =
  | "Regression"
  | "Neural Network"
  | "Geospatial"
  | "Time Series"
  | "Ensemble"
  | "Classification";
export type ModelStatus =
  | "active"
  | "inactive"
  | "training"
  | "error"
  | "pending";

export interface Model {
  id: string;
  name: string;
  description?: string;
  type: ModelType;
  version: string;
  status: ModelStatus;
  isSystemModel: boolean; // Distinguishes system models from custom ones
  dataSourceId?: string; // ID of the DataPipeline used for training (if custom)
  dataSourceName?: string; // Name of the source for display
  hyperparameters: Record<string, string | number | boolean>;
  performanceMetrics?: Record<string, number>; // e.g., { accuracy: 0.92, mae: 150000 }
  lastTrainedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Map Related Types
 */
export interface MapLayer {
  id: string;
  name: string;
  type: "property" | "heatmap" | "environmental";
  isVisible: boolean;
  dataUrl?: string; // URL to fetch layer data
  style?: Record<string, any>; // Mapbox style properties
}

export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
}
