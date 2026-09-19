import { ResourceCategory, ResourceItem } from '../types';

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  { id: 'all', name: 'All Resources', iconName: 'Grid' },
  { id: 'stress', name: 'Stress Management', iconName: 'Brain' },
  { id: 'anxiety', name: 'Anxiety Support', iconName: 'ShieldAlert' },
  { id: 'sleep', name: 'Better Sleep', iconName: 'Moon' },
  { id: 'study', name: 'Study Pressure', iconName: 'BookOpen' },
  { id: 'work', name: 'Work Pressure', iconName: 'Briefcase' },
  { id: 'time', name: 'Time Management', iconName: 'Clock' },
  { id: 'relaxation', name: 'Relaxation', iconName: 'Wind' },
  { id: 'habits', name: 'Healthy Habits', iconName: 'Sparkles' },
  { id: 'wellbeing', name: 'Emotional Wellbeing', iconName: 'Heart' },
];

export const WELLNESS_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: '5-Minute Box Breathing for Immediate Stress Relief',
    categoryId: 'stress',
    categoryName: 'Stress Management',
    summary: 'Box breathing is a powerful tactical breathing technique used by athletes, firefighters, and medical professionals to reset the nervous system under high pressure.',
    tips: [
      'Inhale slowly through your nose for a count of 4 seconds.',
      'Hold your breath in comfortably for 4 seconds.',
      'Exhale completely through your mouth for 4 seconds.',
      'Hold empty for 4 seconds before repeating for 4 full cycles.'
    ],
    readTime: '3 min read'
  },
  {
    id: 'res-2',
    title: 'The 5-4-3-2-1 Sensory Grounding Technique',
    categoryId: 'anxiety',
    categoryName: 'Anxiety Support',
    summary: 'When panic or anxious overthinking strikes, the 5-4-3-2-1 sensory technique brings your awareness back to the physical present moment.',
    tips: [
      'Acknowledge 5 things you can see around you right now.',
      'Acknowledge 4 things you can physically touch or feel.',
      'Acknowledge 3 things you can hear in your environment.',
      'Acknowledge 2 things you can smell (or favorite pleasant scents).',
      'Acknowledge 1 thing you can taste (or take a slow sip of water).'
    ],
    readTime: '4 min read'
  },
  {
    id: 'res-3',
    title: 'Building a Sleep Hygiene Routine for Restful Nights',
    categoryId: 'sleep',
    categoryName: 'Better Sleep',
    summary: 'Quality sleep is the foundational pillar of mental resilience. Small evening adjustments can drastically improve your deep sleep cycles.',
    tips: [
      'Turn off bright LED screens 45 minutes before sleep.',
      'Keep your bedroom temperature cool, around 18-20°C (65-68°F).',
      'Avoid heavy meals and caffeine at least 6 hours before bedtime.',
      'Keep a bedside journal to write down lingering to-do items.'
    ],
    readTime: '5 min read'
  },
  {
    id: 'res-4',
    title: 'Navigating Exam Anxiety with the Pomodoro Technique',
    categoryId: 'study',
    categoryName: 'Study Pressure',
    summary: 'Studying for hours without structured rest causes cognitive fatigue and exam panic. Structured short sprints keep your mind sharp.',
    tips: [
      'Study uninterrupted for 25 minutes on a single core topic.',
      'Take a mandatory 5-minute movement or water break.',
      'After 4 study blocks, enjoy a longer 20-30 minute restful break.',
      'Focus on understanding key concepts rather than memorizing whole pages.'
    ],
    readTime: '4 min read'
  },
  {
    id: 'res-5',
    title: 'Setting Healthy Workplace Boundaries to Prevent Burnout',
    categoryId: 'work',
    categoryName: 'Work Pressure',
    summary: 'Burnout happens when workplace demands exceed personal capacity for prolonged periods without recovery.',
    tips: [
      'Define clear work start and end hours, and honor them.',
      'Turn off work email notifications on personal mobile devices.',
      'Practice saying: "I want to give this my full quality, so I will tackle it first thing tomorrow."',
      'Take short 2-minute posture stretches during long desk meetings.'
    ],
    readTime: '4 min read'
  },
  {
    id: 'res-6',
    title: 'Time Blocking for Reduced Mental Overload',
    categoryId: 'time',
    categoryName: 'Time Management',
    summary: 'Multitasking increases cortisol and causes fragmented focus. Time blocking assigns dedicated focus blocks for calm productivity.',
    tips: [
      'Group similar micro-tasks (e.g. replying to messages) into one batch.',
      'Schedule your hardest task during your personal peak energy hours.',
      'Leave 15-minute buffer windows between major tasks for unexpected events.',
      'Review your accomplishments at the end of the day rather than just pending tasks.'
    ],
    readTime: '3 min read'
  },
  {
    id: 'res-7',
    title: 'Progressive Muscle Relaxation for Body Tension',
    categoryId: 'relaxation',
    categoryName: 'Relaxation',
    summary: 'Stress manifests physically in muscles. PMR systematically tense and releases muscle groups to release somatic stress.',
    tips: [
      'Tense your foot muscles for 5 seconds, then completely let go.',
      'Move upward to your calves, thighs, abdomen, shoulders, and jaw.',
      'Notice the warm, soothing sensation as each muscle relaxes.',
      'Practice PMR right before sleep or after a stressful study/work block.'
    ],
    readTime: '5 min read'
  },
  {
    id: 'res-8',
    title: 'Micro-Habits: Small Daily Actions with Huge Wellbeing Impact',
    categoryId: 'habits',
    categoryName: 'Healthy Habits',
    summary: 'You do not need drastic lifestyle overhauls to feel better. Tiny consistent daily micro-habits compound into lasting wellness.',
    tips: [
      'Drink 1 glass of water immediately upon waking up.',
      'Get 5 minutes of direct morning sunlight to anchor your circadian rhythm.',
      'Write down 1 thing you feel genuinely grateful for each evening.',
      'Take a 10-minute quiet walk without headphones or notifications.'
    ],
    readTime: '4 min read'
  },
  {
    id: 'res-9',
    title: 'Reframing Negative Self-Talk with Compassion',
    categoryId: 'wellbeing',
    categoryName: 'Emotional Wellbeing',
    summary: 'Our internal dialogue shapes our emotional state. Cognitive reframing transforms harsh inner criticism into constructive self-compassion.',
    tips: [
      'Catch the inner critic: "I failed this project, I am bad at this."',
      'Pause and ask: "Would I speak to a close friend in this harsh tone?"',
      'Reframe compassionately: "This attempt was challenging, but I am learning and growing every day."',
      'Acknowledge your efforts regardless of the immediate outcome.'
    ],
    readTime: '5 min read'
  }
];
