"use client";

import { OverviewStats } from "../../(workspace)/dashboard/overview-stats";
import { TeamGrid } from "../../(workspace)/dashboard/team-grid";

const TeamWrapper = () => {

  return (
    <main className="pl-64 pt-16 min-h-screen">
      <div className="p-10 max-w-[1400px] mx-auto">
        <OverviewStats />
        <TeamGrid />
      </div>
    </main>
  );
};

export default TeamWrapper;
