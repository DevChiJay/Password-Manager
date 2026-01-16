/**
 * Core TypeScript Type Definitions
 * Matching Backend API Schemas
 */

// ==================== User Types ====================

export interface User {
  user_id: string;
  email: string;
  username: string | null;
  created_at: string;
  is_active: boolean;
  email_verified: boolean;
}

// ==================== Authentication Types ====================

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface UserRegisterRequest {
  email: string;
  username?: string;
  password: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface VerifyEmailRequest {
  token: string;
}

// ==================== Password Entry Types ====================

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very_strong';

export interface PasswordEntry {
  entry_id: string;
  user_id: string;
  website_name: string;
  website_url: string | null;
  login_email_or_username: string;
  notes: string | null;
  password_strength: PasswordStrength;
  created_at: string;
  updated_at: string;
  last_accessed: string | null;
}

export interface PasswordEntryCreate {
  website_name: string;
  website_url?: string;
  login_email_or_username: string;
  password: string;
  notes?: string;
}

export interface PasswordEntryUpdate {
  website_name?: string;
  website_url?: string;
  login_email_or_username?: string;
  password?: string;
  notes?: string;
}

export interface PasswordRevealResponse {
  entry_id: string;
  user_id: string;
  website_name: string;
  website_url: string | null;
  login_email_or_username: string;
  password: string; // Decrypted password
  notes: string | null;
  password_strength: PasswordStrength;
  created_at: string;
  updated_at: string;
  last_accessed: string | null;
}

export interface PasswordEntryListResponse {
  entries: PasswordEntry[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// ==================== Password Generation Types ====================

export interface GeneratePasswordRequest {
  length?: number;
  include_symbols?: boolean;
  include_numbers?: boolean;
  include_uppercase?: boolean;
  include_lowercase?: boolean;
}

export interface GeneratePasswordResponse {
  password: string;
  strength: PasswordStrength;
}

// ==================== Search Types ====================

export interface SearchParams {
  q: string;
  page?: number;
  page_size?: number;
}

// ==================== API Error Types ====================

export interface ApiError {
  detail: string | { msg: string; type: string }[];
  status?: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

// ==================== Local Storage Types ====================

export interface BiometricSettings {
  enabled: boolean;
  lastSetup: string;
}

export interface AppSettings {
  autoLockTimeout: number;
  clipboardClearTimeout: number;
  biometric: BiometricSettings;
}

// ==================== Component Props Types ====================

export interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  showLabel?: boolean;
}

export interface EntryCardProps {
  entry: PasswordEntry;
  onPress: () => void;
}

// ==================== Utility Types ====================

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};
