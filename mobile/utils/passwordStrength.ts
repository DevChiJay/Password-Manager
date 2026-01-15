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

/**
 * Calculate password strength with score
 * Returns score (0-100) and strength label
 */
export function calculatePasswordStrength(password: string): {
  score: number;
  strength: string;
} {
  if (!password || password.length === 0) {
    return { score: 0, strength: 'Very Weak' };
  }

  let score = 0;

  // Length scoring (0-40 points)
  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;
  if (password.length >= 20) score += 10;

  // Character variety (0-40 points)
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^A-Za-z0-9]/.test(password)) score += 10;

  // Complexity bonus (0-20 points)
  const uniqueChars = new Set(password).size;
  const uniqueRatio = uniqueChars / password.length;
  if (uniqueRatio > 0.6) score += 10;
  if (password.length > 15) score += 10;

  // Determine strength label
  let strength: string;
  if (score < 20) strength = 'Very Weak';
  else if (score < 40) strength = 'Weak';
  else if (score < 60) strength = 'Fair';
  else if (score < 80) strength = 'Good';
  else strength = 'Very Strong';

  return { score: Math.min(score, 100), strength };
}

/**
 * Get password feedback suggestions
 */
export function getPasswordFeedback(password: string): string[] {
  const feedback: string[] = [];

  if (password.length < 8) {
    feedback.push('Use at least 8 characters');
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('Add lowercase letters');
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('Add uppercase letters');
  }

  if (!/[0-9]/.test(password)) {
    feedback.push('Add a number');
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    feedback.push('Add a special character');
  }

  return feedback;
}
