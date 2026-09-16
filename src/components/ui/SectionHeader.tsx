import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '@/constants/spacing';
import { PressableScale } from './PressableScale';
import { Txt } from './Txt';

export type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Txt variant="sectionTitle" accessibilityRole="header">
        {title}
      </Txt>
      {actionLabel && onAction ? (
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          onPress={onAction}
          scaleTo={0.96}
          style={styles.action}
        >
          <Txt variant="bodySm" tone="primary">
            {actionLabel}
          </Txt>
        </PressableScale>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  action: { paddingVertical: spacing.xs, paddingHorizontal: spacing.xs, minHeight: 44, justifyContent: 'center' },
});
