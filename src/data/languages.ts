import type { Language, Lesson, Flashcard, QuizQuestion } from '../types';

// TODO: Replace with the 5 languages you want Pentalingo to support.
export const LANGUAGES: Language[] = [
  { id: 'es', name: 'Spanish',  flag: '🇪🇸', color: '#FF9600' },
  { id: 'fr', name: 'French',   flag: '🇫🇷', color: '#1CB0F6' },
  { id: 'ja', name: 'Japanese', flag: '🇯🇵', color: '#FF4B4B' },
  { id: 'zh', name: 'Mandarin', flag: '🇨🇳', color: '#CE82FF' },
  { id: 'ar', name: 'Arabic',   flag: '🇸🇦', color: '#58CC02' },
];

export const LESSONS: Lesson[] = [
  { id: 'es-1', languageId: 'es', title: 'Greetings',      description: 'Say hello and goodbye',        unit: 1, order: 1, completed: true,  locked: false, xpReward: 10 },
  { id: 'es-2', languageId: 'es', title: 'Numbers 1–10',   description: 'Count from one to ten',        unit: 1, order: 2, completed: true,  locked: false, xpReward: 10 },
  { id: 'es-3', languageId: 'es', title: 'Colors',         description: 'Learn basic colors',           unit: 1, order: 3, completed: false, locked: false, xpReward: 10 },
  { id: 'es-4', languageId: 'es', title: 'Family',         description: 'Family members vocabulary',    unit: 2, order: 1, completed: false, locked: true,  xpReward: 15 },
  { id: 'fr-1', languageId: 'fr', title: 'Bonjour!',       description: 'French greetings',             unit: 1, order: 1, completed: false, locked: false, xpReward: 10 },
  { id: 'fr-2', languageId: 'fr', title: 'Les Nombres',    description: 'Numbers in French',            unit: 1, order: 2, completed: false, locked: true,  xpReward: 10 },
  { id: 'ja-1', languageId: 'ja', title: 'Hiragana Part 1','description': 'Learn あいうえお',           unit: 1, order: 1, completed: false, locked: false, xpReward: 15 },
  { id: 'zh-1', languageId: 'zh', title: 'Tones',          description: 'The four tones of Mandarin',  unit: 1, order: 1, completed: false, locked: false, xpReward: 15 },
  { id: 'ar-1', languageId: 'ar', title: 'The Alphabet',   description: 'Arabic letters introduction',  unit: 1, order: 1, completed: false, locked: false, xpReward: 15 },
];

export const FLASHCARDS: Flashcard[] = [
  { id: 'fc-1', languageId: 'es', front: 'Hola',       back: 'Hello',       nextReviewDate: '2026-06-29', interval: 1, easeFactor: 2.5 },
  { id: 'fc-2', languageId: 'es', front: 'Gracias',    back: 'Thank you',   nextReviewDate: '2026-06-29', interval: 1, easeFactor: 2.5 },
  { id: 'fc-3', languageId: 'es', front: 'Uno',        back: 'One',         nextReviewDate: '2026-06-30', interval: 2, easeFactor: 2.5 },
  { id: 'fc-4', languageId: 'fr', front: 'Bonjour',    back: 'Hello / Good day', nextReviewDate: '2026-06-29', interval: 1, easeFactor: 2.5 },
  { id: 'fc-5', languageId: 'fr', front: 'Merci',      back: 'Thank you',   nextReviewDate: '2026-06-29', interval: 1, easeFactor: 2.5 },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1', languageId: 'es', type: 'multiple-choice',
    prompt: 'What does "Hola" mean?',
    options: ['Goodbye', 'Hello', 'Please', 'Thank you'],
    answer: 'Hello',
  },
  {
    id: 'q-2', languageId: 'es', type: 'multiple-choice',
    prompt: 'How do you say "two" in Spanish?',
    options: ['Uno', 'Tres', 'Dos', 'Cuatro'],
    answer: 'Dos',
  },
  {
    id: 'q-3', languageId: 'fr', type: 'multiple-choice',
    prompt: 'What does "Merci" mean?',
    options: ['Sorry', 'Thank you', 'Please', 'Yes'],
    answer: 'Thank you',
  },
];
