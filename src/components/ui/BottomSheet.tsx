import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius, spacing } from '@/constants/spacing';
import { useTheme } from '@/theme';
import { IconButton } from './IconButton';
import { Txt } from './Txt';

export type BottomSheetProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

/**
 * Feuille modale. Elle entre et sort par le bas — même chemin à l'aller et au retour
 * (cohérence spatiale, apple-design §7). En mouvement réduit, un simple fondu.
 */
export function BottomSheet({ visible, title, onClose, children }: BottomSheetProps) {
  const { colors, reduceMotion } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View
        entering={FadeIn.duration(140)}
        exiting={FadeOut.duration(140)}
        style={[styles.backdrop, { backgroundColor: colors.overlay }]}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          accessibilityRole="button"
          accessibilityLabel="Fermer"
          onPress={onClose}
        />
        <Animated.View
          entering={reduceMotion ? FadeIn.duration(140) : SlideInDown.springify().damping(20).stiffness(180)}
          exiting={reduceMotion ? FadeOut.duration(140) : SlideOutDown.duration(200)}
          style={[
            styles.sheet,
            {
              backgroundColor: colors.canvas,
              borderColor: colors.hairline,
              paddingBottom: insets.bottom + spacing.lg,
            },
          ]}
        >
          <View style={[styles.handle, { backgroundColor: colors.hairline }]} />
          <View style={styles.header}>
            <Txt variant="sectionTitle">{title}</Txt>
            <IconButton glyph="✕" label="Fermer" onPress={onClose} />
          </View>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    gap: spacing.md,
  },
  handle: { alignSelf: 'center', width: 40, height: 4, borderRadius: radius.full },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
