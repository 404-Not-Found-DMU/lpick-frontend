// Header.tsx
'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Image as ImageIcon } from 'lucide-react';
import { LPickLogo } from '@/assets/images/LPickLogo';
import { ThemeSelector } from '@/modules';
import { UserAvatarWithAuth } from '@/components/Layout/UserAvatar';
import clsx from 'clsx';
import React, { useState, useEffect, useRef, MouseEvent, FormEvent, ChangeEvent } from 'react';
import { fetcher } from '@/hooks/api/fetchers';

// API 경로
const API_PREFIX = '/api/v1/public/data';

// 반환 타입
interface SearchResult {
  id: string;
  name: string;
  documentType: string;
}

// 자동 완성 API 호출 함수
const fetchAutocompleteSuggestions = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.trim() === '') return [];
  const path = `${API_PREFIX}/autocomplete?keyword=${encodeURIComponent(query)}&size=8`;
  try {
    const res = await fetcher<SearchResult[]>(path);
    return Array.isArray(res) ? res : [];
  } catch (error) {
    console.error('자동 완성 데이터를 불러오는 데 실패했습니다:', error);
    return [];
  }
};

const Header = () => {
  const NAV_ITEMS = [
    { href: '/wiki', label: '위키' },
    { href: '/community', label: '커뮤니티' },
    { href: '/lplayer', label: 'LPlayer' },
  ];

  const pathname = usePathname();
  const router = useRouter();

  // 상태 관리
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 자동 완성 API 호출 로직
  useEffect(() => {
    if (isFocused && searchTerm.length > 0) {
      fetchAutocompleteSuggestions(searchTerm)
        .then((data) => setSuggestions(data))
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, isFocused]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
      // TypeScript 오류 해결: 'contains' 속성 확인 및 Node 타입 검사
      if (searchRef.current && event.target instanceof Node && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    // mousedown 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside as unknown as (e: globalThis.MouseEvent) => void);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as unknown as (e: globalThis.MouseEvent) => void);
    };
  }, []);

  // 전체 검색 핸들러 (Enter 또는 자동 완성 항목 클릭 시 사용)
  const handleSearchSubmit = (e: FormEvent, termToSearch: string = searchTerm) => {
    e.preventDefault();
    const trimmedTerm = termToSearch.trim();

    if (trimmedTerm) {
      // 검색 결과 페이지로 이동 (Next.js 라우팅)
      router.push(`/search?keyword=${encodeURIComponent(trimmedTerm)}`);
      setIsFocused(false);
    }
  };

  // 자동 완성 항목 클릭 핸들러
  const handleSuggestionClick = (e: MouseEvent, suggestion: SearchResult) => {
    e.preventDefault();
    setSearchTerm(suggestion.name);
    handleSearchSubmit(e as unknown as FormEvent, suggestion.name);
  };

  const showSuggestions = isFocused && suggestions.length > 0 && searchTerm.length > 0;

  // ... (console.log는 동일)

  const renderHighlighted = (text: string, query: string) => {
    if (!query) return text;
    try {
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escaped})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, idx) =>
        part.toLowerCase() === query.toLowerCase()
          ? <span key={idx} className="font-semibold">{part}</span>
          : <span key={idx}>{part}</span>
      );
    } catch {
      return text;
    }
  };

  return (
    <header className="sticky top-0 z-50 overflow-visible border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-16 w-full items-center justify-between gap-5 px-4">
        {/* ... (로고, 네비게이션 등 상단부는 동일) ... */}
        <div className="flex-shrink-0 px-2">
          <Link href="/" className="flex items-center">
            <LPickLogo className="mr-2 h-8 w-8 flex-shrink-0 text-lavender-500 dark:text-lavender-400" />
            <span className="text-xl font-bold text-lavender-500 dark:text-lavender-400">LPick</span>
          </Link>
        </div>

        <nav className="flex-shrink-0 px-2">
          <ul className="flex items-center space-x-8 whitespace-nowrap">
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    'font-medium text-gray-600 transition-colors hover:text-lavender-500 dark:text-gray-300 dark:hover:text-lavender-400',
                    pathname.startsWith(href) && 'text-lavender-500 dark:text-lavender-400',
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 flex-shrink-0 basis-[40%] px-2" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400 dark:text-gray-500" />
            <input
              placeholder="검색어를 입력하시거나 이미지를 업로드하세요."
              className="h-10 w-full rounded-full border-gray-200 bg-gray-50 pl-10 pr-10 text-sm placeholder:text-gray-500 focus:border-lavender-400 focus:ring-lavender-400 dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-gray-500 dark:focus:border-lavender-500 dark:focus:ring-lavender-500"
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
            />
            {/* 이미지 업로드 아이콘 버튼 */}
            <button
              type="button"
              aria-label="이미지 업로드"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => imageInputRef.current?.click()}
            >
              <ImageIcon className="h-5 w-5" />
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setIsFocused(false);
                  setSuggestions([]);
                  router.push(`/search/result?imageUrl=${encodeURIComponent(url)}`);
                }
              }}
            />

            {showSuggestions && (
              <div className="absolute top-full left-0 mt-2 w-full rounded-lg bg-white shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto z-10">
                <ul className="py-1">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.id} // key
                      className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={(e: MouseEvent) => handleSuggestionClick(e, suggestion)}
                    >
                      {/* 이름 표시 부분 */}
                      <div className="flex items-center text-gray-700 dark:text-gray-200">
                        <Search className="inline-block h-3 w-3 mr-2 text-gray-500 dark:text-gray-400" />
                        <span>{renderHighlighted(suggestion.name, searchTerm)}</span>
                      </div>

                      {/* 타입 배지 표시 부분 (신규) */}
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                        {suggestion.documentType}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button type="submit" hidden aria-hidden="true" />
          </form>
        </div>

        <div className="flex flex-shrink-0 items-center justify-end px-2">
          <ThemeSelector />
        </div>
        <div className="flex-shrink-0">
          <UserAvatarWithAuth />
        </div>
      </div>
    </header>
  );
};
export default Header;