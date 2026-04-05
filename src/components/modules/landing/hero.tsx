import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-20 sm:pt-32 pb-16 sm:pb-24 overflow-hidden px-4 sm:px-0">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center relative z-10">
        <div className="flex flex-col gap-6 sm:gap-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight sm:leading-[1.1] text-foreground text-balance">
            Your daily standup,{" "}
            <span className="text-primary">finally organized</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
            Stop chasing updates across Slack threads and endless meetings. DevLog centralizes your team&apos;s daily standups into one clean, organized workspace.;
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 w-full sm:w-auto"
            >
              <Play className="w-4 h-4" />
              View Demo
            </Button>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
            {/* <Image
              alt="Dashboard Mockup"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBn1513YJp0q4dgBCgnEhXMUmrl2ORDB7E-zDRmBY8eI-uLllVOsdl3qgXb2xNcwfKzTFHwWcyjUuL0GQaeKtQZQR9tzPBbWm1ryCHoHzm0Dmob4FSyYutJpawHU1CbUTAHf7kuScUxhH4FNSXe0gguNnmW36MIw2Nf9pFeIKVpX1IdJcF-7dK6S7oqHnYAmdFwDKfQPaTDsvceg3PTxsqtntA1uoLb_I0BhaOauk4HMmsKp4an_W4y-Hewni5MoEOomI_5ZRga_0"
              width={1400}
              height={1000}
              className="w-full h-full object-cover"
              priority
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
