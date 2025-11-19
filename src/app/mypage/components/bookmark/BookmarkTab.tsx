'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Bookmark, FileText, Calendar, Heart, Eye, MessageCircle, Loader2, Disc, Guitar, User } from 'lucide-react';
import { useArticleBookmarks, useBookmarkedWikis } from '@/shared/hooks';
import { CATEGORY_META } from '@/app/wiki/components/categoryMeta';
import type { WikiCategory } from '@/types/hierarchical.editor.types';

const BookmarkTab = () => {
  const [selectedFilter, setSelectedFilter] = useState('전체');

  // 북마크 타입 정의
  type PostBookmark = {
    articleId: string;
    title: string;
    author: string;
    createdAt: string;
    likeCount: number;
    commentCount: number;
    viewCount: number;
    content: string;
    type: 'post';
    category: string;
    id: string;
  };

  type WikiBookmark = {
    wikiId: string;
    wikiPageClass: string;
    title: string;
    author: string;
    createdAt: string;
    likeCount: number;
    viewCount: number;
    content: string;
    category: string;
    type: 'wiki';
    id: string;
  };

  type Bookmark = PostBookmark | WikiBookmark;

  // 타입 가드 함수
  const isWikiBookmark = (bookmark: Bookmark): bookmark is WikiBookmark => {
    return bookmark.type === 'wiki';
  };

  // API 훅 사용
  const { 
    bookmarks: articleBookmarks, 
    loading: articleLoading, 
    error: articleError 
  } = useArticleBookmarks({ page: 1, size: 20 });

  const { 
    bookmarks: wikiBookmarks, 
    loading: wikiLoading, 
    error: wikiError 
  } = useBookmarkedWikis({ page: 1, size: 20 });

  // 위키 URL 생성 함수
  const getWikiUrl = (wikiPageId: string, wikiPageClass: string): string => {
    // API 값을 라우팅 경로로 매핑
    const classToRoute: Record<string, WikiCategory> = {
      'GEAR': 'equipment',
      'ALBUM': 'lp', 
      'ARTIST': 'artist',
      'OTHER': 'other',
      // 소문자 버전도 지원 (안전장치)
      'gear': 'equipment',
      'album': 'lp',
      'artist': 'artist', 
      'lp': 'lp',
      'equipment': 'equipment',
      'other': 'other'
    };
    
    const route = classToRoute[wikiPageClass] || 'other';
    return `/wiki/${route}/${wikiPageId}`;
  };

  // 위키 카테고리 표시명 가져오기 (CATEGORY_META 활용)
  const getWikiCategoryDisplayName = (wikiPageClass: string): string => {
    // API 값을 WikiCategory로 변환
    const classToCategory: Record<string, WikiCategory> = {
      'GEAR': 'equipment',
      'ALBUM': 'lp',
      'ARTIST': 'artist', 
      'OTHER': 'other',
      // 소문자 버전도 지원
      'gear': 'equipment',
      'album': 'lp',
      'artist': 'artist',
      'lp': 'lp', 
      'equipment': 'equipment',
      'other': 'other'
    };
    
    const category = classToCategory[wikiPageClass] || 'other';
    return CATEGORY_META[category]?.label || '기타';
  };

  // 통합된 북마크 데이터와 필터링
  const allBookmarks = useMemo((): Bookmark[] => {
    const articles = articleBookmarks.map((article, index) => {
      // 실제 articleId가 있으면 사용, 없으면 임시 방안으로 index 기반 ID 생성
      // TODO: API에서 실제 articleId를 제공하면 이 로직을 수정해야 함
      let actualArticleId = article.articleId;
      if (!actualArticleId) {
        // 임시 방안: 북마크 순서 기반으로 ID 생성 (실제로는 API에서 articleId를 제공해야 함)
        console.warn('ArticleId not provided in bookmark API response, using fallback');
        actualArticleId = `bookmark-${index}`;
      }
      
      return {
        articleId: actualArticleId,
        title: article.articleTitle,
        author: article.writerName,
        createdAt: article.articleCreatedAt,
        likeCount: article.likeCount,
        commentCount: 0, // API에서 제공되지 않음
        viewCount: article.viewCount,
        content: article.articleContent,
        type: 'post' as const,
        category: '게시글 북마크',
        id: actualArticleId,
      };
    });

    const wikis = wikiBookmarks.map((wiki) => ({
      wikiId: wiki.wikiPageId,
      wikiPageClass: wiki.wikiPageClass,
      title: wiki.wikiTitle,
      author: '', // API에서 제공되지 않음
      createdAt: '', // API에서 제공되지 않음
      likeCount: 0,
      viewCount: 0,
      content: '',
      category: wiki.wikiPageClass,
      type: 'wiki' as const,
      id: wiki.wikiPageId,
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
    if (selectedFilter === '게시글 북마크') return allBookmarks.filter((bookmark) => bookmark.type === 'post');
    if (selectedFilter === '위키 북마크') return allBookmarks.filter((bookmark) => bookmark.type === 'wiki');
    return allBookmarks;
  }, [allBookmarks, selectedFilter]);

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  // 위키 카테고리별 아이콘 가져오기
  const getWikiCategoryIcon = (wikiPageClass: string) => {
    // API 값을 WikiCategory로 변환
    const classToCategory: Record<string, WikiCategory> = {
      'GEAR': 'equipment',
      'ALBUM': 'lp',
      'ARTIST': 'artist', 
      'OTHER': 'other',
      // 소문자 버전도 지원
      'gear': 'equipment',
      'album': 'lp',
      'artist': 'artist',
      'lp': 'lp', 
      'equipment': 'equipment',
      'other': 'other'
    };
    
    const category = classToCategory[wikiPageClass] || 'other';
    
    // 위키에서 사용하는 동일한 아이콘 매핑
    switch (category) {
      case 'lp':
        return <Disc className="h-5 w-5 text-violet-600 dark:text-violet-400" />;
      case 'equipment':
        return <Guitar className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'artist':
        return <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case 'other':
      default:
        return <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
    }
  };

  // 위키 카테고리별 배경색 가져오기
  const getWikiCategoryBg = (wikiPageClass: string): string => {
    const classToCategory: Record<string, WikiCategory> = {
      'GEAR': 'equipment',
      'ALBUM': 'lp',
      'ARTIST': 'artist', 
      'OTHER': 'other',
      'gear': 'equipment',
      'album': 'lp',
      'artist': 'artist',
      'lp': 'lp', 
      'equipment': 'equipment',
      'other': 'other'
    };
    
    const category = classToCategory[wikiPageClass] || 'other';
    
    // 위키에서 사용하는 색상과 매칭
    switch (category) {
      case 'lp':
        return 'bg-violet-100 dark:bg-violet-900/20';
      case 'equipment':
        return 'bg-green-100 dark:bg-green-900/20';
      case 'artist':
        return 'bg-purple-100 dark:bg-purple-900/20';
      case 'other':
      default:
        return 'bg-orange-100 dark:bg-orange-900/20';
    }
  };
  const getPostCategoryIcon = () => (
    <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
  );

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
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setSelectedFilter(filter.name)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedFilter === filter.name
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {filter.name}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    selectedFilter === filter.name
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
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
              <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
              <span className="ml-2 text-gray-600 dark:text-gray-400">북마크를 불러오는 중...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <Bookmark className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                북마크를 불러올 수 없습니다
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{error}</p>
            </div>
          ) : filteredBookmarks.length > 0 ? (
            <div className="space-y-4">
              {filteredBookmarks.map((bookmark) => (
                <Link
                  key={`${bookmark.type}-${bookmark.id}`}
                  href={
                    bookmark.type === 'post' 
                      ? `/community/${bookmark.id}` 
                      : getWikiUrl(bookmark.id, isWikiBookmark(bookmark) ? bookmark.wikiPageClass : 'other')
                  }
                  className="group block rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-amber-200 hover:bg-gradient-to-br hover:from-amber-50/50 hover:to-orange-50/50 hover:shadow-lg dark:border-gray-800 dark:hover:border-amber-700 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-1 items-start gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        bookmark.type === 'post' 
                          ? 'bg-indigo-100 dark:bg-indigo-900/20' 
                          : isWikiBookmark(bookmark) ? getWikiCategoryBg(bookmark.wikiPageClass) : 'bg-gray-100 dark:bg-gray-900/20'
                      } shadow-sm`}>
                        {bookmark.type === 'post' ? (
                          getPostCategoryIcon()
                        ) : (
                          isWikiBookmark(bookmark) ? getWikiCategoryIcon(bookmark.wikiPageClass) : getWikiCategoryIcon('other')
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className={`text-xs font-medium uppercase text-amber-600 dark:text-amber-400`}>
                            {bookmark.type === 'post' ? '게시글' : '위키'}
                          </span>
                          {bookmark.type === 'wiki' && bookmark.category && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {getWikiCategoryDisplayName(bookmark.category)}
                              </span>
                            </>
                          )}
                          {bookmark.author && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {bookmark.author}
                              </span>
                            </>
                          )}
                          {bookmark.createdAt && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Calendar className="h-3 w-3" />
                                {formatDate(bookmark.createdAt)}
                              </div>
                            </>
                          )}
                        </div>

                        <h4 className="mb-2 line-clamp-2 font-bold text-gray-900 transition-colors group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
                          {bookmark.title}
                        </h4>

                        <div className="flex items-center gap-4">
                          {bookmark.type === 'post' && (
                            <>
                              <div className="flex items-center gap-1 text-red-500">
                                <Heart className="h-4 w-4 fill-current" />
                                <span className="text-sm font-medium">{bookmark.likeCount || 0}</span>
                              </div>
                              <div className="flex items-center gap-1 text-blue-500">
                                <MessageCircle className="h-4 w-4" />
                                <span className="text-sm font-medium">{bookmark.commentCount || 0}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500">
                                <Eye className="h-4 w-4" />
                                <span className="text-sm font-medium">{bookmark.viewCount || 0}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <Bookmark className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {selectedFilter}에 해당하는 북마크가 없습니다
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                마음에 드는 게시글이나 위키 콘텐츠를 북마크해보세요
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkTab;
