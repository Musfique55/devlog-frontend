import { Header } from "@/components/modules/(user)/dashboard/header"
import { Sidebar } from "@/components/modules/(user)/dashboard/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>
    <Sidebar />
    <Header />
    {children}
    </section>
}