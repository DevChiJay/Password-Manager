/**
 * Clipboard Utility
 * Secure clipboard operations with auto-clear functionality
 */

import * as Clipboard from 'expo-clipboard';
import { SECURITY_CONFIG } from '../constants/config';

class ClipboardManager {
  private clearTimers: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Copy text to clipboard with auto-clear
   */
  async copy(text: string, autoClear = true): Promise<void> {
    await Clipboard.setStringAsync(text);

    if (autoClear) {
      this.scheduleAutoClear();
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
  private scheduleAutoClear(): void {
    // Clear any existing timers
    this.clearAllTimers();

    // Set new timer
    const timer = setTimeout(async () => {
      await this.clear();
    }, SECURITY_CONFIG.CLIPBOARD_CLEAR_TIMEOUT);

    this.clearTimers.set('main', timer);
  }

  /**
   * Clear all pending timers
   */
  private clearAllTimers(): void {
    this.clearTimers.forEach((timer) => clearTimeout(timer));
    this.clearTimers.clear();
  }

  /**
   * Get remaining time until auto-clear (in seconds)
   */
  getRemainingTime(): number {
    return Math.ceil(SECURITY_CONFIG.CLIPBOARD_CLEAR_TIMEOUT / 1000);
  }
}

export const clipboardManager = new ClipboardManager();
