"use client";

import UserProfilePopover from "@/components/shared/user-profile-popover";
import { getUserInfo } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";
import { Bell, HelpCircle } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  title?: string;
  onSearch?: (value: string) => void;
}

export function Header({ title = "Dashboard" }: HeaderProps) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await getUserInfo();
      return res.data;
    },
  });

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/20 flex justify-between items-center px-4 md:px-8 z-40 transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        {/* Spacer for the mobile menu button (which is fixed at left-4) */}
        <div className="w-10 lg:hidden" /> 
        
        <h2 className="text-base md:text-lg font-bold text-zinc-100 tracking-tight truncate">
          {title}
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-6">
        <button className="text-zinc-400 hover:text-zinc-100 transition-colors hidden sm:block">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="relative text-zinc-400 hover:text-zinc-100 transition-colors">
          <Bell className="w-5 h-5" />
          {/* Optional: Small notification dot */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full border-2 border-zinc-950"></span>
        </button>

        {/* User Profile */}
        <div className="ml-1 md:ml-0">
          {user && user?.image ? (
            <UserProfilePopover>
              <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-indigo-500/20 cursor-pointer">
                <Image
                  src={user.image}
                  alt="User profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            </UserProfilePopover>
          ) : (
            <UserProfilePopover>
              <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:bg-amber-700 transition-colors">
                <p>{user?.name?.[0] || "U"}</p>
              </div>
            </UserProfilePopover>
          )}
        </div>
      </div>
    </header>
  );
}