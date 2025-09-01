import React from 'react';
import type { Page } from '../types.ts';
import { MascotIcon } from '../components/icons/MascotIcon.tsx';
import { LearnIcon } from '../components/icons/LearnIcon.tsx';
import { HeritageIcon } from '../components/icons/HeritageIcon.tsx';
import { GameIcon } from '../components/icons/GameIcon.tsx';
import { VideoIcon } from '../components/icons/VideoIcon.tsx';
import { ConservationIcon } from '../components/icons/ConservationIcon.tsx';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

const MenuCard: React.FC<{ title: string; description: string; icon: React.ReactNode; onClick: () => void; bgColor: string }> = ({ title, description, icon, onClick, bgColor }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center text-center p-6 rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${bgColor} text-white`}>
    <div className="mb-4">{icon}</div>
    <h3 className="font-display text-6xl">{title}</h3>
    <p className="font-sans text-lg mt-2">{description}</p>
  </button>
);


const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center justify-center bg-white/70 rounded-3xl p-12 mb-12 shadow-inner-lg bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200')"}}>
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl">
          <MascotIcon className="h-40 w-40 mx-auto mb-4" />
          <h2 className="font-display text-8xl text-orange-600">안녕, 나는 국가유산 지킴이 호야!</h2>
          <p className="text-2xl mt-4 text-gray-700 max-w-3xl mx-auto">
            우리나라의 아름다운 국가유산에 대해 함께 배우고, 지키는 방법을 알아보자!
            신나는 탐험을 떠날 준비 됐니?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MenuCard 
          title="알아보기" 
          description="국가유산이 무엇인지 배워봐요." 
          icon={<LearnIcon className="w-24 h-24" />}
          onClick={() => setCurrentPage('learn')}
          bgColor="bg-blue-400"
        />
        <MenuCard 
          title="탐험하기" 
          description="멋진 국가유산들을 구경해요." 
          icon={<HeritageIcon className="w-24 h-24" />}
          onClick={() => setCurrentPage('explore')}
          bgColor="bg-green-500"
        />
        <MenuCard 
          title="도전! 퀴즈" 
          description="퀴즈를 풀며 실력을 확인해요." 
          icon={<GameIcon className="w-24 h-24" />}
          onClick={() => setCurrentPage('quiz')}
          bgColor="bg-red-500"
        />
        <MenuCard 
          title="지킴이 게임" 
          description="위협에서 유산을 지켜주세요!" 
          icon={<ConservationIcon className="w-24 h-24" />}
          onClick={() => setCurrentPage('protect-heritage-game')}
          bgColor="bg-teal-500"
        />
        <MenuCard 
          title="영상 보기" 
          description="영상으로 생생하게 만나요." 
          icon={<VideoIcon className="w-24 h-24" />}
          onClick={() => setCurrentPage('videos')}
          bgColor="bg-purple-500"
        />
      </div>
    </div>
  );
};

export default Home;