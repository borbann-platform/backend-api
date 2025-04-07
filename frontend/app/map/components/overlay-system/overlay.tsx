"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { X, Minimize2, Maximize2, Move } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useOverlay, type OverlayId, type OverlayPosition } from "./overlay-context"

interface OverlayProps {
  id: OverlayId
  title: string
  icon?: React.ReactNode
  initialPosition?: OverlayPosition
  initialIsOpen?: boolean
  className?: string
  children: React.ReactNode
  onClose?: () => void
  showMinimize?: boolean
  width?: string
  height?: string
  maxHeight?: string
}

export function Overlay({
  id,
  title,
  icon,
  initialPosition = "bottom-right",
  initialIsOpen = false,
  className,
  children,
  onClose,
  showMinimize = true,
  width = "350px",
  height = "auto",
  maxHeight = "80vh",
}: OverlayProps) {
  const { overlays, registerOverlay, unregisterOverlay, closeOverlay, minimizeOverlay, maximizeOverlay, bringToFront } =
    useOverlay()

  const [isDragging, setIsDragging] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Register overlay on mount
  useEffect(() => {
    registerOverlay(id, {
      title,
      icon,
      position: initialPosition,
      isOpen: initialIsOpen,
    })

    // Unregister on unmount
    return () => unregisterOverlay(id)
  }, [id])

  // Get overlay state
  const overlay = overlays[id]
  if (!overlay) return null

  const handleClose = () => {
    closeOverlay(id)
    if (onClose) onClose()
  }

  const handleMinimize = () => {
    minimizeOverlay(id)
  }

  const handleMaximize = () => {
    maximizeOverlay(id)
  }

  const handleHeaderClick = () => {
    if (!isDragging) {
      bringToFront(id)
    }
  }

  // Position classes based on position
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }

  // If not open, don't render
  if (!overlay.isOpen) return null

  // Render minimized state
  if (overlay.isMinimized) {
    return (
      <div className={cn("fixed z-10", positionClasses[overlay.position])} style={{ zIndex: overlay.zIndex }}>
        <Card className="w-[200px] shadow-lg bg-card/95 backdrop-blur-sm border border-border/50">
          <CardHeader className="p-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {icon && <span className="text-primary">{icon}</span>}
              {title}
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={handleMaximize}>
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // Render full overlay
  return (
    <div
      ref={overlayRef}
      className={cn("fixed z-10", positionClasses[overlay.position])}
      style={{ zIndex: overlay.zIndex }}
    >
      <Card
        className={cn("shadow-lg bg-card/95 backdrop-blur-sm border border-border/50 overflow-hidden", className)}
        style={{
          width,
          height,
          maxHeight,
          maxWidth: "calc(100vw - 32px)",
        }}
      >
        <CardHeader className="pb-2 flex flex-row items-center justify-between cursor-move" onClick={handleHeaderClick}>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            {title}
            <Move className="h-3 w-3 text-muted-foreground ml-1" />
          </CardTitle>
          <div className="flex items-center gap-1">
            {showMinimize && (
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={handleMinimize}>
                <Minimize2 className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">{children}</CardContent>
      </Card>
    </div>
  )
}

