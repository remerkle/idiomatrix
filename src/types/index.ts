export type Language = {
  id: string;
  name: string;
  flag: string;
  color: string;
};

export type Lesson = {
  id: string;
  languageId: string;
  title: string;
  description: string;
  unit: number;
  order: number;
  completed: boolean;
  locked: boolean;
  xpReward: number;
};

export type Flashcard = {
  id: string;
  languageId: string;
  front: string;
  back: string;
  nextReviewDate: string;
  interval: number;
  easeFactor: number;
};

export type QuizQuestion = {
  id: string;
  languageId: string;
  type: 'multiple-choice' | 'fill-blank';
  prompt: string;
  options?: string[];
  answer: string;
};

export type UserProgress = {
  streak: number;
  xp: number;
  level: number;
  completedLessons: string[];
  dailyGoal: number;
  todayXp: number;
};
