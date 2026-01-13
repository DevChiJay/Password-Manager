/**
 * useEntries Hook
 * React Query hooks for password entry operations
 */

import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { entriesService } from '../services/api';
import { queryKeys } from '../utils/queryClient';
import { PasswordEntryCreate, PasswordEntryUpdate, SearchParams } from '../types';

export function useEntries(page = 1) {
  const queryClient = useQueryClient();

  // Get entries list
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.entries(page),
    queryFn: () => entriesService.getEntries(page),
  });

  // Create entry mutation
  const createEntryMutation = useMutation({
    mutationFn: (data: PasswordEntryCreate) => entriesService.createEntry(data),
    onSuccess: () => {
      // Invalidate entries list
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });

  // Update entry mutation
  const updateEntryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: PasswordEntryUpdate }) => 
      entriesService.updateEntry(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific entry and list
      queryClient.invalidateQueries({ queryKey: queryKeys.entry(variables.id) });
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });

  // Delete entry mutation
  const deleteEntryMutation = useMutation({
    mutationFn: (id: string) => entriesService.deleteEntry(id),
    onSuccess: (_, id) => {
      // Remove from cache and invalidate list
      queryClient.removeQueries({ queryKey: queryKeys.entry(id) });
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });

  return {
    // Data
    entries: data?.entries || [],
    total: data?.total || 0,
    totalPages: data?.total_pages || 0,
    currentPage: data?.page || page,
    
    // Loading states
    isLoading,
    error,
    refetch,

    // Mutations
    createEntry: createEntryMutation.mutateAsync,
    isCreating: createEntryMutation.isPending,
    createError: createEntryMutation.error,

    updateEntry: updateEntryMutation.mutateAsync,
    isUpdating: updateEntryMutation.isPending,
    updateError: updateEntryMutation.error,

    deleteEntry: deleteEntryMutation.mutateAsync,
    isDeleting: deleteEntryMutation.isPending,
    deleteError: deleteEntryMutation.error,
  };
}

/**
 * Hook for single entry
 */
export function useEntry(entryId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.entry(entryId),
    queryFn: () => entriesService.getEntry(entryId),
    enabled: !!entryId,
  });

  return {
    entry: data,
    isLoading,
    error,
  };
}

/**
 * Hook for revealing password
 */
export function useRevealPassword(entryId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.entryReveal(entryId),
    queryFn: () => entriesService.revealPassword(entryId),
    enabled: false, // Only fetch when explicitly requested
    staleTime: 0, // Always fetch fresh
    gcTime: 0, // Don't cache
  });

  return {
    revealedEntry: data,
    isRevealing: isLoading,
    revealError: error,
    reveal: refetch,
  };
}

/**
 * Hook for searching entries
 */
export function useSearchEntries(searchType: 'website' | 'email', query: string, page = 1) {
  const searchFn = searchType === 'website' 
    ? entriesService.searchByWebsite 
    : entriesService.searchByEmail;

  const { data, isLoading, error } = useQuery({
    queryKey: searchType === 'website' 
      ? queryKeys.searchWebsite(query, page)
      : queryKeys.searchEmail(query, page),
    queryFn: () => searchFn({ q: query, page }),
    enabled: query.length > 0,
  });

  return {
    entries: data?.entries || [],
    total: data?.total || 0,
    totalPages: data?.total_pages || 0,
    isSearching: isLoading,
    searchError: error,
  };
}
