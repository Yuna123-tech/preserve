export type Page = 'home' | 'learn' | 'explore' | 'quiz' | 'videos' | 'protect-heritage-game';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
