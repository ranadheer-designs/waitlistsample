import React from 'react';
import Reveal from './Reveal';


export default function HowItWorks() {
  return (
    <>
      {/* Chapter 01 - Candidates */}
      <section className="relative py-32 px-6 overflow-hidden" id="candidates">
        <div className="blurry-gradient absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200 rounded-full"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <Reveal>
              <div className="text-primary font-bold text-sm tracking-widest uppercase">Chapter 01 — For Candidates</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white chapter-title leading-tight">
                Your skills speak <br/>louder than resume.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                No more ghosting or keyword filters. Take an AI-guided technical interview, earn your comprehensive ATP (Verified Ability to Perform) Scorecard, and apply to top companies with a profile that proves you can do the job.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">mic</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white">AI Technical Interview</h4>
                    <p className="text-sm text-stone-500">Conversational assessment of your problem-solving process.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-amber-600">badge</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white">Get your ATP Profile</h4>
                    <p className="text-sm text-stone-500">A verified scorecard showcasing your true capabilities.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          
          <div className="flex-1 w-full relative">
            <Reveal delay={400}>
              <div className="relative rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-[0_32px_64px_-16px_rgba(249,115,22,0.12)] p-8">
                  <div className="flex items-center gap-4 mb-8 border-b border-stone-100 dark:border-stone-800 pb-6">
                    <img src="/avatar_satya.png" alt="Satya Pichai" className="w-16 h-16 rounded-2xl object-cover" />
                    <div>
                      <h3 className="text-xl font-bold dark:text-white">Satya Pichai</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[14px]">verified</span> Verified ATP
                    </span>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-3xl font-black text-primary">9.2</div>
                    <div className="text-[10px] text-stone-400 uppercase font-bold">Total Score</div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-500 uppercase mb-2">
                      <span>System Design</span>
                      <span>9.5/10</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[95%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-500 uppercase mb-2">
                      <span>Algorithm Optimization</span>
                      <span>8.8/10</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 w-[88%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-500 uppercase mb-2">
                      <span>Code Cleanliness</span>
                      <span>9.2/10</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 w-[92%]"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800">
                  <p className="text-sm italic text-stone-500">"Candidate demonstrates exceptional ability to decouple services in high-load scenarios."</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Chapter 02 - Recruiters */}
      <section className="relative py-32 px-6" id="recruiters">
        <div className="blurry-gradient absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-100 rounded-full"></div>
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-20">
          <div className="flex-1 w-full">
            <Reveal>
              <div className="relative rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl overflow-hidden group">
                <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-stone-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-orange-500 text-sm">analytics</span>
                    </div>
                    <span className="text-stone-300 font-bold">Senior Backend Role</span>
                  </div>
                  <a href="#waitlist" className="text-xs font-bold text-stone-400 hover:text-white transition-colors">View Pipeline →</a>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                      <div className="text-stone-500 text-[10px] uppercase font-bold mb-1">Applications</div>
                      <div className="text-2xl font-bold text-white">428</div>
                    </div>
                    <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                      <div className="text-stone-500 text-[10px] uppercase font-bold mb-1">ATP Qualified</div>
                      <div className="text-2xl font-bold text-amber-400">12</div>
                    </div>
                    <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                      <div className="text-stone-500 text-[10px] uppercase font-bold mb-1">Interviews Saved</div>
                      <div className="text-2xl font-bold text-primary">380h</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-stone-500 uppercase mb-2">Top Matches</div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-stone-900/50 hover:bg-stone-900 border border-stone-800 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                        <span className="text-sm font-bold text-stone-200">Maria S.</span>
                      </div>
                      <span className="text-xs font-bold text-green-400">98% Match</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-stone-900/50 hover:bg-stone-900 border border-stone-800 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
                        <span className="text-sm font-bold text-stone-200">David L.</span>
                      </div>
                      <span className="text-xs font-bold text-green-400">94% Match</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          
          <div className="flex-1 space-y-8">
            <Reveal delay={200}>
              <div className="text-primary font-bold text-sm tracking-widest uppercase">Chapter 02 — For Recruiters</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white chapter-title leading-tight">
                Find the <span className="italic font-serif text-primary">actual</span> top 1% instantly.
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                Skip the resume screening. Post your job and let Froscel's AI co-interviewer assess hundreds of candidates simultaneously. See a ranked list of top-scoring talent based on actual performance, not keywords.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-stone-700 dark:text-stone-300 font-semibold">
                  <span className="material-symbols-outlined text-orange-500">check_circle</span>
                  AI Co-Interviewing at scale
                </li>
                <li className="flex items-center gap-3 text-stone-700 dark:text-stone-300 font-semibold">
                  <span className="material-symbols-outlined text-orange-500">check_circle</span>
                  Bias-free technical ranking
                </li>
                <li className="flex items-center gap-3 text-stone-700 dark:text-stone-300 font-semibold">
                  <span className="material-symbols-outlined text-orange-500">check_circle</span>
                  Reduce time-to-hire by 70%
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
