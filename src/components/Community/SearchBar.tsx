'use client';
import { Search } from 'lucide-react';
import { Input } from '@/components/Input/Input';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export const CommunitySearchBar = ({
  searchQuery,
  onSearchChange,
  placeholder = '커뮤니티 글 검색하기...',
}: SearchBarProps) => {
  return (
    <div className="relative mb-6">
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-lavender-500 focus:ring-lavender-500 dark:border-gray-600"
      />
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
    </div>
  );
};
