
import { Card } from '@/components/ui/card';
import { Terminal, Activity, Brain, Users, History, Lock } from 'lucide-react';

const features = [
  {
    icon: Terminal,
    title: 'Daily Standup Logging',
    description: 'Answer 3 simple questions every day — what you did, what you will do, and any blockers.',
  },
  {
    icon: Activity,
    title: 'Streak Tracking',
    description: 'Build consistency with daily streaks. Track your longest streak and never miss a day.',
  },
  {
    icon: Users,
    title: 'Team Workspaces',
    description: 'Create a workspace, invite your team, and see everyone\'s standup in one feed.',
  },
  {
    icon: Brain,
    title: 'Blocker Alerts',
    description: 'Workspace admins get instant email alerts when a team member reports a blocker.',
  },
  {
    icon: History,
    title: 'Weekly Reports',
    description: 'Automatic weekly digest every Sunday summarizing team activity and blockers.',
  },
  {
    icon: Lock,
    title: 'Role Based Access',
    description: 'Super admin, workspace admin, and member roles with fine grained permissions.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-32 px-4 sm:px-0" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 sm:gap-4 mb-12 sm:mb-20">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            Built for Builders
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Everything you need to ship faster.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 sm:p-8 hover:bg-secondary/5 transition-colors cursor-default border border-border"
            >
              <feature.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary mb-4 sm:mb-6" />
              <h4 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-foreground">{feature.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
