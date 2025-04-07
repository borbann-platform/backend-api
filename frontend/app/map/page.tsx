"use client"

import { useState } from "react"
import { MapContainer } from "./components/map-container"
import { MapSidebar } from "./components/map-sidebar"
import { MapHeader } from "./components/map-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { OverlayProvider } from "./components/overlay-system/overlay-context"
import { OverlayDock } from "./components/overlay-system/overlay-dock"
import { AnalyticsOverlay } from "./components/analytics-overlay"
import { FiltersOverlay } from "./components/filters-overlay"
import { ChatOverlay } from "./components/chat-overlay"
import { ThemeController } from "@/components/theme-controller"

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lng: number
    name?: string
  }>({
    lat: 13.7563,
    lng: 100.5018,
    name: "Bangkok",
  })

  return (
    <ThemeProvider defaultTheme="dark">
      <SidebarProvider>
        <OverlayProvider>
          <ThemeController defaultColorScheme="Blue">
            <div className="flex h-screen w-full overflow-hidden bg-background">
              <MapSidebar />
              <div className="flex flex-1 flex-col overflow-hidden">
                <MapHeader />
                <div className="relative flex-1 overflow-hidden">
                  <MapContainer selectedLocation={selectedLocation} />

                  {/* Prediction model banner */}
                  <div className="absolute left-1/2 top-4 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-2 rounded-lg bg-card/95 backdrop-blur-sm border border-border/50 px-4 py-2 shadow-lg">
                      <div>
                        <h3 className="font-medium">Price Prediction: 15,000,000 ฿</h3>
                        <p className="text-xs text-muted-foreground">Based on our AI model analysis</p>
                      </div>
                      <Link href="/model-explanation">
                        <Button size="sm" variant="outline" className="gap-1">
                          Explain <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Overlay System */}
                  <AnalyticsOverlay />
                  <FiltersOverlay />
                  <ChatOverlay />
                  <OverlayDock position="bottom" />
                </div>
              </div>
            </div>
          </ThemeController>
        </OverlayProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}

