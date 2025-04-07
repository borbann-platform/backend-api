/* === src/types/user.ts === */
/**
 * User Profile and Authentication Types
 */

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string; // URL to the user's avatar image
  roles: UserRole[]; // Array of roles assigned to the user
  preferences?: UserPreferences; // User-specific settings
  isActive: boolean;
  lastLogin?: string; // ISO 8601 date string
  createdAt: string; // ISO 8601 date string
}

export type UserRole = "admin" | "analyst" | "viewer" | "data_manager"; // Example roles

export interface UserPreferences {
  theme?: "light" | "dark" | "system";
  defaultMapLocation?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  notifications?: {
    pipelineSuccess?: boolean;
    pipelineError?: boolean;
    newReports?: boolean;
  };
  // Add other user-specific preferences
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null; // The authentication token (e.g., JWT)
  isAuthenticated: boolean;
  isLoading: boolean; // Tracks loading state during auth checks/login/logout
  error: string | null; // Stores any authentication errors
}

// Type for login credentials
export interface LoginCredentials {
  emailOrUsername: string;
  password?: string; // Password might not be needed for SSO flows
}

// Type for the response after successful login
export interface LoginResponse {
  user: UserProfile;
  token: string;
  refreshToken?: string; // Optional refresh token
}
