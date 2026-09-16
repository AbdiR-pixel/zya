import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { radius, springs } from '@/constants/spacing';
import { useTheme } from '@/theme';

export type ProgressBarProps = {
  /** 0 → 1 */
  value: number;
  height?: number;
  label?: string;
  /** Couleur décorative facultative (badges, matières). Par défaut : accent. */
  color?: string;
};

/** La barre avance d'elle-même, sans à-coup. En mouvement réduit, elle se pose sans ressort. */
export function ProgressBar({ value, height = 8, label, color }: ProgressBarProps) {
  const { colors, reduceMotion } = useTheme();
  const progress = useSharedValue(0);
  const clamped = Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));

  useEffect(() => {
    progress.value = reduceMotion
      ? withTiming(clamped, { duration: 120 })
      : withSpring(clamped, springs.standard);
  }, [clamped, progress, reduceMotion]);

  const fill = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
      style={[styles.track, { backgroundColor: colors.surfaceMuted, height, borderRadius: height / 2 }]}
    >
      <Animated.View
        style={[
          { backgroundColor: color ?? colors.primary, height, borderRadius: height / 2 },
          fill,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden', borderRadius: radius.full },
});
