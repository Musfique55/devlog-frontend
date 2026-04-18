import { WorkspaceHeader } from "@/components/modules/(workspace)/ui/header";
import { WorkspaceSidebar } from "@/components/modules/(workspace)/ui/sidebar";
import { getWorkspace } from "@/services/workspace.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const WorkspaceLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["workspace", id],
    queryFn: () => getWorkspace(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
};

export default WorkspaceLayout;
