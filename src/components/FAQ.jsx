import React, { useState } from 'react';
import Reveal from './Reveal';

const faqs = [
  {
    question: "How does the AI judge soft skills?",
    answer: "Our AI analyzes communication patterns, clarity of thought, and empathy markers in your responses. It looks for structured thinking and how well you can explain complex technical concepts."
  },
  {
    question: "Is my performance data private?",
    answer: "Absolutely. Your ATP scorecard is private to you until you choose to share it with a recruiter. We do not sell your data to third parties."
  },
  {
    question: "Can I retake interviews if I'm not satisfied?",
    answer: "Yes! Froscel is designed for growth. You can retake practice interviews to improve your score. However, official job application interviews may have specific retake policies set by the employer."
  },
  {
    question: "Do I need to install any software?",
    answer: "No. Froscel runs entirely in your browser. You get a full IDE, video interface, and whiteboard without any downloads."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 relative" id="faq">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white chapter-title">
              Frequently Asked Questions
            </h2>
          </div>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Reveal key={index} delay={index * 50}>
              <div className="border border-stone-200 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900 overflow-hidden transition-all hover:border-primary/30">
                <button 
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-bold text-stone-900 dark:text-white text-lg">{faq.question}</span>
                  <span className={`material-symbols-outlined text-stone-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 text-stone-600 dark:text-stone-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
