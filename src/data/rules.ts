import { RuleCategory } from '../types';

export const RULE_DICTIONARY: RuleCategory[] = [
  {
    category: 'Greeting',
    keywords: [
      'hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon',
      'greetings', 'howdy', 'sup', 'yo', 'hi there', 'hello there'
    ],
    responses: [
      "Hello! I'm MindCare AI. I'm here to listen and offer a calm, supportive space. How are you feeling today?",
      "Welcome back. Take a deep, gentle breath. How is your day going so far?",
      "Hi there! Thank you for checking in today. What's on your mind right now?"
    ]
  },
  {
    category: 'Stress',
    keywords: [
      'stress', 'stressed', 'pressure', 'overwhelmed', 'burnout', 'burnt out',
      'too much work', 'strained', 'exhausted', 'can\'t cope', 'heavy'
    ],
    responses: [
      "I hear how heavy things feel right now. When stress builds up, it helps to pause for just 30 seconds and unclench your jaw and shoulders. What is taking up the most space in your mind right now?",
      "Feeling stressed is a natural sign that you care deeply, but you don't have to carry it all at once. Try taking three slow, deep breaths with me. Is there one small task you can put on pause for today?",
      "It sounds like you're under a lot of pressure. Remember that your productivity does not define your worth. Would you like to try a quick breathing activity in our Relaxation Zone?"
    ]
  },
  {
    category: 'Anxiety',
    keywords: [
      'anxious', 'anxiety', 'nervous', 'panic', 'panicking', 'worried', 'worry',
      'scared', 'fear', 'uneasy', 'restless', 'racing heart', 'overthinking'
    ],
    responses: [
      "Anxiety can feel so intense in the body. You are safe in this moment. Let's practice grounding: name 3 things you can see around you right now. Take your time.",
      "When thoughts start racing, remember that thoughts are like clouds passing through the sky—they are temporary. Take a soft breath. You are here, grounded, and supported.",
      "I hear how anxious you are feeling. Try placing a hand gently over your chest, feel your heartbeat, and know that this wave will pass."
    ]
  },
  {
    category: 'Sadness',
    keywords: [
      'sad', 'unhappy', 'crying', 'cry', 'down', 'depressed', 'gloomy',
      'heartbroken', 'hopeless', 'miserable', 'tears', 'heavy heart'
    ],
    responses: [
      "It is completely okay to feel sad or emotional. Feelings are meant to be felt, not hidden away. I'm here listening if you'd like to vent or write it out.",
      "I'm sorry you're feeling down today. Please be extra gentle with yourself. Have you had a warm drink or a moment of rest today?",
      "Sadness can feel lonely, but you don't have to go through it alone. Thank you for sharing your heart with me."
    ]
  },
  {
    category: 'Anger',
    keywords: [
      'angry', 'frustrated', 'irritated', 'mad', 'furious', 'rage',
      'annoyed', 'upset', 'hate', 'snapped', 'livid'
    ],
    responses: [
      "Anger is a valid emotion—it usually tells us when a boundary has been crossed or something feels unfair. Taking a brief walk or shaking out physical tension can help lower the heat.",
      "It sounds like you're really frustrated right now. Expressing it safely helps release that tension. What situation triggered this feeling?",
      "Take a deep breath out. Give yourself permission to step back from whatever is frustrating you for a few minutes."
    ]
  },
  {
    category: 'Sleep',
    keywords: [
      'sleep', 'insomnia', 'cannot sleep', 'cant sleep', 'tired', 'restless night',
      'sleepy', 'stay awake', 'nightmare', 'exhaustion', 'drowsy'
    ],
    responses: [
      "Resting your eyes and body still counts even if sleep feels far away. Dim your screen, put away heavy thoughts, and let your body sink softly into bed.",
      "If you're struggling to sleep due to overthinking, writing your thoughts down in your Personal Journal can help empty your mind for the night.",
      "Try a slow progressive relaxation: focus on softening your forehead, your jaw, your shoulders, all the way down to your toes. You deserve restful sleep."
    ]
  },
  {
    category: 'Exams',
    keywords: [
      'exam', 'exams', 'test', 'tests', 'studying', 'study', 'deadline',
      'grades', 'homework', 'assignment', 'syllabus', 'college', 'school', 'university'
    ],
    responses: [
      "Academic pressure can feel intense. Remember that taking a 10-minute break every hour actually improves memory retention! Break your study plan into tiny 15-minute blocks.",
      "An exam tests a specific topic at one point in time—it does not measure your full intelligence or your future value. Focus on one topic at a time, take breaths, and pace yourself.",
      "You have prepared and done your best. Remember to stay hydrated and prioritize getting sleep before test day. You've got this!"
    ]
  },
  {
    category: 'Work',
    keywords: [
      'work', 'workplace', 'workload', 'office', 'boss', 'job', 'career',
      'meeting', 'project', 'overtime', 'colleague', 'burnout'
    ],
    responses: [
      "Work pressure can consume whole days if we don't build quiet breaks. Try stepping away from screens for a 5-minute breather.",
      "It's easy for work tasks to stack up until they feel overwhelming. Try picking just ONE top priority for the next hour and let the rest wait.",
      "Your health and peace of mind matter far more than any deadline. Remember to set healthy boundaries when your workday ends."
    ]
  },
  {
    category: 'Loneliness',
    keywords: [
      'alone', 'lonely', 'loneliness', 'nobody', 'no friends', 'isolated',
      'left out', 'disconnected', 'abandoned'
    ],
    responses: [
      "Feeling lonely can feel very quiet and heavy, but please know that your presence in this world matters. I am here with you right now.",
      "Sometimes reaching out with a simple 'Thinking of you' text to an old friend or family member can bridge that distance. Or even enjoying a peaceful walk in nature.",
      "You are worthy of genuine connection and kindness. Taking small steps to engage in hobbies or communities can help over time."
    ]
  },
  {
    category: 'Relationship',
    keywords: [
      'breakup', 'relationship', 'fight', 'partner', 'boyfriend', 'girlfriend',
      'spouse', 'argument', 'divorce', 'ex', 'friendship'
    ],
    responses: [
      "Relationship challenges can stir up deep emotions. Honest communication and setting healthy boundaries are key. Give yourself space to process your feelings.",
      "It's painful when someone close to us isn't understanding us. Focus on what you can control: your own self-care, thoughts, and peaceful choices.",
      "Allow yourself time to heal and reflect. You deserve relationships built on mutual respect, honesty, and emotional safety."
    ]
  },
  {
    category: 'Positive',
    keywords: [
      'happy', 'good', 'great', 'excited', 'amazing', 'wonderful', 'blessed',
      'joy', 'cheerful', 'fantastic', 'grateful', 'awesome', 'proud'
    ],
    responses: [
      "That is wonderful to hear! Celebrating positive moments, big or small, helps build long-term emotional resilience. What made your day so bright?",
      "I'm so glad you're feeling good! Log this feeling in your Mood Check-In so you can look back on this joyful moment later.",
      "Your positivity is uplifting! Keep holding onto this calm, joyful energy as you go through your day."
    ]
  }
];

