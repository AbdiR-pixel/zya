import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { elevation, radius, spacing } from '@/constants/spacing';
import { useTheme } from '@/theme';

export type SurfaceProps = ViewProps & {
  padded?: boolean;
  /** `flat` = hairline seule (défaut Notion), `soft`/`raised` pour ce qui flotte. */
  level?: keyof typeof elevation;
  style?: ViewStyle | ViewStyle[];
};

/** Carte blanche sur canvas chaud : la figure/fond de base du système. */
export function Surface({ padded = true, level = 'flat', style, children, ...rest }: SurfaceProps) {
  const { colors } = useTheme();
  return (
    <View
      {...rest}
      style={[
        styles.base,
        { backgroundColor: colors.surface, borderColor: colors.hairline },
        padded && styles.padded,
        elevation[level] as ViewStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.lg, borderWidth: 1 },
  padded: { padding: spacing.md },
});
