import { PlanCard } from "@/components/modules/pricing/plan-card";
import { SummaryCard } from "@/components/modules/pricing/summary-card";


const PricingPage = () => {
    return (
        <div className="flex gap-5 justify-between max-w-7xl mx-auto">
            <PlanCard />
            <SummaryCard />
        </div>
    );
};

export default PricingPage;