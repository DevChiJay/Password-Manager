/**
 * Settings Storage Service
 * Manages app settings persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIPBOARD_TIMEOUT_KEY = 'Svault_clipboard_timeout';

export class SettingsStorage {
  /**
   * Get clipboard auto-clear timeout in seconds
   */
  async getClipboardTimeout(): Promise<number> {
    try {
      const timeout = await AsyncStorage.getItem(CLIPBOARD_TIMEOUT_KEY);
      return timeout ? parseInt(timeout, 10) : 30; // Default 30 seconds
    } catch (error) {
      console.error('Error getting clipboard timeout:', error);
      return 30;
    }
  }

  /**
   * Set clipboard auto-clear timeout in seconds
   */
  async setClipboardTimeout(seconds: number): Promise<void> {
    try {
      await AsyncStorage.setItem(CLIPBOARD_TIMEOUT_KEY, seconds.toString());
    } catch (error) {
      console.error('Error setting clipboard timeout:', error);
      throw new Error('Failed to save clipboard timeout');
    }
  }
}

export const settingsStorage = new SettingsStorage();
