import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Copy, Edit, Eye, Trash2, ExternalLink } from 'lucide-react'
import { useEntries, useSearchWebsite, useSearchEmail } from '@/hooks/useEntries'
import { formatDistanceToNow } from 'date-fns'
import { copyToClipboard } from '@/lib/clipboard'
import type { PasswordEntry } from '@/types'

export default function DashboardPage() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(50)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'website' | 'email'>('website')

  // Determine which query to use based on search state
  const entriesQuery = useEntries(page, pageSize)
  const websiteSearchQuery = useSearchWebsite(searchQuery, page, pageSize)
  const emailSearchQuery = useSearchEmail(searchQuery, page, pageSize)

  // Select the active query based on search state
  const activeQuery = searchQuery
    ? searchType === 'website'
      ? websiteSearchQuery
      : emailSearchQuery
    : entriesQuery

  const handleSearch = (query: string, type: 'website' | 'email') => {
    setSearchQuery(query)
    setSearchType(type)
    setPage(1) // Reset to first page on new search
  }

  const handleNewPassword = () => {
    // TODO: Open create modal
    console.log('Create new password')
  }

  const handleCopyUsername = (username: string) => {
    copyToClipboard(username, 'Username')
  }

  const handleReveal = (entryId: string) => {
    // TODO: Open reveal modal
    console.log('Reveal password:', entryId)
  }

  const handleEdit = (entry: PasswordEntry) => {
    // TODO: Open edit modal
    console.log('Edit entry:', entry)
  }

  const handleDelete = (entryId: string) => {
    // TODO: Open delete confirmation
    console.log('Delete entry:', entryId)
  }

  return (
    <DashboardLayout
      onNewPassword={handleNewPassword}
      onSearch={handleSearch}
      totalPasswords={activeQuery.data?.total || 0}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mt-1">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : `Manage your ${activeQuery.data?.total || 0} password entries`}
            </p>
          </div>
          {searchQuery && (
            <Button variant="outline" onClick={() => handleSearch('', 'website')}>
              Clear Search
            </Button>
          )}
        </div>

        {/* Password Entries Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {activeQuery.isLoading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : activeQuery.isError ? (
            <div className="p-12 text-center">
              <p className="text-red-600">Failed to load password entries</p>
              <Button
                variant="outline"
                onClick={() => activeQuery.refetch()}
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          ) : !activeQuery.data?.entries || activeQuery.data.entries.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {searchQuery ? 'No results found' : 'No password entries yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery
                  ? 'Try a different search query'
                  : 'Create your first password entry to get started'}
              </p>
              {!searchQuery && (
                <Button onClick={handleNewPassword}>
                  Create First Entry
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Website</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Username/Email</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Strength</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeQuery.data.entries.map((entry) => (
                  <TableRow key={entry.entry_id}>
                    <TableCell className="font-medium">
                      {entry.website_name}
                    </TableCell>
                    <TableCell>
                      {entry.website_url ? (
                        <a
                          href={entry.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-800 inline-flex items-center gap-1"
                        >
                          <span className="truncate max-w-[200px]">
                            {entry.website_url}
                          </span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{entry.login_email_or_username}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            handleCopyUsername(entry.login_email_or_username)
                          }
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm">
                      {formatDistanceToNow(new Date(entry.updated_at), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell>
                      {entry.password_strength ? (
                        <Badge
                          variant={
                            entry.password_strength === 'strong' ||
                            entry.password_strength === 'very_strong'
                              ? 'default'
                              : entry.password_strength === 'medium'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {entry.password_strength}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleReveal(entry.entry_id)}
                          title="Reveal password"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(entry)}
                          title="Edit entry"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(entry.entry_id)}
                          title="Delete entry"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination */}
        {activeQuery.data && activeQuery.data.total_pages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600">
              Showing page {activeQuery.data.page} of {activeQuery.data.total_pages} (
              {activeQuery.data.total} total entries)
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <div className="text-sm font-medium">
                Page {page}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= (activeQuery.data?.total_pages || 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
