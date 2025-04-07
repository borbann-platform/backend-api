"use client"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useOverlay } from "./overlay-context"

interface OverlayDockProps {
  position?: "bottom" | "right"
  className?: string
}

export function OverlayDock({ position = "bottom", className }: OverlayDockProps) {
  const { overlays, toggleOverlay } = useOverlay()

  // Filter overlays that have icons
  const overlaysWithIcons = Object.values(overlays).filter((overlay) => overlay.icon)

  if (overlaysWithIcons.length === 0) return null

  const positionClasses = {
    bottom: "fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-row gap-2 z-50",
    right: "fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50",
  }

  return (
    <TooltipProvider>
      <div className={positionClasses[position]}>
        {overlaysWithIcons.map((overlay) => (
          <div key={overlay.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={overlay.isOpen ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-md"
                  onClick={() => toggleOverlay(overlay.id)}
                >
                  {overlay.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent side={position === "bottom" ? "top" : "left"}>
                {overlay.isOpen ? `Hide ${overlay.title}` : `Show ${overlay.title}`}
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </TooltipProvider>
  )
}

