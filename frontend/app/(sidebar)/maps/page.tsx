"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  MapPin,
  Home,
  BarChart2,
  Filter,
  MessageCircle,
  X,
  Plus,
  Minus,
  Droplets,
  Wind,
  Sun,
  LineChart,
  Send,
  Newspaper,
  Building,
  BedDouble,
  Bath,
  Star,
  Clock,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { TopNavigation } from "@/components/navigation/top-navigation";
import MapWithSearch from "@/components/map/map-with-search";
import { AnalyticsPanel } from "@/components/map/analytics-panel";

export default function MapsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [priceRange, setPriceRange] = useState([5000000, 20000000]);
  const [radius, setRadius] = useState(30);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! How can I help you today?" },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { role: "user", content: message }]);
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I can provide information about properties in this area. Would you like to know about flood risks, air quality, or nearby amenities?",
          },
        ]);
      }, 1000);
      setMessage("");
    }
  };

  const handlePropertyClick = () => {
    setShowPropertyInfo(true);
    setShowFilters(false);
    setShowChat(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <MapWithSearch /> */}
        </div>

        {/* Sample Property Markers */}
        <div
          className="absolute left-1/4 top-1/3 text-primary cursor-pointer group"
          onClick={handlePropertyClick}
        >
          <div className="relative transition-transform transform group-hover:scale-125">
            <div className="absolute inset-0 w-10 h-10 bg-green-500 opacity-30 blur-lg rounded-full"></div>
            <MapPin className="h-10 w-10 text-green-500 drop-shadow-xl" />
            <div className="absolute -top-2 -right-2 h-5 w-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            <span className="absolute top-12 left-1/2 -translate-x-1/2 hidden group-hover:flex bg-black text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg">
              Available
            </span>
          </div>
        </div>
        <div
          className="absolute left-1/2 top-1/2 text-primary cursor-pointer group"
          onClick={handlePropertyClick}
        >
          <div className="relative transition-transform transform group-hover:scale-125">
            <div className="absolute inset-0 w-10 h-10 bg-yellow-500 opacity-30 blur-lg rounded-full"></div>
            <MapPin className="h-10 w-10 text-yellow-500 drop-shadow-xl" />
            <div className="absolute -top-2 -right-2 h-5 w-5 bg-amber-500 rounded-full border-2 border-white animate-pulse"></div>
            <span className="absolute top-12 left-1/2 -translate-x-1/2 hidden group-hover:flex bg-black text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg">
              Pending
            </span>
          </div>
        </div>
        <div
          className="absolute right-1/4 top-2/3 text-primary cursor-pointer group"
          onClick={handlePropertyClick}
        >
          <div className="relative transition-transform transform group-hover:scale-125">
            <div className="absolute inset-0 w-10 h-10 bg-red-500 opacity-30 blur-lg rounded-full"></div>
            <MapPin className="h-10 w-10 text-red-500 drop-shadow-xl" />
            <div className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
            <span className="absolute top-12 left-1/2 -translate-x-1/2 hidden group-hover:flex bg-black text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg">
              Sold
            </span>
          </div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <TopNavigation />

      {/* Map Overlay Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <Button
          variant="secondary"
          size="icon"
          className={`h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm shadow-md ${
            showAnalytics ? "bg-primary text-primary-foreground" : ""
          }`}
          onClick={() => {
            setShowAnalytics(!showAnalytics);
            if (showAnalytics) {
              setShowFilters(false);
              setShowPropertyInfo(false);
            }
          }}
        >
          <BarChart2 className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className={`h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm shadow-md ${
            showFilters ? "bg-primary text-primary-foreground" : ""
          }`}
          onClick={() => {
            setShowFilters(!showFilters);
            if (showFilters) {
              setShowAnalytics(false);
              setShowPropertyInfo(false);
            }
          }}
        >
          <Filter className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className={`h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm shadow-md ${
            showChat ? "bg-primary text-primary-foreground" : ""
          }`}
          onClick={() => {
            setShowChat(!showChat);
            if (showChat) {
              setShowPropertyInfo(false);
            }
          }}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>

      {/* Property Info Panel */}
      {showPropertyInfo && (
        <div className="absolute top-20 right-4 w-96 map-overlay z-20">
          <div className="map-overlay-header">
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
          <div className="map-overlay-content">
            <div className="relative mb-4">
              <img
                src="/placeholder.svg?height=200&width=400"
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
                <h4 className="font-medium text-sm mb-2">
                  Environmental Factors
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-2 border rounded-md">
                    <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                    <span className="text-xs font-medium">Flood Risk</span>
                    <Badge className="mt-1 text-xs bg-amber-500">
                      Moderate
                    </Badge>
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
      )}

      {/* Analytics Panel */}
      {showAnalytics && <AnalyticsPanel setShowAnalytics={setShowAnalytics}/>}

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute top-20 right-4 w-96 map-overlay z-20">
          <div className="map-overlay-header">
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

          <Tabs
            defaultValue="basic"
            value={activeTab}
            onValueChange={setActiveTab}
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
                      <input
                        type="checkbox"
                        id="hospital"
                        className="h-4 w-4"
                      />
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
      )}

      {/* Chat Panel */}
      {showChat && (
        <div className="absolute top-20 right-4 w-96 h-[500px] map-overlay z-20 flex flex-col">
          <div className="map-overlay-header">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Chat Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowChat(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 h-10 px-3 rounded-md border border-input bg-background"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <Button
                variant="default"
                size="icon"
                className="h-10 w-10"
                onClick={handleSendMessage}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-8 left-4 bg-background/95 backdrop-blur-sm p-2 rounded-lg shadow-md z-10">
        <div className="text-xs font-medium mb-1">Property Status</div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
            <span className="text-xs">Pending</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            <span className="text-xs">Sold</span>
          </div>
        </div>
      </div>
    </div>
  );
}
