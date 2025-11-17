// Header.tsx
'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Image as ImageIcon, Music, Disc, Loader2, ExternalLink, ChevronDown, ChevronUp, Maximize2 } from 'lucide-react';
import { LPickLogo } from '@/assets/images/LPickLogo';
import { ThemeSelector } from '@/modules';
import { UserAvatarWithAuth } from '@/components/Layout/UserAvatar';
import { Badge } from '@/components';
import clsx from 'clsx';
import React, { useState, useEffect, useRef, MouseEvent, FormEvent, ChangeEvent } from 'react';
import { fetcher } from '@/hooks/api/fetchers';
import { searchAlbumByImage, type ImageSearchResult } from '@/app/search/api/imageSearch.api';
import Image from 'next/image';

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
    { href: '/support', label: '고객센터' },
  ];

  const pathname = usePathname();
  const router = useRouter();

  // 상태 관리
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [imageSearchResults, setImageSearchResults] = useState<ImageSearchResult[]>([]);
  const [isImageSearching, setIsImageSearching] = useState(false);
  const [imageSearchError, setImageSearchError] = useState<string | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [isImageResultsExpanded, setIsImageResultsExpanded] = useState(false); // 기본값: 리스트 형식(축소된 상태)
  const searchRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 자동 완성 API 호출 로직
  useEffect(() => {
    if (isFocused && searchTerm.length > 0 && !selectedImageUrl) {
      fetchAutocompleteSuggestions(searchTerm)
        .then((data) => setSuggestions(data))
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, isFocused, selectedImageUrl]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
      // TypeScript 오류 해결: 'contains' 속성 확인 및 Node 타입 검사
      if (searchRef.current && event.target instanceof Node && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
        // 이미지 검색 상태 초기화는 하지 않음 (사용자가 다시 열 수 있도록)
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

  const showSuggestions = isFocused && suggestions.length > 0 && searchTerm.length > 0 && !selectedImageUrl;
  const showImageResults = isFocused && selectedImageUrl && (imageSearchResults.length > 0 || isImageSearching || imageSearchError);

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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchTerm(e.target.value);
                // 텍스트 입력 시 이미지 검색 결과 숨기기
                if (e.target.value.trim().length > 0) {
                  setSelectedImageUrl(null);
                  setImageSearchResults([]);
                }
              }}
              onFocus={() => {
                setIsFocused(true);
                // 이미지 검색 결과가 있으면 다시 표시
                if (selectedImageUrl && imageSearchResults.length > 0) {
                  // 이미 표시 중이므로 아무것도 하지 않음
                }
              }}
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
              onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setSelectedImageUrl(url);
                  setIsFocused(true);
                  setSuggestions([]);
                  setImageSearchError(null);
                  setIsImageSearching(true);
                  
                  try {
                    const results = await searchAlbumByImage(file);
                    setImageSearchResults(results);
                  } catch (error) {
                    console.error('이미지 검색 실패:', error);
                    setImageSearchError('이미지 검색 중 오류가 발생했습니다.');
                    setImageSearchResults([]);
                  } finally {
                    setIsImageSearching(false);
                  }
                }
              }}
            />

            {/* 텍스트 검색 자동완성 드롭다운 */}
            {showSuggestions && (
              <div className="absolute top-full left-0 mt-2 w-full rounded-lg bg-white shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto z-10">
                <ul className="py-1">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={(e: MouseEvent) => handleSuggestionClick(e, suggestion)}
                    >
                      {/* 이름 표시 부분 */}
                      <div className="flex items-center text-gray-700 dark:text-gray-200">
                        <Search className="inline-block h-3 w-3 mr-2 text-gray-500 dark:text-gray-400" />
                        <span>{renderHighlighted(suggestion.name, searchTerm)}</span>
                      </div>

                      {/* 타입 배지 표시 부분 */}
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                        {suggestion.documentType}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 이미지 검색 결과 드롭다운 */}
            {showImageResults && (
              <div className="absolute top-full left-0 mt-2 w-full rounded-lg bg-white shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-10" style={{ maxHeight: isImageResultsExpanded ? '80vh' : '600px' }}>
                <div className={isImageResultsExpanded ? 'p-0' : 'p-4'}>
                  {/* 헤더 (업로드한 이미지 + 토글 버튼) */}
                  {selectedImageUrl && (
                    <div className={clsx('flex items-center gap-3', isImageResultsExpanded ? 'p-4 border-b border-gray-200 dark:border-gray-700' : 'mb-4 pb-4 border-b border-gray-200 dark:border-gray-700')}>
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <Image
                          src={selectedImageUrl}
                          alt="업로드한 이미지"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">업로드한 이미지</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">유사한 앨범 검색 결과</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* 리스트 상태일 때만 전체 결과 보기 버튼 표시 */}
                        {!isImageResultsExpanded && (
                          <Link
                            href={`/search/result?imageUrl=${encodeURIComponent(selectedImageUrl)}`}
                            onClick={() => {
                              setIsFocused(false);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            전체 결과 보기
                          </Link>
                        )}
                        {/* 확장/축소 토글 버튼 */}
                        <button
                          onClick={() => setIsImageResultsExpanded(!isImageResultsExpanded)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title={isImageResultsExpanded ? '축소' : '펼치기'}
                        >
                          {isImageResultsExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        {/* 닫기 버튼 */}
                        <button
                          onClick={() => {
                            setSelectedImageUrl(null);
                            setImageSearchResults([]);
                            setIsImageResultsExpanded(false); // 기본값(리스트 형식)으로 리셋
                            setIsFocused(false);
                            if (imageInputRef.current) {
                              imageInputRef.current.value = '';
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 로딩 상태 */}
                  {isImageSearching && (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-violet-500" />
                      <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">검색 중...</span>
                    </div>
                  )}

                  {/* 에러 상태 */}
                  {imageSearchError && !isImageSearching && (
                    <div className="py-8 text-center">
                      <p className="text-sm text-red-500 dark:text-red-400">{imageSearchError}</p>
                    </div>
                  )}

                  {/* 검색 결과 */}
                  {!isImageSearching && !imageSearchError && imageSearchResults.length > 0 && (
                    <div className={clsx('overflow-y-auto', isImageResultsExpanded ? 'max-h-[calc(80vh-120px)]' : 'max-h-[500px]')}>
                      <div className={isImageResultsExpanded ? 'p-4' : 'space-y-3'}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                            <Music className="w-4 h-4 mr-2 text-violet-500 dark:text-violet-400" />
                            검색된 앨범
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {imageSearchResults.length}개
                          </Badge>
                        </div>
                        
                        {/* 펼쳐진 상태: 그리드 레이아웃 (전체 페이지 스타일) */}
                        {isImageResultsExpanded ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {imageSearchResults.map((result, index) => (
                              <Link
                                key={`${result.albumId}-${index}`}
                                href={`/wiki/${result.wikiId}`}
                                onClick={() => {
                                  setIsFocused(false);
                                }}
                                className="flex flex-col gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md transition-all group"
                              >
                                {/* 앨범 이미지 */}
                                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                  {result.imageUrl ? (
                                    <Image
                                      src={result.imageUrl}
                                      alt={result.name}
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                      이미지 없음
                                    </div>
                                  )}
                                </div>

                                {/* 앨범 정보 */}
                                <div className="space-y-1.5">
                                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-violet-500 dark:group-hover:text-violet-400">
                                    {result.name}
                                  </h4>
                                  <Badge className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 text-xs w-fit">
                                    <Disc className="w-3 h-3 mr-1" />
                                    유사도: {Math.round(result.similarity * 100)}%
                                  </Badge>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          /* 축소된 상태: 리스트 레이아웃 (드롭다운 스타일) */
                          <div className="space-y-2">
                            {imageSearchResults.map((result, index) => (
                              <Link
                                key={`${result.albumId}-${index}`}
                                href={`/wiki/${result.wikiId}`}
                                onClick={() => {
                                  setIsFocused(false);
                                }}
                                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                              >
                                {/* 앨범 이미지 */}
                                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                  {result.imageUrl ? (
                                    <Image
                                      src={result.imageUrl}
                                      alt={result.name}
                                      width={64}
                                      height={64}
                                      className="w-full h-full object-cover"
                                      unoptimized
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                      이미지 없음
                                    </div>
                                  )}
                                </div>

                                {/* 앨범 정보 */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-violet-500 dark:group-hover:text-violet-400">
                                    {result.name}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 text-xs">
                                      <Disc className="w-3 h-3 mr-1" />
                                      유사도: {Math.round(result.similarity * 100)}%
                                    </Badge>
                                  </div>
                                </div>

                                {/* 외부 링크 아이콘 */}
                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 flex-shrink-0" />
                              </Link>
                            ))}
                            {/* 더 보기 링크 */}
                            <Link
                              href={`/search/result?imageUrl=${encodeURIComponent(selectedImageUrl || '')}`}
                              onClick={() => {
                                setIsFocused(false);
                              }}
                              className="flex items-center justify-center py-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                            >
                              더 보기
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 검색 결과 없음 */}
                  {!isImageSearching && !imageSearchError && imageSearchResults.length === 0 && (
                    <div className={clsx('text-center', isImageResultsExpanded ? 'py-12' : 'py-8')}>
                      <p className="text-sm text-gray-500 dark:text-gray-400">검색 결과가 없습니다.</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">다른 이미지로 다시 시도해 보세요.</p>
                    </div>
                  )}
                </div>
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