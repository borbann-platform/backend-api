"use client"

import { MessageCircle, Filter, Layers, ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useOverlayContext } from "./overlay-context"

export function OverlayControls() {
  const { overlays, toggleOverlay, changePosition } = useOverlayContext()

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-md"
              onClick={() => toggleOverlay("analytics")}
            >
              <Layers className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            {overlays.analytics.visible ? "Hide analytics" : "Show analytics"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-md"
              onClick={() => toggleOverlay("filters")}
            >
              <Filter className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">{overlays.filters.visible ? "Hide filters" : "Show filters"}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-md"
              onClick={() => changePosition("analytics", overlays.analytics.position === "right" ? "left" : "right")}
            >
              <ArrowLeftRight className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            Move analytics to the {overlays.analytics.position === "right" ? "left" : "right"}
          </TooltipContent>
        </Tooltip>

        {!overlays.chat.visible && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-md"
                onClick={() => toggleOverlay("chat")}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Open chat</TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  )
}

