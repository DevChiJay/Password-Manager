/**
 * sVault Typography System
 * Consistent text styles across the app
 */

import { TextStyle } from 'react-native';

export const Typography = {
  // Display - Extra large text
  display: {
    large: {
      fontSize: 57,
      lineHeight: 64,
      fontWeight: '700' as TextStyle['fontWeight'],
      letterSpacing: -0.25,
    },
    medium: {
      fontSize: 45,
      lineHeight: 52,
      fontWeight: '700' as TextStyle['fontWeight'],
      letterSpacing: 0,
    },
    small: {
      fontSize: 36,
      lineHeight: 44,
      fontWeight: '700' as TextStyle['fontWeight'],
      letterSpacing: 0,
    },
  },

  // Headline - Large titles
  headline: {
    large: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '700' as TextStyle['fontWeight'],
      letterSpacing: 0,
    },
    medium: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: '700' as TextStyle['fontWeight'],
      letterSpacing: 0,
    },
    small: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '700' as TextStyle['fontWeight'],
      letterSpacing: 0,
    },
  },

  // Title - Medium emphasis
  title: {
    large: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: '600' as TextStyle['fontWeight'],
      letterSpacing: 0,
    },
    medium: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '600' as TextStyle['fontWeight'],
      letterSpacing: 0.15,
    },
    small: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600' as TextStyle['fontWeight'],
      letterSpacing: 0.1,
    },
  },

  // Body - Standard text
  body: {
    large: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400' as TextStyle['fontWeight'],
      letterSpacing: 0.5,
    },
    medium: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400' as TextStyle['fontWeight'],
      letterSpacing: 0.25,
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400' as TextStyle['fontWeight'],
      letterSpacing: 0.4,
    },
  },

  // Label - UI elements
  label: {
    large: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '600' as TextStyle['fontWeight'],
      letterSpacing: 0.1,
    },
    medium: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '600' as TextStyle['fontWeight'],
      letterSpacing: 0.5,
    },
    small: {
      fontSize: 11,
      lineHeight: 14,
      fontWeight: '600' as TextStyle['fontWeight'],
      letterSpacing: 0.5,
    },
  },

  // Caption - Small text
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as TextStyle['fontWeight'],
    letterSpacing: 0.4,
  },

  // Overline - All caps labels
  overline: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: 1.5,
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },
};

// Font Weights
export const FontWeight = {
  light: '300' as TextStyle['fontWeight'],
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extrabold: '800' as TextStyle['fontWeight'],
};
