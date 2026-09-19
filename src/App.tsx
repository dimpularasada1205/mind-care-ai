import React, { useState } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { MoodPage } from './pages/MoodPage';
import { JournalPage } from './pages/JournalPage';
import { RelaxationPage } from './pages/RelaxationPage';
import { SubjectIntegrationPage } from './pages/SubjectIntegrationPage';
import { ProfilePage } from './pages/ProfilePage';

export function App() {
  const [activePage, setActivePage] = useState<PageId>('home');

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'chat':
        return <ChatPage />;
      case 'mood':
        return <MoodPage setActivePage={setActivePage} />;
      case 'journal':
        return <JournalPage />;
      case 'relaxation':
        return <RelaxationPage />;
      case 'subject':
        return <SubjectIntegrationPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f8ff] text-slate-900 font-sans flex flex-col selection:bg-sky-200 selection:text-blue-900">
      
      {/* Global Sticky Navigation Bar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderActivePage()}
      </main>

      {/* Global Footer */}
      <Footer setActivePage={setActivePage} />

    </div>
  );
}

export default App;
