import React from 'react';
import {
  GraduationCap,
  MessageSquare,
  Code2,
  Laptop,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export const SubjectIntegrationPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      
      {/* HERO HEADER */}
      <div className="bg-white rounded-3xl p-8 border border-sky-100 shadow-xs space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
          <span>ACADEMIC MINI-PROJECT</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Subject Integration
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          How Communicative English, Programming and IT Workshop come together.
        </p>
      </div>

      {/* ARCHITECTURE FLOW DIAGRAM */}
      <div className="bg-gradient-to-br from-sky-50 via-cyan-50/50 to-indigo-50/40 rounded-3xl p-8 border border-sky-100 shadow-xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            <span>Core System Architecture & Execution Flow</span>
          </h2>
          <p className="text-xs text-slate-600">
            A step-by-step breakdown of how user messages pass through normalisation and keyword detection.
          </p>
        </div>

        {/* Flow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {[
            { step: '1', label: 'User Input', desc: 'Raw text message entered' },
            { step: '2', label: 'Normalisation', desc: 'Lowercase & clean text' },
            { step: '3', label: 'Keyword Scan', desc: 'Dictionary evaluation' },
            { step: '4', label: 'Rule Match', desc: 'Category identified' },
            { step: '5', label: 'Support Reply', desc: 'Predefined response' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-sky-100 text-center space-y-1 relative shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs inline-flex items-center justify-center">
                {item.step}
              </span>
              <h3 className="text-xs font-bold text-slate-900 pt-1">{item.label}</h3>
              <p className="text-[10px] text-slate-500 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3 SUBJECT INTEGRATION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Communicative English */}
        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-blue-600">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Communicative English</h3>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Human Empathy</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Applies principles of active listening, empathetic language phrasing, and supportive conversation structures to ensure every reply is non-judgmental and calming.
          </p>

          <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /><span>Empathy & Active Listening</span></li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /><span>Clear, Accessible Language</span></li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /><span>Supportive Tone & Phrasing</span></li>
          </ul>
        </div>

        {/* Card 2: Programming */}
        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Programming Logic</h3>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Core JavaScript/React</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Implements array mapping, dictionary objects, string normalisation regex, conditional matching trees, state management hooks, and localStorage data persistence.
          </p>

          <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /><span>Conditional Statements & Regex</span></li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /><span>Dictionaries & Keyword Search</span></li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /><span>LocalStorage CRUD Operations</span></li>
          </ul>
        </div>

        {/* Card 3: IT Workshop */}
        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">IT Workshop</h3>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Web Engineering</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Covers full front-end development, responsive UI styling using Tailwind CSS, modular component structure, Vite build system, and web accessibility standards.
          </p>

          <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /><span>Responsive Web Architecture</span></li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /><span>Modern UI & UX Design</span></li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /><span>Vite & Express Server Setup</span></li>
          </ul>
        </div>

      </div>

    </div>
  );
};
