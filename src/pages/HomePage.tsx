import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { LANGUAGES } from '../data/languages';
import { useApp } from '../context/AppContext';

export function HomePage() {
  const navigate = useNavigate();
  const { setSelectedLanguage } = useApp();

  function handleLanguagePick(lang: typeof LANGUAGES[0]) {
    setSelectedLanguage(lang);
    navigate('/learn');
  }

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Language picker */}
      <section className="w-full pt-8">
        <h2 className="font-serif text-2xl font-semibold text-[#1B1A17] mb-6 text-center">Choose your language</h2>
        <div className="grid grid-cols-4 gap-4">
          {LANGUAGES.map(lang => (
            <Card
              key={lang.id}
              onClick={() => handleLanguagePick(lang)}
              accent={lang.color}
              className="flex flex-col items-center gap-2 p-6 text-center"
            >
              <span className="text-4xl">{lang.flag}</span>
              <span className="font-semibold text-[#1B1A17]">{lang.name}</span>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
