import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchBarProps {
  onSearch?: (query: string, searchType: 'website' | 'email') => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'website' | 'email'>('website')
  const debouncedQuery = useDebounce(searchQuery, 500)

  // Trigger search when debounced query changes
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery, searchType)
    }
  }, [debouncedQuery, searchType, onSearch])

  const handleClear = () => {
    setSearchQuery('')
    if (onSearch) {
      onSearch('', searchType)
    }
  }

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Type Selector */}
      <Select value={searchType} onValueChange={(value: 'website' | 'email') => setSearchType(value)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="website">Website</SelectItem>
          <SelectItem value="email">Email</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
