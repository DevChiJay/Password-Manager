/**
 * Password Strength Utilities
 * Helper functions for password strength analysis
 */

import { PasswordStrength } from '../types';

/**
 * Get color for password strength
 */
export function getPasswordStrengthColor(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak':
      return '#EF4444'; // red
    case 'medium':
      return '#F59E0B'; // orange
    case 'strong':
      return '#3B82F6'; // blue
    case 'very_strong':
      return '#10B981'; // green
    default:
      return '#9CA3AF'; // gray
  }
}

/**
 * Get label for password strength
 */
export function getPasswordStrengthLabel(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak':
      return 'Weak';
    case 'medium':
      return 'Medium';
    case 'strong':
      return 'Strong';
    case 'very_strong':
      return 'Very Strong';
    default:
      return 'Unknown';
  }
}

/**
 * Get percentage for password strength meter
 */
export function getPasswordStrengthPercentage(strength: PasswordStrength): number {
  switch (strength) {
    case 'weak':
      return 25;
    case 'medium':
      return 50;
    case 'strong':
      return 75;
    case 'very_strong':
      return 100;
    default:
      return 0;
  }
}

/**
 * Local password strength estimation (for client-side feedback)
 * Note: Server provides authoritative strength calculation
 */
export function estimatePasswordStrength(password: string): PasswordStrength {
  if (password.length < 8) return 'weak';

  let score = 0;

  // Length score
  if (password.length >= 12) score += 2;
  else if (password.length >= 10) score += 1;

  // Complexity scores
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Variety bonus
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= password.length * 0.6) score += 1;

  if (score <= 3) return 'weak';
  if (score <= 5) return 'medium';
  if (score <= 6) return 'strong';
  return 'very_strong';
}
