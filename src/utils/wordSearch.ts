// Generic cross-language search shared by Articles, Synonyms, and Antonyms —
// same ranking/resolution strategy as src/utils/verbSearch.ts, generalized over
// any curated word-type entry (noun/word + languageId + English-gloss translation).

function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function normalize(s: string): string {
  return stripDiacritics(s.trim().toLowerCase()).replace(/^to\s+/, '').replace(/\s+/g, ' ');
}

// Some translation fields list multiple senses ("leg / bone") — split them out so a
// query matches the specific sense instead of only prefix-matching the whole phrase.
function tokens(s: string): string[] {
  return s.split(/[/,;]/).map(normalize);
}

export function primaryToken(s: string): string {
  return tokens(s)[0] ?? normalize(s);
}

type WordEntry = { id: string; languageId: string };

export function findWordSuggestions<T extends WordEntry>(
  items: T[],
  query: string,
  getWord: (item: T) => string,
  getGloss: (item: T) => string,
  limit = 5
): T[] {
  const q = normalize(query);
  if (!q) return [];
  const ranked: { item: T; rank: number }[] = [];
  for (const item of items) {
    const word = normalize(getWord(item));
    let rank: number | null = null;
    if (word === q) rank = 0;
    else if (word.startsWith(q)) rank = 1;
    else {
      const glossToks = tokens(getGloss(item));
      if (glossToks.some(t => t === q)) rank = 2;
      else if (glossToks.some(t => t.startsWith(q))) rank = 3;
    }
    if (rank !== null) ranked.push({ item, rank });
  }
  ranked.sort((a, b) => a.rank - b.rank);

  const seen = new Set<string>();
  const hits: T[] = [];
  for (const { item } of ranked) {
    if (hits.length >= limit) break;
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    hits.push(item);
  }
  return hits;
}

export function findEquivalentWord<T extends WordEntry>(
  items: T[],
  hit: T,
  targetLanguageId: string,
  glossKey: (item: T) => string
): T | null {
  if (hit.languageId === targetLanguageId) return hit;
  const key = glossKey(hit);
  return items.find(it => it.languageId === targetLanguageId && glossKey(it) === key) ?? null;
}
