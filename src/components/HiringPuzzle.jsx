import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PUZZLE_DATA = [
  { bad: "Resume", good: "Proof", icon: "assignment_late" },
  { bad: "Failed", good: "Iterating", icon: "emergency_home" },
  { bad: "Pending", good: "In Progress", icon: "hourglass_empty" },
  { bad: "Frustration", good: "Clarity", icon: "mood_bad" },
  { bad: "Slow", good: "Instant", icon: "speed" },
  { bad: "Rejected", good: "Accepted", icon: "cancel" },
  { bad: "Not Matched", good: "Aligned", icon: "link_off" },
];

export default function HiringPuzzle() {
  const [phase, setPhase] = useState('broken'); // 'broken', 'shifting', 'assembled'
  
  useEffect(() => {
    let timers = [];
    if (phase === 'broken') {
      timers.push(setTimeout(() => setPhase('shifting'), 4000));
    } else if (phase === 'shifting') {
      timers.push(setTimeout(() => setPhase('assembled'), 4500)); // Slightly shorter to sync with piece convergence
    } else if (phase === 'assembled') {
      timers.push(setTimeout(() => setPhase('broken'), 8000));
    }
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const blockConfigs = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return PUZZLE_DATA.map((_, index) => {
      const xRadius = isMobile ? 150 : 400; 
      const yRadius = isMobile ? 100 : 180; 
      const angle = (index / PUZZLE_DATA.length) * Math.PI * 2;
      return {
        x: Math.cos(angle) * xRadius + (Math.random() - 0.5) * (isMobile ? 40 : 80),
        y: Math.sin(angle) * yRadius + (Math.random() - 0.5) * (isMobile ? 40 : 80),
        rotate: (Math.random() - 0.5) * 120
      };
    });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden perspective-2500 p-8 rounded-[3rem]">
      {/* Dynamic depth glow that follows the phases */}
      <motion.div 
        animate={{ 
          opacity: phase === 'assembled' ? 0.15 : 0.08,
          scale: phase === 'assembled' ? 1.2 : 1
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,114,178,1)_0%,transparent_70%)] pointer-events-none" 
      />
      
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Animated Flux lines with smoother entry */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <AnimatePresence>
            {phase === 'shifting' && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 1.5 }}
              >
                {blockConfigs.map((config, i) => (
                  <motion.line
                    key={i}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.2 }}
                    x1="50%" y1="50%"
                    x2={`calc(50% + ${config.x}px)`}
                    y2={`calc(50% + ${config.y}px)`}
                    stroke="#4A72B2"
                    strokeWidth="1.5"
                    strokeDasharray="8,8"
                    transition={{ duration: 2.5, delay: i * 0.1, ease: "easeInOut" }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* Puzzle Pieces with coordinated exit */}
        <AnimatePresence>
          {phase !== 'assembled' ? (
            <motion.div 
              key="puzzle-group"
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {PUZZLE_DATA.map((item, i) => (
                <PuzzleBlock 
                  key={item.bad} 
                  item={item} 
                  index={i} 
                  phase={phase} 
                  config={blockConfigs[i]}
                />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Froscel Branding reveal with improved spring and sync */}
        <AnimatePresence>
          {phase === 'assembled' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -45, y: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 45, y: -20 }}
              transition={{ 
                type: "spring",
                stiffness: 40,
                damping: 15,
                mass: 1.2,
                delay: 0.6 
              }}
              className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#4A72B2] rounded-[3.5rem] shadow-[0_50px_120px_-20px_rgba(74,114,178,0.7)] border-8 border-white/10 overflow-hidden"
            >
              <div className="relative mb-12 z-10 px-12">
                <img 
                  src="./logo_transparent.png" 
                  className="w-32 md:w-60 h-auto object-contain mx-auto brightness-0 invert"
                  alt="Froscel Logo"
                />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.4, 1], 
                    opacity: [0.2, 0.4, 0.2] 
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-0 -bottom-12 h-4 bg-white/20 blur-3xl rounded-full"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                className="text-center z-10"
              >
                <div className="text-xl md:text-4xl text-white leading-none px-4">
                  <span className="italic font-serif font-light">Hiring,</span>{" "}
                  <span className="font-extrabold tracking-tight">corrected.</span>
                </div>
                <div className="mt-4 md:mt-8 h-1 w-16 md:w-24 bg-white/20 mx-auto rounded-full" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PuzzleBlock({ item, index, phase, config }) {
  const isBroken = phase === 'broken';
  const isShifting = phase === 'shifting';

  const rotateY = isBroken ? 0 : 180;
  
  return (
    <motion.div
      initial={false}
      animate={{
        x: isBroken ? config.x : 0,
        y: isBroken ? config.y : 0,
        rotate: isBroken ? config.rotate : 0,
        rotateY: rotateY,
        scale: isShifting ? 1.4 : 1,
        zIndex: isShifting ? 100 + index : index,
      }}
      transition={{
        duration: isShifting ? 3.5 : 2.5,
        ease: [0.22, 1, 0.36, 1], // Custom Quintic ease-out for smoother drift
        delay: isBroken ? 0 : index * 0.15
      }}
      style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
      className="absolute size-24 md:size-40 cursor-default"
    >
      {/* Front Label (Broken) */}
      <motion.div 
        className="absolute inset-0 bg-white dark:bg-zinc-800 shadow-2xl border md:border-2 border-slate-100 dark:border-white/5 rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center p-3 md:p-8 transition-opacity duration-700"
        style={{ 
          backfaceVisibility: 'hidden', 
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(0deg) translateZ(1px)', 
          zIndex: 2,
          opacity: isBroken ? 1 : 0
        }}
      >
        <span className="material-symbols-outlined text-slate-300 dark:text-zinc-600 text-2xl md:text-4xl mb-2 md:mb-4 opacity-50">{item.icon}</span>
        <span className="text-[8px] md:text-sm font-black uppercase tracking-[0.1em] md:tracking-[0.25em] text-[#2D3436]/50 dark:text-white/40 text-center leading-tight">
          {item.bad}
        </span>
      </motion.div>

      {/* Back Label (Corrected) */}
      <motion.div 
        className="absolute inset-0 bg-[#4A72B2] border-[3px] md:border-[6px] border-white/20 rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center p-3 md:p-8 shadow-[0_30px_70px_-15px_rgba(74,114,178,0.5)] text-white overflow-hidden transition-opacity duration-700"
        style={{ 
          backfaceVisibility: 'hidden', 
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg) translateZ(1px)', 
          zIndex: 1,
          opacity: isBroken ? 0 : 1
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
        <span className="material-symbols-outlined text-white/60 text-2xl md:text-4xl mb-2 md:mb-4">verified</span>
        <span className="text-[10px] md:text-lg font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-center leading-tight z-10">
          {item.good}
        </span>
      </motion.div>
    </motion.div>
  );
}
