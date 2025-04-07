"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  ChevronRight,
  Home,
  BarChart2,
  LineChart,
  Droplets,
  Wind,
  Sun,
  MapPin,
  Bus,
  School,
  ShoppingBag,
  Building,
  ArrowRight,
  Info,
  FileText,
  RefreshCw,
  Check,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PricePredictionPage() {
  const [propertySize, setPropertySize] = useState(150);
  const [propertyAge, setPropertyAge] = useState(5);
  const [adjustedPrice, setAdjustedPrice] = useState(15000000);
  const [activeTab, setActiveTab] = useState("property-details");
  const [selectedModel, setSelectedModel] = useState("Standard ML Model v2.4");

  const models = [
    "Standard ML Model v2.4",
    "Enhanced Neural Network v1.8",
    "Geospatial Regression v3.1",
    "Time Series Forecast v2.0",
    "Custom Model (User #1242)",
  ];

  const handleSizeChange = (value: number[]) => {
    setPropertySize(value[0]);
    // Simple calculation for demo purposes
    const newPrice = 15000000 + (value[0] - 150) * 50000;
    setAdjustedPrice(newPrice);
  };

  const handleAgeChange = (value: number[]) => {
    setPropertyAge(value[0]);
    // Simple calculation for demo purposes
    const newPrice = 15000000 - (value[0] - 5) * 200000;
    setAdjustedPrice(newPrice);
  };

  const handleGenerateReport = () => {
    // In a real implementation, this would generate and download a PDF
    alert("Generating PDF report with the selected model: " + selectedModel);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <Link href="/maps" className="hover:text-foreground transition-colors">
          Map
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-foreground">Price Prediction Model</span>
      </div>

      <div className="flex justify-between items-center">
        <PageHeader
          title="Explainable Price Prediction Model"
          description="Understand how our AI model predicts property prices and what factors influence the valuation."
        />

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <BarChart2 className="h-4 w-4" />
                {selectedModel}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px]">
              {models.map((model) => (
                <DropdownMenuItem
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className="flex items-center gap-2">
                  {model === selectedModel && <Check className="h-4 w-4 text-primary" />}
                  <span className={model === selectedModel ? "font-medium" : ""}>{model}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem>
                <Link href="/models" className="flex items-center w-full">
                  <span className="text-primary">Manage Models...</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="gap-2" onClick={() => setSelectedModel(selectedModel)}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="property-details" className="mt-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="property-details" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Property Details</span>
          </TabsTrigger>
          <TabsTrigger value="feature-analysis" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Feature Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="market-comparison" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Market Comparison</span>
          </TabsTrigger>
          <TabsTrigger value="environmental-factors" className="flex items-center gap-2">
            <Wind className="h-4 w-4" />
            <span>Environmental Factors</span>
          </TabsTrigger>
          <TabsTrigger value="final-prediction" className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            <span>Final Prediction</span>
          </TabsTrigger>
        </TabsList>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
                <CardDescription>123 Sukhumvit Road, Bangkok</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">Condominium</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-medium">{propertySize} sqm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Bedrooms</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Bathrooms</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Age</span>
                    <span className="font-medium">{propertyAge} years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Floor</span>
                    <span className="font-medium">15</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Adjust Parameters</CardTitle>
                <CardDescription>See how changes affect the prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Property Size</span>
                      <span className="text-sm text-muted-foreground">{propertySize} sqm</span>
                    </div>
                    <Slider
                      defaultValue={[150]}
                      max={300}
                      min={50}
                      step={10}
                      onValueChange={handleSizeChange}
                      className="py-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Property Age</span>
                      <span className="text-sm text-muted-foreground">{propertyAge} years</span>
                    </div>
                    <Slider
                      defaultValue={[5]}
                      max={20}
                      min={0}
                      step={1}
                      onValueChange={handleAgeChange}
                      className="py-2"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Adjusted Price</span>
                      <span className="text-xl font-bold">฿{adjustedPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {adjustedPrice > 15000000 ? "+" : ""}
                      {adjustedPrice - 15000000 === 0 ? "±0" : (adjustedPrice - 15000000).toLocaleString()} THB from
                      original prediction
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <TabsContent value="property-details" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Property Overview</CardTitle>
                  <CardDescription>Basic information used in our prediction model</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-6">
                    Our AI model begins by analyzing the core attributes of your property. These fundamental
                    characteristics form the baseline for our prediction.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Home className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Property Type</h4>
                            <p className="text-sm text-muted-foreground">
                              Condominium properties in this area have specific market dynamics
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <BarChart2 className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Size & Layout</h4>
                            <p className="text-sm text-muted-foreground">150 sqm with 3 bedrooms and 2 bathrooms</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Building className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Property Age</h4>
                            <p className="text-sm text-muted-foreground">
                              Built 5 years ago, affecting depreciation calculations
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Floor & View</h4>
                            <p className="text-sm text-muted-foreground">
                              Located on floor 15, impacting value and desirability
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button onClick={() => setActiveTab("feature-analysis")}>
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feature-analysis" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Analysis</CardTitle>
                  <CardDescription>How different features impact the predicted price</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-6">
                    Our model analyzes various features of your property and determines how each one contributes to the
                    final price prediction. Below is a breakdown of the most important factors.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="w-32 text-sm">Location</span>
                      <div className="flex-1 mx-4">
                        <Progress value={35} className="h-6 bg-muted" indicatorClassName="bg-emerald-500" />
                      </div>
                      <span className="w-12 text-right text-sm">+35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="w-32 text-sm">Size</span>
                      <div className="flex-1 mx-4">
                        <Progress value={25} className="h-6 bg-muted" indicatorClassName="bg-emerald-500" />
                      </div>
                      <span className="w-12 text-right text-sm">+25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="w-32 text-sm">Age</span>
                      <div className="flex-1 mx-4">
                        <Progress value={15} className="h-6 bg-muted" indicatorClassName="bg-red-500" />
                      </div>
                      <span className="w-12 text-right text-sm">-15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="w-32 text-sm">Amenities</span>
                      <div className="flex-1 mx-4">
                        <Progress value={10} className="h-6 bg-muted" indicatorClassName="bg-emerald-500" />
                      </div>
                      <span className="w-12 text-right text-sm">+10%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="w-32 text-sm">Floor</span>
                      <div className="flex-1 mx-4">
                        <Progress value={8} className="h-6 bg-muted" indicatorClassName="bg-emerald-500" />
                      </div>
                      <span className="w-12 text-right text-sm">+8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="w-32 text-sm">Air Quality</span>
                      <div className="flex-1 mx-4">
                        <Progress value={7} className="h-6 bg-muted" indicatorClassName="bg-red-500" />
                      </div>
                      <span className="w-12 text-right text-sm">-7%</span>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg border mb-6">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Key Insights</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                          <li>Location is the strongest factor, contributing +35% to the price</li>
                          <li>The property's size (150 sqm) positively impacts the valuation</li>
                          <li>The age of the property (5 years) has a moderate negative impact (-15%)</li>
                          <li>Poor air quality in the area reduces the value by 7%</li>
                          <li>High floor (15) adds a premium of 8% to the property value</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setActiveTab("market-comparison")}>
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="market-comparison" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Market Comparison</CardTitle>
                  <CardDescription>How your property compares to similar properties in the area</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-6">
                    Our model analyzes comparable properties in the same area to provide context for your property's
                    valuation. This helps ensure the prediction is aligned with current market conditions.
                  </p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-2 text-left text-sm font-medium">Property</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Size</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Bedrooms</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Age</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Floor</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
                          <th className="px-4 py-2 text-left text-sm font-medium">Price/sqm</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr className="bg-primary/5 font-medium">
                          <td className="px-4 py-2 text-sm">Your Property</td>
                          <td className="px-4 py-2 text-sm">150 sqm</td>
                          <td className="px-4 py-2 text-sm">3</td>
                          <td className="px-4 py-2 text-sm">5 years</td>
                          <td className="px-4 py-2 text-sm">15</td>
                          <td className="px-4 py-2 text-sm">฿15,000,000</td>
                          <td className="px-4 py-2 text-sm">฿100,000</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">Comp #1</td>
                          <td className="px-4 py-2 text-sm">145 sqm</td>
                          <td className="px-4 py-2 text-sm">3</td>
                          <td className="px-4 py-2 text-sm">4 years</td>
                          <td className="px-4 py-2 text-sm">12</td>
                          <td className="px-4 py-2 text-sm">฿14,500,000</td>
                          <td className="px-4 py-2 text-sm">฿100,000</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">Comp #2</td>
                          <td className="px-4 py-2 text-sm">160 sqm</td>
                          <td className="px-4 py-2 text-sm">3</td>
                          <td className="px-4 py-2 text-sm">6 years</td>
                          <td className="px-4 py-2 text-sm">18</td>
                          <td className="px-4 py-2 text-sm">฿15,800,000</td>
                          <td className="px-4 py-2 text-sm">฿98,750</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">Comp #3</td>
                          <td className="px-4 py-2 text-sm">140 sqm</td>
                          <td className="px-4 py-2 text-sm">2</td>
                          <td className="px-4 py-2 text-sm">3 years</td>
                          <td className="px-4 py-2 text-sm">10</td>
                          <td className="px-4 py-2 text-sm">฿13,800,000</td>
                          <td className="px-4 py-2 text-sm">฿98,571</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm">Comp #4</td>
                          <td className="px-4 py-2 text-sm">155 sqm</td>
                          <td className="px-4 py-2 text-sm">3</td>
                          <td className="px-4 py-2 text-sm">7 years</td>
                          <td className="px-4 py-2 text-sm">14</td>
                          <td className="px-4 py-2 text-sm">฿14,700,000</td>
                          <td className="px-4 py-2 text-sm">฿94,839</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg border mb-6">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Market Analysis</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                          <li>Your property's predicted price is in line with comparable properties</li>
                          <li>The price per square meter (฿100,000) is slightly above the area average</li>
                          <li>Properties on higher floors command a 3-5% premium in this building</li>
                          <li>Recent sales in this area show a stable market with slight appreciation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setActiveTab("environmental-factors")}>
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="environmental-factors" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Factors</CardTitle>
                  <CardDescription>How environmental conditions affect the property value</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-6">
                    Environmental factors can significantly impact property values. Our model considers various
                    environmental conditions to provide a more accurate prediction.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <Droplets className="h-8 w-8 text-blue-500 mb-2" />
                          <h4 className="font-medium">Flood Risk</h4>
                          <Badge className="mt-2 bg-amber-500">Moderate</Badge>
                          <p className="text-xs text-muted-foreground mt-2">
                            Historical data shows moderate flood risk in this area
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <Wind className="h-8 w-8 text-purple-500 mb-2" />
                          <h4 className="font-medium">Air Quality</h4>
                          <Badge className="mt-2 bg-destructive">Poor</Badge>
                          <p className="text-xs text-muted-foreground mt-2">
                            Air quality is below average, affecting property value
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <Sun className="h-8 w-8 text-amber-500 mb-2" />
                          <h4 className="font-medium">Noise Level</h4>
                          <Badge className="mt-2 bg-green-500">Low</Badge>
                          <p className="text-xs text-muted-foreground mt-2">
                            The area has relatively low noise pollution
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <h4 className="font-medium text-lg mb-3">Proximity to Amenities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4 flex items-center gap-3">
                        <Bus className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">Public Transport</h4>
                          <p className="text-sm text-muted-foreground">300m</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 flex items-center gap-3">
                        <School className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">Schools</h4>
                          <p className="text-sm text-muted-foreground">1.2km</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 flex items-center gap-3">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">Shopping</h4>
                          <p className="text-sm text-muted-foreground">500m</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 flex items-center gap-3">
                        <Building className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">Hospitals</h4>
                          <p className="text-sm text-muted-foreground">2.5km</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg border mb-6">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Environmental Impact Analysis</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                          <li>The moderate flood risk reduces the property value by approximately 3%</li>
                          <li>Poor air quality has a negative impact of about 7% on the valuation</li>
                          <li>Excellent proximity to public transport adds a 4% premium</li>
                          <li>Overall, environmental factors have a -6% net impact on the property value</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setActiveTab("final-prediction")}>
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="final-prediction" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Final Prediction</CardTitle>
                  <CardDescription>The predicted price and confidence level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 p-6 rounded-lg text-center mb-6">
                    <h3 className="text-lg text-muted-foreground mb-1">Predicted Price</h3>
                    <div className="text-4xl font-bold mb-2">฿15,000,000</div>
                    <p className="text-sm text-muted-foreground">Confidence Level: 92%</p>
                  </div>

                  <Card className="mb-6">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base">Price Range</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Based on our model's confidence level, the price could range between:
                      </p>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Lower Bound</h4>
                          <p className="font-medium">฿14,250,000</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Prediction</h4>
                          <p className="font-bold text-primary">฿15,000,000</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Upper Bound</h4>
                          <p className="font-medium">฿15,750,000</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <h3 className="text-lg font-medium mb-3">Summary of Factors</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The final prediction is based on a combination of all factors analyzed in previous steps:
                  </p>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-500 flex-shrink-0 mt-0.5"></div>
                      <span>Property characteristics (size, age, layout)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-500 flex-shrink-0 mt-0.5"></div>
                      <span>Location and neighborhood analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-amber-500 flex-shrink-0 mt-0.5"></div>
                      <span>Market trends and comparable properties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-red-500 flex-shrink-0 mt-0.5"></div>
                      <span>Environmental factors and amenities</span>
                    </li>
                  </ul>

                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("environmental-factors")}>
                      Previous
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-2" onClick={handleGenerateReport}>
                        <FileText className="h-4 w-4" />
                        Generate PDF Report
                      </Button>
                      <Button variant="default" asChild>
                        <Link href="/maps">Back to Map</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
