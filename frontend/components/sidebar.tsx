"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Map, Database, FileText, Users, ChevronDown, ChevronUp, BrainCircuit } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
  badge?: React.ReactNode
}

const SidebarItem = ({ icon, label, href, active, badge }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        active
          ? "bg-primary/10 text-primary border-l-2 border-primary"
          : "text-foreground/80 hover:bg-muted hover:text-foreground hover:border-l-2 hover:border-primary/50",
      )}
    >
      <div className={cn("text-primary", active ? "text-primary" : "text-muted-foreground")}>{icon}</div>
      <span className="flex-1">{label}</span>
      {badge}
    </Link>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="w-64 border-r bg-background flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
          B
        </div>
        <span className="font-semibold text-xl">BorBann</span>
      </div>

      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <SidebarItem icon={<Map size={20} />} label="Maps" href="/maps" active={pathname.startsWith("/maps")} />

        <SidebarItem
          icon={<Database size={20} />}
          label="Data Pipeline"
          href="/data-pipeline"
          active={pathname.startsWith("/data-pipeline")}
        />

        <SidebarItem
          icon={<BrainCircuit size={20} />}
          label="Models"
          href="/models"
          active={pathname.startsWith("/models")}
        />

        <SidebarItem
          icon={<FileText size={20} />}
          label="Documentation"
          href="/documentation"
          active={pathname.startsWith("/documentation")}
          badge={<span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-md">NEW</span>}
        />
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>GG</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="font-medium truncate">GG_WPX</p>
            <p className="text-xs text-muted-foreground truncate">garfield.wpx@gmail.com</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-4 justify-start gap-2 border-primary/20 hover:border-primary"
          onClick={() => setExpanded(!expanded)}
        >
          <Users size={18} />
          <span className="flex-1 text-left">Users</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>

        {expanded && (
          <div className="mt-2 pl-2 space-y-1 text-sm">
            <Link href="/users/manage" className="block py-1 px-2 rounded hover:bg-muted">
              Manage Users
            </Link>
            <Link href="/users/roles" className="block py-1 px-2 rounded hover:bg-muted">
              Roles & Permissions
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

