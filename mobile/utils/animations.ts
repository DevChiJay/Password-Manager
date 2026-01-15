/**
 * Animation Utilities
 * Reusable animation configurations and helpers
 */

import { Animated, Easing } from 'react-native';

/**
 * Animation durations (in ms)
 */
export const Duration = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000,
};

/**
 * Common easing functions
 */
export const Easings = {
  // Standard easing
  standard: Easing.bezier(0.4, 0.0, 0.2, 1),
  // Decelerate easing (objects exiting screen)
  decelerate: Easing.bezier(0.0, 0.0, 0.2, 1),
  // Accelerate easing (objects entering screen)
  accelerate: Easing.bezier(0.4, 0.0, 1, 1),
  // Sharp easing (quick movements)
  sharp: Easing.bezier(0.4, 0.0, 0.6, 1),
  // Bounce easing
  bounce: Easing.bounce,
  // Elastic easing
  elastic: Easing.elastic(1),
};

/**
 * Fade in animation
 */
export const fadeIn = (
  animatedValue: Animated.Value,
  duration: number = Duration.normal,
  toValue: number = 1
) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    easing: Easings.standard,
    useNativeDriver: true,
  });
};

/**
 * Fade out animation
 */
export const fadeOut = (
  animatedValue: Animated.Value,
  duration: number = Duration.normal
) => {
  return Animated.timing(animatedValue, {
    toValue: 0,
    duration,
    easing: Easings.standard,
    useNativeDriver: true,
  });
};

/**
 * Slide in from bottom
 */
export const slideInFromBottom = (
  animatedValue: Animated.Value,
  duration: number = Duration.normal
) => {
  return Animated.timing(animatedValue, {
    toValue: 0,
    duration,
    easing: Easings.decelerate,
    useNativeDriver: true,
  });
};

/**
 * Slide out to bottom
 */
export const slideOutToBottom = (
  animatedValue: Animated.Value,
  toValue: number,
  duration: number = Duration.normal
) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    easing: Easings.accelerate,
    useNativeDriver: true,
  });
};

/**
 * Scale animation
 */
export const scale = (
  animatedValue: Animated.Value,
  toValue: number,
  duration: number = Duration.fast
) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    easing: Easings.standard,
    useNativeDriver: true,
  });
};

/**
 * Spring animation
 */
export const spring = (
  animatedValue: Animated.Value,
  toValue: number,
  tension: number = 50,
  friction: number = 7
) => {
  return Animated.spring(animatedValue, {
    toValue,
    tension,
    friction,
    useNativeDriver: true,
  });
};

/**
 * Pulse animation (infinite)
 */
export const pulse = (animatedValue: Animated.Value) => {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.1,
        duration: Duration.slow,
        easing: Easings.standard,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: Duration.slow,
        easing: Easings.standard,
        useNativeDriver: true,
      }),
    ])
  );
};

/**
 * Shake animation
 */
export const shake = (animatedValue: Animated.Value) => {
  return Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]);
};

/**
 * Sequential stagger animation
 */
export const stagger = (
  animations: Animated.CompositeAnimation[],
  delay: number = 50
) => {
  return Animated.stagger(delay, animations);
};

/**
 * Parallel animations
 */
export const parallel = (animations: Animated.CompositeAnimation[]) => {
  return Animated.parallel(animations);
};
