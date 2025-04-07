"use client"

import { LineChart, Wind, Droplets, Sparkles, Bot } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart } from "./area-chart"
import { Overlay } from "./overlay-system/overlay"
import { useOverlay } from "./overlay-system/overlay-context"

export function AnalyticsOverlay() {
  const { toggleOverlay } = useOverlay()

  const handleChatClick = () => {
    toggleOverlay("chat")
  }

  return (
    <Overlay
      id="analytics"
      title="Analytics"
      icon={<Sparkles className="h-5 w-5" />}
      initialPosition="top-right"
      initialIsOpen={true}
      width="350px"
    >
      <div className="h-[calc(min(70vh,600px))] overflow-auto">
        <div className="p-4">
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
              onClick={handleChatClick}
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
        </div>
      </div>
    </Overlay>
  )
}

