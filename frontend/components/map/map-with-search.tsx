"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

declare global {
  interface Window {
    google: typeof google;
  }
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

export default function MapWithSearch() {
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [mapType, setMapType] = useState<string>("roadmap");

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (!mapRef.current || !inputRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 13.7563, lng: 100.5018 },
        zoom: 13,
        gestureHandling: "greedy",
        mapTypeControl: false,
        mapTypeId: mapType,
      });

      mapInstanceRef.current = map;

      const input = inputRef.current;

      const searchBox = new google.maps.places.SearchBox(input);

      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds()!);
      });

      let marker: google.maps.Marker;

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (!places || places.length === 0) return;

        const place = places[0];
        if (!place.geometry || !place.geometry.location) return;

        map.panTo(place.geometry.location);
        map.setZoom(15);

        if (marker) marker.setMap(null);
        marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
        });
      });
    });
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setMapTypeId(mapType as google.maps.MapTypeId);
    }
  }, [mapType]);

return (
  <div className="relative flex flex-row w-full h-full">
    <div className="absolute mt-18 z-50 flex gap-2 rounded-md shadow-md">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search locations..."
        className="w-[300px]"
      />
      <Select
        onValueChange={(value) => setMapType(value as google.maps.MapTypeId)}
        defaultValue="roadmap"
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Map Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="roadmap">Roadmap</SelectItem>
          <SelectItem value="satellite">Satellite</SelectItem>
          <SelectItem value="hybrid">Hybrid</SelectItem>
          <SelectItem value="terrain">Terrain</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div ref={mapRef} className="w-full h-full rounded-md" />
  </div>
);

}
