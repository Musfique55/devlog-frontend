'use client';


import { MemberTable } from '@/components/modules/(workspace)/admin-dashboard/member-overview';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';

const mockAlerts = [
  {
    id: '1',
    title: 'Marcus Thorne is BLOCKED',
    description: 'Issue with RDS config in production environment.',
    timestamp: '14m ago',
    severity: 'critical' as const,
  },
  {
    id: '2',
    title: 'Neural Engine v2 failed',
    description: 'Deployment rollback initiated automatically.',
    timestamp: '1h ago',
    severity: 'critical' as const,
  },
  {
    id: '3',
    title: 'New Member Onboarded',
    description: 'Elena Vance joined the architecture team.',
    timestamp: '3h ago',
    severity: 'info' as const,
  },
];

const mockMembers = [
  {
    id: '1',
    name: 'Elena Vance',
    email: 'elena.v@devflow.io',
    role: 'Lead',
    streak: '14 Days 🔥',
    lastLog: '12 mins ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop',
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    email: 'm.thorne@devflow.io',
    role: 'Senior',
    streak: '7 Days',
    lastLog: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop',
  },
  {
    id: '3',
    name: 'Sophia Chen',
    email: 's.chen@devflow.io',
    role: 'Developer',
    streak: '3 Days',
    lastLog: '5 hours ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop',
  },
  {
    id: '4',
    name: 'James Rodriguez',
    email: 'j.rodriguez@devflow.io',
    role: 'Developer',
    streak: '21 Days 🔥',
    lastLog: '30 mins ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop',
  },
];

export default function WorkspaceAdminPage() {
  return (
    <div className="flex h-screen bg-background">
    

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
      {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full space-y-12">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-background leading-none mb-4">
                Workspace Administration
              </h1>
              <p className="text-zinc-500 font-medium tracking-tight">
                Real-time governance and team metrics for DevLog core team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button variant="outline" className="border-outline-variant/15 bg-surface-container-highest hover:bg-surface-variant">
                Export Reports
              </Button>
              <Button className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold shadow-lg shadow-primary/10">
                Invite Member
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          

         
          {/* Member Table */}
          <MemberTable members={mockMembers} />
        </main>
      </div>
    </div>
  );
}