export const SAFETY_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'harm myself', 'self harm', 'self-harm', 'cutting myself', 'no reason to live'
];

export const SAFETY_RESPONSE =
  "I hear how much pain you are carrying, but please know you do not have to be alone in this moment. MindCare AI is an automated support tool and cannot provide emergency intervention. Please connect immediately with people who can support you:\n\n" +
  "• National Crisis Hotline (US): Call or text 988 (Available 24/7, free & confidential)\n" +
  "• Emergency Services: Call 911 / 112 or your local emergency number\n" +
  "• International Resources: Visit https://www.findahelpline.com\n\n" +
  "Please reach out to a trusted family member, counsellor, or medical professional right away. Your life matters.";

export const SAFE_DEFAULT_RESPONSES = [
  "I am here with you. Thank you for sharing your thoughts. While I am a rule-based companion, I want you to know that your feelings matter. Would you like to tell me a little more, or try a relaxation exercise?",
  "I hear you. Sometimes it's hard to put everything into words, and that is completely okay. Take a gentle breath. What feels like the most helpful thing for you right now?",
  "Thank you for reaching out. Every thought you share is a step toward self-reflection. How can I support you right now?"
];

/**
 * Normalizes input text for rule matching
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Rule-based matching engine
 */
export function matchRule(text: string): { category: string; response: string } {
  const normalized = normalizeText(text);

  // 1. Check safety crisis triggers
  for (const safetyKw of SAFETY_KEYWORDS) {
    if (normalized.includes(safetyKw)) {
      return {
        category: 'Safety Crisis Support',
        response: SAFETY_RESPONSE
      };
    }
  }

  // 2. Check rule categories
  for (const rule of RULE_DICTIONARY) {
    for (const kw of rule.keywords) {
      // Look for whole word or exact substring match
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(normalized) || normalized.includes(kw)) {
        // Return a random response from category for variety
        const randomIndex = Math.floor(Math.random() * rule.responses.length);
        return {
          category: `Rule: ${rule.category}`,
          response: rule.responses[randomIndex]
        };
      }
    }
  }

  // 3. Fallback safe default
  const defaultIdx = Math.floor(Math.random() * SAFE_DEFAULT_RESPONSES.length);
  return {
    category: 'Rule: Safe Default',
    response: SAFE_DEFAULT_RESPONSES[defaultIdx]
  };
}
