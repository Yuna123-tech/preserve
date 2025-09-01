import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MascotIcon } from '../components/icons/MascotIcon';

type ThreatType = 'trash' | 'graffiti' | 'bug';
interface Threat {
  id: number;
  type: ThreatType;
  x: number;
  y: number;
  icon: JSX.Element;
}

const threatIcons: Record<ThreatType, JSX.Element> = {
  trash: <div className="text-4xl">🗑️</div>,
  graffiti: <div className="text-4xl">🎨</div>,
  bug: <div className="text-4xl">🐛</div>,
};

const GAME_DURATION = 60; // 60 seconds
const MAX_HEALTH = 100;
const HEALTH_DECREMENT = 20;

const Pagoda: React.FC<{ health: number }> = ({ health }) => {
  const getPagodaState = () => {
    if (health > 70) return { color: "text-yellow-600", cracks: [] };
    if (health > 40) return { color: "text-yellow-700", cracks: [{ d: "M13 15 l-2 3", key: 1 }] };
    if (health > 0) return { color: "text-yellow-800", cracks: [{ d: "M13 15 l-2 3", key: 1 }, { d: "M10 10 l2 2.5", key: 2 }] };
    return { color: "text-gray-500", cracks: [{ d: "M13 15 l-2 3", key: 1 }, { d: "M10 10 l2 2.5", key: 2 }, {d: "M5 20 l3 -3", key: 3}] };
  };

  const { color, cracks } = getPagodaState();

  return (
    <svg viewBox="0 0 24 24" className={`w-64 h-64 transition-colors duration-500 ${color}`} fill="currentColor">
      <path d="M12 2L2 8h2v2h16V8h2L12 2zm2 7h-4v2h4v-2zm-2-1c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zM4 11v9h16v-9H4zm2 7h-2v-2h2v2zm4 0H6v-2h4v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
      {cracks.map(crack => <path key={crack.key} d={crack.d} stroke="black" strokeWidth="0.5" fill="none" />)}
    </svg>
  );
};

const ProtectHeritageGame: React.FC = () => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'win' | 'lose'>('idle');
  const [health, setHealth] = useState(MAX_HEALTH);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [threats, setThreats] = useState<Threat[]>([]);
  const timeoutRefs = useRef<Map<number, number>>(new Map());
  const nextId = useRef(0);

  const resetGame = useCallback(() => {
    setGameState('playing');
    setHealth(MAX_HEALTH);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setThreats([]);
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current.clear();
    nextId.current = 0;
  }, []);
  
  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(gameTimer);
          if (health > 0) {
            setGameState('win');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const threatSpawner = setInterval(() => {
      if (document.hidden) return; // Pause spawner when tab is not visible

      const threatTypes = Object.keys(threatIcons) as ThreatType[];
      const type = threatTypes[Math.floor(Math.random() * threatTypes.length)];
      const threatId = nextId.current++;

      const newThreat: Threat = {
        id: threatId,
        type,
        x: Math.random() > 0.5 ? Math.random() * 30 : 70 + Math.random() * 30,
        y: Math.random() * 80 + 10,
        icon: threatIcons[type],
      };
      
      const timeoutId = window.setTimeout(() => {
        setThreats(prev => prev.filter(t => t.id !== threatId));
        setHealth(h => Math.max(0, h - HEALTH_DECREMENT));
        timeoutRefs.current.delete(threatId);
      }, 2500 + Math.random() * 1500); // Slightly faster threats
      
      timeoutRefs.current.set(threatId, timeoutId);
      setThreats(prev => [...prev, newThreat]);

    }, 1200); // Spawn threats a bit faster

    return () => {
      clearInterval(gameTimer);
      clearInterval(threatSpawner);
    };
  }, [gameState, health]);
  
  useEffect(() => {
    if (health <= 0 && gameState === 'playing') {
      setGameState('lose');
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current.clear();
    }
  }, [health, gameState]);

  const handleThreatClick = (id: number) => {
    const timeoutId = timeoutRefs.current.get(id);
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutRefs.current.delete(id);
    }
    setThreats(prev => prev.filter(threat => threat.id !== id));
    setScore(prev => prev + 10);
  };

  const renderContent = () => {
    if (gameState === 'idle') {
      return (
        <div className="text-center">
          <h2 className="font-display text-7xl text-center mb-4 text-teal-600">지켜줘! 국가유산</h2>
          <p className="text-2xl mb-8">나쁜 위협들로부터 우리의 소중한 국가유산을 지켜주세요!</p>
          <button
            onClick={resetGame}
            className="bg-teal-500 text-white font-display text-5xl px-10 py-4 rounded-full shadow-lg hover:bg-teal-600 transition-colors transform hover:scale-105"
          >
            게임 시작!
          </button>
        </div>
      );
    }
    
    if (gameState === 'win' || gameState === 'lose') {
      const isWin = gameState === 'win';
      return (
         <div className="text-center bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center">
           <MascotIcon className="h-32 w-32 mx-auto mb-4" />
          <h3 className={`font-display text-6xl ${isWin ? 'text-green-600' : 'text-red-600'}`}>
            {isWin ? '성공! 완벽하게 지켜냈어요!' : '이런! 유산이 손상되었어요...'}
          </h3>
          <p className="text-3xl mt-4">
            {isWin ? `당신은 최고의 국가유산 지킴이! (점수: ${score}점)` : '국가유산을 아끼고 사랑하는 마음이 필요해요.'}
          </p>
          <button
            onClick={resetGame}
            className="mt-8 bg-teal-500 text-white font-display text-4xl px-8 py-3 rounded-full shadow-lg hover:bg-teal-600 transition-colors"
          >
            다시 도전하기
          </button>
        </div>
      );
    }

    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-xl shadow-lg">
          <div><span className="font-bold text-xl">점수:</span><span className="text-2xl ml-2">{score}</span></div>
          <div className="w-1/2">
            <div className="w-full bg-gray-200 rounded-full h-6">
                <div className="bg-green-500 h-6 rounded-full transition-all duration-300" style={{ width: `${health}%` }}></div>
            </div>
            <div className="text-center font-bold text-lg">남은 건강</div>
          </div>
          <div><span className="font-bold text-xl">남은 시간:</span><span className="text-2xl ml-2">{timeLeft}초</span></div>
        </div>

        <div className="relative w-full h-[60vh] bg-sky-100 rounded-2xl shadow-inner overflow-hidden border-4 border-yellow-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <Pagoda health={health} />
          </div>
          {threats.map(threat => (
            <button
              key={threat.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full hover:scale-125 transition-transform"
              style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
              onClick={() => handleThreatClick(threat.id)}
            >
              {threat.icon}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  return (
      <div className="flex justify-center items-center flex-col min-h-[70vh]">
          {renderContent()}
      </div>
  );
};

export default ProtectHeritageGame;