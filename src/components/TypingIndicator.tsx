"use client";

export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div className="max-w-[80%] sm:max-w-[70%] message-assistant">
        {/* Typing bubble */}
        <div className="px-4 py-4 rounded-2xl bg-[#1e1e2e] border border-white/10 rounded-bl-md">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400 mr-2">Jarvis is typing</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#00d4ff] typing-dot" />
              <div className="w-2 h-2 rounded-full bg-[#00d4ff] typing-dot" />
              <div className="w-2 h-2 rounded-full bg-[#00d4ff] typing-dot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
