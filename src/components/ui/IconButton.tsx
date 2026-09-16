import React from 'react';
import { StyleSheet } from 'react-native';
import { MIN_TOUCH, radius } from '@/constants/spacing';
import { useTheme } from '@/theme';
import { PressableScale } from './PressableScale';
import { Txt } from './Txt';

export type IconButtonProps = {
  /** Glyphe affiché (emoji ou caractère). Le sens passe par `label`. */
  glyph: string;
  label: string;
  onPress: () => void;
  tone?: 'neutral' | 'danger';
};

/** Bouton d'icône : 44×44 minimum, libellé accessible obligatoire (WCAG 4.1.2). */
export function IconButton({ glyph, label, onPress, tone = 'neutral' }: IconButtonProps) {
  const { colors } = useTheme();
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      scaleTo={0.92}
      style={[styles.button, { backgroundColor: colors.surfaceMuted }]}
    >
      <Txt variant="body" tone={tone === 'danger' ? 'danger' : 'default'}>
        {glyph}
      </Txt>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    width: MIN_TOUCH,
    height: MIN_TOUCH,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
