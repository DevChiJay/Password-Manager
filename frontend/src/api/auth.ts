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
 * Logout user (client-side only - clear local storage)
 */
export const logout = (): void => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user_data')
}
