import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '@/constants/spacing';
import { useTheme } from '@/theme';
import { IconButton } from './IconButton';
import { Txt } from './Txt';

export type ScreenProps = {
  children: React.ReactNode;
  /** Titre d'écran : répond à « Où suis-je ? » (§68). */
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  scroll?: boolean;
  /** Barre d'actions collée en bas (ex. « Commencer »). */
  footer?: React.ReactNode;
  contentStyle?: ViewStyle;
};

export function Screen({ children, title, subtitle, onBack, scroll = true, footer, contentStyle }: ScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const header = title ? (
    <View style={styles.header}>
      {onBack ? <IconButton glyph="‹" label="Revenir en arrière" onPress={onBack} /> : null}
      <View style={styles.headerText}>
        <Txt variant="largeTitle" accessibilityRole="header">
          {title}
        </Txt>
        {subtitle ? (
          <Txt variant="bodySm" tone="muted">
            {subtitle}
          </Txt>
        ) : null}
      </View>
    </View>
  ) : null;

  const body = (
    <>
      {header}
      {children}
    </>
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.canvas, paddingTop: insets.top }]}>
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.content, { paddingBottom: spacing.xxxl }, contentStyle]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {body}
        </ScrollView>
      ) : (
        <View style={[styles.flex, styles.content, contentStyle]}>{body}</View>
      )}
      {footer ? (
        <View
          style={[
            styles.footer,
            { backgroundColor: colors.canvas, borderTopColor: colors.hairline, paddingBottom: insets.bottom + spacing.sm },
          ]}
        >
          {footer}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  content: { paddingHorizontal: spacing.md, gap: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, paddingTop: spacing.sm },
  headerText: { flex: 1, gap: spacing.xxs },
  footer: { paddingHorizontal: spacing.md, paddingTop: spacing.sm, borderTopWidth: 1 },
});
