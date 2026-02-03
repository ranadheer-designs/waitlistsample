import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import JoinWaitlist from './components/JoinWaitlist';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="relative">
        <Hero />
        <FeaturesGrid />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <JoinWaitlist />
      </main>
      <Footer />
    </div>
  );
}

export default App;
