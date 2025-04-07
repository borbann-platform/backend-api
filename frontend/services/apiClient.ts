/*
========================================
File: frontend/services/apiClient.ts (NEW - Dummy)
========================================
*/
import type { APIResponse } from "@/types/api"; // Import shared response type

// --- Dummy Auth Token ---
// In a real app, this would come from localStorage, context, or a state manager after login
const DUMMY_AUTH_TOKEN = "Bearer dummy-jwt-token-12345";

/**
 * Base function for making API requests.
 * Includes dummy authorization header.
 */
async function fetchApi<T = any>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
  const url = `${process.env.NEXT_PUBLIC_API_URL || "/api/v1"}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: DUMMY_AUTH_TOKEN, // Add dummy token here
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  console.log(`DUMMY API Client: Requesting ${config.method || "GET"} ${url}`);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 300 + 100));

  try {
    // --- Simulate API Responses ---
    // You can add more sophisticated simulation based on the endpoint
    if (endpoint.includes("error")) {
      console.warn(`DUMMY API Client: Simulating error for ${url}`);
      return { success: false, error: "Simulated server error" };
    }

    if (config.method === "POST" || config.method === "PUT" || config.method === "DELETE") {
      // Simulate simple success for modification requests
      console.log(`DUMMY API Client: Simulating success for ${config.method} ${url}`);
      return { success: true, data: { message: "Operation successful (simulated)" } as T };
    }

    // Simulate success for GET requests (return empty array or specific data based on endpoint)
    console.log(`DUMMY API Client: Simulating success for GET ${url}`);
    let responseData: any = [];
    if (endpoint.includes("/map/pois")) responseData = []; // Let feature api add dummy data
    if (endpoint.includes("/properties")) responseData = []; // Example
    // Add more specific endpoint data simulation if needed

    return { success: true, data: responseData as T };

    // --- Real Fetch Logic (keep commented for dummy) ---
    // const response = await fetch(url, config);
    //
    // if (!response.ok) {
    //   let errorData;
    //   try {
    //       errorData = await response.json();
    //   } catch (e) {
    //       errorData = { detail: response.statusText || "Unknown error" };
    //   }
    //   const errorMessage = errorData?.detail || `HTTP error ${response.status}`;
    //   console.error(`API Error (${response.status}) for ${url}:`, errorMessage);
    //   return { success: false, error: errorMessage, details: errorData };
    // }
    //
    // // Handle cases with no content
    // if (response.status === 204) {
    //     return { success: true, data: null as T };
    // }
    //
    // const data: T = await response.json();
    // return { success: true, data };
    // --- End Real Fetch Logic ---
  } catch (error) {
    console.error(`Network or other error for ${url}:`, error);
    const errorMessage = error instanceof Error ? error.message : "Network error or invalid response";
    return { success: false, error: errorMessage };
  }
}

// --- Convenience Methods ---
const apiClient = {
  get: <T = any>(endpoint: string, options?: RequestInit) => fetchApi<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, body: any, options?: RequestInit) =>
    fetchApi<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),

  put: <T = any>(endpoint: string, body: any, options?: RequestInit) =>
    fetchApi<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),

  delete: <T = any>(endpoint: string, options?: RequestInit) => fetchApi<T>(endpoint, { ...options, method: "DELETE" }),

  patch: <T = any>(endpoint: string, body: any, options?: RequestInit) =>
    fetchApi<T>(endpoint, { ...options, method: "PATCH", body: JSON.stringify(body) }),
};

export default apiClient;
