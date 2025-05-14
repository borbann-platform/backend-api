import { MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export function ChatPanel({
  setShowChat,
}: {
  setShowChat: (show: boolean) => void;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! How can I help you today?" },
  ]);
  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { role: "user", content: message }]);
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I can provide information about properties in this area. Would you like to know about flood risks, air quality, or nearby amenities?",
          },
        ]);
      }, 1000);
      setMessage("");
    }
  };
  return (
    <div className="absolute top-20 right-4 w-96 h-[500px] map-overlay z-20 flex flex-col bg-background p-5 rounded-md scrollbar-hide cursor-grab">
      <div className="map-overlay-header">
        <div className="flex justify-between w-full items-center gap-2">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span className="font-medium">Chat Assistant</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowChat(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 h-10 px-3 rounded-md border border-input bg-background"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <Button
            variant="default"
            size="icon"
            className="h-10 w-10"
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
