
import { Navigation } from "@/components/modules/navbar/navbar"
import { Footer } from "@/components/ui/footer"

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>
    <Navigation />
    {children}
    <Footer />
    </section>
}