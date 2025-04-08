"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Building,
  Bath,
  BedDouble,
  Share,
  ChevronRight,
  Info,
  Ruler,
  Clock,
  Star,
  Droplets,
  Wind,
  Sun,
  BarChart2,
  LineChart,
  Calendar,
  Download,
  FileText,
} from "lucide-react"
import Link from "next/link"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)

  // This would normally come from an API call using the ID
  const property = {
    id: params.id,
    title: "Modern Condominium in Sukhumvit",
    price: 15000000,
    location: "Sukhumvit Soi 24, Bangkok",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    type: "Condominium",
    description:
      "This stunning modern condominium is located in the heart of Sukhumvit, one of Bangkok's most vibrant neighborhoods. The property features 3 spacious bedrooms, 2 bathrooms, and a large living area with floor-to-ceiling windows offering panoramic city views. The unit comes fully furnished with high-end appliances and fixtures. The building amenities include a swimming pool, fitness center, sauna, and 24-hour security.",
    features: [
      "Floor-to-ceiling windows",
      "Fully furnished",
      "High-end appliances",
      "Marble countertops",
      "Hardwood floors",
      "Central air conditioning",
      "Walk-in closet",
      "Balcony with city view",
    ],
    amenities: [
      "Swimming pool",
      "Fitness center",
      "Sauna",
      "24-hour security",
      "Parking",
      "Garden",
      "Playground",
      "BBQ area",
    ],
    images: [
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
    ],
    yearBuilt: 2018,
    floorLevel: 15,
    totalFloors: 32,
    parkingSpaces: 1,
    furnished: "Fully Furnished",
    ownership: "Freehold",
    availableFrom: "Immediate",
    premium: true,
    priceHistory: [
      { date: "2018", price: 12000000 },
      { date: "2020", price: 13500000 },
      { date: "2022", price: 14800000 },
      { date: "2024", price: 15000000 },
    ],
    marketTrends: {
      areaGrowth: 5.2,
      similarProperties: 8,
      averagePrice: 14500000,
      pricePerSqm: 100000,
    },
    environmentalFactors: {
      floodRisk: "Moderate",
      airQuality: "Poor",
      noiseLevel: "Low",
    },
    nearbyFacilities: [
      { name: "BTS Phrom Phong Station", distance: 300 },
      { name: "EmQuartier Shopping Mall", distance: 500 },
      { name: "Benchasiri Park", distance: 700 },
      { name: "Samitivej Hospital", distance: 1200 },
    ],
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/properties" className="hover:text-foreground transition-colors">
          Properties
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-foreground">{property.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          {/* Property Images */}
          <div className="relative mb-6 rounded-lg overflow-hidden">
            <img
              src={property.images[0] || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button variant="secondary" size="sm" className="h-8 gap-1">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
              <Button variant="secondary" size="sm" className="h-8 gap-1">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
            </div>
            <div className="absolute top-4 left-4 flex gap-1">
              <Badge className="bg-primary">{property.type}</Badge>
              {property.premium && (
                <Badge className="bg-amber-500">
                  <Star className="h-3 w-3 mr-1" /> Premium
                </Badge>
              )}
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {property.images.map((image, index) => (
              <div key={index} className="rounded-md overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${property.title} - Image ${index + 1}`}
                  className="w-full h-24 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>

          {/* Property Details */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
              <h1 className="text-2xl font-semibold">{property.title}</h1>
              <div className="text-2xl font-bold">฿{property.price.toLocaleString()}</div>
            </div>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{property.location}</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center">
                <BedDouble className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <div className="font-medium">{property.bedrooms}</div>
                  <div className="text-xs text-muted-foreground">Bedrooms</div>
                </div>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <div className="font-medium">{property.bathrooms}</div>
                  <div className="text-xs text-muted-foreground">Bathrooms</div>
                </div>
              </div>
              <div className="flex items-center">
                <Ruler className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <div className="font-medium">{property.area} m²</div>
                  <div className="text-xs text-muted-foreground">Area</div>
                </div>
              </div>
              <div className="flex items-center">
                <Building className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <div className="font-medium">Floor {property.floorLevel}</div>
                  <div className="text-xs text-muted-foreground">of {property.totalFloors}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <div className="font-medium">{property.yearBuilt}</div>
                  <div className="text-xs text-muted-foreground">Year Built</div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="analytics">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-0">
                <p className="text-sm leading-relaxed mb-4">{property.description}</p>

                <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-6">
                  <div className="flex justify-between py-2 border-b text-sm">
                    <span className="text-muted-foreground">Property Type</span>
                    <span className="font-medium">{property.type}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm">
                    <span className="text-muted-foreground">Furnishing</span>
                    <span className="font-medium">{property.furnished}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm">
                    <span className="text-muted-foreground">Ownership</span>
                    <span className="font-medium">{property.ownership}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm">
                    <span className="text-muted-foreground">Available From</span>
                    <span className="font-medium">{property.availableFrom}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm">
                    <span className="text-muted-foreground">Parking Spaces</span>
                    <span className="font-medium">{property.parkingSpaces}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-0">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Property Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Building Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="mt-0">
                <div className="bg-muted h-[300px] rounded-lg flex items-center justify-center mb-4">
                  <Link href={`/maps?property=${property.id}`}>
                    <Button>View on Map</Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Nearby Facilities</h3>
                    <div className="space-y-2">
                      {property.nearbyFacilities.map((facility, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{facility.name}</span>
                          <span className="text-muted-foreground">{facility.distance}m</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Environmental Factors</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Droplets className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm">Flood Risk</span>
                        </div>
                        <Badge className="bg-amber-500">{property.environmentalFactors.floodRisk}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Wind className="h-4 w-4 text-purple-500 mr-2" />
                          <span className="text-sm">Air Quality</span>
                        </div>
                        <Badge className="bg-destructive">{property.environmentalFactors.airQuality}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Sun className="h-4 w-4 text-amber-500 mr-2" />
                          <span className="text-sm">Noise Level</span>
                        </div>
                        <Badge className="bg-green-500">{property.environmentalFactors.noiseLevel}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <BarChart2 className="h-4 w-4 mr-2 text-primary" />
                        Price Prediction
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-1">฿15,000,000</div>
                      <p className="text-sm text-muted-foreground mb-3">The estimated price based on various factors</p>

                      <Link href="/price-prediction">
                        <Button size="sm" className="gap-1">
                          <Info className="h-4 w-4" />
                          <span>View Detailed Analysis</span>
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <LineChart className="h-4 w-4 mr-2 text-primary" />
                        Market Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Area Price Trend</span>
                        <Badge className="bg-green-500">Rising</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Prices in this area have increased by {property.marketTrends.areaGrowth}% in the last year
                      </p>

                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Average Price in Area</span>
                        <span className="font-medium">฿{property.marketTrends.averagePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Price per sqm</span>
                        <span className="font-medium">฿{property.marketTrends.pricePerSqm.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <LineChart className="h-4 w-4 mr-2 text-primary" />
                      Price History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 w-full relative mb-4">
                      {/* Simple line chart simulation */}
                      <div className="absolute bottom-0 left-0 w-full h-px bg-border"></div>
                      <div className="absolute bottom-0 left-0 h-full flex items-end w-full">
                        {property.priceHistory.map((item, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full border-b-2 border-r-2 border-primary rounded-br"
                              style={{
                                height: `${(item.price / 15000000) * 100}%`,
                                maxHeight: "90%",
                              }}
                            ></div>
                            <div className="text-xs mt-1">{item.date}</div>
                            <div className="text-xs text-muted-foreground">฿{(item.price / 1000000).toFixed(1)}M</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Last updated: 2 days ago</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      Data Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Property Analysis Report
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Market Comparison Data
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Environmental Assessment
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Historical Price Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="lg:w-1/3">
          {/* Analytics Summary Card */}
          <Card className="mb-6 sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Analytics Summary</CardTitle>
              <CardDescription>Key insights about this property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Price Analysis</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current Price</span>
                    <span className="font-medium">฿{property.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Price per sqm</span>
                    <span className="font-medium">฿{property.marketTrends.pricePerSqm.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Area Average</span>
                    <span className="font-medium">฿{property.marketTrends.averagePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Price Trend</span>
                    <Badge className="bg-green-500">+{property.marketTrends.areaGrowth}%</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Environmental Assessment</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-2 border rounded-md">
                    <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                    <span className="text-xs font-medium">Flood Risk</span>
                    <Badge className="mt-1 text-xs bg-amber-500">{property.environmentalFactors.floodRisk}</Badge>
                  </div>
                  <div className="flex flex-col items-center p-2 border rounded-md">
                    <Wind className="h-5 w-5 text-purple-500 mb-1" />
                    <span className="text-xs font-medium">Air Quality</span>
                    <Badge className="mt-1 text-xs bg-destructive">{property.environmentalFactors.airQuality}</Badge>
                  </div>
                  <div className="flex flex-col items-center p-2 border rounded-md">
                    <Sun className="h-5 w-5 text-amber-500 mb-1" />
                    <span className="text-xs font-medium">Noise</span>
                    <Badge className="mt-1 text-xs bg-green-500">{property.environmentalFactors.noiseLevel}</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Nearby Facilities</h3>
                <div className="space-y-1 text-sm">
                  {property.nearbyFacilities.map((facility, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{facility.name}</span>
                      <span className="text-muted-foreground">{facility.distance}m</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link href="/price-prediction">
                  <Button className="w-full gap-2">
                    <BarChart2 className="h-4 w-4" />
                    View Full Price Analysis
                  </Button>
                </Link>
              </div>

              <div>
                <Link href={`/maps?property=${property.id}`}>
                  <Button variant="outline" className="w-full gap-2">
                    <MapPin className="h-4 w-4" />
                    View on Map
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Similar Properties */}
          <div>
            <h3 className="font-medium mb-3">Similar Properties</h3>
            <div className="space-y-3">
              <SimilarPropertyCard
                id="sim1"
                title="Luxury Condo in Asoke"
                price={13500000}
                location="Asoke, Bangkok"
                bedrooms={2}
                bathrooms={2}
                area={120}
                image="/placeholder.svg?height=80&width=120"
              />

              <SimilarPropertyCard
                id="sim2"
                title="Modern Apartment in Thonglor"
                price={16800000}
                location="Thonglor, Bangkok"
                bedrooms={3}
                bathrooms={2}
                area={160}
                image="/placeholder.svg?height=80&width=120"
              />

              <SimilarPropertyCard
                id="sim3"
                title="Spacious Condo with City View"
                price={14200000}
                location="Phrom Phong, Bangkok"
                bedrooms={2}
                bathrooms={2}
                area={135}
                image="/placeholder.svg?height=80&width=120"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SimilarPropertyCardProps {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
}

function SimilarPropertyCard({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  image,
}: SimilarPropertyCardProps) {
  return (
    <Link href={`/properties/${id}`}>
      <div className="property-card">
        <div className="flex">
          <div className="w-24 h-20 flex-shrink-0">
            <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover rounded-l-lg" />
          </div>
          <div className="p-2 flex-1">
            <h4 className="font-medium text-sm line-clamp-1">{title}</h4>
            <div className="text-xs text-muted-foreground mb-1">{location}</div>
            <div className="flex items-center gap-2 text-xs">
              <span>{bedrooms} bd</span>
              <span>•</span>
              <span>{bathrooms} ba</span>
              <span>•</span>
              <span>{area} m²</span>
            </div>
            <div className="font-medium text-sm mt-1">฿{price.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

