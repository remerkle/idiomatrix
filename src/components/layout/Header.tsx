import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export function Header() {
  const { progress } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-[#E5E5E5] overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-16 flex items-center gap-2">
        <NavLink to="/" className="shrink-0 text-lg sm:text-2xl font-black text-[#58CC02] tracking-tight">
          Pentalingo
        </NavLink>

        <nav className="flex items-center gap-0.5 sm:gap-1 flex-1 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { to: '/dashboard', label: 'Dashboard' },
            { to: '/flashcards',label: 'Flashcards' },
            { to: '/articles',  label: 'Articles' },
            { to: '/synonyms',  label: 'Synonyms' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `shrink-0 whitespace-nowrap px-2 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-colors ${
                  isActive
                    ? 'bg-[#D7F5B1] text-[#46A302]'
                    : 'text-[#777777] hover:bg-[#F7F7F7]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="shrink-0 flex items-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1 font-bold text-xs sm:text-base text-[#FF9600] whitespace-nowrap">
            🔥 {progress.streak}
          </span>
          <span className="flex items-center gap-1 font-bold text-xs sm:text-base text-[#FFD900] whitespace-nowrap">
            ⚡ {progress.xp} XP
          </span>
        </div>
      </div>
    </header>
  );
}
