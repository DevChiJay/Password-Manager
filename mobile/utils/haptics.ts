/**
 * Haptic Feedback Utility
 * Provide tactile feedback for user interactions
 */

import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Light impact haptic
 * Use for: Switch toggles, picker selections
 */
export const lightImpact = async () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
};

/**
 * Medium impact haptic
 * Use for: Button presses, checkbox selections
 */
export const mediumImpact = async () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
};

/**
 * Heavy impact haptic
 * Use for: Significant actions, confirmations
 */
export const heavyImpact = async () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
};

/**
 * Success notification haptic
 * Use for: Successful operations, completions
 */
export const successNotification = async () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }
};

/**
 * Warning notification haptic
 * Use for: Warning messages, important alerts
 */
export const warningNotification = async () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }
};

/**
 * Error notification haptic
 * Use for: Errors, failed operations
 */
export const errorNotification = async () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
};

/**
 * Selection haptic
 * Use for: Scrolling through lists, changing values
 */
export const selectionHaptic = async () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    await Haptics.selectionAsync();
  }
};

/**
 * Copy action haptic
 * Custom feedback for copy operations
 */
export const copyHaptic = async () => {
  await mediumImpact();
};

/**
 * Delete action haptic
 * Custom feedback for delete operations
 */
export const deleteHaptic = async () => {
  await heavyImpact();
};

/**
 * Toggle haptic
 * Custom feedback for toggle switches
 */
export const toggleHaptic = async () => {
  await lightImpact();
};

/**
 * Button press haptic
 * Custom feedback for button presses
 */
export const buttonPressHaptic = async () => {
  await lightImpact();
};

/**
 * Check if haptics are supported
 */
export const isHapticsSupported = (): boolean => {
  return Platform.OS === 'ios' || Platform.OS === 'android';
};

/**
 * Hook for haptic feedback
 */
export function useHaptics() {
  return {
    light: lightImpact,
    medium: mediumImpact,
    heavy: heavyImpact,
    success: successNotification,
    warning: warningNotification,
    error: errorNotification,
    selection: selectionHaptic,
    copy: copyHaptic,
    delete: deleteHaptic,
    toggle: toggleHaptic,
    buttonPress: buttonPressHaptic,
    isSupported: isHapticsSupported(),
  };
}
