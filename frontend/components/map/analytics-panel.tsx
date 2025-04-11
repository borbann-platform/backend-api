import {
  BarChart2,
  RefreshCw,
  X,
  LineChart,
  Droplets,
  Wind,
  Newspaper,
  Clock,
  MessageCircle,
  Link,
  ChevronsUpDown,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useModelState } from "@/store/model-store";
import { useShallow } from "zustand/react/shallow";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

export function AnalyticsPanel({
  setShowAnalytics,
}: {
  setShowAnalytics: (show: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const { selectedModel, setSelectedModel } = useModelState(
    useShallow((state) => ({
      selectedModel: state.selectedModel,
      setSelectedModel: state.setSelectedModel,
      models: state.models,
    }))
  );
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="absolute top-20 right-4 w-96 max-h-[800px] bg-gray-800 overflow-y-auto z-20 map-overlay">
          <div className="map-overlay-header">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              <span className="font-medium">Analytics</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 flex items-center justify-center"
                onClick={() => setSelectedModel(selectedModel)}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowAnalytics(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="map-overlay-content">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Information in radius will be analyzed
              </p>
              <Badge variant="outline" className="text-xs">
                Using: {selectedModel}
              </Badge>
            </div>

            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <LineChart className="h-4 w-4 text-primary" />
                  <span className="font-medium">Area Price History</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">10,000,000 Baht</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Overall Price History of this area
                </p>

                <div className="h-20 w-full relative">
                  {/* Simple line chart simulation */}
                  <div className="absolute bottom-0 left-0 w-full h-px bg-border"></div>
                  <div className="absolute bottom-0 left-0 h-full flex items-end">
                    <div className="w-1/6 h-8 border-b-2 border-r-2 border-primary rounded-br"></div>
                    <div className="w-1/6 h-6 border-b-2 border-r-2 border-primary rounded-br"></div>
                    <div className="w-1/6 h-7 border-b-2 border-r-2 border-primary rounded-br"></div>
                    <div className="w-1/6 h-10 border-b-2 border-r-2 border-primary rounded-br"></div>
                    <div className="w-1/6 h-12 border-b-2 border-r-2 border-primary rounded-br"></div>
                    <div className="w-1/6 h-16 border-b-2 border-r-2 border-primary rounded-br"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <LineChart className="h-4 w-4 text-primary" />
                  <span className="font-medium">Price Prediction</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">15,000,000 Baht</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  The estimated price based on various factors.
                </p>

                <div className="h-20 w-full relative">
                  {/* Simple line chart simulation */}
                  <div className="absolute bottom-0 left-0 w-full h-px bg-border"></div>
                  <div className="absolute bottom-0 left-0 h-full flex items-end">
                    <div className="w-1/6 h-4 border-b-2 border-r-2 border-green-500 rounded-br"></div>
                    <div className="w-1/6 h-6 border-b-2 border-r-2 border-green-500 rounded-br"></div>
                    <div className="w-1/6 h-8 border-b-2 border-r-2 border-green-500 rounded-br"></div>
                    <div className="w-1/6 h-10 border-b-2 border-r-2 border-green-500 rounded-br"></div>
                    <div className="w-1/6 h-14 border-b-2 border-r-2 border-green-500 rounded-br"></div>
                    <div className="w-1/6 h-18 border-b-2 border-r-2 border-green-500 rounded-br"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <Card>
                <CardContent className="p-3">
                  <div className="flex flex-col items-center">
                    <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                    <span className="text-sm font-medium">Flood Factor</span>
                    <Badge className="mt-1 bg-amber-500">Moderate</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex flex-col items-center">
                    <Wind className="h-5 w-5 text-purple-500 mb-1" />
                    <span className="text-sm font-medium">Air Factor</span>
                    <Badge className="mt-1 bg-destructive">Bad</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Local News Section */}
            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2 flex items-center">
                <Newspaper className="h-4 w-4 mr-1 text-primary" />
                Local News
              </h4>
              <div className="space-y-2">
                <Card>
                  <CardContent className="p-3">
                    <h5 className="text-sm font-medium">
                      New BTS Extension Planned
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      The BTS Skytrain will be extended to cover more areas in
                      Sukhumvit by 2025.
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>2 days ago</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3">
                    <h5 className="text-sm font-medium">
                      Property Tax Changes
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      New property tax regulations will take effect next month
                      affecting luxury condominiums.
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>1 week ago</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="w-full gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat With AI
              </Button>
              <Link href="/price-prediction" className="flex-1">
                <Button className="w-full">Full Analysis</Button>
              </Link>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
