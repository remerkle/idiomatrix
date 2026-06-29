import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FLASHCARDS, LANGUAGES } from '../data/languages';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function FlashcardsPage() {
  const { selectedLanguage, setSelectedLanguage, addXp } = useApp();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);

  const cards = FLASHCARDS.filter(c => c.languageId === selectedLanguage.id);

  function handleRating(rating: 'easy' | 'good' | 'hard') {
    if (rating === 'easy') addXp(5);
    else if (rating === 'good') addXp(3);
    setFlipped(false);
    if (index + 1 >= cards.length) {
      setDone(true);
    } else {
      setIndex(i => i + 1);
    }
  }

  function restart() {
    setIndex(0);
    setFlipped(false);
    setDone(false);
  }

  const card = cards[index];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-[#3C3C3C]">Flashcards</h1>
        <div className="flex gap-2">
          {LANGUAGES.map(lang => (
            <button
              key={lang.id}
              onClick={() => { setSelectedLanguage(lang); setIndex(0); setFlipped(false); setDone(false); }}
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

      {cards.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-2xl mb-2">🃏</p>
          <p className="font-bold text-[#777777]">No flashcards yet for {selectedLanguage.name}.</p>
        </Card>
      ) : done ? (
        <Card className="p-12 text-center flex flex-col items-center gap-4">
          <span className="text-5xl">🎉</span>
          <h2 className="text-2xl font-black text-[#3C3C3C]">Session complete!</h2>
          <p className="text-[#777777]">You reviewed {cards.length} cards.</p>
          <Button onClick={restart}>Review again</Button>
        </Card>
      ) : (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between text-sm font-bold text-[#777777]">
            <span>{index + 1} of {cards.length}</span>
            <Badge color="purple">🃏 {selectedLanguage.name}</Badge>
          </div>

          {/* Card */}
          <Card
            onClick={() => setFlipped(f => !f)}
            accent="#CE82FF"
            className="min-h-64 flex flex-col items-center justify-center gap-4 cursor-pointer select-none"
          >
            <p className="text-xs font-bold text-[#777777] uppercase tracking-widest">
              {flipped ? 'Translation' : 'Tap to reveal'}
            </p>
            <p className="text-4xl font-black text-[#3C3C3C] text-center">
              {flipped ? card.back : card.front}
            </p>
            {!flipped && (
              <p className="text-sm text-[#777777]">Click the card to flip</p>
            )}
          </Card>

          {/* Rating buttons */}
          {flipped && (
            <div className="grid grid-cols-3 gap-4">
              <Button variant="danger" onClick={() => handleRating('hard')}>😬 Hard</Button>
              <Button variant="secondary" onClick={() => handleRating('good')}>🙂 Good</Button>
              <Button variant="primary" onClick={() => handleRating('easy')}>😄 Easy</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
