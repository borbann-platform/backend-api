"use client"

import { useState } from "react"
import { Send, X, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useOverlayContext } from "./overlay-context"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatBotProps {
  onClose: () => void
}

export function ChatBot({ onClose }: ChatBotProps) {
  const { overlays, minimizeOverlay, maximizeOverlay } = useOverlayContext()
  const isMinimized = overlays.chat.minimized

  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([{ role: "bot", content: "Hi! How can I help you today?" }])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message to chat
    setChatHistory([...chatHistory, { role: "user", content: message }])

    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "bot",
          content: "I can provide information about this area. What would you like to know?",
        },
      ])
    }, 1000)

    setMessage("")
  }

  if (isMinimized) {
    return (
      <Card className="overlay-card overlay-minimized">
        <CardHeader className="p-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">ChatBot</CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => maximizeOverlay("chat")}>
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="overlay-card w-[400px] max-h-[80vh] overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">ChatBot</CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => minimizeOverlay("chat")}>
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-[min(400px,calc(var(--max-overlay-height)-60px))]">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    chat.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {chat.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t p-4 flex items-center gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

