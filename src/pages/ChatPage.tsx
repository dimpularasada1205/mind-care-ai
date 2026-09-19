import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { matchRule } from '../data/rules';
import {
  MessageSquare,
  Sparkles,
  Send,
  Trash2,
  Bot,
  User,
  Shield,
  Zap,
  RefreshCw,
  Info
} from 'lucide-react';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: "Hello, I'm MindCare AI. I'm your wellness companion — I listen and respond with supportive suggestions. How are you feeling today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    ruleCategory: 'Greeting',
    isAiAssisted: false
  }
];

const CONVERSATION_STARTERS = [
  "I'm feeling stressed about my upcoming exams",
  "I feel overwhelmed with work deadlines",
  "I can't sleep and my mind is racing",
  "I'm feeling a bit lonely and down today",
  "I feel anxious and nervous about tomorrow"
];

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('mindcare_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_MESSAGES;
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useAiLayer, setUseAiLayer] = useState(false);
  const [hasServerAiKey, setHasServerAiKey] = useState<boolean | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Check if server has Gemini API key
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data && data.hasGeminiKey) {
          setHasServerAiKey(true);
        } else {
          setHasServerAiKey(false);
        }
      })
      .catch(() => setHasServerAiKey(false));
  }, []);

  // Save chat to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mindcare_chat_history', JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  // Auto-scroll on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: userTime
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Rule-based processing
    const ruleResult = matchRule(text);

    // If AI layer enabled and available, attempt AI fallback/enhancement
    let botReplyText = ruleResult.response;
    let category = ruleResult.category;
    let isAi = false;

    if (useAiLayer && hasServerAiKey) {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        if (data && data.reply) {
          botReplyText = data.reply;
          category = 'AI-Assisted Support (Gemini)';
          isAi = true;
        }
      } catch (err) {
        console.warn('AI layer failed, falling back to rule-based reply.');
      }
    }

    // Simulate natural brief delay for bot response
    setTimeout(() => {
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: botReplyText,
        timestamp: botTime,
        ruleCategory: category,
        isAiAssisted: isAi
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleClear = () => {
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem('mindcare_chat_history');
    } catch (e) {}
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* HERO HEADER */}
      <div className="bg-white rounded-3xl p-8 border border-sky-100 shadow-xs space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500 fill-cyan-100" />
          <span>Mental Wellness Chat</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Talk to MindCare AI
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          A safe, private space to express your feelings and receive supportive, empathetic responses anytime.
        </p>
      </div>

      {/* CHAT INTERFACE CARD */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden flex flex-col h-[650px]">
        
        {/* Chat Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-sky-50 via-cyan-50/40 to-white border-b border-sky-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                MindCare AI
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Rule-based core · AI-assisted responses available
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Optional AI Layer Switch */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-medium text-slate-700">
              <Zap className={`w-3.5 h-3.5 ${useAiLayer ? 'text-amber-500 fill-amber-400' : 'text-slate-400'}`} />
              <span>AI Mode</span>
              <button
                onClick={() => setUseAiLayer(!useAiLayer)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  useAiLayer ? 'bg-blue-600' : 'bg-slate-300'
                }`}
                title={hasServerAiKey ? 'Toggle Gemini AI enhancement' : 'Gemini Key not configured on server (runs pure Rule-based mode)'}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    useAiLayer ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Clear Chat Button */}
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
              title="Clear Conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50"
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold text-white shadow-2xs ${
                    isUser ? 'bg-indigo-600' : 'bg-blue-600'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div className={`space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-2xs ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-sky-100 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Metadata line */}
                  <div className={`flex items-center gap-2 text-[11px] text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.ruleCategory && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        msg.isAiAssisted
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : msg.ruleCategory.includes('Crisis')
                          ? 'bg-rose-100 text-rose-700 border border-rose-200 font-bold'
                          : 'bg-sky-100 text-blue-700 border border-sky-200'
                      }`}>
                        {msg.ruleCategory}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bot Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-md mr-auto items-center">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-white rounded-2xl border border-sky-100 flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-sky-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Conversation Starters (Horizontal scrollable chips) */}
        <div className="px-6 py-2.5 bg-white border-t border-sky-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-medium text-slate-400 shrink-0 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            Try asking:
          </span>
          {CONVERSATION_STARTERS.map((starter, i) => (
            <button
              key={i}
              onClick={() => handleSend(starter)}
              className="text-xs px-3 py-1 rounded-full bg-sky-50 hover:bg-sky-100 text-blue-700 border border-sky-200 shrink-0 transition-all cursor-pointer font-medium"
            >
              "{starter}"
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-white border-t border-sky-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type how you're feeling..."
              className="flex-1 px-5 py-3.5 rounded-full bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white flex items-center justify-center shadow-md shadow-blue-200 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>

      {/* FOOTNOTE DISCLAIMER */}
      <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 text-xs text-slate-600 flex items-start gap-3">
        <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p>
          <strong>Privacy & Safety Notice:</strong> All core rule-based replies run instantly in your browser or server. MindCare AI does not store sensitive personal data on external servers or diagnose medical conditions.
        </p>
      </div>

    </div>
  );
};
