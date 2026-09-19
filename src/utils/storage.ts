import { MoodEntry, MoodOption, JournalEntry, UserProfile, ChatMessage } from '../types';

export const MOOD_OPTIONS: MoodOption[] = [
  { id: 'very_happy', emoji: '😄', label: 'Very Happy', score: 6, bgClass: 'bg-emerald-50 hover:bg-emerald-100/80', borderClass: 'border-emerald-200', textClass: 'text-emerald-700' },
  { id: 'good', emoji: '🙂', label: 'Good', score: 5, bgClass: 'bg-sky-50 hover:bg-sky-100/80', borderClass: 'border-sky-200', textClass: 'text-sky-700' },
  { id: 'okay', emoji: '😐', label: 'Okay', score: 4, bgClass: 'bg-slate-50 hover:bg-slate-100', borderClass: 'border-slate-200', textClass: 'text-slate-700' },
  { id: 'worried', emoji: '😟', label: 'Worried', score: 3, bgClass: 'bg-amber-50 hover:bg-amber-100/80', borderClass: 'border-amber-200', textClass: 'text-amber-700' },
  { id: 'sad', emoji: '😢', label: 'Sad', score: 2, bgClass: 'bg-blue-50 hover:bg-blue-100/80', borderClass: 'border-blue-200', textClass: 'text-blue-700' },
  { id: 'angry', emoji: '😡', label: 'Angry', score: 2, bgClass: 'bg-rose-50 hover:bg-rose-100/80', borderClass: 'border-rose-200', textClass: 'text-rose-700' },
  { id: 'overwhelmed', emoji: '😫', label: 'Overwhelmed', score: 1, bgClass: 'bg-purple-50 hover:bg-purple-100/80', borderClass: 'border-purple-200', textClass: 'text-purple-700' },
  { id: 'low_tired', emoji: '😔', label: 'Low / Tired', score: 1, bgClass: 'bg-indigo-50 hover:bg-indigo-100/80', borderClass: 'border-indigo-200', textClass: 'text-indigo-700' },
];

const KEYS = {
  MOODS: 'mindcare_moods_v1',
  JOURNAL: 'mindcare_journal_v1',
  PROFILE: 'mindcare_profile_v1',
  CHAT: 'mindcare_chat_v1'
};

