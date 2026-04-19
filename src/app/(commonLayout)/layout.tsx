import { Navigation } from "@/components/modules/navbar/navbar";
import { Footer } from "@/components/ui/footer";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navigation />
      <div className="lg:pt-20 pt-32 lg:pb-16 pb-24 overflow-hidden lg:px-4 px-0">{children}</div>
      <Footer />
    </section>
  );
}
