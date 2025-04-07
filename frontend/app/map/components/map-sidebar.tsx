"use client"

import type React from "react"

import {
  Home,
  Clock,
  Map,
  FileText,
  Settings,
  PenTool,
  BarChart3,
  Plane,
  LineChart,
  DollarSign,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function MapSidebar() {
  const pathname = usePathname()

  const mainNavItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "My assets", icon: Clock, href: "/assets" },
    { name: "Models", icon: Map, href: "/models" },
    { name: "Trade", icon: LineChart, href: "/trade" },
    { name: "Earn", icon: DollarSign, href: "/earn" },
    { name: "Documentation", icon: FileText, href: "/documentation", badge: "NEW" },
    { name: "Pay", icon: Settings, href: "/pay" },
    { name: "More", icon: MoreHorizontal, href: "/more" },
  ]

  const projectNavItems = [
    { name: "Design Engineering", icon: PenTool, href: "/projects/design" },
    { name: "Sales & Marketing", icon: BarChart3, href: "/projects/sales" },
    { name: "Travel", icon: Plane, href: "/projects/travel" },
  ]

  return (
    <aside className="flex h-full w-[240px] flex-col border-r bg-card dark:bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            B
          </div>
          <span className="text-xl font-bold">BorBann</span>
        </Link>
      </div>

      <div className="flex flex-col p-2">
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted",
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs font-semibold text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-6 rounded-lg bg-muted/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Get ฿10</h3>
              <p className="text-xs text-muted-foreground">Invite friends</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
            GG
          </div>
          <div>
            <div className="font-medium">GG_WPX</div>
            <div className="text-xs text-muted-foreground">garfield.wpx@gmail.com</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function Gift(props: React.SVGProps<SVGSVGElement>) {
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
      strokeLinejoin="round"
    >
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  )
}