// Seed sample data for first-time visitors so Dashboard and Journal look rich right away
const INITIAL_MOODS: MoodEntry[] = [
  {
    id: 'm-1',
    moodId: 'good',
    emoji: '🙂',
    label: 'Good',
    score: 5,
    note: 'Finished my study targets for the day.',
    timestamp: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
    dateStr: new Date(Date.now() - 6 * 24 * 3600 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    timeStr: '09:30 AM'
  },
  {
    id: 'm-2',
    moodId: 'worried',
    emoji: '😟',
    label: 'Worried',
    score: 3,
    note: 'Upcoming project submission deadline tomorrow.',
    timestamp: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    dateStr: new Date(Date.now() - 5 * 24 * 3600 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    timeStr: '02:15 PM'
  },
  {
    id: 'm-3',
    moodId: 'okay',
    emoji: '😐',
    label: 'Okay',
    score: 4,
    note: 'Slept well, took a calm walk in the park.',
    timestamp: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
    dateStr: new Date(Date.now() - 4 * 24 * 3600 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    timeStr: '06:45 PM'
  },
  {
    id: 'm-4',
    moodId: 'very_happy',
    emoji: '😄',
    label: 'Very Happy',
    score: 6,
    note: 'Completed exam and celebrated with friends!',
    timestamp: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    dateStr: new Date(Date.now() - 3 * 24 * 3600 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    timeStr: '04:20 PM'
  },
  {
    id: 'm-5',
    moodId: 'good',
    emoji: '🙂',
    label: 'Good',
    score: 5,
    note: 'Tried box breathing exercise in Relaxation Zone.',
    timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    dateStr: new Date(Date.now() - 2 * 24 * 3600 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    timeStr: '08:10 PM'
  },
  {
    id: 'm-6',
    moodId: 'okay',
    emoji: '😐',
    label: 'Okay',
    score: 4,
    note: 'Busy work schedule, feeling balanced.',
    timestamp: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    dateStr: new Date(Date.now() - 1 * 24 * 3600 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    timeStr: '11:00 AM'
  }
];

const INITIAL_JOURNAL: JournalEntry[] = [
  {
    id: 'j-1',
    title: 'Finding Calm Amidst Deadlines',
    content: 'Today was quite intense with multiple study deadlines stacking up. I took a 5-minute break to practice box breathing on MindCare AI. It helped slow my racing thoughts and unclench my shoulders. Reminding myself to take it step by step.',
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    dateFormatted: new Date(Date.now() - 2 * 24 * 3600 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  },
  {
    id: 'j-2',
    title: 'Evening Gratitude Reflection',
    content: 'Grateful for a warm cup of herbal tea, supportive friends, and a quiet moment to reflect. Even on difficult days, there are small gentle moments worth appreciating.',
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    dateFormatted: new Date(Date.now() - 5 * 24 * 3600 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Friend',
  icon: '🌿',
  startDate: '28 Jul 2026, 19:09',
  relaxationSessions: 1
};

// --- MOOD STORAGE ---
export function getStoredMoods(): MoodEntry[] {
  try {
    const raw = localStorage.getItem(KEYS.MOODS);
    if (!raw) {
      localStorage.setItem(KEYS.MOODS, JSON.stringify(INITIAL_MOODS));
      return INITIAL_MOODS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_MOODS;
  }
}

export function saveMoodEntry(entry: Omit<MoodEntry, 'id'>): MoodEntry {
  const moods = getStoredMoods();
  const newEntry: MoodEntry = {
    ...entry,
    id: `m-${Date.now()}`
  };
  const updated = [newEntry, ...moods];
  localStorage.setItem(KEYS.MOODS, JSON.stringify(updated));
  return newEntry;
}

export function deleteMoodEntry(id: string): MoodEntry[] {
  const moods = getStoredMoods();
  const updated = moods.filter(m => m.id !== id);
  localStorage.setItem(KEYS.MOODS, JSON.stringify(updated));
  return updated;
}

// --- JOURNAL STORAGE ---
export function getStoredJournal(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(KEYS.JOURNAL);
    if (!raw) {
      localStorage.setItem(KEYS.JOURNAL, JSON.stringify(INITIAL_JOURNAL));
      return INITIAL_JOURNAL;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_JOURNAL;
  }
}

export function saveJournalEntry(entry: { id?: string; title: string; content: string }): JournalEntry {
  const journal = getStoredJournal();
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (entry.id) {
    // Edit existing
    const updated = journal.map(item => {
      if (item.id === entry.id) {
        return {
          ...item,
          title: entry.title,
          content: entry.content,
          updatedAt: now.toISOString(),
          dateFormatted
        };
      }
      return item;
    });
    localStorage.setItem(KEYS.JOURNAL, JSON.stringify(updated));
    return updated.find(i => i.id === entry.id)!;
  } else {
    // New entry
    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      title: entry.title,
      content: entry.content,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      dateFormatted
    };
    const updated = [newEntry, ...journal];
    localStorage.setItem(KEYS.JOURNAL, JSON.stringify(updated));
    return newEntry;
  }
}

export function deleteJournalEntry(id: string): JournalEntry[] {
  const journal = getStoredJournal();
  const updated = journal.filter(j => j.id !== id);
  localStorage.setItem(KEYS.JOURNAL, JSON.stringify(updated));
  return updated;
}

// --- PROFILE STORAGE ---
export function getStoredProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(KEYS.PROFILE);
    if (!raw) {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
      return INITIAL_PROFILE;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_PROFILE;
  }
}

export function saveProfile(profile: UserProfile): UserProfile {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  return profile;
}

// --- CLEAR ALL DATA ---
export function clearAllLocalData(): void {
  localStorage.removeItem(KEYS.MOODS);
  localStorage.removeItem(KEYS.JOURNAL);
  localStorage.removeItem(KEYS.PROFILE);
  localStorage.removeItem(KEYS.CHAT);
}
