import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { radius, spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { useTheme } from '@/theme';
import { Txt } from './Txt';

export type InputProps = TextInputProps & {
  label: string;
  hint?: string;
  error?: string;
  /** Zone multiligne (TextArea) : même composant, hauteur différente. */
  multilineHeight?: number;
};

/**
 * Champ de saisie. Rayon serré à 4px — les pilules sont réservées aux CTA.
 * Le composant est NON contrôlé par son parent d'écran : la valeur est tenue par
 * le formulaire propriétaire (§46), ce qui supprime les rerenders à chaque caractère.
 */
export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, hint, error, multilineHeight, style, multiline, ...rest },
  ref,
) {
  const { colors } = useTheme();
  return (
    <View style={styles.wrapper}>
      <Txt variant="eyebrow" tone="muted" style={styles.label}>
        {label}
      </Txt>
      <TextInput
        ref={ref}
        {...rest}
        multiline={multiline}
        placeholderTextColor={colors.inkFaint}
        accessibilityLabel={label}
        accessibilityHint={hint}
        style={[
          styles.input,
          typography.body,
          {
            color: colors.ink,
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : colors.hairline,
          },
          multiline && { height: multilineHeight ?? 160, textAlignVertical: 'top' },
          style,
        ]}
      />
      {error ? (
        <Txt variant="caption" tone="danger" style={styles.helper}>
          {error}
        </Txt>
      ) : hint ? (
        <Txt variant="caption" tone="faint" style={styles.helper}>
          {hint}
        </Txt>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: { gap: spacing.xxs },
  label: { marginLeft: 2 },
  input: {
    borderWidth: 1,
    borderRadius: radius.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    minHeight: 48,
  },
  helper: { marginLeft: 2 },
});
