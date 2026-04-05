
import { Zap, Sparkles, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Zap,
    title: '1. Log Your Standup',
    description: 'Answer 3 simple questions daily — what you did, what you will do, and any blockers.',
  },
  {
    icon: Sparkles,
    title: '2. Track Your Streak',
    description: 'Build consistency with streak tracking. See your progress on the activity calendar.',
  },
  {
    icon: Rocket,
    title: '3. Collaborate With Your Team',
    description: 'Invite teammates to your workspace. Get blocker alerts and weekly reports automatically.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-32 bg-secondary/5 px-4 sm:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 sm:gap-4 mb-12 sm:mb-20 text-center items-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            The Workflow of Champions
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
            Three simple steps to automate your team&apos;s reporting and focus on what matters.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-4 sm:gap-6">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-secondary flex items-center justify-center border border-border flex-shrink-0">
                <step.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
