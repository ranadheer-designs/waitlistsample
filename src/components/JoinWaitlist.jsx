import React, { useState } from 'react';
import Reveal from './Reveal';


export default function JoinWaitlist() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    role: 'candidate'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you for requesting early access!');
    setFormData({ name: '', email: '', whatsapp: '', role: 'candidate' });
  };

  return (
    <section className="py-24 px-6" id="waitlist">
      <div className="max-w-4xl mx-auto relative">
        <div className="blurry-gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-full opacity-20"></div>
        <Reveal>
          <div className="crystal-wrapper shadow-2xl">
            <div className="crystal-content relative z-10 bg-white dark:bg-stone-900 h-full p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white">Get early access to Froscel</h2>
                <p className="text-stone-500 dark:text-stone-400">Join the limited waitlist today. We are onboarding selected candidates and companies weekly.</p>
                <div className="space-y-4 mt-8">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wider">Why join early?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-orange-500 text-lg">star</span>
                      <span className="text-sm text-stone-600 dark:text-stone-300">Be the first to test our newest AI models</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-orange-500 text-lg">tune</span>
                      <span className="text-sm text-stone-600 dark:text-stone-300">Influence the roadmap with direct feedback</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-orange-500 text-lg">workspace_premium</span>
                      <span className="text-sm text-stone-600 dark:text-stone-300">Priority access to ATP certification</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-stone-100 dark:border-stone-800">
                  <p className="text-xs text-stone-400 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    Your data is secure. We value transparency and will never sell your information.
                  </p>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-1.5" htmlFor="name">Full Name</label>
                  <input 
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Jane Doe" 
                    type="text" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-1.5" htmlFor="email">Email Address</label>
                  <input 
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="jane@company.com" 
                    type="email" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-1.5" htmlFor="whatsapp">WhatsApp Number</label>
                  <input 
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                    id="whatsapp" 
                    name="whatsapp" 
                    value={formData.whatsapp} 
                    onChange={handleChange} 
                    placeholder="+1 (555) 000-0000" 
                    type="tel" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">I am joining as:</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="cursor-pointer relative group">
                      <input 
                        className="sr-only custom-radio" 
                        name="role" 
                        type="radio" 
                        value="candidate" 
                        checked={formData.role === 'candidate'} 
                        onChange={handleChange} 
                      />
                      <div className="border border-stone-200 dark:border-stone-700 rounded-xl p-3 flex items-center justify-center gap-2 transition-all hover:border-orange-300 bg-white dark:bg-stone-800">
                        <div className="w-4 h-4 rounded-full border border-stone-300 radio-circle relative flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white opacity-0 transition-opacity after:content-['']"></div>
                        </div>
                        <span className="text-sm font-medium">Candidate</span>
                      </div>
                    </label>
                    <label className="cursor-pointer relative group">
                      <input 
                        className="sr-only custom-radio" 
                        name="role" 
                        type="radio" 
                        value="recruiter" 
                        checked={formData.role === 'recruiter'} 
                        onChange={handleChange} 
                      />
                      <div className="border border-stone-200 dark:border-stone-700 rounded-xl p-3 flex items-center justify-center gap-2 transition-all hover:border-orange-300 bg-white dark:bg-stone-800">
                        <div className="w-4 h-4 rounded-full border border-stone-300 radio-circle relative flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white opacity-0 transition-opacity after:content-['']"></div>
                        </div>
                        <span className="text-sm font-medium">Recruiter</span>
                      </div>
                    </label>
                  </div>
                </div>
                <button type="submit" className="w-full mt-4 bg-primary text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]">
                  Request Early Access
                </button>
              </form>
            </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
