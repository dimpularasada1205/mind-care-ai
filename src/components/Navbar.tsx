import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Heart,
  Home,
  MessageSquare,
  Smile,
  BarChart2,
  BookOpen,
  Wind,
  Compass,
  GraduationCap,
  Shield,
  User,
  Info,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ElementType;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'chat', label: 'AI Chat', icon: MessageSquare },
  { id: 'mood', label: 'Mood & Dashboard', icon: Smile },
  { id: 'journal', label: 'Journal', icon: BookOpen },
  { id: 'relaxation', label: 'Relaxation', icon: Wind },
  { id: 'subject', label: 'Subject Integration', icon: GraduationCap },
  { id: 'profile', label: 'Profile', icon: User },
];

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (pageId: PageId) => {
    setActivePage(pageId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Left Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-hidden group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-sky-200/60 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white/20 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  MindCare
                </span>
                <span className="text-lg font-bold text-teal-600">AI</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-none">
                Mental Wellness Companion
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                    isActive
                      ? 'bg-sky-100 text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Medium Desktop Compact Nav (for 1024px to 1280px) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1">
            {NAV_ITEMS.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                    isActive
                      ? 'bg-sky-100 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 text-xs font-medium flex items-center gap-1"
            >
              <span>More</span>
              <Menu className="w-4 h-4" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-sky-50 focus:outline-hidden transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-sky-100 shadow-lg px-4 pt-3 pb-6 space-y-1 transition-all">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-2xl transition-all ${
                    isActive
                      ? 'bg-sky-100 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-1.5 rounded-xl ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
