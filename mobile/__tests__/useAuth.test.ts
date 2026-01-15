/**
 * Unit Tests for Authentication Hook
 */

import { renderHook, waitFor } from '@testing-library/react-native';
import { useAuth } from '../hooks/useAuth';
import * as authApi from '../services/api/authApi';

// Mock the auth API
jest.mock('../services/api/authApi');

// Mock AsyncStorage
const mockAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAsyncStorage.getItem.mockResolvedValue(null);
  });

  it('should initialize with null user', () => {
    const { result } = renderHook(() => useAuth());
    
    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(true);
  });

  it('should login successfully', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    };
    
    const mockToken = 'mock-token';
    
    (authApi.login as jest.Mock).mockResolvedValue({
      user: mockUser,
      token: mockToken,
    });

    const { result } = renderHook(() => useAuth());
    
    await waitFor(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(authApi.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('auth_token', mockToken);
  });

  it('should handle login error', async () => {
    const mockError = new Error('Invalid credentials');
    (authApi.login as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuth());
    
    await expect(
      result.current.login('test@example.com', 'wrongpassword')
    ).rejects.toThrow('Invalid credentials');
  });

  it('should logout successfully', async () => {
    const { result } = renderHook(() => useAuth());
    
    await waitFor(async () => {
      await result.current.logout();
    });

    expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith('auth_token');
  });

  it('should register successfully', async () => {
    const mockUser = {
      id: '1',
      email: 'newuser@example.com',
      name: 'New User',
    };
    
    const mockToken = 'mock-token';
    
    (authApi.register as jest.Mock).mockResolvedValue({
      user: mockUser,
      token: mockToken,
    });

    const { result } = renderHook(() => useAuth());
    
    await waitFor(async () => {
      await result.current.register({
        email: 'newuser@example.com',
        password: 'password123',
        name: 'New User',
      });
    });

    expect(authApi.register).toHaveBeenCalled();
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('auth_token', mockToken);
  });
});
