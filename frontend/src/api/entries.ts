import apiClient from './client'
import type {
  PasswordEntry,
  PasswordEntryCreate,
  PasswordEntryUpdate,
  PasswordReveal,
  PaginatedResponse,
  PasswordGeneratorOptions,
  GeneratedPassword,
} from '@/types'

/**
 * Get all password entries (paginated)
 */
export const getEntries = async (
  page: number = 1,
  pageSize: number = 50
): Promise<PaginatedResponse<PasswordEntry>> => {
  const response = await apiClient.get<PaginatedResponse<PasswordEntry>>('/entries', {
    params: { page, page_size: pageSize },
  })
  return response.data
}

/**
 * Get a single password entry by ID
 */
export const getEntryById = async (entryId: string): Promise<PasswordEntry> => {
  const response = await apiClient.get<PasswordEntry>(`/entries/${entryId}`)
  return response.data
}

/**
 * Create a new password entry
 */
export const createEntry = async (data: PasswordEntryCreate): Promise<PasswordEntry> => {
  const response = await apiClient.post<PasswordEntry>('/entries', data)
  return response.data
}

/**
 * Update an existing password entry
 */
export const updateEntry = async (
  entryId: string,
  data: PasswordEntryUpdate
): Promise<PasswordEntry> => {
  const response = await apiClient.put<PasswordEntry>(`/entries/${entryId}`, data)
  return response.data
}

/**
 * Delete a password entry
 */
export const deleteEntry = async (entryId: string): Promise<void> => {
  await apiClient.delete(`/entries/${entryId}`)
}

/**
 * Reveal (decrypt) password for an entry
 */
export const revealPassword = async (entryId: string): Promise<PasswordReveal> => {
  const response = await apiClient.get<PasswordReveal>(`/entries/${entryId}/reveal`)
  return response.data
}

/**
 * Search entries by website name or URL
 */
export const searchByWebsite = async (
  query: string,
  page: number = 1,
  pageSize: number = 50
): Promise<PaginatedResponse<PasswordEntry>> => {
  const response = await apiClient.get<PaginatedResponse<PasswordEntry>>('/search/website', {
    params: { q: query, page, page_size: pageSize },
  })
  return response.data
}

/**
 * Search entries by email or username
 */
export const searchByEmail = async (
  query: string,
  page: number = 1,
  pageSize: number = 50
): Promise<PaginatedResponse<PasswordEntry>> => {
  const response = await apiClient.get<PaginatedResponse<PasswordEntry>>('/search/email', {
    params: { q: query, page, page_size: pageSize },
  })
  return response.data
}

/**
 * Generate a secure password
 */
export const generatePassword = async (
  options: PasswordGeneratorOptions = {}
): Promise<GeneratedPassword> => {
  const response = await apiClient.post<GeneratedPassword>('/generate-password', null, {
    params: options,
  })
  return response.data
}
