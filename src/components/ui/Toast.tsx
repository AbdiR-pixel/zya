import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { elevation, radius, spacing } from '@/constants/spacing';
import { useTheme } from '@/theme';
import { Txt } from './Txt';

type ToastTone = 'neutral' | 'success' | 'error';
type ToastState = { message: string; tone: ToastTone } | null;

type ToastContextValue = { show: (message: string, tone?: ToastTone) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

/** Message court, non bloquant. Il confirme une action, il ne la remplace pas. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const show = useCallback((message: string, tone: ToastTone = 'neutral') => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ message, tone });
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  const glyph = toast?.tone === 'success' ? '✓' : toast?.tone === 'error' ? '!' : '•';

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <Animated.View
          entering={FadeInDown.duration(160)}
          exiting={FadeOutDown.duration(160)}
          pointerEvents="none"
          accessibilityLiveRegion="polite"
          style={[
            styles.toast,
            elevation.raised,
            {
              backgroundColor: colors.surface,
              borderColor: colors.hairline,
              bottom: insets.bottom + 80,
            },
          ]}
        >
          <View
            style={[
              styles.dot,
              {
                backgroundColor:
                  toast.tone === 'success'
                    ? colors.success
                    : toast.tone === 'error'
                      ? colors.danger
                      : colors.inkFaint,
              },
            ]}
          >
            <Txt variant="eyebrow" tone="onPrimary">
              {glyph}
            </Txt>
          </View>
          <Txt variant="bodySm" style={styles.message}>
            {toast.message}
          </Txt>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast doit être utilisé dans ToastProvider');
  return context;
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: radius.xl,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  dot: { width: 20, height: 20, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center' },
  message: { flex: 1 },
});
