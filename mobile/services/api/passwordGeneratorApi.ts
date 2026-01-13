/**
 * Password Generation API Service
 * Handles password generation requests
 */

import { api } from './client';
import { GeneratePasswordRequest, GeneratePasswordResponse } from '../../types';

class PasswordGeneratorService {
  /**
   * Generate a secure password with specified options
   */
  async generatePassword(options?: GeneratePasswordRequest): Promise<GeneratePasswordResponse> {
    const response = await api.post<GeneratePasswordResponse>('/generate-password', {
      length: options?.length || 16,
      include_symbols: options?.include_symbols ?? true,
      include_numbers: options?.include_numbers ?? true,
      include_uppercase: options?.include_uppercase ?? true,
      include_lowercase: options?.include_lowercase ?? true,
    });
    return response.data;
  }
}

export const passwordGeneratorService = new PasswordGeneratorService();
