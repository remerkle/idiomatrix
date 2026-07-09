import type { AdverbId, PronominalAdverbExercise } from '../types';

// The 4 Dutch pronominal adverbs: unstressed "er" (anaphoric "it/them") plus the
// stressed/deictic "hier"/"daar" and the interrogative "waar", each of which combines
// with a fixed preposition (eraan, hieraan, daaraan, waaraan, ...) and can split from
// that preposition elsewhere in the clause — e.g. "Ik denk er vaak aan."
export const ADVERBS: { id: AdverbId; label: string; meaning: string }[] = [
  { id: 'er',   label: 'er',   meaning: 'it/them' },
  { id: 'hier', label: 'hier', meaning: 'this' },
  { id: 'daar', label: 'daar', meaning: 'that' },
  { id: 'waar', label: 'waar', meaning: 'what/which' },
];

const ADVERB_DISTRACTORS: Record<AdverbId, [string, string]> = {
  er:   ['hier', 'daar'],
  hier: ['er', 'daar'],
  daar: ['er', 'hier'],
  waar: ['hier', 'daar'],
};

type Guide = { en: string; es: string; de: string };

type PrepFamily = {
  id: string;
  label: string;
  meaning: string;
  declarative: string; // used for er/hier/daar (statement, adverb splits mid-clause)
  question: string;    // used for waar (interrogative, adverb fronted)
  guides: Record<AdverbId, Guide>;
  distractors: [string, string];
};

