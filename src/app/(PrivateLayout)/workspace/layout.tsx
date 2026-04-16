import { WorkspaceHeader } from "@/components/modules/(workspace)/ui/header";
import { WorkspaceSidebar } from "@/components/modules/(workspace)/ui/sidebar";
import React from "react";

const WorkspaceLayout = async ({ children }: { children: React.ReactNode }) => {
  
  return (
    <section className="flex flex-col lg:flex-row">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block">
        <WorkspaceSidebar />
      </div>
      <div className="flex flex-col flex-1 lg:ml-64">
        <WorkspaceHeader />
        {children}
      </div>
    </section>
  );
};

export default WorkspaceLayout;
