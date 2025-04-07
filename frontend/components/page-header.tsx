"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

interface BreadcrumbItem {
  title: string
  href: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumb?: BreadcrumbItem[]
}

export default function PageHeader({ title, description, breadcrumb = [] }: PageHeaderProps) {
  return (
    <div className="flex flex-col space-y-2">
      {breadcrumb.length > 0 && (
        <nav className="flex items-center text-sm text-muted-foreground">
          {breadcrumb.map((item, index) => (
            <div key={item.href} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
              <Link href={item.href} className="hover:text-foreground transition-colors">
                {item.title}
              </Link>
            </div>
          ))}
          {title && (
            <>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="font-medium text-foreground">{title}</span>
            </>
          )}

          <div className="ml-auto">
            <ModeToggle />
          </div>
        </nav>
      )}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}

