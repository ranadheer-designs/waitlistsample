import React from 'react';
import Reveal from './Reveal';
import ParallaxBlob from './ParallaxBlob';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
      <ParallaxBlob />
      
      <div className="max-w-4xl text-center space-y-8 relative z-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-[10px] sm:text-xs font-black tracking-widest uppercase">
            The Future of Interviewing
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-[800] leading-[1.1] md:leading-[1.05] chapter-title text-stone-900 dark:text-white tracking-tight">
            Prove skills. <br/><span className="text-primary">Hire with clarity.</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-base sm:text-lg md:text-xl text-stone-500 dark:text-stone-400 font-medium max-w-2xl mx-auto leading-relaxed px-4">
            A smarter, more human way to interview — powered by AI. Experience the hiring platform that understands potential beyond keywords.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 px-4 w-full sm:w-auto">
            <a className="w-full sm:w-auto whitespace-nowrap bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 text-lg active:scale-[0.98]" href="#waitlist">Request Early Access</a>
            <a className="w-full sm:w-auto whitespace-nowrap px-8 py-4 rounded-xl text-stone-600 font-bold hover:text-stone-900 transition-colors border border-transparent hover:border-stone-200 active:scale-[0.98]" href="#features">See how it works ↓</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
