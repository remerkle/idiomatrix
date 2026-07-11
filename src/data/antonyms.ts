import type { Antonym } from '../types';

// Same 25-word vocabulary per language as synonyms.ts (mooi/groot/klein/... etc.) so a
// learner reviewing one feature sees the same headwords in the other — most pairs are
// each other's antonym within the list itself (mooi<->lelijk, groot<->klein, ...);
// the rest (boos, bang, leuk, belangrijk, praten, kijken, lopen) pair with a word
// outside the list.
type Entry = readonly [string, string[], string];

function makeEntries(languageId: string, prefix: string, entries: Entry[]): Antonym[] {
  return entries.map(([word, antonyms, translation], i) => ({
    id: `ant-${prefix}-${i + 1}`,
    languageId,
    word,
    antonyms,
    translation,
  }));
}

const DUTCH_ANTONYMS = makeEntries('nl', 'nl', [
  ['mooi',       ['lelijk'],      'beautiful'],
  ['groot',      ['klein'],       'big'],
  ['klein',      ['groot'],       'small'],
  ['snel',       ['langzaam'],    'fast'],
  ['langzaam',   ['snel'],        'slow'],
  ['blij',       ['verdrietig'],  'happy'],
  ['verdrietig', ['blij'],        'sad'],
  ['boos',       ['kalm'],        'angry'],
  ['bang',       ['moedig'],      'afraid'],
  ['slim',       ['dom'],         'smart'],
  ['dom',        ['slim'],        'stupid'],
  ['sterk',      ['zwak'],        'strong'],
  ['zwak',       ['sterk'],       'weak'],
  ['makkelijk',  ['moeilijk'],    'easy'],
  ['moeilijk',   ['makkelijk'],   'difficult'],
  ['leuk',       ['saai'],        'nice / fun'],
  ['lelijk',     ['mooi'],        'ugly'],
  ['rijk',       ['arm'],         'rich'],
  ['arm',        ['rijk'],        'poor'],
  ['belangrijk', ['onbelangrijk'],'important'],
  ['praten',     ['zwijgen'],     'to talk'],
  ['kijken',     ['wegkijken'],   'to look'],
  ['lopen',      ['stilstaan'],   'to walk'],
  ['beginnen',   ['eindigen'],    'to begin'],
  ['eindigen',   ['beginnen'],    'to end'],
]);

const SPANISH_ANTONYMS = makeEntries('es', 'es', [
  ['bonito',     ['feo'],           'beautiful'],
  ['grande',     ['pequeño'],       'big'],
  ['pequeño',    ['grande'],        'small'],
  ['rápido',     ['lento'],         'fast'],
  ['lento',      ['rápido'],        'slow'],
  ['feliz',      ['triste'],        'happy'],
  ['triste',     ['feliz'],         'sad'],
  ['enojado',    ['tranquilo'],     'angry'],
  ['asustado',   ['valiente'],      'afraid'],
  ['inteligente',['tonto'],         'smart'],
  ['tonto',      ['inteligente'],   'stupid'],
  ['fuerte',     ['débil'],         'strong'],
  ['débil',      ['fuerte'],        'weak'],
  ['fácil',      ['difícil'],       'easy'],
  ['difícil',    ['fácil'],         'difficult'],
  ['divertido',  ['aburrido'],      'fun'],
  ['feo',        ['bonito'],        'ugly'],
  ['rico',       ['pobre'],         'rich'],
  ['pobre',      ['rico'],          'poor'],
  ['importante', ['insignificante'],'important'],
  ['hablar',     ['callar'],        'to talk'],
  ['mirar',      ['ignorar'],       'to look'],
  ['caminar',    ['detenerse'],     'to walk'],
  ['empezar',    ['terminar'],      'to begin'],
  ['terminar',   ['empezar'],       'to end'],
]);

const ENGLISH_ANTONYMS = makeEntries('en', 'en', [
  ['beautiful', ['ugly'],          'beautiful'],
  ['big',       ['small'],         'big'],
  ['small',     ['big'],           'small'],
  ['fast',      ['slow'],          'fast'],
  ['slow',      ['fast'],          'slow'],
  ['happy',     ['sad'],           'happy'],
  ['sad',       ['happy'],         'sad'],
  ['angry',     ['calm'],          'angry'],
  ['afraid',    ['brave'],         'afraid'],
  ['smart',     ['stupid'],        'smart'],
  ['stupid',    ['smart'],         'stupid'],
  ['strong',    ['weak'],          'strong'],
  ['weak',      ['strong'],        'weak'],
  ['easy',      ['difficult'],     'easy'],
  ['difficult', ['easy'],          'difficult'],
  ['funny',     ['boring'],        'funny'],
  ['ugly',      ['beautiful'],     'ugly'],
  ['rich',      ['poor'],          'rich'],
  ['poor',      ['rich'],          'poor'],
  ['important', ['unimportant'],   'important'],
  ['talk',      ['stay silent'],   'to talk'],
  ['look',      ['ignore'],        'to look'],
  ['walk',      ['stand still'],   'to walk'],
  ['begin',     ['end'],           'to begin'],
  ['end',       ['begin'],         'to end'],
]);

const GERMAN_ANTONYMS = makeEntries('de', 'de', [
  ['schön',     ['hässlich'],     'beautiful'],
  ['groß',      ['klein'],        'big'],
  ['klein',     ['groß'],         'small'],
  ['schnell',   ['langsam'],      'fast'],
  ['langsam',   ['schnell'],      'slow'],
  ['glücklich', ['traurig'],      'happy'],
  ['traurig',   ['glücklich'],    'sad'],
  ['wütend',    ['ruhig'],        'angry'],
  ['ängstlich', ['mutig'],        'afraid'],
  ['klug',      ['dumm'],         'smart'],
  ['dumm',      ['klug'],         'stupid'],
  ['stark',     ['schwach'],      'strong'],
  ['schwach',   ['stark'],        'weak'],
  ['einfach',   ['schwierig'],    'easy'],
  ['schwierig', ['einfach'],      'difficult'],
  ['lustig',    ['langweilig'],   'funny'],
  ['hässlich',  ['schön'],        'ugly'],
  ['reich',     ['arm'],          'rich'],
  ['arm',       ['reich'],        'poor'],
  ['wichtig',   ['unwichtig'],    'important'],
  ['sprechen',  ['schweigen'],    'to talk'],
  ['schauen',   ['wegschauen'],   'to look'],
  ['gehen',     ['stehenbleiben'],'to walk'],
  ['anfangen',  ['beenden'],      'to begin'],
  ['beenden',   ['anfangen'],     'to end'],
]);

export const ANTONYMS: Antonym[] = [
  ...DUTCH_ANTONYMS,
  ...SPANISH_ANTONYMS,
  ...ENGLISH_ANTONYMS,
  ...GERMAN_ANTONYMS,
];
