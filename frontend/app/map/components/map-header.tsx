"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function MapHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4 bg-background">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground">
          Tools
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">Map</span>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Button variant="outline" size="sm" className="ml-2">
          Buy & Sell
        </Button>
        <Button variant="ghost" size="sm">
          Send & Receive
        </Button>
      </div>
    </header>
  )
}

