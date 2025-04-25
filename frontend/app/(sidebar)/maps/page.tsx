"use client";

import { AnalyticsPanel } from "@/components/map/analytics-panel";
import { ChatPanel } from "@/components/map/chat-panel";
import { FiltersPanel } from "@/components/map/filters-panel";
import { PropertyInfoPanel } from "@/components/map/property-info-panel";

import MapWithSearch from "@/components/map/map-with-search";
import { TopNavigation } from "@/components/navigation/top-navigation";
import { Button } from "@/components/ui/button";
import { BarChart2, Filter, MessageCircle } from "lucide-react";
import { useRef, useState } from "react";
import Draggable from "react-draggable";

export default function MapsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const propertyInfoRef = useRef<HTMLDivElement>(null);

  const handlePropertyClick = () => {
    setShowPropertyInfo(true);
    setShowFilters(false);
    setShowChat(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div>
        <div className="absolute inset-0 flex items-center justify-center">
          <MapWithSearch />
        </div>

        {/* Sample Property Markers */}
        {/* <div
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
        </div> */}
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
        <Draggable nodeRef={propertyInfoRef as React.RefObject<HTMLElement>}>
          <div ref={propertyInfoRef}>
            <PropertyInfoPanel setShowPropertyInfo={setShowPropertyInfo} />
          </div>
        </Draggable>
      )}

      {/* Analytics Panel */}
      {showAnalytics && (
        <Draggable nodeRef={analyticsRef as React.RefObject<HTMLElement>}>
          <div ref={analyticsRef}>
            <AnalyticsPanel setShowAnalytics={setShowAnalytics} />
          </div>
        </Draggable>
      )}

      {showFilters && (
        <Draggable nodeRef={filtersRef as React.RefObject<HTMLElement>}>
          <div ref={filtersRef}>
            <FiltersPanel setShowFilters={setShowFilters} />
          </div>
        </Draggable>
      )}

      {showChat && (
        <Draggable nodeRef={chatRef as React.RefObject<HTMLElement>}>
          <div ref={chatRef}>
            <ChatPanel setShowChat={setShowChat} />
          </div>
        </Draggable>
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
