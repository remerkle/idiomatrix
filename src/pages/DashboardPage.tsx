import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { LANGUAGES, LESSONS } from '../data/languages';

export function DashboardPage() {
  const navigate = useNavigate();
  const { progress, selectedLanguage } = useApp();

  const nextLesson = LESSONS.find(
    l => l.languageId === selectedLanguage.id && !l.completed && !l.locked
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-black text-[#3C3C3C]">Your Dashboard</h1>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="flex flex-col items-center gap-2 p-6">
          <span className="text-4xl">🔥</span>
          <span className="text-4xl font-black text-[#FF9600]">{progress.streak}</span>
          <span className="text-sm font-bold text-[#777777]">Day streak</span>
        </Card>
        <Card className="flex flex-col items-center gap-2 p-6">
          <span className="text-4xl">⚡</span>
          <span className="text-4xl font-black text-[#FFD900]">{progress.xp}</span>
          <span className="text-sm font-bold text-[#777777]">Total XP</span>
        </Card>
        <Card className="flex flex-col items-center gap-2 p-6">
          <span className="text-4xl">🏆</span>
          <span className="text-4xl font-black text-[#CE82FF]">Lv {progress.level}</span>
          <span className="text-sm font-bold text-[#777777]">Level</span>
        </Card>
      </div>

      {/* Daily goal */}
      <Card className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#3C3C3C]">Daily Goal</h2>
          <Badge color="green">{progress.todayXp} / {progress.dailyGoal} XP</Badge>
        </div>
        <ProgressBar value={progress.todayXp} max={progress.dailyGoal} showLabel />
        {progress.todayXp >= progress.dailyGoal && (
          <p className="text-sm font-bold text-[#58CC02]">🎉 Goal complete! Keep going!</p>
        )}
      </Card>

      {/* Continue learning */}
      {nextLesson && (
        <Card className="p-6 flex items-center justify-between gap-4" accent={selectedLanguage.color}>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold text-[#777777] uppercase tracking-wide">Continue Learning</p>
            <h2 className="text-xl font-black text-[#3C3C3C]">{nextLesson.title}</h2>
            <p className="text-sm text-[#777777]">{nextLesson.description}</p>
          </div>
          <Button onClick={() => navigate('/lessons')}>Continue →</Button>
        </Card>
      )}

      {/* Languages overview */}
      <div>
        <h2 className="text-xl font-black text-[#3C3C3C] mb-4">Your Languages</h2>
        <div className="grid grid-cols-5 gap-3">
          {LANGUAGES.map(lang => {
            const completed = LESSONS.filter(l => l.languageId === lang.id && l.completed).length;
            const total = LESSONS.filter(l => l.languageId === lang.id).length;
            return (
              <Card key={lang.id} accent={lang.color} className="flex flex-col items-center gap-3 p-4">
                <span className="text-3xl">{lang.flag}</span>
                <span className="font-black text-sm text-[#3C3C3C]">{lang.name}</span>
                <ProgressBar value={completed} max={total} color={lang.color} />
                <span className="text-xs text-[#777777]">{completed}/{total} lessons</span>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
