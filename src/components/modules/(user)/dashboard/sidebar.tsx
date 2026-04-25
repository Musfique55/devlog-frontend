"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth.services";
import { LayoutDashboard, FileText, Users, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Sidebar() {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "logs",
      label: "My Logs",
      icon: FileText,
      href: "/dashboard/my-logs",
    },
    { id: "team", label: "Team", icon: Users, href: "/dashboard/team" },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  const pathname = usePathname();
  const router = useRouter();

  const activeItem = navItems.find((item) => item.href === pathname)?.id;

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response.success) {
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-900/50 backdrop-blur-xl flex flex-col py-8 px-4 z-50 border-r border-zinc-800/20">
      {/* Logo */}
      <Link href={"/"}className="mb-10 px-4">
        <h1 className="text-xl font-bold tracking-tighter text-indigo-400">
          DevLog
        </h1>
        <p className="text-sm font-medium text-zinc-500 tracking-tight">
          Developer Workspace
        </p>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "text-indigo-400 font-semibold bg-indigo-500/5 border-r-2 border-indigo-400"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
        <Button  className={`w-full justify-start bg-transparent flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200  text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 cursor-pointer`} onClick={() => handleLogout()}><LogOut /> Logout</Button>
      </nav>

      {/* Create Log Button */}
      <div className="mt-auto px-4">
        <Link href={"/dashboard#create-log"}>
          <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-500/20 cursor-pointer transition-colors">
            Create Log
          </Button>
        </Link>
      </div>
    </aside>
  );
}
