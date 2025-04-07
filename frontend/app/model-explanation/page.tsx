"use client"

import { useState } from "react"
import {
  ChevronRight,
  Info,
  ArrowRight,
  Home,
  Building,
  Ruler,
  Calendar,
  Coins,
  Droplets,
  Wind,
  Sun,
  Car,
  School,
  ShoppingBag,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { FeatureImportanceChart } from "./components/feature-importance-chart"
import { PriceComparisonChart } from "./components/price-comparison-chart"
import { MapSidebar } from "../map/components/map-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default function ModelExplanationPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [propertySize, setPropertySize] = useState(150)
  const [propertyAge, setPropertyAge] = useState(5)

  // Sample data for the model explanation
  const propertyDetails = {
    address: "123 Sukhumvit Road, Bangkok",
    type: "Condominium",
    size: 150, // sqm
    bedrooms: 3,
    bathrooms: 2,
    age: 5, // years
    floor: 15,
    amenities: ["Swimming Pool", "Gym", "Security", "Parking"],
    predictedPrice: 15000000, // THB
    similarProperties: [
      { address: "125 Sukhumvit Road", price: 14500000, size: 145, age: 6 },
      { address: "130 Sukhumvit Road", price: 16200000, size: 160, age: 3 },
      { address: "118 Sukhumvit Road", price: 13800000, size: 140, age: 7 },
    ],
    features: [
      { name: "Location", importance: 35, value: "Prime Area", impact: "positive" },
      { name: "Size", importance: 25, value: "150 sqm", impact: "positive" },
      { name: "Age", importance: 15, value: "5 years", impact: "neutral" },
      { name: "Amenities", importance: 10, value: "4 amenities", impact: "positive" },
      { name: "Floor", importance: 8, value: "15th floor", impact: "positive" },
      { name: "Environmental Factors", importance: 7, value: "Low flood risk", impact: "positive" },
    ],
  }

  const steps = [
    {
      id: 1,
      title: "Property Details",
      description: "Basic information about the property",
      icon: Home,
    },
    {
      id: 2,
      title: "Feature Analysis",
      description: "How each feature affects the price",
      icon: Ruler,
    },
    {
      id: 3,
      title: "Market Comparison",
      description: "Comparison with similar properties",
      icon: Building,
    },
    {
      id: 4,
      title: "Environmental Factors",
      description: "Impact of environmental conditions",
      icon: Droplets,
    },
    {
      id: 5,
      title: "Final Prediction",
      description: "The predicted price and confidence level",
      icon: Coins,
    },
  ]

  // Calculate a new price based on slider changes
  const calculateAdjustedPrice = () => {
    // Simple formula for demonstration
    const sizeImpact = (propertySize - 150) * 50000 // 50,000 THB per sqm
    const ageImpact = (5 - propertyAge) * 200000 // 200,000 THB per year newer

    return propertyDetails.predictedPrice + sizeImpact + ageImpact
  }

  const adjustedPrice = calculateAdjustedPrice()

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-background">
          <MapSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Header */}
            <header className="flex h-14 items-center justify-between border-b px-4 bg-background">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/map" className="hover:text-foreground">
                  Map
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-foreground">Price Prediction Model</span>
              </div>
            </header>

            {/* Main content */}
            <div className="flex flex-1 overflow-auto p-6">
              <div className="mx-auto w-full max-w-7xl">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold tracking-tight">Explainable Price Prediction Model</h1>
                  <p className="mt-2 text-muted-foreground">
                    Understand how our AI model predicts property prices and what factors influence the valuation.
                  </p>
                </div>

                {/* Steps navigation */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-4">
                    {steps.map((step) => (
                      <Button
                        key={step.id}
                        variant={activeStep === step.id ? "default" : "outline"}
                        className="flex items-center gap-2"
                        onClick={() => setActiveStep(step.id)}
                      >
                        <step.icon className="h-4 w-4" />
                        <span>{step.title}</span>
                      </Button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Progress value={(activeStep / steps.length) * 100} className="h-2" />
                  </div>
                </div>

                {/* Step content */}
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Left column - Property details */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Property Details</CardTitle>
                        <CardDescription>{propertyDetails.address}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Type</span>
                          <span className="font-medium">{propertyDetails.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Size</span>
                          <span className="font-medium">{propertySize} sqm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Bedrooms</span>
                          <span className="font-medium">{propertyDetails.bedrooms}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Bathrooms</span>
                          <span className="font-medium">{propertyDetails.bathrooms}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Age</span>
                          <span className="font-medium">{propertyAge} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Floor</span>
                          <span className="font-medium">{propertyDetails.floor}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Adjust Parameters</CardTitle>
                        <CardDescription>See how changes affect the prediction</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Property Size</label>
                            <span className="text-sm text-muted-foreground">{propertySize} sqm</span>
                          </div>
                          <Slider
                            value={[propertySize]}
                            min={50}
                            max={300}
                            step={5}
                            onValueChange={(value) => setPropertySize(value[0])}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Property Age</label>
                            <span className="text-sm text-muted-foreground">{propertyAge} years</span>
                          </div>
                          <Slider
                            value={[propertyAge]}
                            min={0}
                            max={20}
                            step={1}
                            onValueChange={(value) => setPropertyAge(value[0])}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="w-full">
                          <div className="flex justify-between items-baseline">
                            <span className="text-sm text-muted-foreground">Adjusted Price</span>
                            <span className="text-xl font-bold">
                              {new Intl.NumberFormat("th-TH", {
                                style: "currency",
                                currency: "THB",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(adjustedPrice)}
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {adjustedPrice > propertyDetails.predictedPrice ? "↑" : "↓"}
                            {Math.abs(adjustedPrice - propertyDetails.predictedPrice).toLocaleString()} THB from
                            original prediction
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>

                  {/* Middle column - Step content */}
                  <div className="md:col-span-2 space-y-6">
                    {activeStep === 1 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Property Overview</CardTitle>
                          <CardDescription>Basic information used in our prediction model</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p>
                              Our AI model begins by analyzing the core attributes of your property. These fundamental
                              characteristics form the baseline for our prediction.
                            </p>

                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="flex items-start gap-2 rounded-lg border p-3">
                                <Home className="mt-0.5 h-5 w-5 text-primary" />
                                <div>
                                  <h4 className="font-medium">Property Type</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {propertyDetails.type} properties in this area have specific market dynamics
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-2 rounded-lg border p-3">
                                <Ruler className="mt-0.5 h-5 w-5 text-primary" />
                                <div>
                                  <h4 className="font-medium">Size & Layout</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {propertyDetails.size} sqm with {propertyDetails.bedrooms} bedrooms and{" "}
                                    {propertyDetails.bathrooms} bathrooms
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-2 rounded-lg border p-3">
                                <Calendar className="mt-0.5 h-5 w-5 text-primary" />
                                <div>
                                  <h4 className="font-medium">Property Age</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Built {propertyDetails.age} years ago, affecting depreciation calculations
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-2 rounded-lg border p-3">
                                <Building className="mt-0.5 h-5 w-5 text-primary" />
                                <div>
                                  <h4 className="font-medium">Floor & View</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Located on floor {propertyDetails.floor}, impacting value and desirability
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={() => setActiveStep(2)} className="ml-auto">
                            Next Step <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    )}

                    {activeStep === 2 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Feature Analysis</CardTitle>
                          <CardDescription>How different features impact the predicted price</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <p>
                              Our model analyzes various features of your property and determines how each one
                              contributes to the final price prediction. Below is a breakdown of the most important
                              factors.
                            </p>

                            <div className="h-[300px]">
                              <FeatureImportanceChart features={propertyDetails.features} />
                            </div>

                            <div className="space-y-4">
                              {propertyDetails.features.map((feature) => (
                                <div key={feature.name} className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-sm font-medium">{feature.name}</span>
                                    <span
                                      className={`text-sm ${
                                        feature.impact === "positive"
                                          ? "text-green-500"
                                          : feature.impact === "negative"
                                            ? "text-red-500"
                                            : "text-yellow-500"
                                      }`}
                                    >
                                      {feature.impact === "positive"
                                        ? "↑ Positive"
                                        : feature.impact === "negative"
                                          ? "↓ Negative"
                                          : "→ Neutral"}{" "}
                                      Impact
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Progress value={feature.importance} className="h-2" />
                                    <span className="text-sm text-muted-foreground">{feature.importance}%</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{feature.value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" onClick={() => setActiveStep(1)}>
                            Previous
                          </Button>
                          <Button onClick={() => setActiveStep(3)}>
                            Next Step <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    )}

                    {activeStep === 3 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Market Comparison</CardTitle>
                          <CardDescription>
                            How your property compares to similar properties in the area
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <p>
                              Our model analyzes recent sales data from similar properties in your area to establish a
                              baseline for comparison. This helps ensure our prediction is aligned with current market
                              conditions.
                            </p>

                            <div className="h-[300px]">
                              <PriceComparisonChart
                                property={{
                                  name: "Your Property",
                                  price: propertyDetails.predictedPrice,
                                  size: propertyDetails.size,
                                  age: propertyDetails.age,
                                }}
                                comparisons={propertyDetails.similarProperties.map((p) => ({
                                  name: p.address.split(" ")[0],
                                  price: p.price,
                                  size: p.size,
                                  age: p.age,
                                }))}
                              />
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-medium">Similar Properties</h4>
                              <div className="grid gap-4 md:grid-cols-3">
                                {propertyDetails.similarProperties.map((property, index) => (
                                  <div key={index} className="rounded-lg border p-3">
                                    <div className="font-medium">{property.address}</div>
                                    <div className="mt-1 text-sm text-muted-foreground">
                                      {property.size} sqm, {property.age} years old
                                    </div>
                                    <div className="mt-2 font-bold">
                                      {new Intl.NumberFormat("th-TH", {
                                        style: "currency",
                                        currency: "THB",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                      }).format(property.price)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" onClick={() => setActiveStep(2)}>
                            Previous
                          </Button>
                          <Button onClick={() => setActiveStep(4)}>
                            Next Step <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    )}

                    {activeStep === 4 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Environmental Factors</CardTitle>
                          <CardDescription>How environmental conditions affect the property value</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <p>
                              Environmental factors can significantly impact property values. Our model considers
                              various environmental conditions to provide a more accurate prediction.
                            </p>

                            <div className="grid gap-4 md:grid-cols-3">
                              <div className="flex flex-col items-center rounded-lg border p-4">
                                <Droplets className="h-8 w-8 text-blue-500 mb-2" />
                                <h4 className="font-medium">Flood Risk</h4>
                                <div className="mt-2 flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                  <span>Moderate</span>
                                </div>
                                <p className="mt-2 text-xs text-center text-muted-foreground">
                                  Historical data shows moderate flood risk in this area
                                </p>
                              </div>

                              <div className="flex flex-col items-center rounded-lg border p-4">
                                <Wind className="h-8 w-8 text-purple-500 mb-2" />
                                <h4 className="font-medium">Air Quality</h4>
                                <div className="mt-2 flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                  <span>Poor</span>
                                </div>
                                <p className="mt-2 text-xs text-center text-muted-foreground">
                                  Air quality is below average, affecting property value
                                </p>
                              </div>

                              <div className="flex flex-col items-center rounded-lg border p-4">
                                <Sun className="h-8 w-8 text-amber-500 mb-2" />
                                <h4 className="font-medium">Noise Level</h4>
                                <div className="mt-2 flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                  <span>Low</span>
                                </div>
                                <p className="mt-2 text-xs text-center text-muted-foreground">
                                  The area has relatively low noise pollution
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-medium">Proximity to Amenities</h4>
                              <div className="grid gap-3 md:grid-cols-2">
                                <div className="flex items-center gap-2 rounded-lg border p-2">
                                  <Car className="h-4 w-4 text-primary" />
                                  <div className="text-sm">Public Transport: 300m</div>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border p-2">
                                  <School className="h-4 w-4 text-primary" />
                                  <div className="text-sm">Schools: 1.2km</div>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border p-2">
                                  <ShoppingBag className="h-4 w-4 text-primary" />
                                  <div className="text-sm">Shopping: 500m</div>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg border p-2">
                                  <Building className="h-4 w-4 text-primary" />
                                  <div className="text-sm">Hospitals: 2.5km</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" onClick={() => setActiveStep(3)}>
                            Previous
                          </Button>
                          <Button onClick={() => setActiveStep(5)}>
                            Next Step <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    )}

                    {activeStep === 5 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Final Prediction</CardTitle>
                          <CardDescription>The predicted price and confidence level</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="rounded-lg bg-muted p-6 text-center">
                              <h3 className="text-lg font-medium text-muted-foreground">Predicted Price</h3>
                              <div className="mt-2 text-4xl font-bold">
                                {new Intl.NumberFormat("th-TH", {
                                  style: "currency",
                                  currency: "THB",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                }).format(adjustedPrice)}
                              </div>
                              <div className="mt-2 text-sm text-muted-foreground">Confidence Level: 92%</div>
                            </div>

                            <div className="rounded-lg border p-4">
                              <h4 className="font-medium flex items-center gap-2">
                                <Info className="h-4 w-4 text-primary" />
                                Price Range
                              </h4>
                              <p className="mt-2 text-sm text-muted-foreground">
                                Based on our model's confidence level, the price could range between:
                              </p>
                              <div className="mt-3 flex justify-between text-sm">
                                <div>
                                  <div className="font-medium">Lower Bound</div>
                                  <div className="text-muted-foreground">
                                    {new Intl.NumberFormat("th-TH", {
                                      style: "currency",
                                      currency: "THB",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    }).format(adjustedPrice * 0.95)}
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium">Prediction</div>
                                  <div className="text-primary font-bold">
                                    {new Intl.NumberFormat("th-TH", {
                                      style: "currency",
                                      currency: "THB",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    }).format(adjustedPrice)}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">Upper Bound</div>
                                  <div className="text-muted-foreground">
                                    {new Intl.NumberFormat("th-TH", {
                                      style: "currency",
                                      currency: "THB",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    }).format(adjustedPrice * 1.05)}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-medium">Summary of Factors</h4>
                              <p className="text-sm text-muted-foreground">
                                The final prediction is based on a combination of all factors analyzed in previous
                                steps:
                              </p>
                              <ul className="mt-2 space-y-1 text-sm">
                                <li className="flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                  <span>Property characteristics (size, age, layout)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                  <span>Location and neighborhood analysis</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                  <span>Market trends and comparable properties</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                  <span>Environmental factors and amenities</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" onClick={() => setActiveStep(4)}>
                            Previous
                          </Button>
                          <Button variant="default" onClick={() => (window.location.href = "/map")}>
                            Back to Map
                          </Button>
                        </CardFooter>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}

