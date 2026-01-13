/**
 * React Query Configuration
 * Global query client setup for API state management
 */

import { QueryClient } from '@tanstack/react-query';
import { APP_CONFIG } from '../constants/config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache configuration
      staleTime: APP_CONFIG.CACHE_STALE_TIME,
      gcTime: APP_CONFIG.CACHE_GC_TIME,
      
      // Retry configuration
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch configuration
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      // Mutation configuration
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Query keys for consistent cache management
export const queryKeys = {
  // Auth
  currentUser: ['auth', 'me'] as const,
  
  // Entries
  entries: (page?: number) => ['entries', { page }] as const,
  entry: (id: string) => ['entries', id] as const,
  entryReveal: (id: string) => ['entries', id, 'reveal'] as const,
  
  // Search
  searchWebsite: (query: string, page?: number) => ['search', 'website', query, { page }] as const,
  searchEmail: (query: string, page?: number) => ['search', 'email', query, { page }] as const,
} as const;
