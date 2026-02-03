import React from 'react';
import Reveal from './Reveal';

export default function Testimonials() {
  const testimonials = [
    {
      role: 'Candidate',
      quote: "The system design evaluation was brutally honest but incredibly helpful. I realized my caching strategies were outdated.",
      author: "Yeshwanth Damarla",
      position: "Senior Engineer",
      avatarColor: "bg-purple-100 text-purple-600"
    },
    {
      role: 'Recruiter',
      quote: "Froscel's ATP score is the only metric I trust now. It saved us weeks of screening time for our backend roles.",
      author: "Rahul",
      position: "Talent Acquisition Lead",
      avatarColor: "bg-blue-100 text-blue-600"
    },
    {
      role: 'Candidate',
      quote: "I appreciated how the AI adapted to my code style instead of forcing a specific pattern. It felt natural.",
      author: "Vasanth Kumar",
      position: "Frontend Developer",
      avatarColor: "bg-green-100 text-green-600"
    },
    {
      role: 'Recruiter',
      quote: "We found a hidden gem who didn't have a 'top tier' college on their resume but outcoded everyone else.",
      author: "Venkat",
      position: "CTO @ StartupX",
      avatarColor: "bg-amber-100 text-amber-600"
    },
    {
      role: 'Candidate',
      quote: "No anxiety about the interviewer judging me immediately. I could think clearly and perform my best.",
      author: "Jack",
      position: "Full Stack Dev",
      avatarColor: "bg-red-100 text-red-600"
    },
    {
      role: 'Recruiter',
      quote: "The consistency is unmatched. Every candidate gets the exact same rigorous standard of evaluation.",
      author: "Kiran",
      position: "HR Manager",
      avatarColor: "bg-cyan-100 text-cyan-600"
    },
    {
      role: 'Candidate',
      quote: "Getting an instant detailed report after the interview was a game changer for my preparation.",
      author: "Sai",
      position: "Backend Engineer",
      avatarColor: "bg-indigo-100 text-indigo-600"
    }
  ];

  // Duplicate the list for seamless infinite scroll
  const scrollingTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 overflow-hidden bg-stone-50 dark:bg-stone-950/50">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-white chapter-title mb-4">
            Trusted by early adopters.
          </h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
            See what candidates and recruiters are saying about the new standard in technical hiring.
          </p>
        </Reveal>
      </div>

      <div className="relative w-full">
        {/* Gradient Masks for smooth fade out at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-stone-50 dark:from-stone-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-stone-50 dark:from-stone-950 to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-scroll hover:pause gap-8 w-max px-6">
          {scrollingTestimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm relative w-[400px] shrink-0"
            >
              <span className="absolute top-8 right-8 text-6xl text-stone-100 dark:text-stone-800 font-serif leading-none">"</span>
              
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${testimonial.role === 'Candidate' ? 'bg-orange-50 text-orange-600' : 'bg-stone-100 text-stone-600'}`}>
                {testimonial.role}
              </div>
              
              <p className="text-stone-600 dark:text-stone-300 font-medium text-lg mb-8 relative z-10 min-h-[84px]">
                {testimonial.quote}
              </p>
              
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${testimonial.avatarColor}`}>
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-stone-900 dark:text-white text-sm">{testimonial.author}</div>
                  <div className="text-stone-400 text-xs">{testimonial.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
