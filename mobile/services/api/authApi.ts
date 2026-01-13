/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

import { api } from './client';
import { tokenStorage } from '../storage/tokenStorage';
import {
  TokenResponse,
  User,
  UserRegisterRequest,
  UserLoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../../types';

class AuthService {
  /**
   * Register a new user
   */
  async register(data: UserRegisterRequest): Promise<void> {
    const response = await api.post('/auth/register', {
      email: data.email.toLowerCase(),
      username: data.username || undefined,
      password: data.password,
    });
    return response.data;
  }

  /**
   * Login user and store token
   */
  async login(data: UserLoginRequest): Promise<TokenResponse> {
    const response = await api.post<TokenResponse>('/auth/login', {
      email: data.email.toLowerCase(),
      password: data.password,
    });

    const tokenData = response.data;
    
    // Store token securely
    await tokenStorage.saveToken(tokenData.access_token);

    return tokenData;
  }

  /**
   * Get current user profile
   */
  async getMe(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  }

  /**
   * Refresh authentication token
   */
  async refresh(): Promise<TokenResponse> {
    const response = await api.post<TokenResponse>('/auth/refresh');
    
    // Update stored token
    await tokenStorage.saveToken(response.data.access_token);
    
    return response.data;
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<void> {
    const response = await api.get(`/auth/verify-email`, {
      params: { token },
    });
    return response.data;
  }

  /**
   * Resend verification email
   */
  async resendVerification(email: string): Promise<void> {
    const response = await api.post('/auth/resend-verification', {
      email: email.toLowerCase(),
    });
    return response.data;
  }

  /**
   * Request password reset
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    const response = await api.post('/auth/forgot-password', {
      email: data.email.toLowerCase(),
    });
    return response.data;
  }

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    const response = await api.post('/auth/reset-password', {
      token: data.token,
      new_password: data.new_password,
    });
    return response.data;
  }

  /**
   * Logout user (clear local tokens)
   */
  async logout(): Promise<void> {
    await tokenStorage.clearAll();
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    return await tokenStorage.hasToken();
  }
}

export const authService = new AuthService();
