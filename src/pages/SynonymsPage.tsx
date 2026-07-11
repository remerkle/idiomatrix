import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { SYNONYMS } from '../data/synonyms';
import { lookupWiktionarySynonyms } from '../utils/wiktionarySynonyms';
import { findWordSuggestions, findEquivalentWord, primaryToken } from '../utils/wordSearch';
import type { Synonym } from '../types';

function synonymGlossKey(s: Synonym): string {
  return primaryToken(s.translation);
}

type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'found'; synonyms: string[] }
  | { status: 'not-found' };

export function SynonymsPage() {
  const { selectedLanguage, setSelectedLanguage } = useApp();
  const [query, setQuery] = useState('');
  const [lookupState, setLookupState] = useState<LookupState>({ status: 'idle' });
  const [missingHit, setMissingHit] = useState<Synonym | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const langWords = SYNONYMS.filter(s => s.languageId === selectedLanguage.id);
  const trimmed = query.trim().toLowerCase();
  const match = trimmed ? langWords.find(s => s.word.toLowerCase() === trimmed) : null;
  const suggestions = trimmed && !match
    ? findWordSuggestions(SYNONYMS, trimmed, s => s.word, s => s.translation, 5)
    : [];

  function handleSuggestionPick(entry: Synonym) {
    if (entry.languageId === selectedLanguage.id) {
      setQuery(entry.word);
      setMissingHit(null);
      return;
    }
    const eq = findEquivalentWord(SYNONYMS, entry, selectedLanguage.id, synonymGlossKey);
    if (eq) {
      setQuery(eq.word);
      setMissingHit(null);
    } else {
      setMissingHit(entry);
      setQuery('');
    }
  }

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!trimmed || match) {
      setLookupState({ status: 'idle' });
      return;
    }

    setLookupState({ status: 'loading' });
    timerRef.current = setTimeout(async () => {
      const synonyms = await lookupWiktionarySynonyms(trimmed, selectedLanguage.id);
      setLookupState(synonyms ? { status: 'found', synonyms } : { status: 'not-found' });
    }, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [trimmed, match, selectedLanguage.id]);

  const showNotFound =
    trimmed && !match && suggestions.length === 0 && lookupState.status === 'not-found';

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-4xl font-semibold text-[#1B1A17]">Synonyms</h1>
        <p className="text-[#6B6860] font-semibold">
          Type a word to find synonyms in {selectedLanguage.name}
        </p>
      </div>

      {/* Language tabs */}
      <div className="flex gap-2 justify-center flex-wrap">
        {LANGUAGES.map(lang => (
          <button
            key={lang.id}
            onClick={() => { setSelectedLanguage(lang); setQuery(''); setMissingHit(null); }}
            className={`px-5 py-2 rounded-full font-semibold text-sm border transition-colors ${
              selectedLanguage.id === lang.id
                ? 'text-white'
                : 'bg-white border-[#E3DFD4] text-[#6B6860] hover:bg-[#F1EDE4]'
            }`}
            style={
              selectedLanguage.id === lang.id
                ? { backgroundColor: lang.color, borderColor: lang.color }
                : {}
            }
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="max-w-md mx-auto">
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setMissingHit(null); }}
          placeholder={`Type a word in Dutch, Spanish, English, or German…`}
          className="w-full px-5 py-4 text-xl font-semibold rounded-2xl border border-[#E3DFD4] outline-none focus:border-[#9B8AA8] transition-colors placeholder:text-[#C0BCB2] text-[#1B1A17]"
          autoFocus
          spellCheck={false}
        />
      </div>

      {/* Curated match (has translation) */}
      {match && (
        <div
          className="max-w-md mx-auto rounded-2xl border p-8 text-center space-y-4 transition-all"
          style={{ borderColor: '#9B8AA8', backgroundColor: '#EAE3EC' }}
        >
          <div className="font-serif text-4xl font-semibold tracking-tight text-[#1B1A17]">{match.word}</div>
          <p className="text-[#6B6860] font-semibold">{match.translation}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {match.synonyms.map(syn => (
              <button
                key={syn}
                onClick={() => setQuery(syn)}
                className="px-3 py-1 rounded-full text-sm font-semibold transition-colors"
                style={{ backgroundColor: '#9B8AA822', color: '#9B8AA8' }}
              >
                {syn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Wiktionary lookup — loading */}
      {!match && lookupState.status === 'loading' && (
        <div className="max-w-md mx-auto rounded-2xl border border-[#E3DFD4] p-6 text-center">
          <p className="font-semibold text-[#6B6860] animate-pulse">Looking up "{query.trim()}"…</p>
        </div>
      )}

      {/* Wiktionary lookup — found */}
      {!match && lookupState.status === 'found' && (
        <div
          className="max-w-md mx-auto rounded-2xl border p-8 text-center space-y-4 transition-all"
          style={{ borderColor: '#9B8AA8', backgroundColor: '#EAE3EC' }}
        >
          <div className="font-serif text-4xl font-semibold tracking-tight text-[#1B1A17]">{query.trim()}</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {lookupState.synonyms.map(syn => (
              <button
                key={syn}
                onClick={() => setQuery(syn)}
                className="px-3 py-1 rounded-full text-sm font-semibold transition-colors"
                style={{ backgroundColor: '#9B8AA822', color: '#9B8AA8' }}
              >
                {syn}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#9B9689]">via Wiktionary · no translation in our dictionary</p>
        </div>
      )}

      {/* Not found */}
      {showNotFound && (
        <div className="max-w-md mx-auto rounded-2xl border border-[#E3DFD4] p-6 text-center space-y-2">
          <p className="text-2xl">🤔</p>
          <p className="font-semibold text-[#1B1A17]">No synonyms found</p>
          <p className="text-sm text-[#6B6860]">Not found in Wiktionary — check the spelling?</p>
        </div>
      )}

      {/* Prefix suggestions (any of the 4 languages) */}
      {suggestions.length > 0 && (
        <div className="max-w-md mx-auto space-y-2">
          {suggestions.map(s => {
            const lang = LANGUAGES.find(l => l.id === s.languageId);
            return (
              <button
                key={s.id}
                onClick={() => handleSuggestionPick(s)}
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl border border-[#E3DFD4] bg-white hover:bg-[#F1EDE4] transition-colors text-left"
              >
                <span className="font-semibold text-[#1B1A17]">{lang?.flag} {s.word}</span>
                <span className="text-sm text-[#6B6860]">{s.translation}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Cross-language suggestion with no equivalent in the selected language */}
      {missingHit && (
        <div className="max-w-md mx-auto rounded-xl border border-[#E3DFD4] p-4 text-center">
          <p className="text-sm font-semibold text-[#6B6860]">
            No {selectedLanguage.name} equivalent found for "{missingHit.word}"
            {' '}({LANGUAGES.find(l => l.id === missingHit.languageId)?.flag} {missingHit.translation})
          </p>
        </div>
      )}

      {/* Browse all */}
      {!trimmed && (
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#1B1A17] text-center">All words in our dictionary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {langWords.map(s => (
              <button
                key={s.id}
                onClick={() => setQuery(s.word)}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#E3DFD4] bg-white hover:bg-[#F1EDE4] transition-colors text-left"
              >
                <span className="font-semibold text-[#1B1A17]">{s.word}</span>
                <span className="text-sm text-[#6B6860]">{s.translation}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
