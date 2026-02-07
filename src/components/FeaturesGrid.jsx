import React from 'react';
import Reveal from './Reveal';

export default function FeaturesGrid() {
  const features = [
    {
      icon: 'psychology',
      title: 'Real-world Scenarios',
      description: 'Ditch the LeetCode grind. Solve actual engineering problems in a realistic IDE environment.'
    },
    {
      icon: 'grading',
      title: 'Instant Feedback',
      description: 'Get detailed, actionable feedback on your code quality, system design choices, and communication style immediately.'
    },
    {
      icon: 'security',
      title: 'Anti-Cheating',
      description: 'Advanced proctoring ensures integrity. Our AI detects anomalies to guarantee fair play for everyone.'
    },
    {
      icon: 'diversity_3',
      title: 'Bias Elimination',
      description: 'Standardized scoring matrices remove unconscious bias, focusing purely on demonstrated skills.'
    },
    {
      icon: 'hub',
      title: 'Integration Ready',
      description: 'Seamlessly syncs with your ATS. Push candidates directly to your existing hiring pipeline.'
    },
    {
      icon: 'analytics',
      title: 'Deep Analytics',
      description: 'Track time-to-hire, pass rates, and candidate quality trends with our comprehensive dashboard.'
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="features">
       <div className="blurry-gradient absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-stone-200 dark:bg-stone-800 rounded-full opacity-30"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white chapter-title">
              Built for the <span className="text-primary">modern</span> hiring stack.
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Everything you need to verify talent and streamline your process, all in one platform.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-primary/50 transition-all hover:-translate-y-1 duration-300 shadow-xl shadow-stone-200/20 dark:shadow-none">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-stone-800 dark:to-stone-800 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
