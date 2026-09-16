import React, { useCallback } from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { springs } from '@/constants/spacing';
import { haptics } from '@/lib/haptics';
import { useTheme } from '@/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type PressableScaleProps = PressableProps & {
  style?: ViewStyle | ViewStyle[];
  /** 1 → 0.97 par défaut (§40). Une carte pleine largeur descend un peu moins. */
  scaleTo?: number;
  haptic?: boolean;
  children?: React.ReactNode;
};

/**
 * Brique tactile de l'app.
 *
 * Le retour visuel part au `pressIn`, pas au relâchement : c'est la règle de réponse
 * immédiate (apple-design §1). Le ressort est interruptible — relâcher pendant
 * l'animation ne bloque jamais l'utilisatrice (§41).
 */
export function PressableScale({
  scaleTo = 0.97,
  haptic = true,
  onPressIn,
  onPressOut,
  style,
  children,
  ...rest
}: PressableScaleProps) {
  const { reduceMotion } = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = useCallback<NonNullable<PressableProps['onPressIn']>>(
    (event) => {
      if (!reduceMotion) scale.value = withSpring(scaleTo, springs.press);
      if (haptic) haptics.tap();
      onPressIn?.(event);
    },
    [haptic, onPressIn, reduceMotion, scale, scaleTo],
  );

  const handlePressOut = useCallback<NonNullable<PressableProps['onPressOut']>>(
    (event) => {
      scale.value = withSpring(1, springs.press);
      onPressOut?.(event);
    },
    [onPressOut, scale],
  );

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      {...rest}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, animatedStyle]}
    >
      {children}
    </AnimatedPressable>
  );
}
