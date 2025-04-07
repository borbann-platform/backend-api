"use client"

import { useOverlayContext } from "./overlay-context"
import { AnalyticsPanel } from "./analytics-panel"
import { PropertyFilters } from "./property-filters"
import { ChatBot } from "./chat-bot"
import { OverlayControls } from "./overlay-controls"

export function OverlayManager() {
  const { overlays, toggleOverlay } = useOverlayContext()

  // Function to ensure overlays stay within viewport bounds
  const getPositionClasses = (position: string, type: string) => {
    if (position === "right") {
      return "right-4"
    } else if (position === "left") {
      return "left-4"
    }
    return type === "analytics" ? "right-4" : "left-4"
  }

  return (
    <>
      {/* Analytics Panel */}
      {overlays.analytics.visible && (
        <div
          className={`overlay-container ${getPositionClasses(overlays.analytics.position, "analytics")} top-20`}
          data-minimized={overlays.analytics.minimized}
        >
          <AnalyticsPanel onChatClick={() => toggleOverlay("chat")} />
        </div>
      )}

      {/* Property Filters */}
      {overlays.filters.visible && (
        <div
          className={`overlay-container ${getPositionClasses(overlays.filters.position, "filters")} bottom-4`}
          data-minimized={overlays.filters.minimized}
        >
          <PropertyFilters />
        </div>
      )}

      {/* Chat Bot */}
      {overlays.chat.visible && (
        <div
          className={`overlay-container ${getPositionClasses(overlays.chat.position, "chat")} bottom-4`}
          data-minimized={overlays.chat.minimized}
        >
          <ChatBot onClose={() => toggleOverlay("chat")} />
        </div>
      )}

      {/* Overlay Controls */}
      <OverlayControls />
    </>
  )
}

