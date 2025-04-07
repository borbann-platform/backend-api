"use client"

import { useState } from "react"
import { Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Overlay } from "./overlay-system/overlay"

export function ChatOverlay() {
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

  return (
    <Overlay
      id="chat"
      title="Chat Assistant"
      icon={<MessageCircle className="h-5 w-5" />}
      initialPosition="bottom-right"
      initialIsOpen={false}
      width="400px"
    >
      <div className="flex flex-col h-[400px]">
        <div className="flex-1 p-4 overflow-auto">
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
        </div>
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
      </div>
    </Overlay>
  )
}

