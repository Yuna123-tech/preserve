import React, { useState } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import Learn from './pages/Learn.tsx';
import Explore from './pages/Explore.tsx';
import Quiz from './pages/Quiz.tsx';
import Videos from './pages/Videos.tsx';
import ProtectHeritageGame from './pages/ProtectHeritageGame.tsx';
import type { Page } from './types.ts';

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