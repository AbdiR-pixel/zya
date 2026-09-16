import React from 'react';
import { StyleSheet, View } from 'react-native';
import { radius, spacing } from '@/constants/spacing';
import { useTheme } from '@/theme';
import { Button } from './Button';
import { Txt } from './Txt';

export type EmptyStateProps = {
  emoji: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

/** Un écran vide est une invitation à agir, jamais un constat (§56). */
export function EmptyState({ emoji, title, description, actionLabel, onAction }: EmptyStateProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceMuted }]}>
      <Txt variant="largeTitle" center accessibilityElementsHidden importantForAccessibility="no">
        {emoji}
      </Txt>
      <Txt variant="cardTitle" center>
        {title}
      </Txt>
      <Txt variant="bodySm" tone="muted" center>
        {description}
      </Txt>
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} fullWidth={false} style={styles.action} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    gap: spacing.xs,
  },
  action: { marginTop: spacing.sm },
});
