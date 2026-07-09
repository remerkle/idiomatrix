import { VERBS } from '../data/verbs';
import type { Verb } from '../types';

function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function normalize(s: string): string {
  return stripDiacritics(s.trim().toLowerCase()).replace(/^to\s+/, '').replace(/\s+/g, ' ');
}

// Translation fields sometimes list multiple senses ("must / to have to"); split them
// out so a query like "must" matches the specific sense instead of only prefix-matching
// the whole joined phrase.
function translationTokens(v: Verb): string[] {
  return v.translation.split(/[/,;]/).map(t => normalize(t));
}

// English entries' `translation` is a definitional gloss ("possess / own"), not "to X" —
// so for English, key on the infinitive itself (English->English translation is the word).
// For nl/es/de, `translation` is already "to X" and keys correctly once "to " is stripped.
// Multi-sense translations use only the first (primary) token so keys stay comparable
// across languages instead of requiring an identical full phrase.
function glossKey(v: Verb): string {
  return v.languageId === 'en' ? normalize(v.infinitive) : translationTokens(v)[0];
}

// Rank 0/1 = matches on the verb's own infinitive (typing the word itself); these must
// outrank rank 2/3 translation matches, otherwise a short query like "be" gets swamped
// by unrelated verbs whose translation merely *contains* "be" (e.g. "to become").
function matchRank(v: Verb, q: string): number | null {
  const inf = normalize(v.infinitive);
  if (inf === q) return 0;
  if (inf.startsWith(q)) return 1;
  const tokens = translationTokens(v);
  if (tokens.some(t => t === q)) return 2;
  if (tokens.some(t => t.startsWith(q))) return 3;
  return null;
}

export function findVerbSuggestions(query: string, limit = 5): Verb[] {
  const q = normalize(query);
  if (!q) return [];
  const ranked: { v: Verb; rank: number }[] = [];
  for (const v of VERBS) {
    const rank = matchRank(v, q);
    if (rank !== null) ranked.push({ v, rank });
  }
  ranked.sort((a, b) => a.rank - b.rank);

  const seen = new Set<string>();
  const hits: Verb[] = [];
  for (const { v } of ranked) {
    if (hits.length >= limit) break;
    if (seen.has(v.id)) continue;
    seen.add(v.id);
    hits.push(v);
  }
  return hits;
}

export function findEquivalentVerb(hit: Verb, targetLanguageId: string): Verb | null {
  if (hit.languageId === targetLanguageId) return hit;
  const key = glossKey(hit);
  return VERBS.find(v => v.languageId === targetLanguageId && glossKey(v) === key) ?? null;
}
