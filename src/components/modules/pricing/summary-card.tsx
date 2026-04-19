'use client';

import { Sparkles } from 'lucide-react';

export function SummaryCard() {
  return (
    <div className="lg:col-span-5 space-y-8">
      {/* Main Summary */}
      <div className="bg-surface-container-low rounded-xl p-8 border border-zinc-800/50">
        <h2 className="text-sm font-bold tracking-widest text-outline uppercase mb-8">Summary</h2>

        <div className="space-y-6">
          {/* Plan */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-on-surface font-semibold">Pro Architecture</p>
              <p className="text-xs text-outline">Monthly Subscription</p>
            </div>
            <p className="text-on-surface font-mono">$20.00</p>
          </div>

          {/* Seats */}
          <div className="flex justify-between items-center">
            <p className="text-on-surface-variant">Active Seats</p>
            <p className="text-on-surface font-mono">01</p>
          </div>

          {/* Total */}
          <div className="pt-6 border-t border-zinc-800/50 space-y-4">
            <div>
              <p className="text-xs text-outline uppercase tracking-wider font-bold">Total Due Today</p>
              <p className="text-3xl font-black text-indigo-400 mt-2">$20.00</p>
            </div>
            <p className="text-[10px] text-outline leading-tight">
              Plus applicable taxes based on region
            </p>
          </div>
        </div>
      </div>

      {/* AI Agent Card */}
      <div className="p-4 bg-surface-container-highest rounded-lg border border-indigo-500/10 flex items-start gap-4">
        <div className="w-12 h-12 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">AI Agent Active</p>
          <p className="text-[10px] text-on-surface-variant mt-1">Unlock autonomous code summaries instantly.</p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-outline leading-relaxed text-center lg:text-left">
        By completing your purchase, you agree to DevLog Pro&apos;s{' '}
        <a href="#" className="text-indigo-400 hover:underline transition-colors">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-indigo-400 hover:underline transition-colors">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
