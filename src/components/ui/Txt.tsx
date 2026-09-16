import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { typography, TypographyToken } from '@/constants/typography';
import { useTheme } from '@/theme';

type Tone = 'default' | 'secondary' | 'muted' | 'faint' | 'primary' | 'onPrimary' | 'success' | 'danger';

export type TxtProps = TextProps & {
  variant?: TypographyToken;
  tone?: Tone;
  center?: boolean;
};

/**
 * Tout le texte de l'app passe par ici : une seule échelle, une seule source de couleur.
 * `allowFontScaling` reste activé — les tailles système doivent être respectées (§42).
 */
export function Txt({ variant = 'body', tone = 'default', center, style, ...rest }: TxtProps) {
  const { colors } = useTheme();
  const toneColor: Record<Tone, string> = {
    default: colors.ink,
    secondary: colors.inkSecondary,
    muted: colors.inkMuted,
    faint: colors.inkFaint,
    primary: colors.primary,
    onPrimary: colors.onPrimary,
    success: colors.success,
    danger: colors.danger,
  };
  const base = typography[variant] as TextStyle;
  return (
    <Text
      {...rest}
      maxFontSizeMultiplier={1.6}
      style={[base, { color: toneColor[tone] }, center && { textAlign: 'center' }, style]}
    />
  );
}
