import React from 'react';
import { PageId } from '../types';
import { Heart, ShieldAlert } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const handleNav = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center text-white shadow-sm">
                <Heart className="w-5 h-5 fill-white/20 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                MindCare <span className="text-teal-400">AI</span>
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Mental Wellness Companion
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              A safe, calm, inclusive mental wellness companion designed to help you reflect, track mood patterns, relax, and explore supportive activities.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-sky-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('chat')} className="hover:text-sky-300 transition-colors">
                  Talk to MindCare AI
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('mood')} className="hover:text-sky-300 transition-colors">
                  Mood Check & Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('journal')} className="hover:text-sky-300 transition-colors">
                  Personal Journal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('relaxation')} className="hover:text-sky-300 transition-colors">
                  Relaxation Zone
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('subject')} className="hover:text-sky-300 transition-colors">
                  Subject Integration
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('profile')} className="hover:text-sky-300 transition-colors">
                  User Profile
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 mb-8 text-xs text-slate-300 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Important Safety Notice:</strong> MindCare AI is an educational wellness support tool created as an academic mini-project. It is <strong className="text-amber-300">not a substitute for professional mental health care</strong>, medical diagnosis, or therapy. If you are in immediate distress, please contact emergency services (911 / 112) or call the National Crisis Helpline at <strong>988</strong>.
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MindCare AI · Academic Mini-Project</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('profile')} className="hover:text-slate-400">
              Local Privacy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
