/**
 * Clipboard Utility
 * Secure clipboard operations with auto-clear functionality
 */

import * as Clipboard from 'expo-clipboard';
import { SECURITY_CONFIG } from '../constants/config';
import { settingsStorage } from '../services/storage/settingsStorage';

class ClipboardManager {
  private clearTimers: Map<string, NodeJS.Timeout> = new Map();
  private timeoutSeconds: number = 30; // Default timeout

  /**
   * Set clipboard timeout
   */
  setTimeout(seconds: number): void {
    this.timeoutSeconds = seconds;
  }

  /**
   * Get current timeout
   */
  getTimeout(): number {
    return this.timeoutSeconds;
  }

  /**
   * Copy text to clipboard with auto-clear
   */
  async copy(text: string, autoClear = true): Promise<void> {
    await Clipboard.setStringAsync(text);

    if (autoClear) {
      await this.scheduleAutoClear();
    }
  }

  /**
   * Copy password to clipboard (always auto-clears)
   */
  async copyPassword(password: string): Promise<void> {
    await this.copy(password, true);
  }

  /**
   * Copy username to clipboard
   */
  async copyUsername(username: string): Promise<void> {
    await this.copy(username, true);
  }

  /**
   * Get clipboard content
   */
  async paste(): Promise<string> {
    return await Clipboard.getStringAsync();
  }

  /**
   * Clear clipboard
   */
  async clear(): Promise<void> {
    await Clipboard.setStringAsync('');
    this.clearAllTimers();
  }

  /**
   * Schedule auto-clear of clipboard
   */
  private async scheduleAutoClear(): Promise<void> {
    // Clear any existing timers
    this.clearAllTimers();

    // Get timeout from settings
    const timeout = await settingsStorage.getClipboardTimeout();
    const timeoutMs = timeout * 1000;

    // Set new timer
    const timer = setTimeout(async () => {
      await this.clear();
    }, timeoutMs);

    this.clearTimers.set('main', timer);
  }

  /**
   * Clear all pending timers
   */
  private clearAllTimers(): void {
    this.clearTimers.forEach((timer) => clearTimeout(timer));
    this.clearTimers.clear();
  }
}

export const clipboardManager = new ClipboardManager();

/**
 * Simple copy function for tests
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  await Clipboard.setStringAsync(text);
};
