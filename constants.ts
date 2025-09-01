import type { QuizQuestion } from './types';

export const heritageSites = [
  {
    name: '경복궁',
    description: '사적 | 조선 시대의 대표적인 궁궐로, 서울의 중심에 있어요.',
    image: 'https://images.unsplash.com/photo-1542640244-b28a487f872a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
  },
  {
    name: '석굴암과 불국사',
    description: '세계유산 | 신라 시대의 불교 예술을 대표하는 아름다운 건축물이에요.',
    image: 'https://images.unsplash.com/photo-1633534942293-2920f6df0164?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
  },
  {
    name: '수원 화성',
    description: '세계유산 | 정조대왕이 만든 튼튼하고 아름다운 성곽이에요.',
    image: 'https://images.unsplash.com/photo-1594923296219-5d6e39958c22?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
  },
  {
    name: '창덕궁',
    description: '세계유산 | 자연과 조화를 이루는 아름다운 궁궐로 유명해요.',
    image: 'https://images.unsplash.com/photo-1545595709-dd6c6843c0a3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
  },
  {
    name: '해인사 장경판전',
    description: '세계유산 | 고려 시대에 만들어진 팔만대장경을 보관하는 곳이에요.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Haeinsa_Temple_Janggyeong_Panjeon-15586.jpg/640px-Haeinsa_Temple_Janggyeong_Panjeon-15586.jpg'
  },
  {
    name: '고창, 화순, 강화 고인돌 유적',
    description: '세계유산 | 청동기 시대 사람들의 무덤으로, 거대한 돌로 만들어졌어요.',
    image: 'https://images.unsplash.com/photo-1596541323333-25a8b53aff44?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
  }
];

export const videoData = [
    {
      id: 'M99dYlq_y1I',
      title: '[슬기로운 국가유산 탐구생활] 국가유산이란?',
      thumbnail: 'https://img.youtube.com/vi/M99dYlq_y1I/hqdefault.jpg'
    },
    {
      id: 'DffGzExQshs',
      title: '[문화유산채널] 조선왕릉 - 인류의 문화가치를 담다',
      thumbnail: 'https://img.youtube.com/vi/DffGzExQshs/hqdefault.jpg'
    },
    {
      id: 'h9t3nI-p2-g',
      title: '[국가유산 OX 퀴즈] 수원 화성 편',
      thumbnail: 'https://img.youtube.com/vi/h9t3nI-p2-g/hqdefault.jpg'
    },
    {
      id: 'E_3ISk2i2gA',
      title: '소중한 우리 국가유산, 함께 지켜요!',
      thumbnail: 'https://img.youtube.com/vi/E_3ISk2i2gA/hqdefault.jpg'
    }
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: "조선 시대의 왕들이 살았던 가장 중심이 되는 궁궐의 이름은 무엇일까요?",
    options: ["덕수궁", "경복궁", "창경궁", "경희궁"],
    correctAnswerIndex: 1,
    explanation: "경복궁은 조선을 세운 태조 이성계가 만든 첫 번째 궁궐로, 조선 시대의 가장 중요한 궁궐이었어요."
  },
  {
    question: "신라 시대의 불교 예술을 대표하며, 인공적으로 만든 석굴 사원은 무엇일까요?",
    options: ["불국사", "첨성대", "석굴암", "다보탑"],
    correctAnswerIndex: 2,
    explanation: "석굴암은 신라 사람들이 돌을 쌓아 만든 인공 석굴로, 그 안에 있는 아름다운 불상으로 유명해요."
  },
  {
    question: "정조대왕이 아버지의 무덤을 옮기면서 만든, 과학적이고 아름다운 성곽은 어디일까요?",
    options: ["한양도성", "수원 화성", "남한산성", "공산성"],
    correctAnswerIndex: 1,
    explanation: "수원 화성은 정약용과 같은 뛰어난 학자들이 참여하여 매우 과학적인 방법으로 만들어진 성곽이에요."
  },
  {
    question: "고려 시대에 부처님의 힘으로 몽골의 침입을 막기 위해 만든 나무 경판은 무엇인가요?",
    options: ["직지심체요절", "훈민정음 해례본", "조선왕조실록", "팔만대장경"],
    correctAnswerIndex: 3,
    explanation: "팔만대장경은 8만 개가 넘는 나무판에 불교 경전을 새긴 것으로, 우리 조상들의 대단한 기술과 정성을 보여줘요."
  },
  {
    question: "국가유산을 방문했을 때 우리가 해야 할 올바른 행동은 무엇일까요?",
    options: ["낙서하기", "쓰레기 버리기", "만져보기", "조용히 감상하기"],
    correctAnswerIndex: 3,
    explanation: "국가유산은 우리 모두의 소중한 보물이므로, 눈으로만 보고 조용히 감상하며 아끼고 보호해야 해요."
  }
];
