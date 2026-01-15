/**
 * Animated Card Component
 * Card with fade-in and scale animations
 */

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { fadeIn, scale, Duration } from '@/utils/animations';
import { Shadows, Spacing } from '@/constants/spacing';
import { Colors } from '@/constants/colors';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
}

export default function AnimatedCard({ children, delay = 0, style }: AnimatedCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        fadeIn(fadeAnim, Duration.normal),
        scale(scaleAnim, 1, Duration.normal),
      ]).start();
    }, delay);
  }, [delay]);

  return (
    <Animated.View
      style={[
        styles.card,
        style,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.radius.md,
    padding: Spacing.cardPadding,
    ...Shadows.md,
  },
});
