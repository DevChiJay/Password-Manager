/**
 * Fade In View Component
 * Simple fade-in animation wrapper
 */

import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { fadeIn, Duration } from '@/utils/animations';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
}

export default function FadeInView({
  children,
  delay = 0,
  duration = Duration.normal,
  style,
}: FadeInViewProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      fadeIn(fadeAnim, duration).start();
    }, delay);
  }, [delay, duration]);

  return <Animated.View style={[style, { opacity: fadeAnim }]}>{children}</Animated.View>;
}
