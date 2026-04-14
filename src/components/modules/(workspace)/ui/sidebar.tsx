"use client";

import { Button } from "@/components/ui/button";
import useWorkspace from "@/hooks/useWorkspace";
import { getWorkspace } from "@/services/workspace.services";
import { useQuery } from "@tanstack/react-query";
import {
  Plus,
  Briefcase,
  TrendingUp,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function WorkspaceSidebar() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const navItems = [
    { icon: TrendingUp, label: "Activity", href: `${pathname}` },
    { icon: Briefcase, label: "Workspaces", href: "/dashboard/team", },
    { icon: Settings, label: "Settings", href: `${pathname}/settings` },
  ];

  const {data : workspace} = useWorkspace(id as string);


  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low dark:bg-surface-container-low flex flex-col py-4 sm:py-6 px-3 sm:px-4 z-50 transition-all duration-200 border-r border-white/5">
      {/* Logo */}
      <div className="mb-6 sm:mb-10 px-2">
        <h1 className="text-base sm:text-lg font-bold tracking-tighter text-primary">
          Indigo Terminal
        </h1>
        <p className="text-[9px] sm:text-[10px] font-medium tracking-widest text-zinc-600 uppercase">
          v2.4.0
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 font-semibold transition-colors duration-200 text-xs sm:text-sm rounded-lg ${
              pathname.endsWith(item.href.split("/").pop() as string)
                ? "text-primary bg-primary/10 border-r-2 border-primary"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-surface-container"
            }`}
          >
            <item.icon className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto px-2">
        <Button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-lg py-2 sm:py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-xs sm:text-sm">
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline">New Log</span>
        </Button>
      </div>
    </aside>
  );
}
