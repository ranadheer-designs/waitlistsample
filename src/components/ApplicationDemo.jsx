import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Animated Visual Elements ---

const FloatingMetric = ({ label, value, trend, icon, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative p-6 rounded-[2.5rem] bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/30 dark:border-white/5 transition-all duration-300 group overflow-hidden"
  >
    <motion.div 
      animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, delay: delay }}
      className={`absolute -top-4 -right-4 size-24 blur-3xl opacity-20 ${color}`} 
    />
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`size-10 rounded-2xl flex items-center justify-center ${color} bg-opacity-10 text-opacity-100 shadow-sm`}>
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <div className="flex items-center gap-1 text-[9px] font-black tracking-tighter text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/10">
        <span className="material-symbols-outlined text-[10px]/none font-black">add</span>
        {trend}
      </div>
    </div>
    <div className="space-y-1 text-left relative z-10">
      <div className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">{label}</div>
      <div className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">{value}</div>
    </div>
  </motion.div>
);

const FluidChart = ({ points, color, height = 60, speed = 2 }) => {
  const lineData = useMemo(() => {
    const step = 100 / (points.length - 1);
    return `M 0 ${40 - points[0]} ${points.map((p, i) => `L ${i * step} ${40 - p}`).join(' ')}`;
  }, [points]);

  return (
    <div className="relative w-full" style={{ height }}>
      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`pulse-${color.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          animate={{ pathLength: [0, 1, 1, 0], pathOffset: [0, 0, 1, 1] }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
          d={lineData} fill="none" stroke={`url(#pulse-${color.replace('#','')})`} strokeWidth="3" strokeLinecap="round" opacity="0.4"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          d={lineData} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

const SkillOrb = ({ skills, active }) => {
  const size = 100;
  const center = size / 2;
  const radius = 38;
  const points = useMemo(() => {
    return skills.map((s, i) => {
      const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
      return {
        x: center + Math.cos(angle) * (radius * (s.value / 100)),
        y: center + Math.sin(angle) * (radius * (s.value / 100)),
        angle
      };
    });
  }, [skills]);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border border-zinc-100 dark:border-white/5 rounded-full"
      />
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible relative z-10">
        <motion.path
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          d={points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'}
          fill="rgba(74,114,178,0.15)"
          stroke="#4A72B2"
          strokeWidth="1.5"
          className="drop-shadow-[0_0_8px_rgba(74,114,178,0.3)]"
        />
        {points.map((p, i) => (
          <motion.circle 
            key={i} 
            cx={p.x} cy={p.y} r="2" 
            fill="#4A72B2"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
};

const CANDIDATES = [
  { 
    name: "Elena Vance", match: 98, role: "System Architect", 
    skills: [{ name: "Logic", value: 95 }, { name: "Lead", value: 92 }, { name: "Code", value: 88 }, { name: "Comm", value: 94 }, { name: "Vibe", value: 90 }],
    activity: [20, 35, 25, 40, 32, 45, 38], img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
  },
  { 
    name: "Julian Chen", match: 94, role: "Creative Lead", 
    skills: [{ name: "Vis", value: 98 }, { name: "Res", value: 85 }, { name: "Sys", value: 92 }, { name: "UX", value: 80 }, { name: "Motion", value: 95 }],
    activity: [15, 25, 20, 45, 30, 50, 42], img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
  }
];

export default function ApplicationDemo() {
  const [activeTab, setActiveTab] = useState('one'); // Simplified states for fast cycling
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setActiveTab(t => t === 'one' ? 'two' : t === 'two' ? 'three' : 'one');
          if (activeTab === 'three') setActiveIdx(i => (i + 1) % CANDIDATES.length);
          return 0;
        }
        return p + 0.8; // Faster progress
      });
    }, 25);
    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <div className="w-full h-full bg-[#FCFBFA] dark:bg-zinc-950 flex flex-col relative overflow-hidden transition-colors duration-500 font-display">
      
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ x: [-20, 20, -20], y: [-10, 10, -10], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -right-[10%] size-[60%] bg-blue-500/5 dark:bg-blue-400/5 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ x: [20, -20, 20], y: [10, -10, 10], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -left-[10%] size-[60%] bg-emerald-500/5 dark:bg-emerald-400/5 blur-[120px] rounded-full"
        />
      </div>

      {/* Ultra-Minimal Header */}
      <div className="h-14 md:h-16 flex items-center justify-between px-6 md:px-10 relative z-30 border-b border-zinc-100 dark:border-white/[0.03] bg-white/40 dark:bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-3 md:gap-5">
          <div className="size-8 bg-[#2D3436] dark:bg-zinc-100 rounded-[12px] flex items-center justify-center shadow-lg active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-white dark:text-[#2D3436] text-[14px] md:text-[16px] font-black">bolt</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-900 dark:text-zinc-100">Core Engine</span>
            <span className="text-[7px] md:text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Automated Insight v6</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-zinc-200/40 dark:bg-white/5 rounded-full border border-zinc-200/50 dark:border-white/5">
          {['one', 'two', 'three'].map((t, idx) => (
             <div key={t} className={`size-1.5 rounded-full transition-all duration-300 ${activeTab === t ? 'bg-[#4A72B2] w-5' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
          ))}
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 rounded-full border border-emerald-500/10">
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.1em]">AI Active</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto md:overflow-hidden relative p-4 md:p-8 z-10 flex flex-col pb-24 md:pb-8">
        <AnimatePresence mode="wait">
          {activeTab === 'one' && (
            <motion.div 
              key="state-1"
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="h-full flex flex-col space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <FloatingMetric label="Bias Shield" value="100.0%" trend="0.0%" icon="security" color="bg-emerald-500" delay={0} />
                <div className="hidden md:block">
                  <FloatingMetric label="Match Logic" value="98.7%" trend="2.4%" icon="hub" color="bg-blue-500" delay={0.5} />
                </div>
                <div className="hidden md:block">
                  <FloatingMetric label="Recruiter ROI" value="4.2x" trend="12%" icon="trending_up" color="bg-purple-500" delay={1} />
                </div>
              </div>
              
              <div className="flex-1 min-h-[300px] md:min-h-0 bg-white dark:bg-zinc-900/60 rounded-[2.5rem] md:rounded-[3rem] border border-zinc-100 dark:border-white/5 shadow-2xl shadow-zinc-200/20 dark:shadow-none p-6 md:p-10 flex flex-col relative overflow-hidden group">
                 <motion.div 
                   animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                   transition={{ duration: 15, repeat: Infinity }}
                   className="absolute top-0 right-0 p-10 opacity-5 dark:opacity-10 pointer-events-none"
                 >
                   <span className="material-symbols-outlined text-[120px] md:text-[180px]">auto_graph</span>
                 </motion.div>
                 
                 <div className="flex justify-between items-start mb-6 md:mb-12 text-left relative z-10">
                    <div className="space-y-1 md:space-y-2">
                       <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tighter">System Pulse</h3>
                       <p className="text-[9px] md:text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Sub-second candidate correlation stream</p>
                    </div>
                 </div>
 
                 <div className="flex-1 flex items-end mb-4 relative z-10">
                    <FluidChart points={[35, 60, 45, 90, 80, 100, 95, 110, 105]} color="#4A72B2" height={100} speed={4} />
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'two' && (
            <motion.div 
              key="state-2"
              initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="h-full flex flex-col space-y-6"
            >
              <div className="flex items-end justify-between px-2 text-left">
                <div className="space-y-1">
                   <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter">Dynamic Clusters</h2>
                   <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">Potential-based sorting active</p>
                </div>
              </div>

              <div className="grid gap-4 flex-1">
                {CANDIDATES.map((c, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="p-4 md:p-5 rounded-[2rem] md:rounded-[2.5rem] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-100 dark:border-white/5 flex items-center md:gap-8 shadow-sm group cursor-pointer transition-all active:scale-[0.99] gap-4"
                  >
                    <div className="relative flex-shrink-0">
                       <img src={c.img} className="size-12 md:size-16 rounded-[1.5rem] md:rounded-[2rem] object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-700 shadow-xl" alt={c.name} />
                       <motion.div 
                         animate={{ scale: [1, 1.2, 1] }}
                         transition={{ duration: 2, repeat: Infinity }}
                         className="absolute -top-1 -right-1 size-4 md:size-5 bg-emerald-500 rounded-full border-[3px] md:border-4 border-white dark:border-zinc-900" 
                       />
                    </div>
                    <div className="flex-1 text-left space-y-0.5">
                      <h4 className="font-bold text-zinc-900 dark:text-white text-base md:text-lg tracking-tight truncate max-w-[120px] md:max-w-none">{c.name}</h4>
                      <p className="text-[8px] md:text-[11px] font-bold text-zinc-400 uppercase tracking-widest">{c.role}</p>
                    </div>
                    <div className="w-40 hidden md:block">
                       <FluidChart points={c.activity} color="#4A72B2" height={40} speed={5} />
                    </div>
                    <div className="text-right pl-4 border-l border-zinc-100 dark:border-white/5">
                      <div className="text-[8px] md:text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-0.5">Impact</div>
                      <div className="text-xl md:text-2xl font-black text-[#4A72B2] tracking-tighter">{c.match}%</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'three' && (
            <motion.div 
              key="state-3"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="h-full grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              <div className="p-8 md:p-10 rounded-[2.5rem] md:rounded-[4rem] bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 shadow-2xl flex flex-col items-center justify-center space-y-6 md:space-y-8 relative overflow-hidden">
                 <div className="absolute top-0 left-0 p-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                    <span className="material-symbols-outlined text-[150px] md:text-[240px]">architecture</span>
                 </div>
                 <div className="w-full flex justify-between items-center text-left relative z-10">
                    <div className="space-y-0.5 md:space-y-1">
                      <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white tracking-tighter">{CANDIDATES[activeIdx].name}</h3>
                      <p className="text-[8px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Neural Skill Spectrum</p>
                    </div>
                    <div className="size-10 md:size-12 rounded-[14px] md:rounded-[18px] bg-[#4A72B2]/10 flex items-center justify-center text-[#4A72B2] shadow-inner">
                       <span className="material-symbols-outlined text-[20px] md:text-[24px]">psychology</span>
                    </div>
                 </div>
                 <div className="flex-1 w-full max-w-[240px] md:max-w-[320px] aspect-square relative z-10">
                    <SkillOrb skills={CANDIDATES[activeIdx].skills} active={activeTab === 'three'} />
                 </div>
              </div>
 
              <div className="flex flex-col gap-6 md:gap-8 h-full">
                 <div className="flex-1 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex flex-col justify-center space-y-4 md:space-y-8 text-left relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 md:p-10 opacity-10 pointer-events-none">
                       <span className="material-symbols-outlined text-[60px] md:text-[100px]">chat_bubble_outline</span>
                    </div>
                    <div className="text-[9px] md:text-[11px] font-black opacity-30 dark:opacity-50 uppercase tracking-[0.3em] md:tracking-[0.4em]">Froscel AI Narrative</div>
                    <p className="text-xl md:text-3xl font-black leading-[1.2] tracking-tighter opacity-90 relative z-10">
                       "Deep systems thinking masked by high-level architectural empathy."
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3 pt-2 md:pt-4">
                       {['Hyper-Logic', 'Culture Add', 'Pivot Expert'].map(tag => (
                          <span key={tag} className="px-3 md:px-5 py-1.5 md:py-2 bg-white/10 dark:bg-black/10 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-white/10 dark:border-black/10">{tag}</span>
                       ))}
                    </div>
                 </div>
                 <motion.button 
                   whileTap={{ scale: 0.98 }}
                   className="h-20 md:h-24 bg-[#4A72B2] text-white rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-between px-8 md:px-12 shadow-xl shadow-[#4A72B2]/40 group transition-all hover:brightness-110"
                 >
                    <div className="text-left">
                       <div className="text-[8px] md:text-[10px] font-black opacity-50 uppercase tracking-widest mb-0.5 md:mb-1">Decision Ready</div>
                       <div className="text-lg md:text-2xl font-black tracking-tighter">Fast-Track Candidate</div>
                    </div>
                    <span className="material-symbols-outlined text-3xl md:text-4xl group-hover:translate-x-3 transition-transform duration-500">arrow_forward</span>
                 </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rapid Progression Indicator */}
        <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 z-40">
           <div className="h-[2px] w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#4A72B2]"
                style={{ width: `${progress}%` }}
              />
           </div>
           <div className="flex justify-between items-center mt-3 md:mt-4">
              <div className="flex items-center gap-2 md:gap-3">
                 {[0,1,2].map(i => {
                   const isActive = (activeTab === 'one' && i === 0) || (activeTab === 'two' && i === 1) || (activeTab === 'three' && i === 2);
                   return <div key={i} className={`size-1 md:size-1.5 rounded-full transition-all duration-500 ${isActive ? 'bg-[#4A72B2] scale-[1.3] shadow-[0_0_8px_#4a72b2]' : 'bg-zinc-300 dark:bg-zinc-700'}`} />;
                 })}
              </div>
              <span className="text-[7px] md:text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] md:tracking-[0.4em] opacity-40">Insight Stream Active — 60fps</span>
           </div>
        </div>
      </div>
    </div>
  );
}
