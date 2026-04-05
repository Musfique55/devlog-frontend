import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    description: 'For solo developers getting started.',
    price: '$0',
    period: '/mo',
    features: [
      'Solo standup logging',
      'Streak tracking',
      '30 days log history',
      'Up to 2 project tags',
      'Join team workspaces',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    description: 'For teams who want full collaboration.',
    price: '$20',
    period: '/mo',
    features: [
      'Everything in Free',
      'Create unlimited workspaces',
      'Invite team members',
      'Blocker alerts via email',
      'Weekly team reports',
      'Unlimited log history',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section className="py-16 sm:py-32 bg-secondary/5 px-4 sm:px-0" id="pricing">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground">Transparent Pricing</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Choose the plan that fits your team&apos;s growth.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-6 sm:p-10 flex flex-col gap-6 sm:gap-8 relative border ${
                plan.highlighted ? 'border-primary ring-1 ring-primary' : 'border-border'
              }`}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs">
                  Most Popular
                </Badge>
              )}
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-foreground">{plan.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-bold text-foreground">{plan.price}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="flex flex-col gap-3 sm:gap-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-xs sm:text-sm text-foreground">
                    <Check className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full mt-auto ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-primary to-primary/80 hover:opacity-90'
                    : ''
                }`}
                variant={plan.highlighted ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
