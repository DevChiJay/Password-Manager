/**
 * Unit Tests for Clipboard Utility
 */

import * as Clipboard from 'expo-clipboard';
import { copyToClipboard } from '../utils/clipboard';

// Mock the Clipboard module
jest.mock('expo-clipboard');

describe('Clipboard Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should copy text to clipboard', async () => {
    const testText = 'test password';
    await copyToClipboard(testText);
    
    expect(Clipboard.setStringAsync).toHaveBeenCalledWith(testText);
  });

  it('should handle empty strings', async () => {
    await copyToClipboard('');
    
    expect(Clipboard.setStringAsync).toHaveBeenCalledWith('');
  });

  it('should handle special characters', async () => {
    const specialText = '!@#$%^&*()_+-=[]{}|;:",.<>?/~`';
    await copyToClipboard(specialText);
    
    expect(Clipboard.setStringAsync).toHaveBeenCalledWith(specialText);
  });

  it('should handle unicode characters', async () => {
    const unicodeText = '密码 🔐 パスワード';
    await copyToClipboard(unicodeText);
    
    expect(Clipboard.setStringAsync).toHaveBeenCalledWith(unicodeText);
  });
});
