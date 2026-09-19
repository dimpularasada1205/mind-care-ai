import React, { useState, useEffect, useMemo } from 'react';
import { PageId, MoodType, MoodEntry } from '../types';
import { MOOD_OPTIONS, getStoredMoods, saveMoodEntry, deleteMoodEntry } from '../utils/storage';
import {
  Smile,
  Calendar,
  Clock,
  Check,
  Trash2,
  Heart,
  TrendingUp,
  BarChart2,
  Activity,
  Flame,
  Award,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface MoodPageProps {
  setActivePage: (page: PageId) => void;
}

export const MoodPage: React.FC<MoodPageProps> = () => {
  const [selectedMoodId, setSelectedMoodId] = useState<MoodType>('good');
  const [note, setNote] = useState('');
  const [savedHistory, setSavedHistory] = useState<MoodEntry[]>([]);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '3m'>('7d');

  // Today's formatted date
  const todayDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    setSavedHistory(getStoredMoods());
  }, []);

  const handleSaveMood = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedOption = MOOD_OPTIONS.find(m => m.id === selectedMoodId)!;

    const now = new Date();
    const newEntry = saveMoodEntry({
      moodId: selectedOption.id,
      emoji: selectedOption.emoji,
      label: selectedOption.label,
      score: selectedOption.score,
      note: note.trim() || undefined,
      timestamp: now.toISOString(),
      dateStr: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timeStr: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setSavedHistory([newEntry, ...savedHistory]);
    setNote('');
    setShowSavedToast(true);

    setTimeout(() => {
      setShowSavedToast(false);
    }, 3000);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = deleteMoodEntry(id);
    setSavedHistory(updated);
  };

  // Filter moods based on selected range
  const filteredMoods = useMemo(() => {
    const now = Date.now();
    let days = 7;
    if (timeRange === '30d') days = 30;
    if (timeRange === '3m') days = 90;

    const cutoff = now - days * 24 * 3600 * 1000;
    return savedHistory.filter(m => new Date(m.timestamp).getTime() >= cutoff);
  }, [savedHistory, timeRange]);

  // Statistics
  const latestMood = savedHistory[0] || null;
  const totalCheckIns = savedHistory.length;

  const mostCommonMood = useMemo(() => {
    if (savedHistory.length === 0) return null;
    const counts: Record<string, number> = {};
    savedHistory.forEach(m => {
      counts[m.label] = (counts[m.label] || 0) + 1;
    });
    let topLabel = '';
    let max = 0;
    Object.entries(counts).forEach(([lbl, cnt]) => {
      if (cnt > max) {
        max = cnt;
        topLabel = lbl;
      }
    });
    const option = MOOD_OPTIONS.find(o => o.label === topLabel);
    return option ? { label: option.label, emoji: option.emoji, count: max } : null;
  }, [savedHistory]);

  // Wellness Streak Calculation
  const streakDays = useMemo(() => {
    if (savedHistory.length === 0) return 0;
    const dates = Array.from(
      new Set(savedHistory.map(m => new Date(m.timestamp).toISOString().split('T')[0]))
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
  }, [savedHistory]);

  // Recharts Chart Data (chronological order)
  const chartData = useMemo(() => {
    const sorted = [...filteredMoods].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    return sorted.map(item => ({
      date: item.dateStr,
      score: item.score,
      label: item.label,
      emoji: item.emoji,
      time: item.timeStr
    }));
  }, [filteredMoods]);

  // Mood Frequency Distribution
  const distributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    MOOD_OPTIONS.forEach(opt => { counts[opt.label] = 0; });
    savedHistory.forEach(m => {
      if (counts[m.label] !== undefined) counts[m.label]++;
    });
    const maxVal = Math.max(...Object.values(counts), 1);

    return MOOD_OPTIONS.map(opt => ({
      ...opt,
      count: counts[opt.label] || 0,
      percentage: Math.round(((counts[opt.label] || 0) / (savedHistory.length || 1)) * 100),
      barWidth: Math.round(((counts[opt.label] || 0) / maxVal) * 100)
    }));
  }, [savedHistory]);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      
      {/* HERO SECTION */}
      <div className="bg-white rounded-3xl p-8 border border-sky-100 shadow-xs space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Smile className="w-3.5 h-3.5 text-sky-600" />
          <span>MOOD CHECK-IN & DASHBOARD</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Mood Check & Wellness Dashboard
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-1">
              Log how you feel right now and track your emotional progress over time in one place.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 shrink-0">
            <Calendar className="w-4 h-4 text-sky-600" />
            <span>{todayDateStr}</span>
          </div>
        </div>
      </div>

      {/* CHECK-IN FORM CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 border-b border-sky-100 pb-3">
          How are you feeling right now?
        </h2>

        <form onSubmit={handleSaveMood} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">
              Select your current mood:
            </label>

            {/* 8 Mood Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MOOD_OPTIONS.map((item) => {
                const isSelected = selectedMoodId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedMoodId(item.id)}
                    className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 relative ${item.bgClass} ${
                      isSelected
                        ? `ring-2 ring-blue-600 ${item.borderClass} shadow-sm scale-102`
                        : `${item.borderClass} hover:scale-101`
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                    <span className="text-3xl select-none">{item.emoji}</span>
                    <span className={`text-xs font-bold ${item.textClass}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note Field */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-900">
              Would you like to share what is affecting your mood today?
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Optional — write as much or as little as you want."
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none"
            />
          </div>

          {/* Save Button */}
          <div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Save Mood</span>
            </button>
          </div>

          {/* Toast Confirmation */}
          {showSavedToast && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-fade-in">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Your mood check-in has been recorded and dashboard stats updated!</span>
            </div>
          )}
        </form>
      </div>

      {/* 4 STATISTIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Current Mood</span>
            <Smile className="w-4 h-4 text-sky-600" />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-4xl select-none">{latestMood ? latestMood.emoji : '😐'}</span>
            <div>
              <p className="text-xl font-bold text-slate-900">{latestMood ? latestMood.label : 'No entry'}</p>
              <p className="text-xs text-slate-500">{latestMood ? latestMood.dateStr : 'Check in today'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Check-Ins</span>
            <Activity className="w-4 h-4 text-teal-600" />
          </div>
          <div className="pt-1">
            <p className="text-3xl font-extrabold text-slate-900">{totalCheckIns}</p>
            <p className="text-xs text-slate-500 mt-1">Saved check-in records</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Most Common Mood</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-4xl select-none">{mostCommonMood ? mostCommonMood.emoji : '🙂'}</span>
            <div>
              <p className="text-xl font-bold text-slate-900">{mostCommonMood ? mostCommonMood.label : 'N/A'}</p>
              <p className="text-xs text-slate-500">{mostCommonMood ? `${mostCommonMood.count} entries` : 'Log moods to calculate'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Wellness Streak</span>
            <Flame className="w-4 h-4 text-rose-500 fill-rose-100" />
          </div>
          <div className="pt-1">
            <p className="text-3xl font-extrabold text-slate-900">{streakDays} Days</p>
            <p className="text-xs text-slate-500 mt-1">Consecutive days checked in</p>
          </div>
        </div>

      </div>

      {/* LINE CHART SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Mood overview</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Emotional score progression over time
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full text-xs font-medium self-start sm:self-auto">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                timeRange === '7d' ? 'bg-white text-blue-700 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              7 days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                timeRange === '30d' ? 'bg-white text-blue-700 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              30 days
            </button>
            <button
              onClick={() => setTimeRange('3m')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                timeRange === '3m' ? 'bg-white text-blue-700 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3 months
            </button>
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="text-center py-16 space-y-3 text-slate-500">
            <Smile className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-medium">No check-in data found for this time range.</p>
          </div>
        ) : (
          <div className="w-full h-72 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[1, 6]} ticks={[1, 2, 3, 4, 5, 6]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-2xl text-xs shadow-lg space-y-1">
                          <p className="font-bold text-sky-300 flex items-center gap-1.5">
                            <span className="text-lg">{data.emoji}</span> {data.label} (Score: {data.score})
                          </p>
                          <p className="text-slate-300">{data.date} · {data.time}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#moodGradient)" dot={{ r: 5, fill: '#0284c7', strokeWidth: 2, stroke: '#ffffff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="p-3 bg-sky-50/60 rounded-2xl border border-sky-100 text-xs text-slate-600 flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Higher values mean a more positive mood (6 = very happy, 2 = difficult).</span>
        </div>
      </div>

      {/* LOWER GRID: DISTRIBUTION & HISTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Mood Distribution */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-sky-100 pb-3">
            Mood distribution
          </h2>

          <div className="space-y-3">
            {distributionData.map(item => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-2">
                    <span className="text-base">{item.emoji}</span>
                    <span>{item.label}</span>
                  </span>
                  <span className="text-slate-500 font-mono">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-teal-400 transition-all duration-500"
                    style={{ width: `${item.barWidth}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mood History List */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-sky-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-sky-600" />
              <span>Check-in history</span>
            </h2>
            <span className="text-xs font-medium text-slate-500">
              {savedHistory.length} entries
            </span>
          </div>

          {savedHistory.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">No recorded mood entries found.</p>
          ) : (
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {savedHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-sky-50/50 transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl select-none mt-0.5">{entry.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{entry.label}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500">
                          {entry.dateStr} · {entry.timeStr}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="text-xs text-slate-600 mt-1 italic">
                          "{entry.note}"
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
