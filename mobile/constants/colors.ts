/**
 * sVault Color Palette
 * Consistent color system for the entire app
 */

export const Colors = {
  // Primary Colors - Indigo
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1', // Main primary color
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },

  // Success - Green
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#10B981', // Main success color
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  // Warning - Orange
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Main warning color
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Error - Red
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Main error color
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Info - Blue
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6', // Main info color
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Gray Scale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Special Colors
  white: '#FFFFFF',
  black: '#000000',

  // Semantic Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },

  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  border: {
    light: '#F3F4F6',
    medium: '#E5E7EB',
    dark: '#D1D5DB',
  },

  // Password Strength Colors
  strength: {
    weak: '#EF4444',
    medium: '#F59E0B',
    strong: '#3B82F6',
    veryStrong: '#10B981',
  },

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// Dark Mode Colors (for future implementation)
export const DarkColors = {
  primary: Colors.primary,
  success: Colors.success,
  warning: Colors.warning,
  error: Colors.error,
  info: Colors.info,

  background: {
    primary: '#111827',
    secondary: '#1F2937',
    tertiary: '#374151',
  },

  text: {
    primary: '#F9FAFB',
    secondary: '#D1D5DB',
    tertiary: '#9CA3AF',
    inverse: '#111827',
  },

  border: {
    light: '#374151',
    medium: '#4B5563',
    dark: '#6B7280',
  },

  strength: Colors.strength,
  overlay: 'rgba(0, 0, 0, 0.7)',
};
