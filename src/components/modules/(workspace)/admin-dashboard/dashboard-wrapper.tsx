"use client";

import { Button } from "@/components/ui/button";
import { MemberTable } from "./member-overview";

import { AlertTriangle, Calendar } from "lucide-react";
import { WorkspaceAdminStatCard } from "./stat-card";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceStats } from "@/services/workspace.services";
import { getWorkspaceLogs, Log } from "@/services/standupLogs.services";
import { TeamAlerts } from "./team-alert";
import TeamHealthHeatmap from "./team-health-heat-map";

interface WorkspaceStats {
  totalLogs: number;
  totalBlockers: number;
  complianceRate: number;
}

const AdminDashboardWrapper = ({ id }: { id: string }) => {
  const { data: workspaceStats } = useQuery<WorkspaceStats>({
    queryKey: ["workspace-stats", id],
    queryFn: async () => {
      const res = await getWorkspaceStats(id);
      return res.data;
    },
  });

  const { data: workspaceLogs } = useQuery<Log[]>({
    queryKey: ["workspace-logs", id],
    queryFn: async () => {
      const res = await getWorkspaceLogs(id);
      return res.data;
    },
  });

  const blockedLogs = workspaceLogs?.filter(
    (log) => log.blocker && log.blockerStatus === "OPEN",
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full space-y-12">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-background leading-none mb-4">
                Workspace Administration
              </h1>
              <p className="text-zinc-500 font-medium tracking-tight">
                Real-time governance and team metrics for DevLog core team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="border-outline-variant/15 bg-surface-container-highest hover:bg-surface-variant"
              >
                Export Reports
              </Button>
              <Button className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold shadow-lg shadow-primary/10">
                Invite Member
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 ">
            <WorkspaceAdminStatCard
              label="Active Blockers"
              value={workspaceStats?.totalBlockers || 0}
              //   subtext="3 issues pending more than 24 hours."
              trend="Critical"
              trendColor="text-tertiary"
              icon={
                <AlertTriangle className="w-5 h-5 text-tertiary-container" />
              }
              variant="warning"
            />

            <WorkspaceAdminStatCard
              label="Log Compliance"
              value={`${workspaceStats?.complianceRate}%`}
            >
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[94.2%]"></div>
              </div>
            </WorkspaceAdminStatCard>

            <WorkspaceAdminStatCard
              label="Total Standups (Week)"
              value={workspaceStats?.totalLogs || 0}
              subtext="Across 14 active projects."
              icon={<Calendar className="w-5 h-5 text-zinc-400" />}
            />
          </div>

          {/* Recent Team Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="col-span-2">
              <TeamHealthHeatmap />
            </div>
            {blockedLogs && blockedLogs.length && (
              <TeamAlerts alerts={blockedLogs} />
            )}
          </div>

          {/* Member Table */}
          {<MemberTable id={id} />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardWrapper;
