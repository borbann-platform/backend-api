/*
========================================
File: frontend/features/map/components/filters-overlay.tsx
========================================
*/
"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Overlay } from "./overlay-system/overlay"; // Import local overlay system

export function FiltersOverlay() {
  const [area, setArea] = useState("< 30 km");
  const [timePeriod, setTimePeriod] = useState("All Time");
  const [propertyType, setPropertyType] = useState("House");
  const [priceRange, setPriceRange] = useState([5_000_000, 20_000_000]);
  const [activeTab, setActiveTab] = useState("basic");

  const handleApplyFilters = () => {
    console.log("DUMMY: Applying filters:", {
      area,
      timePeriod,
      propertyType,
      priceRange, // Include advanced filters state here
    });
    // In real app: trigger data refetch with these filters
  };

  return (
    <Overlay
      id="filters"
      title="Property Filters"
      icon={<Filter className="h-5 w-5" />}
      initialPosition="bottom-left"
      initialIsOpen={true}
      width="350px">
      <ScrollArea className="h-[calc(min(70vh,500px))]">
        {" "}
        {/* Scrollable content */}
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="area-radius" className="text-xs font-medium">
                    Area Radius
                  </Label>
                  <Select value={area} onValueChange={setArea}>
                    <SelectTrigger id="area-radius">
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
                  <Label htmlFor="time-period" className="text-xs font-medium">
                    Time Period
                  </Label>
                  <Select value={timePeriod} onValueChange={setTimePeriod}>
                    <SelectTrigger id="time-period">
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
                <Label htmlFor="property-type" className="text-xs font-medium">
                  Property Type
                </Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger id="property-type">
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
                    <Label htmlFor="price-range" className="text-xs font-medium">
                      Price Range
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {new Intl.NumberFormat("th-TH", { notation: "compact" }).format(priceRange[0])} -{" "}
                      {new Intl.NumberFormat("th-TH", { notation: "compact" }).format(priceRange[1])} ฿
                    </span>
                  </div>
                  <Slider
                    id="price-range"
                    value={priceRange}
                    min={1_000_000}
                    max={50_000_000}
                    step={100_000} // Finer step
                    onValueChange={setPriceRange}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Environmental Factors</Label>
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

          <Button className="mt-4 w-full" size="sm" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </ScrollArea>
    </Overlay>
  );
}
