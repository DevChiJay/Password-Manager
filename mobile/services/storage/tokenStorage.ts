/**
 * Secure Token Storage Service
 * Uses expo-secure-store for encrypted token storage
 */

import * as SecureStore from 'expo-secure-store';
import { SECURITY_CONFIG } from '../../constants/config';

class TokenStorage {
  /**
   * Store authentication token securely
   */
  async saveToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(SECURITY_CONFIG.TOKEN_STORAGE_KEY, token);
    } catch (error) {
      console.error('Failed to save token:', error);
      throw new Error('Failed to save authentication token');
    }
  }

  /**
   * Retrieve authentication token
   */
  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(SECURITY_CONFIG.TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  }

  /**
   * Delete authentication token
   */
  async deleteToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(SECURITY_CONFIG.TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to delete token:', error);
    }
  }

  /**
   * Save refresh token (if applicable)
   */
  async saveRefreshToken(refreshToken: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(SECURITY_CONFIG.REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
      console.error('Failed to save refresh token:', error);
      throw new Error('Failed to save refresh token');
    }
  }

  /**
   * Retrieve refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(SECURITY_CONFIG.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to retrieve refresh token:', error);
      return null;
    }
  }

  /**
   * Delete refresh token
   */
  async deleteRefreshToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(SECURITY_CONFIG.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to delete refresh token:', error);
    }
  }

  /**
   * Clear all stored tokens
   */
  async clearAll(): Promise<void> {
    await Promise.all([
      this.deleteToken(),
      this.deleteRefreshToken(),
    ]);
  }

  /**
   * Check if token exists
   */
  async hasToken(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null && token.length > 0;
  }
}

export const tokenStorage = new TokenStorage();
