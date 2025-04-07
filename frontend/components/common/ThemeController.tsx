/*
========================================
File: frontend/components/common/ThemeController.tsx
========================================
*/
"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop, Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define available color schemes (these affect CSS variables)
const colorSchemes = [
  { name: "Blue", primary: "221.2 83.2% 53.3%" }, // Default blue
  { name: "Green", primary: "142.1 76.2% 36.3%" },
  { name: "Purple", primary: "262.1 83.3% 57.8%" },
  { name: "Orange", primary: "24.6 95% 53.1%" },
  { name: "Teal", primary: "173 80.4% 40%" },
];

interface ThemeControllerProps {
  children: ReactNode;
  defaultColorScheme?: string;
}

export function ThemeController({ children, defaultColorScheme = "Blue" }: ThemeControllerProps) {
  const { setTheme, theme } = useTheme();
  const [colorScheme, setColorScheme] = useState(defaultColorScheme);
  // State for overlay boundaries removed, as overlay context now manages positioning/constraints.
  // const [overlayBoundaries, setOverlayBoundaries] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Update overlay boundaries - This logic might be better placed within the OverlayProvider
  // or removed if not strictly necessary for the controller's function.
  // Kept here for now as per original code structure, but consider moving it.
  // useEffect(() => {
  //   const updateBoundaries = () => {
  //     if (containerRef.current) {
  //       const width = containerRef.current.clientWidth;
  //       const height = containerRef.current.clientHeight;
  //       document.documentElement.style.setProperty("--max-overlay-width", `${width - 32}px`);
  //       document.documentElement.style.setProperty("--max-overlay-height", `${height - 32}px`);
  //     }
  //   };
  //   updateBoundaries();
  //   window.addEventListener("resize", updateBoundaries);
  //   return () => window.removeEventListener("resize", updateBoundaries);
  // }, []);

  // Apply color scheme by setting the '--primary' CSS variable
  useEffect(() => {
    const scheme = colorSchemes.find((s) => s.name === colorScheme);
    if (scheme) {
      document.documentElement.style.setProperty("--primary", scheme.primary);
      // You might need to set --ring as well if it depends on primary
      // document.documentElement.style.setProperty("--ring", scheme.primary);
    }
  }, [colorScheme]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden" data-theme-controller="true">
      {children}

      {/* Theme Controller UI */}
      <div className="fixed bottom-4 left-4 z-[999] flex items-center gap-2">
        {" "}
        {/* Ensure high z-index */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-md">
                    <Palette className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Theme Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      <span>Light</span>
                    </div>
                    {theme === "light" && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <span>Dark</span>
                    </div>
                    {theme === "dark" && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Laptop className="h-4 w-4" />
                      <span>System</span>
                    </div>
                    {theme === "system" && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Color Scheme</DropdownMenuLabel>

                  {colorSchemes.map((scheme) => (
                    <DropdownMenuItem
                      key={scheme.name}
                      onClick={() => setColorScheme(scheme.name)}
                      className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: `hsl(${scheme.primary})` }} />
                        <span>{scheme.name}</span>
                      </div>
                      {colorScheme === scheme.name && <Check className="h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Theme Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
