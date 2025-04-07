/* === src/types/index.ts === */
// Barrel file for exporting shared types

export * from "./api";
export * from "./user";

// Example of another shared type definition
export interface SelectOption<T = string | number> {
  value: T;
  label: string;
  icon?: React.ComponentType<{ className?: string }>; // Optional icon component
  disabled?: boolean;
}

// Generic type for UI components requiring an icon
export interface IconProps {
  className?: string;
}

// Add other shared types as the application grows
// export * from './settings';
// export * from './notifications';
