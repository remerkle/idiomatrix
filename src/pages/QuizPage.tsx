import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QUIZ_QUESTIONS, LANGUAGES } from '../data/languages';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';

export function QuizPage() {
  const { selectedLanguage, setSelectedLanguage, addXp } = useApp();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const questions = QUIZ_QUESTIONS.filter(q => q.languageId === selectedLanguage.id);
  const question = questions[index];

  function handleSelect(option: string) {
    if (selected !== null) return;
    setSelected(option);
    if (option === question.answer) {
      setScore(s => s + 1);
      addXp(10);
    }
  }

  function handleNext() {
    setSelected(null);
    if (index + 1 >= questions.length) {
      setDone(true);
    } else {
      setIndex(i => i + 1);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-black text-[#3C3C3C]">Quiz</h1>
        <Card className="p-12 text-center">
          <p className="text-2xl mb-2">🎯</p>
          <p className="font-bold text-[#777777]">No quiz questions yet for {selectedLanguage.name}.</p>
        </Card>
      </div>
    );
  }

  if (done) {
    const perfect = score === questions.length;
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-black text-[#3C3C3C]">Quiz</h1>
        <Card className="p-12 text-center flex flex-col items-center gap-4">
          <span className="text-5xl">{perfect ? '🏆' : score > questions.length / 2 ? '🎉' : '💪'}</span>
          <h2 className="text-2xl font-black text-[#3C3C3C]">
            {perfect ? 'Perfect score!' : 'Quiz complete!'}
          </h2>
          <p className="text-[#777777]">You got <strong>{score}</strong> out of <strong>{questions.length}</strong> correct.</p>
          <Button onClick={restart}>Try again</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-[#3C3C3C]">Quiz</h1>
        <div className="flex gap-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang.id}
              onClick={() => { setSelectedLanguage(lang); restart(); }}
              style={selectedLanguage.id === lang.id ? { backgroundColor: lang.color, color: 'white' } : {}}
              className={`px-3 py-1.5 rounded-xl font-bold text-sm border-2 transition-colors ${
                selectedLanguage.id === lang.id ? 'border-transparent' : 'border-[#E5E5E5] text-[#777777] hover:bg-[#F7F7F7]'
              }`}
            >
              {lang.flag}
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm font-bold text-[#777777]">
          <span>Question {index + 1} of {questions.length}</span>
          <Badge color="green">Score: {score}</Badge>
        </div>
        <ProgressBar value={index} max={questions.length} />
      </div>

      {/* Question */}
      <Card className="p-6">
        <p className="text-xl font-black text-[#3C3C3C]">{question.prompt}</p>
      </Card>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {question.options?.map(option => {
          const isCorrect = option === question.answer;
          const isSelected = option === selected;

          let style = 'border-[#E5E5E5] text-[#3C3C3C] hover:bg-[#F7F7F7]';
          if (selected !== null) {
            if (isCorrect) style = 'border-[#58CC02] bg-[#D7F5B1] text-[#46A302]';
            else if (isSelected) style = 'border-[#FF4B4B] bg-[#FFD4D4] text-[#CC3B3B]';
          }

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`p-4 rounded-2xl border-2 border-b-4 font-bold text-left transition-colors ${style} ${
                selected !== null ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback + Next */}
      {selected !== null && (
        <div className="flex items-center justify-between">
          <p className={`font-black text-lg ${selected === question.answer ? 'text-[#58CC02]' : 'text-[#FF4B4B]'}`}>
            {selected === question.answer ? '✅ Correct! +10 XP' : `❌ The answer was: ${question.answer}`}
          </p>
          <Button onClick={handleNext}>
            {index + 1 >= questions.length ? 'See Results' : 'Next →'}
          </Button>
        </div>
      )}
    </div>
  );
}
