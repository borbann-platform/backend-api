"use client"

import { Bot, LineChart, Wind, Droplets, Sparkles, Maximize2, Minimize2, ArrowLeftRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart } from "./area-chart"
import { Button } from "@/components/ui/button"
import { useOverlayContext } from "./overlay-context"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AnalyticsPanelProps {
  onChatClick: () => void
}

export function AnalyticsPanel({ onChatClick }: AnalyticsPanelProps) {
  const { overlays, minimizeOverlay, maximizeOverlay, changePosition } = useOverlayContext()
  const isMinimized = overlays.analytics.minimized
  const position = overlays.analytics.position

  if (isMinimized) {
    return (
      <Card className="overlay-card overlay-minimized">
        <CardHeader className="p-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Analytics</CardTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => maximizeOverlay("analytics")}>
            <Maximize2 className="h-4 w-4" />
          </Button>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="overlay-card w-[350px] max-h-[80vh] overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Analytics
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0"
            onClick={() => changePosition("analytics", position === "right" ? "left" : "right")}
            title={`Move to ${position === "right" ? "left" : "right"}`}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => minimizeOverlay("analytics")}>
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <ScrollArea className="h-full max-h-[calc(min(80vh,var(--max-overlay-height))-60px)]">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <p className="text-xs text-muted-foreground">Information in radius will be analyzed</p>

            <Card className="bg-card/50 border border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-primary" />
                  Area Price History
                </CardTitle>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">10,000,000 Baht</div>
                </div>
                <p className="text-xs text-muted-foreground">Overall Price History of this area</p>
              </CardHeader>
              <CardContent className="pt-0">
                <AreaChart
                  data={[8500000, 9000000, 8800000, 9200000, 9500000, 9800000, 10000000]}
                  color="rgba(59, 130, 246, 0.5)"
                />
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-primary" />
                  Price Prediction
                </CardTitle>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">15,000,000 Baht</div>
                </div>
                <p className="text-xs text-muted-foreground">The estimated price based on various factors.</p>
              </CardHeader>
              <CardContent className="pt-0">
                <AreaChart
                  data={[10000000, 11000000, 12000000, 13000000, 14000000, 14500000, 15000000]}
                  color="rgba(16, 185, 129, 0.5)"
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/50 border border-border/50 shadow-sm">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    Flood Factor
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Moderate</span>
                  </div>
                </CardHeader>
              </Card>

              <Card className="bg-card/50 border border-border/50 shadow-sm">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Wind className="h-4 w-4 text-purple-500" />
                    Air Factor
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Bad</span>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <Card
              className="bg-card/50 border border-border/50 shadow-sm cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={onChatClick}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Bot className="h-4 w-4 text-teal-500" />
                  Chat With AI
                </CardTitle>
                <p className="text-xs text-muted-foreground">Want to ask specific question?</p>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}

