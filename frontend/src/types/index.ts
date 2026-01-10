// ==================== Authentication Types ====================

export interface User {
  user_id: string
  email: string
  username?: string
  created_at: string
  is_active: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  username?: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

// ==================== Password Entry Types ====================

export interface PasswordEntry {
  entry_id: string
  user_id: string
  website_name: string
  website_url: string
  login_email_or_username: string
  notes?: string
  created_at: string
  updated_at: string
  last_accessed?: string
  password_strength?: string
}

export interface PasswordEntryCreate {
  website_name: string
  website_url?: string
  login_email_or_username: string
  password: string
  notes?: string
}

export interface PasswordEntryUpdate {
  website_name?: string
  website_url?: string
  login_email_or_username?: string
  password?: string
  notes?: string
}

export interface PasswordReveal {
  entry_id: string
  website_name: string
  website_url: string
  login_email_or_username: string
  password: string
  revealed_at: string
}

// ==================== Pagination Types ====================

export interface PaginatedResponse<T> {
  entries: T[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

// ==================== Password Generator Types ====================

export interface PasswordGeneratorOptions {
  length?: number
  include_symbols?: boolean
  include_numbers?: boolean
  include_uppercase?: boolean
  include_lowercase?: boolean
}

export interface GeneratedPassword {
  password: string
  length: number
  strength: string
}

// ==================== API Error Types ====================

export interface ApiError {
  detail: string
  status?: number
}
