/** Niveaux utilisateur (§24) — 7 paliers, noms encourageants et non infantilisants. */
export type UserLevel = { level: number; name: string; minXp: number; nextXp: number | null };

const THRESHOLDS: { name: string; minXp: number }[] = [
  { name: 'Débutante curieuse', minXp: 0 },
  { name: 'Cerveau en chauffe', minXp: 50 },
  { name: 'Bonne élève', minXp: 150 },
  { name: 'Machine à réviser', minXp: 300 },
  { name: 'Tête bien faite', minXp: 600 },
  { name: 'Experte du rappel', minXp: 1000 },
  { name: 'Maîtresse du sujet', minXp: 1600 },
];

export function levelForXp(xp: number): UserLevel {
  let index = 0;
  for (let i = 0; i < THRESHOLDS.length; i += 1) {
    const step = THRESHOLDS[i];
    if (step && xp >= step.minXp) index = i;
  }
  const current = THRESHOLDS[index]!;
  const next = THRESHOLDS[index + 1];
  return {
    level: index + 1,
    name: current.name,
    minXp: current.minXp,
    nextXp: next ? next.minXp : null,
  };
}

/** Progression 0→1 à l'intérieur du niveau courant. */
export function levelProgress(xp: number): number {
  const { minXp, nextXp } = levelForXp(xp);
  if (nextXp === null) return 1;
  return Math.max(0, Math.min(1, (xp - minXp) / (nextXp - minXp)));
}

/** Niveaux de maîtrise d'une carte (§17). */
export const MASTERY_LABELS = [
  'Découverte',
  'Compréhension',
  'Rappel',
  'Application',
  'Maîtrise',
] as const;
