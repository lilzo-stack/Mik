"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { ChatBubble } from "@/components/ChatBubble";
import { TypingIndicator } from "@/components/TypingIndicator";
import { InputBar } from "@/components/InputBar";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Send message to OpenRouter AI via API route
async function sendMessageToAI(message: string, history: { role: string; content: string }[]): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [
        ...history,
        { role: "user", content: message }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to get AI response");
  }

  const data = await response.json();
  return data.response;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message on client side only to avoid hydration mismatch
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: "Hello, I'm Jarvis. How can I assist you today?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Convert message history to API format
      const history = updatedMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Get AI response
      const response = await sendMessageToAI(content, history.slice(0, -1));

      // Add AI message
      const aiMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please ensure the OpenRouter API key is configured.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0f]">
      {/* Header */}
      <Header />

      {/* Chat area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto scroll-smooth pb-32"
      >
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Welcome message with animation */}
          {messages.length === 1 && (
            <div className="text-center py-12 fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-[#00d4ff]/30 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00d4ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                  <path d="m7 22 5-3 5 3" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome to Jarvis
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Your intelligent AI assistant. Ask me anything — from answering questions to helping with creative tasks.
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message} />
          ))}

          {/* Typing indicator */}
          {isLoading && <TypingIndicator />}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <InputBar onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
