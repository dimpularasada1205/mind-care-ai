import React from 'react';
import { PageId } from '../types';
import { HeroIllustration } from '../components/HeroIllustration';
import {
  MessageSquare,
  Smile,
  BookOpen,
  Wind,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  UserCheck,
  Heart,
  HelpCircle,
  User
} from 'lucide-react';

interface HomePageProps {
  setActivePage: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActivePage }) => {
  return (
    <div className="space-y-20 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100/60 via-sky-50/40 to-white pt-10 pb-16 rounded-3xl border border-sky-100/80 shadow-xs px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 shadow-2xs text-xs font-semibold text-blue-700">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 fill-cyan-100" />
              <span>Mental Wellness Companion</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              MindCare <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-500 to-cyan-500">AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl font-medium text-slate-700 leading-snug">
              A safe space to talk, reflect, relax, and find support.
            </p>

            {/* Main Description */}
            <p className="text-slate-600 text-base leading-relaxed max-w-2xl">
              MindCare AI is a thoughtful mental wellness companion designed to help you reflect, track daily mood patterns, journal thoughts, and practice guided relaxation exercises in a calm, non-judgmental space.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setActivePage('mood');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Start Your Wellness Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActivePage('chat');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-sky-50 text-blue-700 font-semibold text-sm border-2 border-blue-600/80 shadow-2xs hover:shadow-sm transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Talk to MindCare AI</span>
              </button>
            </div>

            {/* Small Note */}
            <p className="text-xs text-slate-500 flex items-center gap-2 pt-1 font-medium">
              <CheckCircle2 className="w-4 h-4 text-teal-500" />
              <span>Private & Calm · Local Browser Storage</span>
            </p>
          </div>

          {/* Right Illustration Column */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR SECTION */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-sky-100 shadow-xs max-w-7xl mx-auto space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-sky-600" />
            <span>Inclusive Mental Wellness</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Stress can affect anyone
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Emotional difficulty is not limited to one group of people. Exam weeks, deadlines, caregiving, loneliness and everyday pressure can affect students, employees, parents and professionals alike. MindCare AI is built to be inclusive, calm and non-judgmental for everyone.
          </p>
        </div>

        {/* 8 Audience Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { text: 'Students facing academic pressure', icon: GraduationCap, bg: 'bg-sky-50/70 border-sky-100 text-sky-900' },
            { text: 'Employees facing work pressure', icon: Briefcase, bg: 'bg-teal-50/70 border-teal-100 text-teal-900' },
            { text: 'Professionals experiencing burnout', icon: UserCheck, bg: 'bg-indigo-50/70 border-indigo-100 text-indigo-900' },
            { text: 'Parents managing family responsibilities', icon: Heart, bg: 'bg-rose-50/70 border-rose-100 text-rose-900' },
            { text: 'People experiencing loneliness', icon: Users, bg: 'bg-amber-50/70 border-amber-100 text-amber-900' },
            { text: 'People facing relationship difficulties', icon: Heart, bg: 'bg-purple-50/70 border-purple-100 text-purple-900' },
            { text: 'Anyone dealing with everyday stress', icon: Wind, bg: 'bg-cyan-50/70 border-cyan-100 text-cyan-900' },
            { text: 'Anyone who wants a safe space to express feelings', icon: HelpCircle, bg: 'bg-emerald-50/70 border-emerald-100 text-emerald-900' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${item.bg} flex items-start gap-3 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all`}
              >
                <div className="p-2 rounded-xl bg-white shadow-2xs text-slate-700 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-semibold leading-snug">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* EVERYTHING INSIDE MINDCARE AI SECTION */}
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Everything inside MindCare AI
          </h2>
          <p className="text-slate-600 text-base">
            Connected features built around calm, clarity and personal reflection.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 'chat',
              title: 'AI Wellness Chat',
              desc: 'An empathetic conversational partner ready to listen and offer supportive guidance.',
              icon: MessageSquare,
              badge: 'Support Chat'
            },
            {
              id: 'mood',
              title: 'Mood Check & Dashboard',
              desc: 'Log how you feel and view 7-day, 30-day, and 3-month emotional trend analytics.',
              icon: Smile,
              badge: 'Check-In & Stats'
            },
            {
              id: 'journal',
              title: 'Personal Journal',
              desc: 'Write, edit and revisit private reflections stored securely on your device.',
              icon: BookOpen,
              badge: 'Private Notes'
            },
            {
              id: 'relaxation',
              title: 'Relaxation Zone',
              desc: 'Paced breathing animation and customizable meditation timer to ease stress.',
              icon: Wind,
              badge: 'Mindfulness'
            },
            {
              id: 'subject',
              title: 'Subject Integration',
              desc: 'How Communicative English, Programming and IT Workshop come together.',
              icon: GraduationCap,
              badge: 'Academic'
            },
            {
              id: 'profile',
              title: 'User Profile',
              desc: 'Customize your display name, choose a avatar icon, and view personal usage stats.',
              icon: User,
              badge: 'Profile'
            }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActivePage(feature.id as PageId);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-3xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-300/80 hover:-translate-y-1 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-blue-700 transition-colors">
                      {feature.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Explore feature</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-gradient-to-br from-sky-50 via-cyan-50/50 to-indigo-50/40 rounded-3xl p-8 sm:p-12 border border-sky-100/80 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-cyan-700 text-xs font-semibold border border-cyan-200">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            How it works
          </h2>
          <p className="text-slate-600 text-base">
            Transparent, empathetic support that puts user privacy first.
          </p>
        </div>

        {/* 4 Cards in a Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Say how you feel',
              desc: 'Type a message or pick a conversation starter in your own words.'
            },
            {
              step: '02',
              title: 'Active listening',
              desc: 'Your text is understood and evaluated for emotional context.'
            },
            {
              step: '03',
              title: 'Supportive reply',
              desc: 'An empathetic, calming response is offered to support your moment.'
            },
            {
              step: '04',
              title: 'Reflect and relax',
              desc: 'Log your mood, journal your thoughts, or breathe through the Relaxation Zone.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-sky-100 shadow-2xs hover:shadow-sm transition-all space-y-3 relative overflow-hidden"
            >
              <div className="text-4xl font-extrabold text-cyan-500/90 font-mono tracking-tight">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
