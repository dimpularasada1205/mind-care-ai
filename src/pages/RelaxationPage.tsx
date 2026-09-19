import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Clock } from 'lucide-react';

export const RelaxationPage: React.FC = () => {
  // --- BREATHING EXERCISE STATE ---
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [breathTimer, setBreathTimer] = useState(4);
  const [breathingMode, setBreathingMode] = useState<'4-4-4' | '4-7-8'>('4-4-4');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev > 1) return prev - 1;

          // Transition phases based on mode
          if (breathingMode === '4-4-4') {
            if (breathingPhase === 'Inhale') {
              setBreathingPhase('Hold');
              return 4;
            } else if (breathingPhase === 'Hold') {
              setBreathingPhase('Exhale');
              return 4;
            } else {
              setBreathingPhase('Inhale');
              return 4;
            }
          } else {
            // 4-7-8 Mode
            if (breathingPhase === 'Inhale') {
              setBreathingPhase('Hold');
              return 7;
            } else if (breathingPhase === 'Hold') {
              setBreathingPhase('Exhale');
              return 8;
            } else {
              setBreathingPhase('Inhale');
              return 4;
            }
          }
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathingActive, breathingPhase, breathingMode]);

  const resetBreathing = () => {
    setIsBreathingActive(false);
    setBreathingPhase('Inhale');
    setBreathTimer(4);
  };

  // --- MEDITATION TIMER STATE ---
  const [meditationDuration, setMeditationDuration] = useState(180); // 3 minutes default
  const [meditationTimeLeft, setMeditationTimeLeft] = useState(180);
  const [isMeditationActive, setIsMeditationActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isMeditationActive && meditationTimeLeft > 0) {
      interval = setInterval(() => {
        setMeditationTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (meditationTimeLeft === 0) {
      setIsMeditationActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMeditationActive, meditationTimeLeft]);

  const selectMeditationMinutes = (mins: number) => {
    const secs = mins * 60;
    setMeditationDuration(secs);
    setMeditationTimeLeft(secs);
    setIsMeditationActive(false);
  };

  const resetMeditation = () => {
    setIsMeditationActive(false);
    setMeditationTimeLeft(meditationDuration);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      
      {/* HERO HEADER */}
      <div className="bg-white rounded-3xl p-8 border border-sky-100 shadow-xs space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Wind className="w-3.5 h-3.5 text-sky-600" />
          <span>RELAXATION ZONE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Relaxation Zone
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          Take a moment to slow down, breathe and reconnect with yourself.
        </p>
      </div>

      {/* SECTION A: BREATHING EXERCISE */}
      <div className="bg-gradient-to-br from-sky-50 via-cyan-50/40 to-indigo-50/30 rounded-3xl p-8 border border-sky-100 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Wind className="w-6 h-6 text-blue-600" />
              <span>Paced Breathing Exercise</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Follow the expanding and contracting rhythm to calm your autonomic nervous system.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-sky-200 text-xs font-semibold">
            <button
              onClick={() => { setBreathingMode('4-4-4'); resetBreathing(); }}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                breathingMode === '4-4-4' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4-4-4 Box Breathing
            </button>
            <button
              onClick={() => { setBreathingMode('4-7-8'); resetBreathing(); }}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                breathingMode === '4-7-8' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4-7-8 Relaxing Breath
            </button>
          </div>
        </div>

        {/* Breathing Animation Circle Container */}
        <div className="flex flex-col items-center justify-center py-8 space-y-8">
          <div className="relative w-64 h-64 flex items-center justify-center">
            
            {/* Outer Pulsing Glow Circle */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400/40 via-teal-300/30 to-indigo-400/30 blur-xl transition-all duration-1000 ${
                isBreathingActive && breathingPhase === 'Inhale'
                  ? 'scale-125 opacity-100'
                  : isBreathingActive && breathingPhase === 'Hold'
                  ? 'scale-125 opacity-80'
                  : 'scale-75 opacity-40'
              }`}
            />

            {/* Inner Animated Circle */}
            <div
              className={`w-52 h-52 rounded-full border-4 border-sky-300 bg-white/90 backdrop-blur-md shadow-lg flex flex-col items-center justify-center transition-all duration-1000 z-10 ${
                isBreathingActive && breathingPhase === 'Inhale'
                  ? 'scale-110 border-blue-500 shadow-sky-200/80'
                  : isBreathingActive && breathingPhase === 'Hold'
                  ? 'scale-110 border-teal-400 shadow-teal-200/80'
                  : isBreathingActive && breathingPhase === 'Exhale'
                  ? 'scale-85 border-indigo-400 shadow-indigo-100'
                  : 'scale-95'
              }`}
            >
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {isBreathingActive ? breathingPhase : 'Ready'}
              </span>
              <span className="text-4xl font-mono font-bold text-blue-600 mt-1">
                {isBreathingActive ? breathTimer : '4'}s
              </span>
              <span className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">
                {breathingMode} Mode
              </span>
            </div>
          </div>

          {/* Breathing Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-200 hover:scale-105 transition-all cursor-pointer"
            >
              {isBreathingActive ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
              <span>{isBreathingActive ? 'Pause' : 'Start Breathing'}</span>
            </button>

            <button
              onClick={resetBreathing}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION B: MEDITATION TIMER */}
      <div className="bg-white rounded-3xl p-8 border border-sky-100 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-6 h-6 text-teal-600" />
              <span>Meditation & Mindfulness Timer</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Select a quiet duration to rest your mind and gently disconnect from screens.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {[1, 3, 5, 10].map((mins) => (
              <button
                key={mins}
                onClick={() => selectMeditationMinutes(mins)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  meditationDuration === mins * 60
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-blue-700'
                }`}
              >
                {mins} min{mins > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Timer Display */}
        <div className="flex flex-col items-center justify-center py-6 space-y-6">
          <div className="text-6xl sm:text-7xl font-extrabold font-mono text-slate-900 tracking-tight">
            {formatTime(meditationTimeLeft)}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMeditationActive(!isMeditationActive)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-200 hover:scale-105 transition-all cursor-pointer"
            >
              {isMeditationActive ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
              <span>{isMeditationActive ? 'Pause' : 'Start Timer'}</span>
            </button>

            <button
              onClick={resetMeditation}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
