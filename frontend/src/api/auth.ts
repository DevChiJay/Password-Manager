import apiClient from './client'
import type { LoginRequest, RegisterRequest, TokenResponse, User } from '@/types'

/**
 * Login user and get JWT token
 */
export const login = async (credentials: LoginRequest): Promise<TokenResponse> => {
  const response = await apiClient.post<TokenResponse>('/auth/login', credentials)
  return response.data
}

/**
 * Register a new user
 */
export const register = async (userData: RegisterRequest): Promise<User> => {
  const response = await apiClient.post<User>('/auth/register', userData)
  return response.data
}

/**
 * Get current user information
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>('/auth/me')
  return response.data
}

/**
 * Refresh JWT access token
 */
export const refreshToken = async (): Promise<TokenResponse> => {
  const response = await apiClient.post<TokenResponse>('/auth/refresh')
  return response.data
}

/**
 * Verify email with token
 */
export const verifyEmail = async (token: string): Promise<{ message: string }> => {
  const response = await apiClient.get<{ message: string }>(`/auth/verify-email?token=${token}`)
  return response.data
}

/**
 * Request password reset email
 */
export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>('/auth/forgot-password', { email })
  return response.data
}

/**
 * Reset password with token
 */
export const resetPassword = async (token: string, newPassword: string): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>('/auth/reset-password', {
    token,
    new_password: newPassword
  })
  return response.data
}

/**
 * Resend verification email
 */
export const resendVerification = async (email: string): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>('/auth/resend-verification', { email })
  return response.data
}

/**
 * Logout user (client-side only - clear local storage)
 */
export const logout = (): void => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user_data')
}
