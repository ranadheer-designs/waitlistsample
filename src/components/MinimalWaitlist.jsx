import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HiringPuzzle from './HiringPuzzle';
import ApplicationDemo from './ApplicationDemo';
import Lenis from 'lenis';

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function MinimalWaitlist() {
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const heroWords = ["opportunity", "possibility", "roles", "careers", "outcomes", "work"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const currentWord = heroWords[currentWordIndex];
      const shouldDelete = isDeleting;
      
      setDisplayText(prev => 
        shouldDelete 
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );

      setTypingSpeed(shouldDelete ? 50 : 150);

      if (!shouldDelete && displayText === currentWord) {
        setTypingSpeed(2000); // Pause at end of word
        setIsDeleting(true);
      } else if (shouldDelete && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % heroWords.length);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, heroWords, typingSpeed]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const [step, setStep] = useState('initial'); // 'initial', 'survey', 'success'

  useEffect(() => {
    if (step === 'survey') {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = 'unset';
    }
  }, [step]);
  const [surveyData, setSurveyData] = useState({
    userType: '',
    source: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('survey');
  };

  const handleSurveySubmit = (e) => {
    e.preventDefault();
    console.log('Survey Submitted:', { email, ...surveyData });
    setStep('success');
    setEmail('');
    setTimeout(() => setStep('initial'), 8000);
  };

  const userTypes = [
    { id: 'job-seeker', label: 'Job Seeker', icon: 'work' },
    { id: 'recruiter', label: 'Recruiter', icon: 'person_search' },
    { id: 'student', label: 'Student', icon: 'school' },
    { id: 'other', label: 'Other', icon: 'more_horiz' },
  ];

  const sources = [
    { id: 'reddit', label: 'Reddit' },
    { id: 'twitter', label: 'Twitter' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'google', label: 'Google' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF9] dark:bg-zinc-950 text-[#2D3436] dark:text-zinc-100 font-display selection:bg-[#4A72B2]/10 selection:text-[#4A72B2] overflow-x-hidden transition-colors duration-500">
      
      {/* Background Orbs (Static) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] size-[80%] bg-[#4A72B2]/5 dark:bg-[#4A72B2]/10 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -left-[10%] size-[60%] bg-[#7A9E7E]/5 dark:bg-[#7A9E7E]/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-6 md:py-10 flex justify-center">
        <header className="w-full max-w-[640px] flex items-center justify-between glass-nav px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-zinc-200/50 dark:border-white/10 shadow-sm transition-all duration-500 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
          <div className="flex items-center gap-2 md:gap-2.5 pl-1 md:pl-2">
            <img src="./logo_transparent.png" alt="Froscel Logo" className="h-4 md:h-6 w-auto brightness-0 dark:invert" />
            <span className="text-[#2D3436] dark:text-white font-black tracking-tight text-sm md:text-base">Froscel</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="size-8 md:size-9 rounded-full flex items-center justify-center bg-zinc-100/50 dark:bg-zinc-800/50 text-[#2D3436] dark:text-white transition-all hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] md:text-[18px]">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button className="bg-[#2D3436] dark:bg-white text-white dark:text-[#2D3436] text-[9px] md:text-[11px] font-black uppercase tracking-widest h-8 md:h-9 px-4 md:px-6 rounded-full transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-black/5">
              Partner
            </button>
          </div>
        </header>
      </nav>

      <main className="flex flex-col items-center w-full pt-32 pb-20">
        
        {/* Hero Section */}
        <section className="editorial-container px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col gap-6 items-center">
            <Reveal delay={0.1}>
              <h1 className="hero-title text-4xl md:text-7xl font-black text-[#2D3436] dark:text-white leading-[1.1] md:leading-[1.05] tracking-tight px-2">
                Connecting people <br className="hidden md:block" />
                to <span className="inline-flex relative italic font-serif font-light text-[#4A72B2]">
                  {displayText}
                  <span className="w-[2px] md:w-[3px] h-[0.9em] bg-[#4A72B2] ml-1 animate-pulse self-center"></span>
                  .
                </span>
              </h1>
            </Reveal>

            <div>
              <Reveal delay={0.2}>
                <p className="text-lg md:text-xl text-[#71717A] dark:text-zinc-400 font-medium leading-relaxed max-w-[640px]">
                  We look past keywords to focus on the candidate behind the application
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.3}>
              <div className="w-full max-w-[500px] md:max-w-[600px] mt-2 md:mt-4 px-4 md:px-0">
                <AnimatePresence mode="wait">
                  {step === 'initial' && (
                    <form key="form" onSubmit={handleSubmit} className="flex flex-col md:flex-row w-full items-stretch md:rounded-full p-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-xl shadow-zinc-200/40 dark:shadow-none focus-within:border-[#4A72B2]/30 transition-all rounded-[2rem]">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" 
                        className="flex-1 bg-transparent px-6 py-4 md:py-0 text-base outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white"
                      />
                      <button type="submit" className="bg-[#7A9E7E] text-white px-8 py-4 md:py-3 rounded-full font-bold transition-all hover:bg-[#7A9E7E]/90 active:scale-95 text-sm md:text-base">
                        Get Early Access
                      </button>
                    </form>
                  )}

                  {step === 'survey' && (
                    <motion.div 
                      key="survey-placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-[#4A72B2]/10 border border-[#4A72B2]/20 rounded-full px-8 py-4 text-[#4A72B2] font-bold flex items-center justify-center gap-3"
                    >
                      <span className="material-symbols-outlined animate-spin">refresh</span>
                      Completing registration...
                    </motion.div>
                  )}

                  {step === 'success' && (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#F4F7F4] border border-[#7A9E7E]/30 rounded-full px-8 py-4 text-[#7A9E7E] font-bold flex items-center justify-center gap-3"
                    >
                      <span className="material-symbols-outlined">check_circle</span>
                      You're on the early access list. Thank you!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Modal Survey Overlay */}
        <AnimatePresence>
          {step === 'survey' && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-[#2D3436] dark:text-white">Help us tailor your experience</h3>
                  <button 
                    onClick={() => setStep('initial')}
                    className="size-8 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-white/5 text-[#2D3436] dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-all"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
                
                <form onSubmit={handleSurveySubmit} className="space-y-8">
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-[#71717A] mb-4">I am a...</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {userTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSurveyData(prev => ({ ...prev, userType: type.id }))}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all gap-2 ${
                            surveyData.userType === type.id 
                              ? 'bg-[#4A72B2] border-[#4A72B2] text-white shadow-lg shadow-[#4A72B2]/20' 
                              : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/5 hover:border-[#4A72B2]/50'
                          }`}
                        >
                          <span className="material-symbols-outlined text-2xl">{type.icon}</span>
                          <span className="text-[10px] font-black uppercase tracking-wider">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-[#71717A] mb-4">How did you hear about us?</p>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {sources.map((source) => (
                        <button
                          key={source.id}
                          type="button"
                          onClick={() => setSurveyData(prev => ({ ...prev, source: source.id }))}
                          className={`py-2 px-1 rounded-xl border text-[10px] font-black uppercase tracking-tight transition-all ${
                            surveyData.source === source.id 
                              ? 'bg-[#7A9E7E] border-[#7A9E7E] text-white' 
                              : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/5 hover:border-[#7A9E7E]/50'
                          }`}
                        >
                          {source.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={!surveyData.userType || !surveyData.source}
                    className="w-full bg-[#2D3436] dark:bg-white text-white dark:text-[#2D3436] font-black uppercase tracking-widest py-3 md:py-4 rounded-full transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-black/10 dark:shadow-none text-xs md:text-sm"
                  >
                    Complete Registration
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* Dashboard Section */}
        <section id="potential" className="w-full py-32 overflow-hidden">
          <div className="editorial-container px-6">
            <Reveal>
              <div className="text-center mb-20 space-y-5">
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#2D3436] dark:text-white">Empowering Every Connection</h2>
                <p className="text-lg text-[#71717A] dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed text-center">Froscel turns data into clarity, helping you see beyond the resume and hire with confidence.</p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-white/10 shadow-2xl dark:shadow-none overflow-hidden mb-10 h-[550px] md:h-[650px] flex flex-col transition-colors duration-500">
                <div className="h-16 bg-zinc-50/50 dark:bg-black/20 border-b border-zinc-200 dark:border-white/10 flex items-center px-10 justify-between">
                  <div className="flex gap-2.5">
                    <div className="size-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="size-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="size-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                  </div>
                  <div className="text-[12px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.3em] flex-1 text-center">Froscel Platform Interface</div>
                  <div className="size-3.5"></div>
                </div>
                <div className="flex-1 min-h-0">
                   <ApplicationDemo />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="editorial-container px-6 py-20">
          <Reveal>
            <div className="bg-[#2D3436] dark:bg-zinc-900 rounded-[3rem] p-12 lg:p-20 flex flex-col lg:grid lg:grid-cols-2 items-center gap-16 relative overflow-hidden transition-colors duration-500 min-h-[600px]">
              <div className="absolute top-0 right-0 size-96 bg-[#4A72B2]/30 blur-[120px]"></div>
              <div className="absolute bottom-0 left-0 size-96 bg-[#7A9E7E]/20 blur-[120px]"></div>
              
              <div className="flex flex-col items-start text-left gap-10 relative z-20">
                <h2 className="text-3xl md:text-6xl font-black text-white relative z-10 leading-[1.1] text-left">
                  <span className="italic font-serif font-light text-[#7A9E7E]">Show</span> your skills. <br />
                  We handle the <span className="italic font-serif font-light text-[#7A9E7E]">rest</span>
                </h2>
                
                <p className="text-lg text-zinc-400 max-w-md relative z-10 leading-relaxed text-left">
                  Join companies moving beyond keywords and focusing on real capability.
                </p>
                
                <div className="w-full max-w-[540px] relative z-20">
                  <AnimatePresence mode="wait">
                    {step === 'initial' ? (
                      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-5 w-full">
                        <input 
                          className="flex-1 bg-white/5 dark:bg-black/20 border border-white/10 rounded-full px-8 py-5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#7A9E7E]/50 transition-all font-medium" 
                          placeholder="your@company.com" 
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" className="bg-white text-[#2D3436] px-12 py-5 rounded-full font-bold hover:bg-zinc-100 transition-all active:scale-95 text-lg">
                          Join
                        </button>
                      </form>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 text-white text-center"
                      >
                        <p className="text-zinc-400 text-sm mb-2">Please complete the survey to finish your registration.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Seamless Puzzle Integration */}
              <div className="w-full h-[400px] lg:h-full relative z-10 min-w-0">
                <HiringPuzzle />
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#FDFCF9] dark:bg-zinc-950 py-16 border-t border-zinc-100 dark:border-white/5 transition-colors duration-500">
        <div className="editorial-container px-6 flex flex-col items-center gap-10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-[#71717A] dark:text-zinc-400 font-bold text-xs uppercase tracking-[0.3em]">
            <a href="https://www.linkedin.com/company/froscel/" target="_blank" rel="noopener noreferrer" className="hover:text-[#4A72B2] transition-all hover:scale-105">LinkedIn</a>
            <a href="https://x.com/froscelhq" target="_blank" rel="noopener noreferrer" className="hover:text-[#4A72B2] transition-all hover:scale-105">Twitter</a>
            <a href="https://www.instagram.com/froscel?igsh=MThscngxdWkxYTc5dA==" target="_blank" rel="noopener noreferrer" className="hover:text-[#4A72B2] transition-all hover:scale-105">Instagram</a>
          </div>
          <p className="text-[10px] text-[#71717A] dark:text-zinc-600 font-black uppercase tracking-[0.2em]">© 2026 Froscel</p>
        </div>
      </footer>
    </div>
  );
}
