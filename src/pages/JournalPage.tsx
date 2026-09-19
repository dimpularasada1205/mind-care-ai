import React, { useState, useEffect } from 'react';
import { JournalEntry } from '../types';
import { getStoredJournal, saveJournalEntry, deleteJournalEntry } from '../utils/storage';
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  Lock,
  Save,
  RotateCcw,
  Calendar,
  Clock,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

export const JournalPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setEntries(getStoredJournal());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const saved = saveJournalEntry({
      id: editingId || undefined,
      title: title.trim(),
      content: content.trim()
    });

    if (editingId) {
      setEntries(entries.map(e => e.id === saved.id ? saved : e));
    } else {
      setEntries([saved, ...entries]);
    }

    handleResetForm();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setTitle(entry.title);
    setContent(entry.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    const updated = deleteJournalEntry(id);
    setEntries(updated);
    if (editingId === id) {
      handleResetForm();
    }
  };

  const handleResetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
  };

  // Search & Filter
  const filteredEntries = entries.filter(item => {
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q);
  }).sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* HERO HEADER */}
      <div className="bg-white rounded-3xl p-8 border border-sky-100 shadow-xs space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-sky-600" />
          <span>PERSONAL JOURNAL</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Your Personal Journal
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          A quiet space to write, reflect and revisit your thoughts.
        </p>
      </div>

      {/* JOURNAL EDITOR & LIST GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Editor Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-6 h-fit">
          <div className="flex items-center justify-between border-b border-sky-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              {editingId ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-blue-600" />}
              <span>{editingId ? 'Edit Reflection' : 'New Journal Entry'}</span>
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={handleResetForm}
                className="text-xs text-slate-500 hover:text-blue-600 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your reflection a title..."
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={7}
                placeholder="Write your private thoughts here..."
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-200 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Update Entry' : 'Save Reflection'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetForm}
                className="px-4 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all cursor-pointer"
                title="Clear fields"
              >
                Clear
              </button>
            </div>

            {savedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
                Reflection saved successfully!
              </div>
            )}
          </form>

          {/* Privacy Note */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Privacy note:</strong> Your journal entries are stored locally on this device for this prototype.
            </p>
          </div>
        </div>

        {/* Entries List */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white rounded-3xl p-4 border border-sky-100 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search input */}
            <div className="relative w-full sm:w-auto flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reflections..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shrink-0 transition-colors cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
              <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
            </button>
          </div>

          {/* Entries Cards */}
          {filteredEntries.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-sky-100 shadow-2xs space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                Your journal is waiting for your first reflection.
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Use the form on the left to record your daily thoughts, feelings, or small moments of gratitude.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEntries.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border border-sky-100 shadow-2xs hover:shadow-xs transition-all space-y-3 group relative"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-sky-500" />
                          {item.dateFormatted}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-sky-50 transition-colors"
                        title="Edit Entry"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-3">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
