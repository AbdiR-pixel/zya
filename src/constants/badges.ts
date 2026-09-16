import { UserStats } from '@/types';

export type BadgeDefinition = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  earned: (stats: UserStats) => boolean;
};

/** Badges initiaux (§26) : peu nombreux, atteignables, jamais bloquants. */
export const BADGES: BadgeDefinition[] = [
  {
    id: 'first_step',
    emoji: '🌱',
    name: 'Premier pas',
    description: 'Première session terminée',
    earned: (s) => s.sessionsCompleted >= 1,
  },
  {
    id: 'on_a_roll',
    emoji: '🔥',
    name: 'Sur ma lancée',
    description: '3 jours consécutifs',
    earned: (s) => s.streakDays >= 3,
  },
  {
    id: 'full_week',
    emoji: '📅',
    name: 'Semaine complète',
    description: '7 jours consécutifs',
    earned: (s) => s.streakDays >= 7,
  },
  {
    id: 'flawless',
    emoji: '🎯',
    name: 'Sans faute',
    description: 'Quiz parfait d’au moins 5 questions',
    earned: (s) => s.hadPerfectQuiz,
  },
  {
    id: 'iron_memory',
    emoji: '🧠',
    name: 'Mémoire de fer',
    description: '50 cartes maîtrisées',
    earned: (s) => s.cardsMastered >= 50,
  },
  {
    id: 'point_hunter',
    emoji: '⭐',
    name: 'Chasseuse de points',
    description: '500 points',
    earned: (s) => s.points >= 500,
  },
];

export function badgeById(id: string): BadgeDefinition | undefined {
  return BADGES.find((b) => b.id === id);
}
