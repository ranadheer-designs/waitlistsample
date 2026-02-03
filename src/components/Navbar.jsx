import React from 'react';


export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-center">
      <header className="w-full max-w-6xl flex items-center justify-between glass-nav bg-white/60 dark:bg-stone-900/60 border border-white/20 dark:border-stone-800/50 px-8 py-3.5 rounded-full shadow-2xl shadow-orange-500/5">
        <div className="flex items-center gap-3">
          <img src="./logo.png" alt="Froscel Logo" className="w-10 h-10 object-contain rounded-lg" />
          <h2 className="text-stone-900 dark:text-white text-xl font-extrabold tracking-tight">Froscel</h2>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          <a className="text-stone-600 dark:text-stone-400 text-sm font-bold hover:text-primary transition-colors" href="#candidates">For Candidates</a>
          <a className="text-stone-600 dark:text-stone-400 text-sm font-bold hover:text-primary transition-colors" href="#recruiters">For Recruiters</a>
          <a className="bg-stone-900 dark:bg-white text-white dark:text-stone-950 px-6 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95" href="#waitlist">
            Join Waitlist
          </a>
        </nav>
      </header>
    </div>
  );
}
