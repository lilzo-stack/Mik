"use client";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Glowing dot indicator */}
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-[#00d4ff] glow-dot" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#00d4ff] blur-sm" />
          </div>
          
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Jarvis
            </h1>
            <p className="text-xs text-gray-400">
              AI Assistant
            </p>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-gray-300">Online</span>
        </div>
      </div>
    </header>
  );
}
