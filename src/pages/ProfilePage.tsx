import React, { useState, useEffect, useMemo } from 'react';
import { UserProfile } from '../types';
import { getStoredProfile, saveProfile, getStoredMoods, getStoredJournal } from '../utils/storage';
import { User, Check, Shield, Lock } from 'lucide-react';

const ICON_OPTIONS = ['🌿', '🌊', '⛅', '🌸', '🕊️', '🌙', '⭐️', '🍃'];

export const ProfilePage: React.FC = () => {
  const [profile, setProfileState] = useState<UserProfile>(getStoredProfile());
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [moods, setMoods] = useState(getStoredMoods());
  const [journal, setJournal] = useState(getStoredJournal());

  useEffect(() => {
    setProfileState(getStoredProfile());
    setMoods(getStoredMoods());
    setJournal(getStoredJournal());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(profile);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  // Wellness Streak Calculation
  const streakDays = useMemo(() => {
    if (moods.length === 0) return 0;
    const dates = Array.from(
      new Set(moods.map(m => new Date(m.timestamp).toISOString().split('T')[0]))
    ).sort().reverse();

    let streak = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayStr = new Date(Date.now() - 24 * 3600 * 1000).toISOString().split('T')[0];

    let checkDate = dates.includes(todayStr) ? todayStr : dates.includes(yesterdayStr) ? yesterdayStr : null;
    if (!checkDate) return 0;

    let curr = new Date(checkDate);
    while (true) {
      const dateStr = curr.toISOString().split('T')[0];
      if (dates.includes(dateStr)) {
        streak++;
        curr.setDate(curr.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }, [moods]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* HEADER */}
      <div className="bg-white rounded-3xl p-8 border border-sky-100 shadow-xs space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <User className="w-3.5 h-3.5 text-sky-600" />
          <span>Profile</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          User Profile
        </h1>
      </div>

      {/* TWO COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: EDIT PROFILE CARD */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-6">
          <div className="flex flex-col items-center text-center pb-4 border-b border-slate-100">
            <div className="w-20 h-20 rounded-full bg-sky-100/80 border-2 border-sky-200 flex items-center justify-center text-4xl shadow-inner mb-3">
              {profile.icon || '🌿'}
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {profile.name || 'Friend'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Journey started {profile.startDate || '28 Jul 2026, 19:09'}
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfileState({ ...profile, name: e.target.value })}
                placeholder="What should we call you?"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Profile Icon
              </label>
              <div className="grid grid-cols-4 gap-2">
                {ICON_OPTIONS.map((ico) => {
                  const isSelected = profile.icon === ico;
                  return (
                    <button
                      key={ico}
                      type="button"
                      onClick={() => setProfileState({ ...profile, icon: ico })}
                      className={`p-3 rounded-2xl border text-xl flex items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-100 border-blue-500 ring-2 ring-blue-400 scale-105'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {ico}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-200 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Save profile</span>
            </button>

            {showSaveToast && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Profile updated successfully!</span>
              </div>
            )}
          </form>
        </div>

        {/* RIGHT COLUMN: STATS AND ACCOUNTS/PRIVACY INFO */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Row of 4 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-2xs space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Mood Check-Ins
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {moods.length}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-2xs space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Journal Entries
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {journal.length}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-2xs space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Relaxation Sessions
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {profile.relaxationSessions || 1}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-2xs space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Wellness Streak
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {streakDays}
              </p>
            </div>

          </div>

          {/* Accounts & Authentication Info Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-2xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-sky-600" />
              <span>Accounts & authentication</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This prototype does not include sign up or login, and local storage is not secure authentication — anyone using this browser can see this data. The application is structured so a real backend with proper accounts, encrypted storage and secure sessions can be added later without changing the core chatbot engine.
            </p>
          </div>

          {/* Privacy Info Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-2xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-600" />
              <span>Privacy</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              MindCare AI only asks for a display name and an icon. It does not collect contact details, identifiers or medical information. Chat conversations exist only for the current session and are cleared when you refresh or press Clear.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
