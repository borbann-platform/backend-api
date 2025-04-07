/*
========================================
File: frontend/app/(routes)/model-explanation/page.tsx
========================================
*/
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
} from "lucide-react";

// Common UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
// Removed SidebarProvider & ThemeProvider - should be in root layout
// Removed MapSidebar - assuming it's not needed here or use a common one

// Feature-specific components
import { FeatureImportanceChart } from "@/features/model-explanation/components/feature-importance-chart";
import { PriceComparisonChart } from "@/features/model-explanation/components/price-comparison-chart";

// Feature-specific API and types
import { fetchModelExplanation } from "@/features/model-explanation/api/explanationApi";
import type { ModelExplanationData, PropertyBaseDetails } from "@/features/model-explanation/types";

export default function ModelExplanationPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [explanationData, setExplanationData] = useState<ModelExplanationData | null>(null);

  // State for interactive elements based on fetched data
  const [propertySize, setPropertySize] = useState<number>(0);
  const [propertyAge, setPropertyAge] = useState<number>(0);

  // Fetch data on mount
  useEffect(() => {
    async function loadExplanation() {
      setIsLoading(true);
      // TODO: Get actual property ID from route params or state
      const propertyId = "dummy-prop-123";
      const response = await fetchModelExplanation(propertyId);
      if (response.success && response.data) {
        setExplanationData(response.data);
        // Initialize sliders with fetched data
        setPropertySize(response.data.propertyDetails.size);
        setPropertyAge(response.data.propertyDetails.age);
      } else {
        console.error("Failed to load model explanation:", response.error);
        // Handle error state in UI
      }
      setIsLoading(false);
    }
    loadExplanation();
  }, []);

  // Stepper configuration
  const steps = [
    { id: 1, title: "Property Details", icon: Home },
    { id: 2, title: "Feature Analysis", icon: Ruler },
    { id: 3, title: "Market Comparison", icon: Building },
    { id: 4, title: "Environmental Factors", icon: Droplets },
    { id: 5, title: "Final Prediction", icon: Coins },
  ];

  // Calculate adjusted price based on slider interaction
  const calculateAdjustedPrice = () => {
    if (!explanationData) return 0;
    // Simple formula for demonstration - refine with actual logic if possible
    const basePrice = explanationData.propertyDetails.predictedPrice;
    const baseSize = explanationData.propertyDetails.size;
    const baseAge = explanationData.propertyDetails.age;

    const sizeImpact = (propertySize - baseSize) * 50000; // 50,000 THB per sqm diff
    const ageImpact = (baseAge - propertyAge) * 200000; // 200,000 THB per year newer

    return basePrice + sizeImpact + ageImpact;
  };

  const adjustedPrice = explanationData ? calculateAdjustedPrice() : 0;

  // Loading State UI
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-hidden p-6">
        <div className="mx-auto w-full max-w-7xl">
          <Skeleton className="h-10 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-8" />
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-2 w-full mb-8" />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State UI
  if (!explanationData) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <p className="text-destructive">Failed to load model explanation.</p>
        <Link href="/map">
          <Button variant="link" className="mt-4">
            Back to Map
          </Button>
        </Link>
      </div>
    );
  }

  // Main Content UI
  const { propertyDetails, features, similarProperties, environmentalFactors, confidence, priceRange } =
    explanationData;

  return (
    // Assuming ThemeProvider is in the root layout
    // Assuming SidebarProvider and a common sidebar are in root layout or parent layout
    <div className="flex flex-1 flex-col overflow-hidden">
      {" "}
      {/* Adjusted for page content */}
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b px-4 bg-background shrink-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/map" className="hover:text-foreground">
            Map
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">Price Prediction Model</span>
        </div>
        {/* Add any specific header actions if needed */}
      </header>
      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        {" "}
        {/* Make content area scrollable */}
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
                  onClick={() => setActiveStep(step.id)}>
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
            {/* --- Left Column: Property Details & Interaction --- */}
            <div className="space-y-6 md:sticky md:top-6">
              {" "}
              {/* Make left column sticky */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                  <CardDescription>{propertyDetails.address}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {/* Dynamically display details */}
                  <DetailRow label="Type" value={propertyDetails.type} />
                  <DetailRow label="Size" value={`${propertySize} sqm`} />
                  {propertyDetails.bedrooms && <DetailRow label="Bedrooms" value={propertyDetails.bedrooms} />}
                  {propertyDetails.bathrooms && <DetailRow label="Bathrooms" value={propertyDetails.bathrooms} />}
                  <DetailRow label="Age" value={`${propertyAge} years`} />
                  {propertyDetails.floor && <DetailRow label="Floor" value={propertyDetails.floor} />}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Adjust Parameters</CardTitle>
                  <CardDescription>See how changes affect the prediction</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Size Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="prop-size-slider" className="text-sm font-medium">
                        Property Size
                      </Label>
                      <span className="text-sm text-muted-foreground">{propertySize} sqm</span>
                    </div>
                    <Slider
                      id="prop-size-slider"
                      value={[propertySize]}
                      min={50} // Example range
                      max={300} // Example range
                      step={5}
                      onValueChange={(value) => setPropertySize(value[0])}
                    />
                  </div>
                  {/* Age Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="prop-age-slider" className="text-sm font-medium">
                        Property Age
                      </Label>
                      <span className="text-sm text-muted-foreground">{propertyAge} years</span>
                    </div>
                    <Slider
                      id="prop-age-slider"
                      value={[propertyAge]}
                      min={0} // Example range
                      max={50} // Example range
                      step={1}
                      onValueChange={(value) => setPropertyAge(value[0])}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted-foreground">Adjusted Price</span>
                      <span className="text-xl font-bold">{formatCurrency(adjustedPrice)}</span>
                    </div>
                    {/* Show difference */}
                    {propertyDetails.predictedPrice !== adjustedPrice && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {adjustedPrice > propertyDetails.predictedPrice ? "↑" : "↓"}
                        {Math.abs(adjustedPrice - propertyDetails.predictedPrice).toLocaleString()} THB from original
                      </div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* --- Right Column: Step Content --- */}
            <div className="md:col-span-2 space-y-6">
              {activeStep === 1 && <Step1Content propertyDetails={propertyDetails} setActiveStep={setActiveStep} />}
              {activeStep === 2 && <Step2Content features={features} setActiveStep={setActiveStep} />}
              {activeStep === 3 && (
                <Step3Content
                  property={propertyDetails}
                  comparisons={similarProperties}
                  setActiveStep={setActiveStep}
                />
              )}
              {activeStep === 4 && <Step4Content factors={environmentalFactors} setActiveStep={setActiveStep} />}
              {activeStep === 5 && (
                <Step5Content
                  predictedPrice={adjustedPrice}
                  confidence={confidence}
                  priceRange={priceRange}
                  setActiveStep={setActiveStep}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components for Steps ---

function DetailRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Step 1 Component
function Step1Content({
  propertyDetails,
  setActiveStep,
}: {
  propertyDetails: PropertyBaseDetails;
  setActiveStep: (step: number) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Overview</CardTitle>
        <CardDescription>Basic information used in our prediction model</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            Our AI model begins by analyzing the core attributes of your property. These fundamental characteristics
            form the baseline for our prediction.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={Home}
              title="Property Type"
              description={`${propertyDetails.type} properties in this area have specific market dynamics`}
            />
            <InfoCard
              icon={Ruler}
              title="Size & Layout"
              description={`${propertyDetails.size} sqm${
                propertyDetails.bedrooms ? ` with ${propertyDetails.bedrooms} beds` : ""
              }${propertyDetails.bathrooms ? ` and ${propertyDetails.bathrooms} baths` : ""}`}
            />
            <InfoCard
              icon={Calendar}
              title="Property Age"
              description={`Built ${propertyDetails.age} years ago, affecting depreciation calculations`}
            />
            {propertyDetails.floor && (
              <InfoCard
                icon={Building}
                title="Floor & View"
                description={`Located on floor ${propertyDetails.floor}, impacting value`}
              />
            )}
          </div>
        </div>
      </CardContent>
      <StepFooter onNext={() => setActiveStep(2)} />
    </Card>
  );
}

// Step 2 Component
function Step2Content({
  features,
  setActiveStep,
}: {
  features: ModelExplanationData["features"];
  setActiveStep: (step: number) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Analysis</CardTitle>
        <CardDescription>How different features impact the predicted price</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p>
            Our model analyzes various features and determines how each contributes to the price prediction. Below is a
            breakdown of the most important factors.
          </p>
          <div className="h-[300px]">
            <FeatureImportanceChart features={features} />
          </div>
          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.name} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{feature.name}</span>
                  <span
                    className={`text-sm font-semibold ${
                      feature.impact === "positive"
                        ? "text-green-600 dark:text-green-400"
                        : feature.impact === "negative"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}>
                    {feature.impact === "positive"
                      ? "↑ Positive"
                      : feature.impact === "negative"
                      ? "↓ Negative"
                      : "→ Neutral"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={feature.importance}
                    className="h-2"
                    aria-label={`${feature.name} importance ${feature.importance}%`}
                  />
                  <span className="text-sm text-muted-foreground">{feature.importance}%</span>
                </div>
                <p className="text-xs text-muted-foreground">{feature.value}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <StepFooter onPrev={() => setActiveStep(1)} onNext={() => setActiveStep(3)} />
    </Card>
  );
}

// Step 3 Component
function Step3Content({
  property,
  comparisons,
  setActiveStep,
}: {
  property: PropertyBaseDetails;
  comparisons: ModelExplanationData["similarProperties"];
  setActiveStep: (step: number) => void;
}) {
  // Prepare data for the chart, ensuring the main property is clearly labeled
  const chartProperty = {
    name: "Your Property",
    price: property.predictedPrice,
    size: property.size,
    age: property.age,
  };
  const chartComparisons = comparisons.map((p, i) => ({
    name: `Comp ${i + 1}`,
    address: p.address,
    price: p.price,
    size: p.size,
    age: p.age,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Comparison</CardTitle>
        <CardDescription>
          How your property compares to similar properties recently analyzed or sold in the area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p>
            We analyze recent data from similar properties to establish a baseline. This ensures our prediction aligns
            with current market conditions.
          </p>
          <div className="h-[300px]">
            <PriceComparisonChart property={chartProperty} comparisons={chartComparisons} />
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Similar Properties Details</h4>
            <div className="grid gap-4 md:grid-cols-3">
              {comparisons.map((p, index) => (
                <div key={index} className="rounded-lg border p-3 text-xs">
                  <div className="font-medium truncate" title={p.address}>
                    {p.address}
                  </div>
                  <div className="mt-1 text-muted-foreground">
                    {p.size} sqm, {p.age} years old
                  </div>
                  <div className="mt-2 font-bold">{formatCurrency(p.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <StepFooter onPrev={() => setActiveStep(2)} onNext={() => setActiveStep(4)} />
    </Card>
  );
}

// Step 4 Component
function Step4Content({
  factors,
  setActiveStep,
}: {
  factors: ModelExplanationData["environmentalFactors"];
  setActiveStep: (step: number) => void;
}) {
  const factorDetails = {
    floodRisk: {
      icon: Droplets,
      color: factors.floodRisk === "low" ? "green" : factors.floodRisk === "moderate" ? "yellow" : "red",
      text: "Historical data suggests this level of risk.",
    },
    airQuality: {
      icon: Wind,
      color: factors.airQuality === "good" ? "green" : factors.airQuality === "moderate" ? "yellow" : "red",
      text: "Compared to city average.",
    },
    noiseLevel: {
      icon: Sun,
      color: factors.noiseLevel === "low" ? "green" : factors.noiseLevel === "moderate" ? "yellow" : "red",
      text: "Based on proximity to major roads/sources.",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environmental & Location Factors</CardTitle>
        <CardDescription>How surrounding conditions and amenities affect value</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p>
            Environmental conditions and nearby amenities significantly impact desirability and value. Our model
            considers these external factors.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Environmental Factors */}
            <FactorCard title="Flood Risk" factor={factors.floodRisk} details={factorDetails.floodRisk} />
            <FactorCard title="Air Quality" factor={factors.airQuality} details={factorDetails.airQuality} />
            <FactorCard title="Noise Level" factor={factors.noiseLevel} details={factorDetails.noiseLevel} />
          </div>
          {/* Proximity Example */}
          <div className="space-y-2">
            <h4 className="font-medium">Proximity to Amenities</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <ProximityItem icon={Car} text="Public Transport: 300m" />
              <ProximityItem icon={School} text="Schools: 1.2km" />
              <ProximityItem icon={ShoppingBag} text="Shopping: 500m" />
              <ProximityItem icon={Building} text="Hospitals: 2.5km" />
            </div>
          </div>
        </div>
      </CardContent>
      <StepFooter onPrev={() => setActiveStep(3)} onNext={() => setActiveStep(5)} />
    </Card>
  );
}

// Step 5 Component
function Step5Content({
  predictedPrice,
  confidence,
  priceRange,
  setActiveStep,
}: {
  predictedPrice: number;
  confidence: number;
  priceRange: { lower: number; upper: number };
  setActiveStep: (step: number) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Final Prediction</CardTitle>
        <CardDescription>The AI-predicted price based on all analyzed factors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Price Box */}
          <div className="rounded-lg bg-muted p-6 text-center">
            <h3 className="text-lg font-medium text-muted-foreground">Predicted Price</h3>
            <div className="mt-2 text-4xl font-bold">{formatCurrency(predictedPrice)}</div>
            <div className="mt-2 text-sm text-muted-foreground">Confidence Level: {(confidence * 100).toFixed(0)}%</div>
          </div>
          {/* Price Range Box */}
          <div className="rounded-lg border p-4">
            <h4 className="font-medium flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" /> Price Range
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on our model's confidence, the likely market range is:
            </p>
            <div className="mt-3 flex justify-between text-sm">
              <div>
                <div className="font-medium">Lower Bound</div>
                <div className="text-muted-foreground">{formatCurrency(priceRange.lower)}</div>
              </div>
              <div className="text-center">
                <div className="font-medium">Prediction</div>
                <div className="text-primary font-bold">{formatCurrency(predictedPrice)}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">Upper Bound</div>
                <div className="text-muted-foreground">{formatCurrency(priceRange.upper)}</div>
              </div>
            </div>
          </div>
          {/* Summary */}
          <div className="space-y-2">
            <h4 className="font-medium">Summary of Factors</h4>
            <p className="text-sm text-muted-foreground">This prediction considers:</p>
            <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
              <li>Property characteristics (size, age, layout)</li>
              <li>Location and neighborhood profile</li>
              <li>Recent market trends and comparable sales</li>
              <li>Environmental factors and amenity access</li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setActiveStep(4)}>
          Previous
        </Button>
        <Link href="/map">
          <Button variant="default">Back to Map</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

// --- Sub-components for Steps ---
function InfoCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-3">
      <Icon className="mt-0.5 h-5 w-5 text-primary shrink-0" />
      <div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function FactorCard({
  title,
  factor,
  details,
}: {
  title: string;
  factor: string;
  details: { icon: React.ElementType; color: string; text: string };
}) {
  const Icon = details.icon;
  const colorClass = `bg-${details.color}-500`; // Requires Tailwind JIT or safelisting
  const textColorClass = `text-${details.color}-500`;

  return (
    <div className="flex flex-col items-center rounded-lg border p-4 text-center">
      <Icon className={`h-8 w-8 mb-2 ${textColorClass}`} />
      <h4 className="font-medium text-sm">{title}</h4>
      <div className={`mt-2 flex items-center gap-2`}>
        {/* Explicit colors might be safer than dynamic Tailwind classes */}
        <div
          className={`h-3 w-3 rounded-full`}
          style={{
            backgroundColor: details.color === "green" ? "#22c55e" : details.color === "yellow" ? "#eab308" : "#ef4444",
          }}></div>
        <span className="text-sm capitalize">{factor}</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{details.text}</p>
    </div>
  );
}

function ProximityItem({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border p-2 text-xs">
      <Icon className="h-4 w-4 text-primary shrink-0" />
      <div>{text}</div>
    </div>
  );
}

function StepFooter({ onPrev, onNext }: { onPrev?: () => void; onNext?: () => void }) {
  return (
    <CardFooter className="flex justify-between">
      {onPrev ? (
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
      ) : (
        <div></div>
      )}
      {onNext ? (
        <Button onClick={onNext}>
          Next Step <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <div></div>
      )}
    </CardFooter>
  );
}