// One "family" per preposition — the declarative template is shared by er/hier/daar
// (only which adverb is correct changes; the guide sentence disambiguates which one),
// and the question template is used for waar, since waar is inherently interrogative
// and can't slot into a declarative clause the way the other three can.
const PREP_FAMILIES: PrepFamily[] = [
  {
    id: 'aan', label: 'aan', meaning: 'to/at',
    declarative: 'Ik denk ___ vaak ___.',
    question: '___ denk je vaak ___?',
    guides: {
      er:   { en: 'I often think about it.',        es: 'A menudo pienso en ello.',      de: 'Ich denke oft daran.' },
      hier: { en: 'I often think about this.',       es: 'A menudo pienso en esto.',      de: 'Ich denke oft hieran.' },
      daar: { en: 'I often think about that.',        es: 'A menudo pienso en eso.',       de: 'Ich denke oft daran.' },
      waar: { en: 'What do you often think about?',   es: '¿En qué piensas a menudo?',     de: 'Woran denkst du oft?' },
    },
    distractors: ['op', 'over'],
  },
  {
    id: 'achter', label: 'achter', meaning: 'behind',
    declarative: 'Ik sta ___ volledig ___.',
    question: '___ sta je volledig ___?',
    guides: {
      er:   { en: 'I fully support it.',              es: 'Lo apoyo por completo.',        de: 'Ich stehe voll dahinter.' },
      hier: { en: 'I fully support this.',             es: 'Apoyo esto por completo.',      de: 'Ich stehe voll hierhinter.' },
      daar: { en: 'I fully support that.',             es: 'Apoyo eso por completo.',       de: 'Ich stehe voll dahinter.' },
      waar: { en: 'What do you fully support?',        es: '¿Qué apoyas por completo?',     de: 'Was unterstützt du voll und ganz?' },
    },
    distractors: ['onder', 'tegen'],
  },
  {
    id: 'bij', label: 'bij', meaning: 'with/by',
    declarative: 'Ik kan me ___ niets ___ voorstellen.',
    question: '___ kun je je niets ___ voorstellen?',
    guides: {
      er:   { en: "I can't picture anything about it.",   es: 'No puedo imaginarme nada al respecto.',        de: 'Ich kann mir darunter nichts vorstellen.' },
      hier: { en: "I can't picture anything about this.",  es: 'No puedo imaginarme nada respecto a esto.',    de: 'Ich kann mir hierunter nichts vorstellen.' },
      daar: { en: "I can't picture anything about that.",  es: 'No puedo imaginarme nada respecto a eso.',     de: 'Ich kann mir darunter nichts vorstellen.' },
      waar: { en: "What can't you picture anything about?", es: '¿Respecto a qué no puedes imaginarte nada?',  de: 'Worunter kannst du dir nichts vorstellen?' },
    },
    distractors: ['over', 'in'],
  },
  {
    id: 'door', label: 'door', meaning: 'through',
    declarative: 'Het komt ___ helemaal ___.',
    question: '___ komt het helemaal ___?',
    guides: {
      er:   { en: "It's entirely because of it.",   es: 'Se debe enteramente a ello.',   de: 'Es liegt ganz daran.' },
      hier: { en: "It's entirely because of this.",  es: 'Se debe enteramente a esto.',   de: 'Es liegt ganz hieran.' },
      daar: { en: "It's entirely because of that.",  es: 'Se debe enteramente a eso.',    de: 'Es liegt ganz daran.' },
      waar: { en: 'What is it entirely because of?', es: '¿A qué se debe enteramente?',   de: 'Woran liegt es ganz?' },
    },
    distractors: ['om', 'in'],
  },
  {
    id: 'in', label: 'in', meaning: 'in',
    declarative: 'Ik geloof ___ echt ___.',
    question: '___ geloof je echt ___?',
    guides: {
      er:   { en: 'I really believe in it.',    es: 'Realmente creo en ello.',   de: 'Ich glaube wirklich daran.' },
      hier: { en: 'I really believe in this.',   es: 'Realmente creo en esto.',   de: 'Ich glaube wirklich hieran.' },
      daar: { en: 'I really believe in that.',   es: 'Realmente creo en eso.',    de: 'Ich glaube wirklich daran.' },
      waar: { en: 'What do you really believe in?', es: '¿En qué crees realmente?', de: 'Woran glaubst du wirklich?' },
    },
    distractors: ['aan', 'op'],
  },
  {
    id: 'mee', label: 'mee / met', meaning: 'with',
    declarative: 'Ik ben ___ blij ___.',
    question: '___ ben je blij ___?',
    guides: {
      er:   { en: "I'm happy with it.",   es: 'Estoy contento con ello.',  de: 'Ich bin damit zufrieden.' },
      hier: { en: "I'm happy with this.",  es: 'Estoy contento con esto.',  de: 'Ich bin hiermit zufrieden.' },
      daar: { en: "I'm happy with that.",  es: 'Estoy contento con eso.',   de: 'Ich bin damit zufrieden.' },
      waar: { en: 'What are you happy with?', es: '¿Con qué estás contento?', de: 'Womit bist du zufrieden?' },
    },
    distractors: ['op', 'in'],
  },
  {
    id: 'naar', label: 'naar', meaning: 'to',
    declarative: 'Wij kijken ___ graag ___.',
    question: '___ kijken jullie graag ___?',
    guides: {
      er:   { en: 'We like watching it.',   es: 'Nos gusta verlo.',      de: 'Wir schauen es uns gerne an.' },
      hier: { en: 'We like watching this.',  es: 'Nos gusta ver esto.',   de: 'Wir schauen uns das hier gerne an.' },
      daar: { en: 'We like watching that.',  es: 'Nos gusta ver eso.',    de: 'Wir schauen uns das da gerne an.' },
      waar: { en: 'What do you like watching?', es: '¿Qué os gusta ver?', de: 'Was schaut ihr euch gerne an?' },
    },
    distractors: ['om', 'bij'],
  },
  {
    id: 'om', label: 'om', meaning: 'around',
    declarative: 'Ik geef ___ heel veel ___.',
    question: '___ geef je heel veel ___?',
    guides: {
      er:   { en: 'I care about it a lot.',   es: 'Me importa mucho.',       de: 'Es liegt mir sehr daran.' },
      hier: { en: 'I care about this a lot.',  es: 'Esto me importa mucho.',  de: 'Es liegt mir sehr hieran.' },
      daar: { en: 'I care about that a lot.',  es: 'Eso me importa mucho.',   de: 'Es liegt mir sehr daran.' },
      waar: { en: 'What do you care about a lot?', es: '¿Qué te importa mucho?', de: 'Woran liegt dir sehr viel?' },
    },
    distractors: ['over', 'aan'],
  },
  {
    id: 'onder', label: 'onder', meaning: 'under',
    declarative: 'Zij lijdt ___ erg ___.',
    question: '___ lijdt zij erg ___?',
    guides: {
      er:   { en: 'She suffers from it a lot.',   es: 'Sufre mucho por ello.',  de: 'Sie leidet sehr darunter.' },
      hier: { en: 'She suffers from this a lot.',  es: 'Sufre mucho por esto.',  de: 'Sie leidet sehr hierunter.' },
      daar: { en: 'She suffers from that a lot.',  es: 'Sufre mucho por eso.',   de: 'Sie leidet sehr darunter.' },
      waar: { en: 'What does she suffer from a lot?', es: '¿Por qué sufre tanto?', de: 'Worunter leidet sie sehr?' },
    },
    distractors: ['door', 'achter'],
  },
  {
    id: 'op', label: 'op', meaning: 'on',
    declarative: 'Wij wachten ___ al lang ___.',
    question: '___ wachten jullie al lang ___?',
    guides: {
      er:   { en: "We've been waiting for it for a long time.",  es: 'Llevamos mucho tiempo esperándolo.',    de: 'Wir warten schon lange darauf.' },
      hier: { en: "We've been waiting for this for a long time.", es: 'Llevamos mucho tiempo esperando esto.', de: 'Wir warten schon lange hierauf.' },
      daar: { en: "We've been waiting for that for a long time.", es: 'Llevamos mucho tiempo esperando eso.',  de: 'Wir warten schon lange darauf.' },
      waar: { en: 'What have you been waiting for a long time?', es: '¿Qué lleváis esperando mucho tiempo?',   de: 'Worauf wartet ihr schon lange?' },
    },
    distractors: ['aan', 'over'],
  },
  {
    id: 'over', label: 'over', meaning: 'about',
    declarative: 'Zij praten ___ nooit ___.',
    question: '___ praten zij nooit ___?',
    guides: {
      er:   { en: 'They never talk about it.',   es: 'Nunca hablan de ello.',   de: 'Sie sprechen nie darüber.' },
      hier: { en: 'They never talk about this.',  es: 'Nunca hablan de esto.',   de: 'Sie sprechen nie hierüber.' },
      daar: { en: 'They never talk about that.',  es: 'Nunca hablan de eso.',    de: 'Sie sprechen nie darüber.' },
      waar: { en: 'What do they never talk about?', es: '¿De qué no hablan nunca?', de: 'Worüber sprechen sie nie?' },
    },
    distractors: ['aan', 'om'],
  },
  {
    id: 'tegen', label: 'tegen', meaning: 'against',
    declarative: 'Ik vecht ___ hard ___.',
    question: '___ vecht jij hard ___?',
    guides: {
      er:   { en: 'I fight against it hard.',   es: 'Lucho duro contra ello.',  de: 'Ich kämpfe hart dagegen.' },
      hier: { en: 'I fight against this hard.',  es: 'Lucho duro contra esto.',  de: 'Ich kämpfe hart hiergegen.' },
      daar: { en: 'I fight against that hard.',  es: 'Lucho duro contra eso.',   de: 'Ich kämpfe hart dagegen.' },
      waar: { en: 'What do you fight against hard?', es: '¿Contra qué luchas duro?', de: 'Wogegen kämpfst du hart?' },
    },
    distractors: ['achter', 'onder'],
  },
];

export const PREPOSITIONS = PREP_FAMILIES.map(({ id, label, meaning }) => ({ id, label, meaning }));

export const PRONOMINAL_ADVERB_EXERCISES: PronominalAdverbExercise[] = ADVERBS.flatMap(adverb =>
  PREP_FAMILIES.map((family): PronominalAdverbExercise => ({
    id: `pa-${adverb.id}-${family.id}`,
    adverbId: adverb.id,
    prepositionId: family.id,
    prepositionLabel: family.label,
    sentence: adverb.id === 'waar' ? family.question : family.declarative,
    blank1: { correct: adverb.id, distractors: ADVERB_DISTRACTORS[adverb.id] },
    blank2: { correct: family.id, distractors: family.distractors },
    guide: family.guides[adverb.id],
  }))
);

export function completeDutchSentence(exercise: PronominalAdverbExercise): string {
  return exercise.sentence
    .replace('___', exercise.blank1.correct)
    .replace('___', exercise.blank2.correct);
}
