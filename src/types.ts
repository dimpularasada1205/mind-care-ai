export type PageId =
  | 'home'
  | 'chat'
  | 'mood'
  | 'journal'
  | 'relaxation'
  | 'subject'
  | 'profile';

export type MoodScore = 1 | 2 | 3 | 4 | 5 | 6;

export type MoodType =
  | 'very_happy'
  | 'good'
  | 'okay'
  | 'worried'
  | 'sad'
  | 'angry'
  | 'overwhelmed'
  | 'low_tired';

export interface MoodOption {
  id: MoodType;
  emoji: string;
  label: string;
  score: MoodScore;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

export interface MoodEntry {
  id: string;
  moodId: MoodType;
  emoji: string;
  label: string;
  score: MoodScore;
  note?: string;
  timestamp: string; // ISO date string
  dateStr: string;   // Formatted date string
  timeStr: string;   // Formatted time string
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  ruleCategory?: string;
  isAiAssisted?: boolean;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  dateFormatted: string;
}

export interface UserProfile {
  name: string;
  icon: string;
  startDate: string;
  relaxationSessions: number;
}

export interface ResourceCategory {
  id: string;
  name: string;
  iconName: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  summary: string;
  tips: string[];
  readTime: string;
}

export interface RuleCategory {
  category: string;
  keywords: string[];
  responses: string[];
}
