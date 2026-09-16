import { TextStyle } from 'react-native';

/**
 * Échelle typographique : hiérarchie Notion (poids 700 serrés / corps 400 calme)
 * ramenée aux tailles mobiles du §37 du cahier des charges.
 * Police système : on ne charge aucune fonte (démarrage instantané, rendu natif).
 */
export const typography = {
  largeTitle: { fontSize: 34, fontWeight: '700', lineHeight: 40, letterSpacing: -0.8 },
  sectionTitle: { fontSize: 23, fontWeight: '700', lineHeight: 29, letterSpacing: -0.4 },
  cardTitle: { fontSize: 18, fontWeight: '600', lineHeight: 24, letterSpacing: -0.2 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodyStrong: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  bodySm: { fontSize: 15, fontWeight: '400', lineHeight: 21 },
  button: { fontSize: 16, fontWeight: '600', lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
  eyebrow: { fontSize: 12, fontWeight: '600', lineHeight: 16, letterSpacing: 0.3 },
  /** Question d'une carte en session : plus grande, respirante. */
  study: { fontSize: 22, fontWeight: '600', lineHeight: 30, letterSpacing: -0.3 },
} satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;
