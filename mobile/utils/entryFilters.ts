/**
 * Entry Filters and Sorting Utilities
 * Helper functions for filtering and sorting password entries
 */

import { PasswordEntry } from '@/types';

export type SortOption = 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc' | 'updated-asc' | 'updated-desc';

export interface FilterOptions {
  dateRange: 'all' | 'week' | 'month' | 'year';
}

/**
 * Apply filters and sorting to entries
 */
export function applyFiltersAndSort(
  entries: PasswordEntry[],
  filters: FilterOptions,
  sort: SortOption
): PasswordEntry[] {
  let filtered = [...entries];

  // Apply date range filter
  if (filters.dateRange !== 'all') {
    const now = new Date();
    const cutoffDate = new Date();

    switch (filters.dateRange) {
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case 'year':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    filtered = filtered.filter(
      (entry) => new Date(entry.created_at) >= cutoffDate
    );
  }

  // Apply sorting
  return sortEntries(filtered, sort);
}

/**
 * Sort entries by given option
 */
export function sortEntries(
  entries: PasswordEntry[],
  sort: SortOption
): PasswordEntry[] {
  const sorted = [...entries];

  sorted.sort((a, b) => {
    switch (sort) {
      case 'name-asc':
        return a.website_name.localeCompare(b.website_name);
      case 'name-desc':
        return b.website_name.localeCompare(a.website_name);
      case 'date-asc':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'date-desc':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'updated-asc':
        return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
      case 'updated-desc':
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      default:
        return 0;
    }
  });

  return sorted;
}

/**
 * Filter entries by date range
 */
export function filterByDateRange(
  entries: PasswordEntry[],
  range: 'all' | 'week' | 'month' | 'year'
): PasswordEntry[] {
  if (range === 'all') return entries;

  const now = new Date();
  const cutoffDate = new Date();

  switch (range) {
    case 'week':
      cutoffDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      cutoffDate.setDate(now.getDate() - 30);
      break;
    case 'year':
      cutoffDate.setFullYear(now.getFullYear() - 1);
      break;
  }

  return entries.filter((entry) => new Date(entry.created_at) >= cutoffDate);
}

/**
 * Search entries by query (website name or login)
 */
export function searchEntries(
  entries: PasswordEntry[],
  query: string
): PasswordEntry[] {
  if (!query.trim()) return entries;

  const searchTerm = query.toLowerCase().trim();

  return entries.filter(
    (entry) =>
      entry.website_name.toLowerCase().includes(searchTerm) ||
      entry.login_email_or_username.toLowerCase().includes(searchTerm) ||
      entry.website_url?.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get entries that need attention (old or reused passwords)
 */
export function getEntriesNeedingAttention(
  entries: PasswordEntry[]
): {
  old: PasswordEntry[];
  reused: PasswordEntry[];
} {
  // Old passwords (90+ days)
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const old = entries.filter(
    (entry) => new Date(entry.updated_at) < ninetyDaysAgo
  );

  // Reused passwords (entries with same username across different sites)
  const usernameMap = new Map<string, PasswordEntry[]>();
  entries.forEach((entry) => {
    const key = entry.login_email_or_username.toLowerCase();
    if (!usernameMap.has(key)) {
      usernameMap.set(key, []);
    }
    usernameMap.get(key)!.push(entry);
  });

  const reused = Array.from(usernameMap.values())
    .filter((group) => group.length > 1)
    .flat();

  return { old, reused };
}

/**
 * Calculate vault statistics
 */
export function calculateVaultStats(entries: PasswordEntry[]) {
  const total = entries.length;
  
  if (total === 0) {
    return {
      total: 0,
      averageAge: 0,
    };
  }

  // Calculate average password age
  const now = Date.now();
  const totalAge = entries.reduce((sum, entry) => {
    const age = now - new Date(entry.updated_at).getTime();
    return sum + age;
  }, 0);
  const averageAge = Math.floor(totalAge / entries.length / (1000 * 60 * 60 * 24)); // in days

  return {
    total,
    averageAge,
  };
}

/**
 * Group entries by website domain
 */
export function groupByDomain(entries: PasswordEntry[]): Map<string, PasswordEntry[]> {
  const groups = new Map<string, PasswordEntry[]>();

  entries.forEach((entry) => {
    const domain = extractDomain(entry.website_url || entry.website_name);
    if (!groups.has(domain)) {
      groups.set(domain, []);
    }
    groups.get(domain)!.push(entry);
  });

  return groups;
}

/**
 * Extract domain from URL or website name
 */
function extractDomain(urlOrName: string): string {
  try {
    const url = new URL(urlOrName.startsWith('http') ? urlOrName : `https://${urlOrName}`);
    return url.hostname.replace('www.', '');
  } catch {
    // If not a valid URL, use the name as-is
    return urlOrName.toLowerCase().replace('www.', '');
  }
}
