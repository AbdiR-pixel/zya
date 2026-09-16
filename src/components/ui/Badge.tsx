import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { radius, spacing } from '@/constants/spacing';
import { useTheme } from '@/theme';
import { Txt } from './Txt';

export type BadgeProps = {
  label: string;
  tone?: 'neutral' | 'primary' | 'success' | 'danger';
  /** Teinte décorative (palette sticker) — pour étiqueter, jamais pour agir. */
  decorative?: string;
  style?: ViewStyle;
};

export function Badge({ label, tone = 'neutral', decorative, style }: BadgeProps) {
  const { colors } = useTheme();
  const background =
    decorative ??
    {
      neutral: colors.surfaceMuted,
      primary: colors.primarySoft,
      success: colors.successSoft,
      danger: colors.dangerSoft,
    }[tone];
  const textTone = decorative ? 'default' : tone === 'neutral' ? 'muted' : tone;
  return (
    <View style={[styles.pill, { backgroundColor: background }, style]}>
      <Txt variant="eyebrow" tone={textTone}>
        {label}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
  },
});
