import React from 'react';
import { QuizQuestion } from '../types.ts';
import { quizQuestions as initialQuizQuestions } from '../constants.ts';

const Quiz: React.FC = () => {
    const [questions, setQuestions] = React.useState<QuizQuestion[]>(initialQuizQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [status, setStatus] = React.useState<'idle' | 'playing' | 'finished'>('idle');
    const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
    const [answerState, setAnswerState] = React.useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');

    const startQuiz = () => {
        setQuestions(prev => [...prev].sort(() => Math.random() - 0.5));
        setCurrentQuestionIndex(0); 
        setScore(0); 
        setSelectedAnswer(null); 
        setAnswerState('unanswered'); 
        setStatus('playing');
    };

    const handleAnswer = (selectedIndex: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(selectedIndex);
        const isCorrect = selectedIndex === questions[currentQuestionIndex].correctAnswerIndex;
        if (isCorrect) { 
            setScore(prev => prev + 1); 
            setAnswerState('correct'); 
        } else { 
            setAnswerState('incorrect'); 
        }
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) { 
                setCurrentQuestionIndex(prev => prev + 1); 
                setSelectedAnswer(null); 
                setAnswerState('unanswered'); 
            } else { 
                setStatus('finished'); 
            }
        }, 2000);
    };

    const currentQuestion = questions[currentQuestionIndex];

    const renderContent = () => {
        switch (status) {
            case 'playing': 
                return (
                    <div className="w-full max-w-3xl mx-auto">
                        <div className="mb-6 text-center">
                            <p className="text-2xl text-gray-600">문제 {currentQuestionIndex + 1} / {questions.length}</p>
                            <h3 className="font-display text-5xl mt-2 leading-tight">{currentQuestion.question}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.options.map((option, index) => { 
                                let buttonClass = "bg-white hover:bg-orange-100 text-orange-600"; 
                                if (selectedAnswer === index) { 
                                    buttonClass = answerState === 'correct' ? "bg-green-500 text-white" : "bg-red-500 text-white"; 
                                } else if (selectedAnswer !== null && index === currentQuestion.correctAnswerIndex) { 
                                    buttonClass = "bg-green-500 text-white"; 
                                } 
                                return (
                                    <button key={index} onClick={() => handleAnswer(index)} disabled={selectedAnswer !== null} className={`p-4 rounded-xl text-2xl font-semibold shadow-md transition-all duration-300 transform disabled:cursor-not-allowed ${buttonClass}`}>
                                        {option}
                                    </button>
                                ); 
                            })}
                        </div>
                        {selectedAnswer !== null && (
                            <div className="mt-6 p-4 bg-yellow-100 rounded-lg text-center animate-fade-in">
                                <h4 className="font-bold text-xl">해설</h4>
                                <p className="mt-2 text-lg">{currentQuestion.explanation}</p>
                            </div>
                        )}
                    </div>
                );
            case 'finished': 
                return (
                    <div className="text-center">
                        <h3 className="font-display text-8xl text-orange-500">퀴즈 끝!</h3>
                        <p className="text-4xl mt-4">총 {questions.length}문제 중 <span className="font-bold text-green-600">{score}개</span>를 맞혔어요!</p>
                        <p className="text-2xl mt-2">{score === questions.length ? '와, 당신은 진정한 국가유산 박사군요! 🥳' : '조금 더 공부하면 박사가 될 수 있어요! 👍'}</p>
                        <button onClick={startQuiz} className="mt-8 bg-orange-500 text-white font-display text-4xl px-8 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors">다시 풀어보기</button>
                    </div>
                );
            default: 
                return (
                    <div className="text-center">
                        <h2 className="font-display text-7xl text-center mb-4 text-red-600">도전! 국가유산 퀴즈</h2>
                        <p className="text-2xl mb-8">우리나라 국가유산에 대해 얼마나 알고 있는지 확인해봐요!</p>
                        <button onClick={startQuiz} className="bg-red-500 text-white font-display text-5xl px-10 py-4 rounded-full shadow-lg hover:bg-red-600 transition-colors transform hover:scale-105">퀴즈 시작하기!</button>
                    </div>
                );
        }
    };
    return <div className="flex justify-center items-center flex-col min-h-[60vh]">{renderContent()}</div>;
};

export default Quiz;
