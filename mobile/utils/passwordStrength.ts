/**
 * Password Strength Utilities
 * Helper functions for client-side password strength estimation
 */

import { PasswordStrength } from '../types';

/**
 * Get color for password strength (for visual indicators during password creation)
 */
export function getPasswordStrengthColor(strength: PasswordStrength | null | undefined): string {
  if (!strength) return '#9CA3AF'; // gray
  
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
export function getPasswordStrengthLabel(strength: PasswordStrength | null | undefined): string {
  if (!strength) return 'Not Analyzed';
  
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
      return 'Not Analyzed';
  }
}

/**
 * Local password strength estimation (for client-side feedback during password creation)
 * This is only used for immediate visual feedback - the server provides the authoritative strength
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
 * Calculate password strength with score (for client-side visual feedback)
 */
export function calculatePasswordStrength(password: string): {
  score: number;
  strength: string;
} {
  if (!password || password.length === 0) {
    return { score: 0, strength: 'Very Weak' };
  }

  const estimatedStrength = estimatePasswordStrength(password);
  const scoreMap = {
    'weak': 25,
    'medium': 50,
    'strong': 75,
    'very_strong': 100,
  };

  return {
    score: scoreMap[estimatedStrength],
    strength: getPasswordStrengthLabel(estimatedStrength),
  };
}

/**
 * Get password strength feedback (for client-side guidance)
 */
export function getPasswordFeedback(password: string): string[] {
  const feedback: string[] = [];

  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters long');
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('Include lowercase letters');
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('Include uppercase letters');
  }

  if (!/[0-9]/.test(password)) {
    feedback.push('Include numbers');
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    feedback.push('Include special characters (!@#$%^&*)');
  }

  if (password.length >= 12 && feedback.length === 0) {
    feedback.push('Strong password!');
  }

  return feedback;
}
