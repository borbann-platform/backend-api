/* === src/services/apiClient.ts === */
/**
 * API Client - Dummy Implementation
 *
 * This provides a basic structure for making API calls.
 * - It includes an Authorization header in each request (assuming token-based auth).
 * - Replace `getAuthToken` with your actual token retrieval logic.
 * - Consider using libraries like axios or ky for more robust features in a real app.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1"; // Example API base URL

/**
 * Retrieves the authentication token.
 * Replace this with your actual implementation (e.g., from localStorage, context, state management).
 * @returns {string | null} The auth token or null if not found.
 */
const getAuthToken = (): string | null => {
  // Dummy implementation: Replace with your actual logic
  if (typeof window !== "undefined") {
    // Example: return localStorage.getItem("authToken");
    // For dummy purposes, returning a placeholder token
    return "dummy-auth-token-12345";
  }
  return null;
};

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>; // For query parameters
  /** If true, Content-Type header will not be set (e.g., for FormData) */
  skipContentType?: boolean;
}

/**
 * Generic fetch function for API calls.
 * @template T The expected response type.
 * @param {string} endpoint The API endpoint (e.g., '/users').
 * @param {FetchOptions} options Fetch options (method, body, headers, params).
 * @returns {Promise<T>} The response data.
 */
async function apiClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers: customHeaders, skipContentType, body, ...fetchOptions } = options;
  const token = getAuthToken();

  // Construct URL
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Ensure value exists
        queryParams.append(key, String(value));
      }
    });
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Prepare headers
  const headers = new Headers(customHeaders);

  if (!skipContentType && body && !(body instanceof FormData)) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Prepare body - Stringify JSON unless it's FormData
  let processedBody = body;
  if (body && headers.get("Content-Type") === "application/json" && typeof body !== "string") {
    processedBody = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      body: processedBody,
    });

    // Check for successful response
    if (!response.ok) {
      let errorData = { message: `HTTP error! status: ${response.status} ${response.statusText}` };
      try {
        // Try to parse specific error details from the API response
        const jsonError = await response.json();
        errorData = { ...errorData, ...jsonError };
      } catch (e) {
        // Ignore if the error response is not JSON
      }
      console.error("API Error:", errorData);
      throw new Error(errorData.message);
    }

    // Handle responses with no content (e.g., 204 No Content)
    if (response.status === 204) {
      // For 204, there's no body, return undefined or null as appropriate for T
      // Using 'as T' assumes the caller expects undefined/null for no content
      return undefined as T;
    }

    // Parse the JSON response body for other successful responses
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("API Client Fetch Error:", error);
    // Re-throw the error for handling by the calling code (e.g., React Query, component)
    throw error;
  }
}

// --- Specific HTTP Method Helpers ---

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions) => apiClient<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body: any, options?: FetchOptions) =>
    apiClient<T>(endpoint, { ...options, method: "POST", body }),

  put: <T>(endpoint: string, body: any, options?: FetchOptions) =>
    apiClient<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T>(endpoint: string, body: any, options?: FetchOptions) =>
    apiClient<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T>(endpoint: string, options?: FetchOptions) => apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};

export default api;
