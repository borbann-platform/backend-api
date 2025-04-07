/*
========================================
File: frontend/hooks/use-mobile.tsx
========================================
*/
import * as React from "react";

const MOBILE_BREAKPOINT = 768; // Standard md breakpoint

export function useIsMobile(): boolean {
  // Initialize state based on current window size (or undefined if SSR)
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : undefined
  );

  React.useEffect(() => {
    // Ensure this runs only client-side
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Set initial state correctly after mount
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures this runs only once on mount and cleanup on unmount

  // Return false during SSR or initial client render before effect runs
  return isMobile ?? false;
}
