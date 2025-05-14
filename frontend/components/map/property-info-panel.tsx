import {
  Bath,
  BedDouble,
  Building,
  Droplets,
  Home,
  Link,
  MapPin,
  Star,
  Sun,
  Wind,
  X,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function PropertyInfoPanel({
  setShowPropertyInfo,
}: {
  setShowPropertyInfo: (show: boolean) => void;
}) {
  return (
    <div className="absolute top-20 right-4 w-96 map-overlay z-20 bg-background p-5 rounded-md overflow-y-auto scrollbar-hide cursor-grab">
      <div className="map-overlay-header">
        <div className="flex justify-between w-full items-center gap-2">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            <span className="font-medium">Property Details</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowPropertyInfo(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="map-overlay-content mt-2">
        <div className="relative mb-4">
          <img
            src="/map.png?height=200&width=400"
            alt="Property"
            className="w-full h-40 object-cover rounded-md"
          />
          <div className="absolute top-2 left-2 flex gap-1">
            <Badge className="bg-primary">Condominium</Badge>
            <Badge className="bg-amber-500">
              <Star className="h-3 w-3 mr-1" /> Premium
            </Badge>
          </div>
        </div>

        <h3 className="font-medium text-lg mb-1">Modern Condominium</h3>
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span className="truncate">Sukhumvit, Bangkok</span>
        </div>

        <div className="flex items-center gap-4 text-sm mb-3">
          <div className="flex items-center">
            <BedDouble className="h-4 w-4 mr-1 text-primary" />
            <span>3 Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-primary" />
            <span>2 Baths</span>
          </div>
          <div className="flex items-center">
            <Home className="h-4 w-4 mr-1 text-primary" />
            <span>150 m²</span>
          </div>
        </div>

        <div className="font-semibold text-lg mb-4">฿15,000,000</div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Environmental Factors</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center p-2 border rounded-md">
                <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                <span className="text-xs font-medium">Flood Risk</span>
                <Badge className="mt-1 text-xs bg-amber-500">Moderate</Badge>
              </div>
              <div className="flex flex-col items-center p-2 border rounded-md">
                <Wind className="h-5 w-5 text-purple-500 mb-1" />
                <span className="text-xs font-medium">Air Quality</span>
                <Badge className="mt-1 text-xs bg-destructive">Poor</Badge>
              </div>
              <div className="flex flex-col items-center p-2 border rounded-md">
                <Sun className="h-5 w-5 text-amber-500 mb-1" />
                <span className="text-xs font-medium">Noise</span>
                <Badge className="mt-1 text-xs bg-green-500">Low</Badge>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Nearby Facilities</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>BTS Phrom Phong</span>
                <span className="text-muted-foreground">300m</span>
              </div>
              <div className="flex justify-between">
                <span>EmQuartier Mall</span>
                <span className="text-muted-foreground">500m</span>
              </div>
              <div className="flex justify-between">
                <span>Benchasiri Park</span>
                <span className="text-muted-foreground">700m</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href="/properties/prop1" className="flex-1">
              <Button className="w-full">View Details</Button>
            </Link>
            <Link href="/price-prediction" className="flex-1">
              <Button variant="outline" className="w-full">
                Price Analysis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
