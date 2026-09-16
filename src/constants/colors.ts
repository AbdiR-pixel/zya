/**
 * Palette — dérivée de DESIGN-notion.md et alignée sur le §36 du cahier des charges.
 *
 * Règles non négociables :
 *  · UN seul accent structurel (`primary`) : CTA, liens, état actif, focus.
 *  · La palette « stickers » est DÉCORATIVE (emoji tiles, badges, points de maîtrise).
 *    Elle ne peint jamais un bouton ni une structure.
 *  · Les surfaces se définissent par une hairline + une ombre quasi invisible.
 */

export const stickers = {
  sky: '#62AEF0',
  purple: '#D6B6F6',
  purpleDeep: '#391C57',
  pink: '#FF64C8',
  orange: '#DD5B00',
  orangeDeep: '#793400',
  teal: '#2A9D99',
  green: '#1AAE39',
  brown: '#523410',
} as const;

export type ThemePalette = {
  canvas: string;
  surface: string;
  surfaceMuted: string;
  ink: string;
  inkSecondary: string;
  inkMuted: string;
  inkFaint: string;
  hairline: string;
  primary: string;
  primaryActive: string;
  primarySoft: string;
  onPrimary: string;
  night: string;
  success: string;
  danger: string;
  successSoft: string;
  dangerSoft: string;
  overlay: string;
};

export const lightPalette: ThemePalette = {
  canvas: '#F7F7F5',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F0EE',
  ink: '#111111',
  inkSecondary: '#31302E',
  inkMuted: '#6F6F6F',
  inkFaint: '#8E8A85',
  hairline: '#E8E8E5',
  primary: '#0075DE',
  primaryActive: '#005BAB',
  primarySoft: '#E7F1FC',
  onPrimary: '#FFFFFF',
  night: '#213183',
  success: '#0F7A2B',
  danger: '#B3261E',
  successSoft: '#E6F4EA',
  dangerSoft: '#FCEBEA',
  overlay: 'rgba(17,17,17,0.35)',
};

export const darkPalette: ThemePalette = {
  canvas: '#0F0F0F',
  surface: '#181818',
  surfaceMuted: '#1F1F1F',
  ink: '#F5F5F5',
  inkSecondary: '#D8D8D6',
  inkMuted: '#A0A0A0',
  inkFaint: '#7C7C7C',
  hairline: '#2A2A28',
  primary: '#5FAEFF',
  primaryActive: '#8CC6FF',
  primarySoft: '#12283C',
  onPrimary: '#06253F',
  night: '#1A2666',
  success: '#5BD87F',
  danger: '#FF8A80',
  successSoft: '#12291A',
  dangerSoft: '#2B1514',
  overlay: 'rgba(0,0,0,0.55)',
};

/** Couleur décorative stable par matière (jamais utilisée pour une action). */
const stickerRing = [
  stickers.sky,
  stickers.purple,
  stickers.pink,
  stickers.orange,
  stickers.teal,
  stickers.green,
] as const;

export function stickerForId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return stickerRing[hash % stickerRing.length] as string;
}
