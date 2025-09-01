import React from 'react';
import { Page } from '../types.ts';
import MascotIcon from './icons/MascotIcon.tsx';

const Header: React.FC<{ setCurrentPage: (page: Page) => void; currentPage: Page; }> = ({ setCurrentPage, currentPage }) => {
  const NavLink: React.FC<{ page: Page; currentPage: Page; setCurrentPage: (page: Page) => void; children: React.ReactNode }> = ({ page, currentPage, setCurrentPage, children }) => (
    <button onClick={() => setCurrentPage(page)} className={`font-display text-4xl px-5 py-1 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 ${currentPage === page ? "bg-orange-500 text-white" : "bg-white text-orange-600 hover:bg-orange-100"}`}>
      {children}
    </button>
  );
  return (
    <header className="bg-orange-300 shadow-lg w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <MascotIcon className="h-16 w-16 text-white bg-orange-500 rounded-full p-1" />
          <h1 className="font-display text-5xl text-white drop-shadow-lg">지켜줘! 우리의 소중한 국가유산</h1>
        </div>
        <nav className="flex items-center gap-3">
          <NavLink page="learn" currentPage={currentPage} setCurrentPage={setCurrentPage}>알아보기</NavLink>
          <NavLink page="explore" currentPage={currentPage} setCurrentPage={setCurrentPage}>탐험하기</NavLink>
          <NavLink page="quiz" currentPage={currentPage} setCurrentPage={setCurrentPage}>도전! 퀴즈</NavLink>
          <NavLink page="protect-heritage-game" currentPage={currentPage} setCurrentPage={setCurrentPage}>지킴이 게임</NavLink>
          <NavLink page="videos" currentPage={currentPage} setCurrentPage={setCurrentPage}>영상 보기</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
