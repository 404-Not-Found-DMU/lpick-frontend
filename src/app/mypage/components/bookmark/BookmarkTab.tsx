'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Bookmark, FileText, Music, Calendar, Filter, Heart, Eye, User } from 'lucide-react';
import { useBookmarkedArticles, useBookmarkedWikis } from '@/shared/hooks';
import { BoardType } from '@/shared/types';

const BookmarkTab = () => {
  const [selectedFilter, setSelectedFilter] = useState('전체');

  // API 훅 사용
  const { 
    bookmarks: articleBookmarks, 
    loading: articleLoading, 
    error: articleError 
  } = useBookmarkedArticles({ page: 1, size: 20 });

  const { 
    bookmarks: wikiBookmarks, 
    loading: wikiLoading, 
    error: wikiError 
  } = useBookmarkedWikis({ page: 1, size: 20 });

  // 통합된 북마크 데이터와 필터링
  const allBookmarks = useMemo(() => {
    const articles = articleBookmarks.map((article) => ({
      ...article,
      type: 'post' as const,
      category: '게시글 북마크',
      id: article.articleId,
    }));

    const wikis = wikiBookmarks.map((wiki) => ({
      ...wiki,
      type: 'wiki' as const,
      category: '위키 북마크',
      id: wiki.wikiId,
    }));

    return [...articles, ...wikis];
  }, [articleBookmarks, wikiBookmarks]);

  // 필터 데이터
  const filters = [
    { name: '전체', count: allBookmarks.length },
    { name: '게시글 북마크', count: articleBookmarks.length },
    { name: '위키 북마크', count: wikiBookmarks.length },
  ];

  // 필터링된 북마크
  const filteredBookmarks = useMemo(() => {
    if (selectedFilter === '전체') return allBookmarks;
    return allBookmarks.filter((bookmark) => bookmark.category === selectedFilter);
  }, [allBookmarks, selectedFilter]);

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  // 보드 타입 한글 변환
  const getBoardTypeLabel = (boardType: BoardType) => {
    const boardTypeMap: Record<BoardType, string> = {
      FREE: '자유',
      ALBUM: '앨범',
      ARTIST: '아티스트',
      GEAR: '장비',
    };
    return boardTypeMap[boardType] || boardType;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'wiki':
        return <Music className="h-5 w-5 text-violet-600 dark:text-violet-400" />;
      default:
        return <Bookmark className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'post':
        return 'bg-blue-100 dark:bg-blue-900/20';
      case 'wiki':
        return 'bg-violet-100 dark:bg-violet-900/20';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const loading = articleLoading || wikiLoading;
  const error = articleError || wikiError;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
              <Bookmark className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">북마크</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                저장한 게시글과 위키 콘텐츠
              </p>
            </div>
          </div>
        </div>

        {/* 필터 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              북마크 분류
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setSelectedFilter(filter.name)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedFilter === filter.name
                    ? 'bg-amber-100 text-amber-800 shadow-sm dark:bg-amber-900/30 dark:text-amber-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {filter.name}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    selectedFilter === filter.name
                      ? 'bg-amber-200 text-amber-900 dark:bg-amber-800 dark:text-amber-100'
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 북마크 목록 */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">북마크를 불러오는 중...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-2">북마크를 불러오는데 실패했습니다</p>
              <p className="text-gray-500 dark:text-gray-400">{error}</p>
            </div>
          ) : filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((bookmark) => (
              <div
                key={`${bookmark.type}-${bookmark.id}`}
                className="rounded-2xl border border-gray-100 p-4 transition-all hover:shadow-md dark:border-gray-800 dark:hover:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${getTypeBg(bookmark.type)}`}>
                    {getTypeIcon(bookmark.type)}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <Link
                          href={bookmark.type === 'post' ? `/community/${bookmark.id}` : `/wiki/${bookmark.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-amber-600 dark:text-white dark:hover:text-amber-400"
                        >
                          {bookmark.title}
                        </Link>
                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <User className="h-4 w-4" />
                          <span>{bookmark.authorName}</span>
                          {bookmark.type === 'post' && 'boardType' in bookmark && (
                            <>
                              <span>•</span>
                              <span className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                                {getBoardTypeLabel(bookmark.boardType)}
                              </span>
                            </>
                          )}
                          {bookmark.type === 'wiki' && 'category' in bookmark && (
                            <>
                              <span>•</span>
                              <span className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                                {bookmark.category}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                      {bookmark.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{bookmark.type === 'post' ? bookmark.likeCount : 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{bookmark.viewCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(bookmark.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <Bookmark className="h-8 w-8 text-gray-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {selectedFilter}에 해당하는 북마크가 없습니다
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  마음에 드는 게시글이나 위키 콘텐츠를 북마크해보세요
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkTab;
