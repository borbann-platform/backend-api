import { Filter, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function FiltersPanel({
  setShowFilters,
}: {
  setShowFilters: (show: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState("basic");
  const [priceRange, setPriceRange] = useState([5000000, 20000000]);
  const [radius, setRadius] = useState(30);
  return (
    <div className="absolute top-20 right-4 w-96 map-overlay z-20 bg-background p-5 rounded-md overflow-y-auto scrollbar-hide cursor-grab">
      <div className="map-overlay-header flex w-full">
        <div className="flex justify-between w-full items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <span className="font-medium">Property Filters</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowFilters(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs
        defaultValue="basic"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-4"
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="p-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Area Radius
              </label>
              <div className="flex items-center gap-2">
                <Slider
                  defaultValue={[30]}
                  max={50}
                  min={1}
                  step={1}
                  onValueChange={(value) => setRadius(value[0])}
                  className="flex-1"
                />
                <span className="text-sm w-16 text-right">{radius} km</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Time Period
              </label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="all">All Time</option>
                <option value="1m">Last Month</option>
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last Year</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Property Type
              </label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="any">Any Type</option>
                <option value="house">House</option>
                <option value="condo">Condominium</option>
                <option value="townhouse">Townhouse</option>
                <option value="land">Land</option>
              </select>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="p-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Price Range
              </label>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>฿{priceRange[0].toLocaleString()}</span>
                <span>฿{priceRange[1].toLocaleString()}</span>
              </div>
              <Slider
                defaultValue={[5000000, 20000000]}
                max={50000000}
                min={1000000}
                step={1000000}
                onValueChange={(value) => setPriceRange(value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium mb-1.5 block">
                Environmental Factors
              </label>

              <div className="flex items-center justify-between">
                <span className="text-sm">Low Flood Risk</span>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Good Air Quality</span>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Low Noise Pollution</span>
                <Switch />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Facilities Nearby
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="bts" className="h-4 w-4" />
                  <label htmlFor="bts" className="text-sm">
                    BTS/MRT Station
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="school" className="h-4 w-4" />
                  <label htmlFor="school" className="text-sm">
                    Schools
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="hospital" className="h-4 w-4" />
                  <label htmlFor="hospital" className="text-sm">
                    Hospitals
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="mall" className="h-4 w-4" />
                  <label htmlFor="mall" className="text-sm">
                    Shopping Malls
                  </label>
                </div>
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
