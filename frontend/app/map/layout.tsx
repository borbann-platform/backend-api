import type React from "react"

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
    </div>
  )
}

