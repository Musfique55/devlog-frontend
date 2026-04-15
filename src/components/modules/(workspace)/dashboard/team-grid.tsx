"use client";

import { TeamCard } from "./team-card";
import { Code, Plus } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { useAuth } from "@/hooks/useAuth";
import Upgrade from "@/components/ui/upgrade";
import WorkspaceCreationForm from "@/components/shared/form/workspace-creation-form";

interface Team {
  id: string;
  name: string;
  isActive: boolean;
  members: string[];
  logs: string[];
}

export function TeamGrid({ teams }: { teams: Team[] }) {
  const [open, setOpen] = useState(false);
  const { data: user } = useAuth();

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold tracking-tight text-on-surface">
          Your Workspaces
        </h3>
        <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
          <span>Sort by:</span>
          <select className="bg-transparent border-none text-primary font-semibold py-0 focus:ring-0 cursor-pointer">
            <option>Recent Activity</option>
            <option>Alphabetical</option>
            <option>Member Count</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {teams &&
          teams.length &&
          teams.map((team: Team) => (
            <TeamCard
              key={team.id}
              id={team.id}
              icon={<Code />}
              name={team.name}
              status={team.isActive}
              statusColor={"emerald-500"}
              members={team.members.length}
              logsThisWeek={team.logs.length}
            />
          ))}

        {/* Create New Card */}
        <div
          onClick={() => setOpen(!open)}
          className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-outline-variant/20 hover:border-primary/30 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-on-surface-variant group-hover:text-primary" />
          </div>
          <h4 className="text-sm font-bold text-on-surface-variant group-hover:text-on-surface">
            Create New Workspace
          </h4>
          <p className="text-[11px] text-outline text-center mt-2 max-w-[150px]">
            Start a new team and invite collaborators
          </p>
        </div>
      </div>

      {user?.plan === "PRO" && open ? (
        <Modal title="Create Workspace" setOpen={setOpen} open={open}>
          <WorkspaceCreationForm setOpen={setOpen}/>
        </Modal>
      ) : (
        open && (
          <Modal title="Buy Subscription" setOpen={setOpen} open={open}>
            <Upgrade />
          </Modal>
        )
      )}
    </section>
  );
}
