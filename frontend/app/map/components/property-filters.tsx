"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Minimize2, Maximize2 } from "lucide-react"
import { useOverlayContext } from "./overlay-context"
import { ScrollArea } from "@/components/ui/scroll-area"

export function PropertyFilters() {
  const { overlays, minimizeOverlay, maximizeOverlay } = useOverlayContext()
  const isMinimized = overlays.filters.minimized

  const [area, setArea] = useState("< 30 km")
  const [timePeriod, setTimePeriod] = useState("All Time")
  const [propertyType, setPropertyType] = useState("House")
  const [priceRange, setPriceRange] = useState([5000000, 20000000])
  const [activeTab, setActiveTab] = useState("basic")

  if (isMinimized) {
    return (
      <Card className="overlay-card overlay-minimized">
        <CardHeader className="p-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Filters</CardTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => maximizeOverlay("filters")}>
            <Maximize2 className="h-4 w-4" />
          </Button>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="overlay-card w-[350px] max-h-[80vh] overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Property Filters</CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => minimizeOverlay("filters")}>
          <Minimize2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <ScrollArea className="h-full max-h-[calc(min(80vh,var(--max-overlay-height))-60px)]">
        <CardContent className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Area Radius</label>
                  <Select value={area} onValueChange={setArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="< 10 km">{"< 10 km"}</SelectItem>
                      <SelectItem value="< 20 km">{"< 20 km"}</SelectItem>
                      <SelectItem value="< 30 km">{"< 30 km"}</SelectItem>
                      <SelectItem value="< 50 km">{"< 50 km"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Time Period</label>
                  <Select value={timePeriod} onValueChange={setTimePeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Last Month">Last Month</SelectItem>
                      <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                      <SelectItem value="Last Year">Last Year</SelectItem>
                      <SelectItem value="All Time">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Property Type</label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-medium">Price Range</label>
                    <span className="text-xs text-muted-foreground">
                      {new Intl.NumberFormat("th-TH", {
                        style: "currency",
                        currency: "THB",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(priceRange[0])}{" "}
                      -{" "}
                      {new Intl.NumberFormat("th-TH", {
                        style: "currency",
                        currency: "THB",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(priceRange[1])}
                    </span>
                  </div>
                  <Slider
                    value={priceRange}
                    min={1000000}
                    max={50000000}
                    step={1000000}
                    onValueChange={setPriceRange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium">Environmental Factors</label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="low-flood" className="text-xs">
                        Low Flood Risk
                      </Label>
                      <Switch id="low-flood" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="good-air" className="text-xs">
                        Good Air Quality
                      </Label>
                      <Switch id="good-air" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="low-noise" className="text-xs">
                        Low Noise Pollution
                      </Label>
                      <Switch id="low-noise" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button className="mt-4 w-full" size="sm">
            Apply Filters
          </Button>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}

