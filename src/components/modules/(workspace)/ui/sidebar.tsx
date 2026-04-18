"use client";

import { Button } from "@/components/ui/button";
import { Workspace } from "@/hooks/useWorkspace";
import { Plus, Briefcase, TrendingUp, Settings, Grid } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { WorkspaceSidebarSkeleton } from "./sidebar-skeleton";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { StandupForm } from "../../(user)/dashboard/standup-form";
import { useQuery } from "@tanstack/react-query";
import { getWorkspace } from "@/services/workspace.services";

interface WorkspaceResponse {
  data: Workspace;
  message: string;
  success: boolean;
}

export function WorkspaceSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { id } = useParams();
  const { data: workspace, isLoading } = useQuery<WorkspaceResponse>({
    queryKey: ["workspace", id],
    queryFn:  () =>  getWorkspace(id as string),
    staleTime: Infinity,
    retry: false,
  });

  if (isLoading) {
    return <WorkspaceSidebarSkeleton />;
  }

  const navItems = [
    ...(workspace?.data?.userRole
      ? [
          {
            icon: Grid,
            label: "Dashboard",
            href: `/workspace/${id}/admin-dashboard`,
          },
        ]
      : []),
    { icon: TrendingUp, label: "Activity", href: `/workspace/${id}/activity` },
    { icon: Briefcase, label: "Workspaces", href: "/dashboard/team" },
    { icon: Settings, label: "Settings", href: `/workspace/${id}/settings` },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low dark:bg-surface-container-low flex flex-col py-4 sm:py-6 px-3 sm:px-4 z-50 transition-all duration-200 border-r border-white/5">
      {/* Logo */}
      <div className="mb-6 sm:mb-10 px-2">
        <h1 className="text-base sm:text-lg font-bold tracking-tighter text-primary">
          DevLog
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map(
          (item) =>
            item && (
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
            ),
        )}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto px-2">
        <Button
          onClick={() => setOpen(!open)}
          className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-lg py-2 sm:py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-xs sm:text-sm"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline">New Log</span>
        </Button>
      </div>

      {open && (
        <Modal title="create-log" open={open} setOpen={setOpen}>
          <StandupForm workspaceId={id as string} />
        </Modal>
      )}
    </aside>
  );
}
