/*
========================================
File: frontend/features/map/components/map-header.tsx
========================================
*/
"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle"; // Import from common

export function MapHeader() {
  // Add any map-specific header logic here if needed
  return (
    <header className="flex h-14 items-center justify-between border-b px-4 bg-background flex-shrink-0">
      {/* Breadcrumbs or Title */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground">
          {" "}
          {/* Example link */}
          Tools
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">Map</span>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="outline" size="sm" className="ml-2">
          Dummy Action 1
        </Button>
        <Button variant="ghost" size="sm">
          Dummy Action 2
        </Button>
      </div>
    </header>
  );
}
