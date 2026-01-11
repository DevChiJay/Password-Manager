import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
  revealPassword,
  searchByWebsite,
  searchByEmail,
  generatePassword,
} from '@/api/entries'
import type {
  PasswordEntryCreate,
  PasswordEntryUpdate,
  PasswordGeneratorOptions,
} from '@/types'
import { toast } from 'sonner'

// Query Keys
export const entriesKeys = {
  all: ['entries'] as const,
  lists: () => [...entriesKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) => [...entriesKeys.lists(), { page, pageSize }] as const,
  details: () => [...entriesKeys.all, 'detail'] as const,
  detail: (id: string) => [...entriesKeys.details(), id] as const,
  searches: () => [...entriesKeys.all, 'search'] as const,
  searchWebsite: (query: string, page: number, pageSize: number) =>
    [...entriesKeys.searches(), 'website', { query, page, pageSize }] as const,
  searchEmail: (query: string, page: number, pageSize: number) =>
    [...entriesKeys.searches(), 'email', { query, page, pageSize }] as const,
}

/**
 * Hook to fetch paginated password entries
 */
export const useEntries = (page: number = 1, pageSize: number = 50) => {
  return useQuery({
    queryKey: entriesKeys.list(page, pageSize),
    queryFn: () => getEntries(page, pageSize),
  })
}

/**
 * Hook to fetch a single password entry
 */
export const useEntry = (id: string) => {
  return useQuery({
    queryKey: entriesKeys.detail(id),
    queryFn: () => getEntryById(id),
    enabled: !!id,
  })
}

/**
 * Hook to search entries by website
 */
export const useSearchWebsite = (query: string, page: number = 1, pageSize: number = 50) => {
  return useQuery({
    queryKey: entriesKeys.searchWebsite(query, page, pageSize),
    queryFn: () => searchByWebsite(query, page, pageSize),
    enabled: !!query && query.trim().length > 0,
  })
}

/**
 * Hook to search entries by email
 */
export const useSearchEmail = (query: string, page: number = 1, pageSize: number = 50) => {
  return useQuery({
    queryKey: entriesKeys.searchEmail(query, page, pageSize),
    queryFn: () => searchByEmail(query, page, pageSize),
    enabled: !!query && query.trim().length > 0,
  })
}

/**
 * Hook to create a new password entry
 */
export const useCreateEntry = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PasswordEntryCreate) => createEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: entriesKeys.lists() })
      toast.success('Password entry created successfully!')
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } }
      toast.error(err.response?.data?.detail || 'Failed to create password entry')
    },
  })
}

/**
 * Hook to update a password entry
 */
export const useUpdateEntry = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PasswordEntryUpdate }) =>
      updateEntry(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: entriesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: entriesKeys.detail(variables.id) })
      toast.success('Password entry updated successfully!')
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } }
      toast.error(err.response?.data?.detail || 'Failed to update password entry')
    },
  })
}

/**
 * Hook to delete a password entry
 */
export const useDeleteEntry = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: entriesKeys.lists() })
      toast.success('Password entry deleted successfully!')
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } }
      toast.error(err.response?.data?.detail || 'Failed to delete password entry')
    },
  })
}

/**
 * Hook to reveal a password
 */
export const useRevealPassword = () => {
  return useMutation({
    mutationFn: (id: string) => revealPassword(id),
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } }
      toast.error(err.response?.data?.detail || 'Failed to reveal password')
    },
  })
}

/**
 * Hook to generate a password
 */
export const useGeneratePassword = () => {
  return useMutation({
    mutationFn: (options?: PasswordGeneratorOptions) => generatePassword(options),
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } }
      toast.error(err.response?.data?.detail || 'Failed to generate password')
    },
  })
}
