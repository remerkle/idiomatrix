import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { LANGUAGES, LESSONS } from '../data/languages';

export function LessonsPage() {
  const { selectedLanguage, setSelectedLanguage, progress, completeLesson, addXp } = useApp();
  const [completingId, setCompletingId] = useState<string | null>(null);

  const lessons = LESSONS.filter(l => l.languageId === selectedLanguage.id);
  const units = [...new Set(lessons.map(l => l.unit))];

  async function handleStart(lessonId: string, xpReward: number) {
    setCompletingId(lessonId);
    await new Promise(r => setTimeout(r, 800));
    completeLesson(lessonId);
    addXp(xpReward);
    setCompletingId(null);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Language tabs */}
      <div className="flex gap-2 flex-wrap">
        {LANGUAGES.map(lang => (
          <button
            key={lang.id}
            onClick={() => setSelectedLanguage(lang)}
            style={selectedLanguage.id === lang.id ? { backgroundColor: lang.color, color: 'white' } : {}}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm border-2 transition-colors ${
              selectedLanguage.id === lang.id
                ? 'border-transparent'
                : 'border-[#E5E5E5] text-[#777777] hover:bg-[#F7F7F7]'
            }`}
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>

      {/* Units */}
      {units.map(unit => {
        const unitLessons = lessons.filter(l => l.unit === unit);
        return (
          <section key={unit}>
            <h2 className="text-xl font-black text-[#3C3C3C] mb-4">Unit {unit}</h2>
            <div className="flex flex-col gap-3">
              {unitLessons.map(lesson => {
                const isCompleted = progress.completedLessons.includes(lesson.id);
                const isLoading = completingId === lesson.id;

                return (
                  <Card
                    key={lesson.id}
                    accent={isCompleted ? '#46A302' : lesson.locked ? '#E5E5E5' : selectedLanguage.color}
                    className={`flex items-center justify-between gap-4 ${lesson.locked ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black"
                        style={{ backgroundColor: isCompleted ? '#D7F5B1' : '#F7F7F7' }}
                      >
                        {isCompleted ? '✅' : lesson.locked ? '🔒' : '📘'}
                      </div>
                      <div>
                        <h3 className="font-black text-[#3C3C3C]">{lesson.title}</h3>
                        <p className="text-sm text-[#777777]">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge color="yellow">+{lesson.xpReward} XP</Badge>
                      {isCompleted ? (
                        <Badge color="green">Done</Badge>
                      ) : lesson.locked ? (
                        <Badge color="orange">Locked</Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleStart(lesson.id, lesson.xpReward)}
                          disabled={isLoading}
                        >
                          {isLoading ? '...' : 'Start'}
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
