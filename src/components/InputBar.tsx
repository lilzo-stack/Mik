"use client";

import { useState, KeyboardEvent } from "react";

interface InputBarProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function InputBar({ onSend, isLoading }: InputBarProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0f]/90 backdrop-blur-md border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-end gap-3">
          {/* Text input */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Jarvis anything..."
              rows={1}
              className="input-glow w-full px-4 py-3 bg-[#151520] text-white placeholder-gray-500 rounded-2xl border border-white/10 resize-none outline-none transition-all duration-300 focus:border-[#00d4ff]/50"
              style={{
                minHeight: "48px",
                maxHeight: "120px",
              }}
            />
          </div>

          {/* Microphone button */}
          <button
            className="p-3 rounded-xl bg-[#151520] border border-white/10 text-gray-400 hover:text-[#00d4ff] hover:border-[#00d4ff]/50 transition-all duration-300 neon-button"
            title="Voice input (coming soon)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </button>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-xl transition-all duration-300 neon-button ${
              input.trim() && !isLoading
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                : "bg-[#151520] text-gray-500 border border-white/10 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4 20-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-600 mt-2">
          Jarvis AI Assistant • Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
