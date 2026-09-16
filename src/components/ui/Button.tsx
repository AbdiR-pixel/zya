import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import { MIN_TOUCH, radius, spacing } from '@/constants/spacing';
import { useTheme } from '@/theme';
import { PressableScale } from './PressableScale';
import { Txt } from './Txt';

export type ButtonVariant = 'primary' | 'secondary' | 'utility' | 'ghost' | 'danger';
export type ButtonSize = 'md' | 'lg';

export type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  /** Glyphe décoratif affiché avant le libellé (jamais porteur de sens seul). */
  leading?: string;
  accessibilityHint?: string;
  style?: ViewStyle;
};

/**
 * CTA en pilule (primary/secondary), bouton utilitaire à 8px — le contraste est
 * volontaire, il distingue « l'action de l'écran » des actions de service (DESIGN-notion).
 * Un seul bleu structurel : aucune couleur sticker ne peint jamais un bouton.
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled,
  loading,
  fullWidth = true,
  leading,
  accessibilityHint,
  style,
}: ButtonProps) {
  const { colors } = useTheme();
  const isDisabled = Boolean(disabled || loading);

  const surfaces: Record<ButtonVariant, ViewStyle> = {
    primary: { backgroundColor: colors.primary, borderRadius: radius.full },
    secondary: {
      backgroundColor: colors.surface,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.hairline,
    },
    utility: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.hairline,
    },
    ghost: { backgroundColor: 'transparent', borderRadius: radius.md },
    danger: {
      backgroundColor: colors.surface,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.danger,
    },
  };

  const tones = {
    primary: 'onPrimary',
    secondary: 'default',
    utility: 'default',
    ghost: 'primary',
    danger: 'danger',
  } as const;

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      scaleTo={0.97}
      style={[
        styles.base,
        size === 'md' ? styles.md : styles.lg,
        surfaces[variant],
        fullWidth ? styles.full : styles.auto,
        isDisabled && styles.disabled,
        style as ViewStyle,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? colors.onPrimary : colors.primary}
          />
        ) : (
          <>
            {leading ? <Txt variant="button" tone={tones[variant]}>{`${leading} `}</Txt> : null}
            <Txt variant="button" tone={tones[variant]} numberOfLines={1}>
              {label}
            </Txt>
          </>
        )}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', minHeight: MIN_TOUCH },
  md: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md, minHeight: MIN_TOUCH },
  lg: { paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.lg },
  full: { alignSelf: 'stretch' },
  auto: { alignSelf: 'flex-start' },
  disabled: { opacity: 0.45 },
  content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
});
