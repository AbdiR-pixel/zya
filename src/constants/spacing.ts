/** Base 8px (DESIGN-notion.md §Layout). */
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 28,
  xxl: 32,
  xxxl: 48,
} as const;

/** Rayons : champs serrés (4px), cartes 12px, CTA en pilule. */
export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
} as const;

/** Zone tactile minimale (WCAG 2.5.5 / §42). */
export const MIN_TOUCH = 44;

/** Élévation « barely-there » : hairline d'abord, ombre ensuite. */
export const elevation = {
  flat: {},
  soft: {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  raised: {
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
} as const;

/** Ressorts (apple-design) : amorti critique par défaut, rebond réservé au geste. */
export const springs = {
  press: { damping: 22, stiffness: 420, mass: 0.7 },
  standard: { damping: 20, stiffness: 180, mass: 0.9 },
  playful: { damping: 12, stiffness: 190, mass: 0.9 },
} as const;
