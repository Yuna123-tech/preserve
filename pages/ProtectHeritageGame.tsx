import React from 'react';
import MascotIcon from '../components/icons/MascotIcon.tsx';

const ProtectHeritageGame: React.FC = () => {
    type ThreatType = 'trash' | 'graffiti' | 'bug' | 'fire'; 
    type PowerUpType = 'shield';
    interface Threat { id: number; type: ThreatType; x: number; y: number; clicksLeft: number; }
    interface PowerUp { id: number; type: PowerUpType; x: number; y: number; }
    interface FloatingScore { id: number; x: number; y: number; text: string; }

    const threatIcons: Record<ThreatType, (c?: number) => JSX.Element> = { 
        trash: () => <div className="text-4xl">🗑️</div>, 
        graffiti: () => <div className="text-4xl">🎨</div>, 
        bug: () => <div className="text-4xl">🐛</div>, 
        fire: (c = 1) => <div className={`text-5xl transition-transform duration-200 ${c <= 1 ? 'scale-75 opacity-70' : ''} ${c === 2 ? 'scale-90' : ''}`}>🔥</div>, 
    };
    const powerUpIcons: Record<PowerUpType, JSX.Element> = { 
        shield: <div className="text-4xl animate-pulse">🛡️</div>, 
    };

    const GAME_DURATION = 60, MAX_HEALTH = 100, HEALTH_DECREMENT = 20, SHIELD_DURATION = 5;

    const Pagoda: React.FC<{ health: number, isInvincible: boolean }> = ({ health, isInvincible }) => {
        const getPagodaState = () => {
            if (health > 70) return { c: "text-yellow-600", s: [] }; 
            if (health > 40) return { c: "text-yellow-700", s: [{ d: "M13 15 l-2 3", k: 1 }] }; 
            if (health > 0) return { c: "text-yellow-800", s: [{ d: "M13 15 l-2 3", k: 1 }, { d: "M10 10 l2 2.5", k: 2 }] }; 
            return { c: "text-gray-500", s: [{ d: "M13 15 l-2 3", k: 1 }, { d: "M10 10 l2 2.5", k: 2 }, { d: "M5 20 l3 -3", k: 3 }] };
        };
        const { c, s } = getPagodaState();
        return (
            <div className="relative">
                <svg viewBox="0 0 24 24" className={`w-64 h-64 transition-colors duration-500 ${c}`} fill="currentColor">
                    <path d="M12 2L2 8h2v2h16V8h2L12 2zm2 7h-4v2h4v-2zm-2-1c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zM4 11v9h16v-9H4zm2 7h-2v-2h2v2zm4 0H6v-2h4v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                    {s.map(k => <path key={k.k} d={k.d} stroke="black" strokeWidth="0.5" fill="none" />)}
                </svg>
                {isInvincible && <div className="absolute inset-0 bg-blue-400 bg-opacity-40 rounded-full animate-pulse"></div>}
            </div>
        );
    };

    const [gameState, setGameState] = React.useState<'idle' | 'playing' | 'win' | 'lose'>('idle');
    const [health, setHealth] = React.useState(MAX_HEALTH);
    const [score, setScore] = React.useState(0);
    const [timeLeft, setTimeLeft] = React.useState(GAME_DURATION);
    const [threats, setThreats] = React.useState<Threat[]>([]);
    const [powerUps, setPowerUps] = React.useState<PowerUp[]>([]);
    const [isInvincible, setIsInvincible] = React.useState(false);
    const [floatingScores, setFloatingScores] = React.useState<FloatingScore[]>([]);
    const timeoutRefs = React.useRef<Map<number, number>>(new Map());
    const nextId = React.useRef(0);
    const spawnerTimeoutRef = React.useRef<number | null>(null);

    const clearAllTimeouts = React.useCallback(() => { 
        timeoutRefs.current.forEach(clearTimeout); 
        timeoutRefs.current.clear(); 
        if (spawnerTimeoutRef.current) clearTimeout(spawnerTimeoutRef.current); 
    }, []);

    const resetGame = React.useCallback(() => { 
        clearAllTimeouts(); 
        setGameState('playing'); 
        setHealth(MAX_HEALTH); 
        setScore(0); 
        setTimeLeft(GAME_DURATION); 
        setThreats([]); 
        setPowerUps([]); 
        setIsInvincible(false); 
        setFloatingScores([]); 
        nextId.current = 0; 
    }, [clearAllTimeouts]);

    const spawnItem = React.useCallback(() => {
        if (document.hidden) { 
            spawnerTimeoutRef.current = window.setTimeout(spawnItem, 1000); 
            return; 
        }
        if (Math.random() < 0.1 && powerUps.length === 0 && !isInvincible) {
            const id = nextId.current++; 
            setPowerUps(p => [...p, { id, type: 'shield', x: Math.random() > 0.5 ? Math.random() * 30 : 70 + Math.random() * 30, y: Math.random() * 80 + 10 }]);
        } else {
            const types = Object.keys(threatIcons) as ThreatType[]; 
            const type = types[Math.floor(Math.random() * types.length)]; 
            const id = nextId.current++;
            const newThreat: Threat = { id, type, x: Math.random() > 0.5 ? Math.random() * 25 : 75 + Math.random() * 25, y: Math.random() * 80 + 10, clicksLeft: type === 'fire' ? 3 : 1 };
            const timeoutId = window.setTimeout(() => { 
                setThreats(p => p.filter(t => t.id !== id)); 
                if (!isInvincible) { setHealth(h => Math.max(0, h - HEALTH_DECREMENT)); } 
                timeoutRefs.current.delete(id); 
            }, 3500);
            timeoutRefs.current.set(id, timeoutId); 
            setThreats(p => [...p, newThreat]);
        }
        const nextTime = 1200 - (GAME_DURATION - timeLeft) * 10; 
        spawnerTimeoutRef.current = window.setTimeout(spawnItem, Math.max(500, nextTime));
    }, [powerUps.length, isInvincible, timeLeft]);

    React.useEffect(() => { 
        if (gameState !== 'playing') return; 
        const timer = setInterval(() => { 
            setTimeLeft(p => { 
                if (p <= 1) { 
                    clearInterval(timer); 
                    setGameState(health > 0 ? 'win' : 'lose'); 
                    return 0; 
                } 
                return p - 1; 
            }); 
        }, 1000); 
        spawnItem(); 
        return () => { 
            clearInterval(timer); 
            clearAllTimeouts(); 
        }; 
    }, [gameState, health, spawnItem, clearAllTimeouts]);

    React.useEffect(() => { 
        if (health <= 0 && gameState === 'playing') { 
            setGameState('lose'); 
            clearAllTimeouts(); 
        } 
    }, [health, gameState, clearAllTimeouts]);

    const addFloatingScore = (x: number, y: number, text: string) => { 
        const id = nextId.current++; 
        setFloatingScores(p => [...p, { id, x, y, text }]); 
        setTimeout(() => { 
            setFloatingScores(p => p.filter(fs => fs.id !== id)); 
        }, 1000); 
    };

    const handleThreatClick = (id: number, x: number, y: number) => {
        setThreats(p => p.map(t => { 
            if (t.id === id) { 
                const newClicks = t.clicksLeft - 1; 
                if (newClicks <= 0) { 
                    const timeoutId = timeoutRefs.current.get(id); 
                    if (timeoutId) { 
                        clearTimeout(timeoutId); 
                        timeoutRefs.current.delete(id); 
                    } 
                    setScore(s => s + 10); 
                    addFloatingScore(x, y, '+10'); 
                    return null; 
                } 
                return { ...t, clicksLeft: newClicks }; 
            } 
            return t; 
        }).filter(Boolean) as Threat[]);
    };
    
    const handlePowerUpClick = (id: number) => { 
        setPowerUps(p => p.filter(p => p.id !== id)); 
        setIsInvincible(true); 
        setTimeout(() => setIsInvincible(false), SHIELD_DURATION * 1000); 
    };
    
    const renderContent = () => {
        if (gameState === 'idle') return (<div className="text-center"><h2 className="font-display text-7xl text-center mb-4 text-teal-600">지켜줘! 국가유산</h2><p className="text-2xl mb-8">나쁜 위협들로부터 우리의 소중한 국가유산을 지켜주세요!</p><button onClick={resetGame} className="bg-teal-500 text-white font-display text-5xl px-10 py-4 rounded-full shadow-lg hover:bg-teal-600 transition-colors transform hover:scale-105">게임 시작!</button></div>);
        if (gameState === 'win' || gameState === 'lose') { 
            const isWin = gameState === 'win'; 
            return (
                <div className="text-center bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center">
                    <MascotIcon className="h-32 w-32 mx-auto mb-4" />
                    <h3 className={`font-display text-6xl ${isWin ? 'text-green-600' : 'text-red-600'}`}>{isWin ? '성공! 완벽하게 지켜냈어요!' : '이런! 유산이 손상되었어요...'}</h3>
                    <p className="text-3xl mt-4">최종 점수: <span className="font-bold">{score}점</span></p>
                    <p className="text-2xl mt-2">{isWin ? '당신은 최고의 국가유산 지킴이!' : '국가유산을 아끼는 마음이 필요해요.'}</p>
                    <button onClick={resetGame} className="mt-8 bg-teal-500 text-white font-display text-4xl px-8 py-3 rounded-full shadow-lg hover:bg-teal-600 transition-colors">다시 도전하기</button>
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
                        <div className="text-center font-bold text-lg">남은 건강 {isInvincible && `(무적!)`}</div>
                    </div>
                    <div><span className="font-bold text-xl">남은 시간:</span><span className="text-2xl ml-2">{timeLeft}초</span></div>
                </div>
                <div className="relative w-full h-[60vh] bg-sky-100 rounded-2xl shadow-inner overflow-hidden border-4 border-yellow-200">
                    <div className="absolute inset-0 flex items-center justify-center"><Pagoda health={health} isInvincible={isInvincible} /></div>
                    {floatingScores.map(fs => (<div key={fs.id} className="absolute text-green-600 font-bold text-2xl animate-fade-out-up" style={{ left: `${fs.x}%`, top: `${fs.y}%`, pointerEvents: 'none' }}>{fs.text}</div>))}
                    {threats.map(t => (<button key={t.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full hover:scale-125 transition-transform" style={{ left: `${t.x}%`, top: `${t.y}%` }} onClick={() => handleThreatClick(t.id, t.x, t.y)}>{threatIcons[t.type](t.clicksLeft)}</button>))}
                    {powerUps.map(p => (<button key={p.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 p-2 bg-blue-200/50 rounded-full hover:scale-125 transition-transform" style={{ left: `${p.x}%`, top: `${p.y}%` }} onClick={() => handlePowerUpClick(p.id)}>{powerUpIcons[p.type]}</button>))}
                </div>
            </div>
        );
    };
    return (<div className="flex justify-center items-center flex-col min-h-[70vh]">{renderContent()}</div>);
};

export default ProtectHeritageGame;
