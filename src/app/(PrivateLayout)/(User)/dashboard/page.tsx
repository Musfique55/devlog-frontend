import DashboardWrapper from "@/components/modules/(user)/dashboard/dashboard-wrapper";
import { getMyInfo } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function DashboardPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["my-dashboard-info"],
    queryFn: getMyInfo,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardWrapper />
    </HydrationBoundary>
  );
}
