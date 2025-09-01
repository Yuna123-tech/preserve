import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Explore from './pages/Explore';
import Quiz from './pages/Quiz';
import Videos from './pages/Videos';
import ProtectHeritageGame from './pages/ProtectHeritageGame';
import type { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'learn':
        return <Learn />;
      case 'explore':
        return <Explore />;
      case 'quiz':
        return <Quiz />;
      case 'videos':
        return <Videos />;
      case 'protect-heritage-game':
        return <ProtectHeritageGame />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-gray-800">
      <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;