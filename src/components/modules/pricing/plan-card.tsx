'use client';

import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

interface Feature {
  title: string;
  fullWidth?: boolean;
}

const features: Feature[] = [
  { title: 'Unlimited projects' },
  { title: 'Advanced AI Summaries' },
  { title: 'Unlimited history' },
  { title: 'Custom Slack & Discord bot' },
  { title: 'Enterprise-grade security & SOC2 readiness', fullWidth: true },
];

export function PlanCard() {
  return (
    <div className="space-y-8">
      <div className="bg-surface-container rounded-xl overflow-hidden p-8 relative">
        {/* Left accent border */}
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400"></div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-5xl font-black text-on-surface">$20</span>
          <span className="text-on-surface-variant font-medium">/ month per user</span>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${feature.fullWidth ? 'md:col-span-2' : ''}`}
            >
              <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-on-surface">{feature.title}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button className="w-full py-6 px-6 rounded-lg bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-lg flex items-center justify-center gap-3 transition-all">
          <span>Pay with Stripe</span>
          <ArrowRight className="w-5 h-5" />
        </Button>

        {/* Security Info */}
        <p className="mt-6 text-center text-xs text-outline font-medium tracking-wide uppercase">
          Secure 256-bit SSL Encrypted Payment
        </p>
      </div>

      {/* Info Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-outline">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-outline flex-shrink-0" />
          <span className="text-xs font-medium">Cancel anytime</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-outline flex-shrink-0" />
          <span className="text-xs font-medium">Tax compliant</span>
        </div>
      </div>
    </div>
  );
}
