"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type OverlayType = "analytics" | "filters" | "chat"
type OverlayPosition = "left" | "right"

interface OverlayState {
  visible: boolean
  minimized: boolean
  position: OverlayPosition
}

interface OverlayContextType {
  overlays: Record<OverlayType, OverlayState>
  toggleOverlay: (type: OverlayType) => void
  minimizeOverlay: (type: OverlayType) => void
  maximizeOverlay: (type: OverlayType) => void
  changePosition: (type: OverlayType, position: OverlayPosition) => void
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [overlays, setOverlays] = useState<Record<OverlayType, OverlayState>>({
    analytics: { visible: true, minimized: false, position: "right" },
    filters: { visible: true, minimized: false, position: "left" },
    chat: { visible: false, minimized: false, position: "right" },
  })

  const toggleOverlay = (type: OverlayType) => {
    setOverlays((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        visible: !prev[type].visible,
        minimized: false,
      },
    }))
  }

  const minimizeOverlay = (type: OverlayType) => {
    setOverlays((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        minimized: true,
      },
    }))
  }

  const maximizeOverlay = (type: OverlayType) => {
    setOverlays((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        minimized: false,
      },
    }))
  }

  const changePosition = (type: OverlayType, position: OverlayPosition) => {
    setOverlays((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        position,
      },
    }))
  }

  return (
    <OverlayContext.Provider
      value={{
        overlays,
        toggleOverlay,
        minimizeOverlay,
        maximizeOverlay,
        changePosition,
      }}
    >
      {children}
    </OverlayContext.Provider>
  )
}

export function useOverlayContext() {
  const context = useContext(OverlayContext)
  if (context === undefined) {
    throw new Error("useOverlayContext must be used within an OverlayProvider")
  }
  return context
}

