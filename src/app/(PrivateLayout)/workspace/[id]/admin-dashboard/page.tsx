import AdminDashboardWrapper from "@/components/modules/(workspace)/admin-dashboard/dashboard-wrapper";


export default async function WorkspaceAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AdminDashboardWrapper id={id} />;
}
