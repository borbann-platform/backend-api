import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MapPin, Home, Bath, BedDouble, ArrowRight, Search, Star } from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/page-header"

export default function PropertiesPage() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Property Listings"
        description="Browse and filter available properties"
        breadcrumb={[
          { title: "Home", href: "/" },
          { title: "Properties", href: "/properties" },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Filters</h3>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                  Reset All
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Price Range</label>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>฿5,000,000</span>
                    <span>฿20,000,000</span>
                  </div>
                  <Slider
                    defaultValue={[5000000, 20000000]}
                    max={50000000}
                    min={1000000}
                    step={1000000}
                    className="mb-6"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Property Type</label>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Any Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Type</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Bedrooms</label>
                  <div className="grid grid-cols-5 gap-1">
                    {["Any", "1", "2", "3", "4+"].map((num) => (
                      <Button
                        key={num}
                        variant={num === "Any" ? "default" : "outline"}
                        size="sm"
                        className="text-xs h-8"
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Bathrooms</label>
                  <div className="grid grid-cols-5 gap-1">
                    {["Any", "1", "2", "3", "4+"].map((num) => (
                      <Button
                        key={num}
                        variant={num === "Any" ? "default" : "outline"}
                        size="sm"
                        className="text-xs h-8"
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Area (sqm)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Min" className="h-9" />
                    <Input placeholder="Max" className="h-9" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Location</label>
                  <Select defaultValue="bangkok">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangkok">Bangkok</SelectItem>
                      <SelectItem value="phuket">Phuket</SelectItem>
                      <SelectItem value="chiangmai">Chiang Mai</SelectItem>
                      <SelectItem value="pattaya">Pattaya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search properties..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
              <Link href="/maps">
                <Button variant="outline" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Map View</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* View Tabs */}
          <Tabs defaultValue="grid" className="mb-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">156</span> properties
              </div>
              <TabsList>
                <TabsTrigger value="grid" className="text-xs px-3">
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list" className="text-xs px-3">
                  List
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Property Cards */}
                <PropertyCard
                  id="prop1"
                  title="Modern Condominium"
                  price={15000000}
                  location="Sukhumvit, Bangkok"
                  bedrooms={3}
                  bathrooms={2}
                  area={150}
                  type="Condominium"
                  image="/placeholder.svg?height=200&width=300"
                  premium={true}
                />

                <PropertyCard
                  id="prop2"
                  title="Luxury Villa with Pool"
                  price={25000000}
                  location="Phuket Beach, Phuket"
                  bedrooms={4}
                  bathrooms={3}
                  area={320}
                  type="House"
                  image="/placeholder.svg?height=200&width=300"
                />

                <PropertyCard
                  id="prop3"
                  title="City Center Apartment"
                  price={8500000}
                  location="Silom, Bangkok"
                  bedrooms={2}
                  bathrooms={1}
                  area={85}
                  type="Condominium"
                  image="/placeholder.svg?height=200&width=300"
                />

                <PropertyCard
                  id="prop4"
                  title="Riverside Townhouse"
                  price={12000000}
                  location="Chao Phraya, Bangkok"
                  bedrooms={3}
                  bathrooms={3}
                  area={180}
                  type="Townhouse"
                  image="/placeholder.svg?height=200&width=300"
                />

                <PropertyCard
                  id="prop5"
                  title="Mountain View Villa"
                  price={18000000}
                  location="Doi Suthep, Chiang Mai"
                  bedrooms={3}
                  bathrooms={2}
                  area={250}
                  type="House"
                  image="/placeholder.svg?height=200&width=300"
                />

                <PropertyCard
                  id="prop6"
                  title="Beachfront Condo"
                  price={9800000}
                  location="Jomtien, Pattaya"
                  bedrooms={1}
                  bathrooms={1}
                  area={65}
                  type="Condominium"
                  image="/placeholder.svg?height=200&width=300"
                  premium={true}
                />
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="gap-2">
                  Load More <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-4">
              <div className="space-y-4">
                {/* List View Property Cards */}
                <PropertyCardList
                  id="prop1"
                  title="Modern Condominium"
                  price={15000000}
                  location="Sukhumvit, Bangkok"
                  bedrooms={3}
                  bathrooms={2}
                  area={150}
                  type="Condominium"
                  image="/placeholder.svg?height=120&width=180"
                  premium={true}
                />

                <PropertyCardList
                  id="prop2"
                  title="Luxury Villa with Pool"
                  price={25000000}
                  location="Phuket Beach, Phuket"
                  bedrooms={4}
                  bathrooms={3}
                  area={320}
                  type="House"
                  image="/placeholder.svg?height=120&width=180"
                />

                <PropertyCardList
                  id="prop3"
                  title="City Center Apartment"
                  price={8500000}
                  location="Silom, Bangkok"
                  bedrooms={2}
                  bathrooms={1}
                  area={85}
                  type="Condominium"
                  image="/placeholder.svg?height=120&width=180"
                />

                <PropertyCardList
                  id="prop4"
                  title="Riverside Townhouse"
                  price={12000000}
                  location="Chao Phraya, Bangkok"
                  bedrooms={3}
                  bathrooms={3}
                  area={180}
                  type="Townhouse"
                  image="/placeholder.svg?height=120&width=180"
                />
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="gap-2">
                  Load More <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

interface PropertyCardProps {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  type: string
  image: string
  premium?: boolean
}

function PropertyCard({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  type,
  image,
  premium,
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`}>
      <div className={`property-card ${premium ? "property-card-premium" : ""} h-full flex flex-col`}>
        <div className="relative">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute top-2 left-2 flex gap-1">
            <Badge className="bg-primary">{type}</Badge>
            {premium && (
              <Badge className="bg-amber-500">
                <Star className="h-3 w-3 mr-1" /> Premium
              </Badge>
            )}
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-medium text-lg mb-1">{title}</h3>
          <div className="flex items-center text-muted-foreground text-sm mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm mb-3">
            <div className="flex items-center">
              <BedDouble className="h-4 w-4 mr-1 text-primary" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-primary" />
              <span>{bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-1 text-primary" />
              <span>{area} m²</span>
            </div>
          </div>
          <div className="mt-auto pt-2 border-t flex items-center justify-between">
            <div className="font-semibold text-lg">฿{price.toLocaleString()}</div>
            <Button size="sm" className="h-8">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

function PropertyCardList({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  type,
  image,
  premium,
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`}>
      <div className={`property-card ${premium ? "property-card-premium" : ""}`}>
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-48 flex-shrink-0">
            <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 sm:h-full object-cover" />
            <div className="absolute top-2 left-2 flex gap-1">
              <Badge className="bg-primary">{type}</Badge>
              {premium && (
                <Badge className="bg-amber-500">
                  <Star className="h-3 w-3 mr-1" /> Premium
                </Badge>
              )}
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="font-medium text-lg">{title}</h3>
              <div className="font-semibold text-lg">฿{price.toLocaleString()}</div>
            </div>
            <div className="flex items-center text-muted-foreground text-sm mb-3">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-4 text-sm mb-4">
              <div className="flex items-center">
                <BedDouble className="h-4 w-4 mr-1 text-primary" />
                <span>{bedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1 text-primary" />
                <span>{bathrooms} Baths</span>
              </div>
              <div className="flex items-center">
                <Home className="h-4 w-4 mr-1 text-primary" />
                <span>{area} m²</span>
              </div>
            </div>
            <div className="mt-auto flex justify-end">
              <Button size="sm">View Details</Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

