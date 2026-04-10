'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending';
}

const invoices: Invoice[] = [
  {
    id: '1',
    date: 'Sep 12, 2024',
    amount: '$24.00',
    status: 'paid',
  },
  {
    id: '2',
    date: 'Aug 12, 2024',
    amount: '$24.00',
    status: 'paid',
  },
];

export default function BillingSection() {
  return (
    <section className="relative" id="billing">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-2">Plan & Billing</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Manage your subscription, payment methods, and view your transaction history.
          </p>
        </div>
        <div className="w-full md:w-2/3 space-y-6">
          {/* Plan Card */}
          <div className="bg-zinc-900/40 rounded-xl p-8 border border-l-4 border-l-indigo-500 border-zinc-800/50">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/30">
                    Current Plan
                  </span>
                  <h4 className="font-bold text-2xl text-zinc-100">Developer Pro</h4>
                </div>
                <p className="text-sm text-zinc-400">$24/month • Billed annually</p>
              </div>
              <Button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold">
                Upgrade Plan
              </Button>
            </div>
            <div className="bg-zinc-950/40 rounded-lg p-4 flex items-center justify-between border border-zinc-800/30">
              <div className="flex items-center gap-3">
                <span className="text-indigo-400">ℹ️</span>
                <span className="text-xs text-zinc-400">
                  Next billing cycle starts on{' '}
                  <span className="text-zinc-200 font-medium">October 12, 2024</span>
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">
                Manage Payment
              </Button>
            </div>
          </div>

          {/* Invoice History */}
          <div className="bg-zinc-900/40 rounded-xl overflow-hidden border border-zinc-800/50">
            <div className="px-8 py-6 border-b border-zinc-800/30">
              <h4 className="font-bold text-sm text-zinc-100">Invoice History</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-zinc-500 border-b border-zinc-800/20">
                    <th className="px-8 py-4 font-medium">Date</th>
                    <th className="px-8 py-4 font-medium">Amount</th>
                    <th className="px-8 py-4 font-medium">Status</th>
                    <th className="px-8 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/20">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-zinc-800/20 transition-colors">
                      <td className="px-8 py-4 text-zinc-300">{invoice.date}</td>
                      <td className="px-8 py-4 font-medium text-zinc-100">{invoice.amount}</td>
                      <td className="px-8 py-4">
                        <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">
                          <Download className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
