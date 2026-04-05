import { Card } from '@/components/ui/card';
import Image from 'next/image';

const testimonials = [
  {
    quote:
      'DevLog has completely changed our standup culture. We spend less time talking about what we did and more time solving problems.',
    author: 'Alex Rivera',
    role: 'Lead Dev at FinTech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBz20kb8PPpsajs5uuho6A1jQcA4LwPYaZB73FhOZv1fvknlATSFz6alrZqr2v-Lt3D_Ef2tC5iKSCu5vksA8Ug9zVBOyQA8hnVgMukzXDOlQoA-I8xbTT5SQ2myPyVYPEeL0rPv4EdvZSFN8-MjTBXGWO-dEIg6xN1n-5kwfteL7384lkU3BfdrqCCNoWZYDzuwcIYKFCWpIiFkIQf4AJ3Ply_UAyKpeXAwfQRPddofF3YD9sknga-niBD8kuAa5a3bSikEXfcpQ',
  },
  {
    quote:
      'The CLI integration is perfect. I can push my logs without ever switching tabs. It\'s the first tool that actually fits my workflow.',
    author: 'Sarah Chen',
    role: 'CTO at GrowthPulse',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg7GGGWmnLfnWsVa7wekCLPHTe-7iafwsWQDkzU2eLr1mkXr8sUe0Wq5y8XlNeVju3gadwTBlO8UMDt-JN5Atu-T1VUh9nmbNprzzTqVZKEr5QOF2DeF4KIWd_4vP2r9ZfVlhcP0ci8EfLC0PAJL2RJ7nCrhmmxyYVJaVqmWvAuIvvJ9iIivBPoLkYlPR000TykIDfwDQltoGoFWUlYD-ETnui9Cou5c7waObYln_Uw2tDiZxENOnmQwGloXg7sFmuNtNOeGpCI-M',
  },
  {
    quote:
      'Managing a remote team is hard. DevLog gives me the visibility I need without micro-managing my engineers. Absolute game changer.',
    author: 'James Wilson',
    role: 'Engineering Manager',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0PWlXaPMcZh13EBWE1gjnr2aLQi89BMVi_vCbYcScpVM38xvgzZ7882bD0EEjZLdMohUYbRwXI4gvjSE2da1AB-2KiJpzgfS21HzJZ-VQHn9ONVKLsfTkbOAhf5HcafjaLE7hNS0PYmPGSFb3OIJVkjOy-UkVy7ubcQ9FcotZUW3eU7M5eIUPJVfY2KAV1uOP57wt48ejDq4S5FJPHwHTD7ttkoCRpFlvecMatT6TupmK2ZRQ5vksjR3VjaUPkqgcJSWES6J3lSM',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-32 overflow-hidden px-4 sm:px-0">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-12 sm:mb-20 text-foreground">
          Loved by developers worldwide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 border-border">
              <p className="text-sm sm:text-base text-muted-foreground italic leading-relaxed">&quot;{testimonial.quote}&quot;</p>
              <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border">
                {/* <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={40}
                  height={40}
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full object-cover flex-shrink-0"
                /> */}
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-foreground truncate">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider truncate">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
