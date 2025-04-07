/*
========================================
File: frontend/features/map/components/map-sidebar.tsx
========================================
*/
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Map, // Changed from Clock
  BarChart3, // Changed from Map
  Layers, // Changed from FileText
  Settings,
  SlidersHorizontal, // Changed from PenTool
  MessageCircle, // Changed from BarChart3
  Info, // Changed from Plane
  LineChart,
  DollarSign,
  MoreHorizontal,
  Gift, // Added Gift icon component below
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"; // Assuming sidebar is a shared UI component structure

export function MapSidebar() {
  const pathname = usePathname();

  // Define navigation items relevant to the map context or general app navigation shown here
  const mainNavItems = [
    { name: "Map View", icon: Map, href: "/map" },
    { name: "Analytics", icon: BarChart3, href: "/map/analytics" }, // Example sub-route
    { name: "Filters", icon: SlidersHorizontal, href: "/map/filters" }, // Example sub-route
    { name: "Data Layers", icon: Layers, href: "/map/layers" }, // Example sub-route
    { name: "Chat", icon: MessageCircle, href: "/map/chat" }, // Example sub-route
    { name: "Model Info", icon: Info, href: "/model-explanation" }, // Link to other feature
    { name: "Settings", icon: Settings, href: "/settings" }, // Example general setting
    { name: "More", icon: MoreHorizontal, href: "/more" }, // Example general setting
  ];

  // Example project-specific items (if sidebar is shared)
  const projectNavItems = [
    { name: "Market Trends", icon: LineChart, href: "/projects/trends" },
    { name: "Investment", icon: DollarSign, href: "/projects/investment" },
  ];

  return (
    // Using the shared Sidebar component structure
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-semibold px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            B
          </div>
          {/* Hide text when collapsed */}
          <span className="text-xl font-bold group-data-[collapsed]:hidden">BorBann</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild // Use asChild if the button itself is a Link or wraps one
                variant="default"
                size="default"
                isActive={pathname === item.href}
                tooltip={item.name} // Tooltip shown when collapsed
              >
                <Link href={item.href}>
                  <item.icon />
                  {/* Hide text when collapsed */}
                  <span className="group-data-[collapsed]:hidden">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Optional Project Section */}
        {/* <SidebarSeparator />
        <SidebarGroup>
           <SidebarGroupLabel>Projects</SidebarGroupLabel>
           <SidebarGroupContent>
              <SidebarMenu>
                {projectNavItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton >...</SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
              </SidebarMenu>
           </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarFooter>
        {/* Footer content like user profile, settings shortcut etc. */}
        <div className="flex items-center gap-3 p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs">
            GG
          </div>
          <div className="group-data-[collapsed]:hidden">
            <div className="font-medium text-sm">GG_WPX</div>
            <div className="text-xs text-muted-foreground">gg@example.com</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

// Example Gift Icon (if not using lucide-react)
function GiftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  );
}
