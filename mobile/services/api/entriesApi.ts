/**
 * Password Entries API Service
 * Handles all password entry-related API calls
 */

import { api } from './client';
import {
  PasswordEntry,
  PasswordEntryCreate,
  PasswordEntryUpdate,
  PasswordRevealResponse,
  PasswordEntryListResponse,
  SearchParams,
} from '../../types';
import { APP_CONFIG } from '../../constants/config';

class EntriesService {
  /**
   * Create a new password entry
   */
  async createEntry(data: PasswordEntryCreate): Promise<PasswordEntry> {
    const response = await api.post<PasswordEntry>('/entries', data);
    return response.data;
  }

  /**
   * Get paginated list of password entries
   */
  async getEntries(page = 1, pageSize = APP_CONFIG.DEFAULT_PAGE_SIZE): Promise<PasswordEntryListResponse> {
    const response = await api.get<PasswordEntryListResponse>('/entries', {
      params: { page, page_size: pageSize },
    });
    return response.data;
  }

  /**
   * Get a single password entry by ID (without password)
   */
  async getEntry(entryId: string): Promise<PasswordEntry> {
    const response = await api.get<PasswordEntry>(`/entries/${entryId}`);
    return response.data;
  }

  /**
   * Update a password entry
   */
  async updateEntry(entryId: string, data: PasswordEntryUpdate): Promise<PasswordEntry> {
    const response = await api.put<PasswordEntry>(`/entries/${entryId}`, data);
    return response.data;
  }

  /**
   * Delete a password entry
   */
  async deleteEntry(entryId: string): Promise<void> {
    await api.delete(`/entries/${entryId}`);
  }

  /**
   * Reveal password for an entry (gets decrypted password)
   */
  async revealPassword(entryId: string): Promise<PasswordRevealResponse> {
    const response = await api.get<PasswordRevealResponse>(`/entries/${entryId}/reveal`);
    return response.data;
  }

  /**
   * Search entries by website name
   */
  async searchByWebsite(params: SearchParams): Promise<PasswordEntryListResponse> {
    const response = await api.get<PasswordEntryListResponse>('/search/website', {
      params: {
        q: params.q,
        page: params.page || 1,
        page_size: params.page_size || APP_CONFIG.DEFAULT_PAGE_SIZE,
      },
    });
    return response.data;
  }

  /**
   * Search entries by email/username
   */
  async searchByEmail(params: SearchParams): Promise<PasswordEntryListResponse> {
    const response = await api.get<PasswordEntryListResponse>('/search/email', {
      params: {
        q: params.q,
        page: params.page || 1,
        page_size: params.page_size || APP_CONFIG.DEFAULT_PAGE_SIZE,
      },
    });
    return response.data;
  }
}

export const entriesService = new EntriesService();
