"use client";

import { useAuth } from "@/hooks/useAuth";
import { Search, Bell, HelpCircle } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  title?: string;
  onSearch?: (value: string) => void;
}

export function Header({ title = "Dashboard", onSearch }: HeaderProps) {
  const {data : user} = useAuth();

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/20 flex justify-between items-center px-8 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-lg font-bold text-zinc-100 tracking-tight">
          {title}
        </h2>

        {/* Search Bar */}
        <div className="ml-8 relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search logs..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 ring-1 ring-white/5 rounded-full py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all text-zinc-100 placeholder:text-zinc-600"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <button className="text-zinc-400 hover:text-zinc-100 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="text-zinc-400 hover:text-zinc-100 transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* User Profile */}
        {user && user?.image ? (
          <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-indigo-500/20">
            <Image
              src={user.image}
              alt="User profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-xl object-cover hover:grayscale-0 transition-all duration-300 bg-amber-800 flex items-center justify-center text-white font-bold text-2xl">
            <p>{user?.name[0]}</p>
          </div>
        )}
      </div>
    </header>
  );
}
