/**
 * Unit Tests for Clipboard Utility
 */

import Clipboard from '@react-native-clipboard/clipboard';
import { copyToClipboard } from '../utils/clipboard';

// Mock the Clipboard module
jest.mock('@react-native-clipboard/clipboard');

describe('Clipboard Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should copy text to clipboard', async () => {
    const testText = 'test password';
    await copyToClipboard(testText);
    
    expect(Clipboard.setString).toHaveBeenCalledWith(testText);
  });

  it('should handle empty strings', async () => {
    await copyToClipboard('');
    
    expect(Clipboard.setString).toHaveBeenCalledWith('');
  });

  it('should handle special characters', async () => {
    const specialText = '!@#$%^&*()_+-=[]{}|;:",.<>?/~`';
    await copyToClipboard(specialText);
    
    expect(Clipboard.setString).toHaveBeenCalledWith(specialText);
  });

  it('should handle unicode characters', async () => {
    const unicodeText = '密码 🔐 パスワード';
    await copyToClipboard(unicodeText);
    
    expect(Clipboard.setString).toHaveBeenCalledWith(unicodeText);
  });
});
