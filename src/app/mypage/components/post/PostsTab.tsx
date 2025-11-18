'use client';

import React, { useState, useMemo } from 'react';
import {
  FileText,
  Eye,
  Heart,
  Plus,
  Edit,
  MessageCircle,
  Calendar,
  User,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMyArticles } from '@/shared/hooks';
import { ArticleListItem, BoardType } from '@/shared/types';

interface FilterItem {
  name: string;
  count: number;
}

const PostsTab = () => {
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const { articles, loading, error, totalElements } = useMyArticles({ page: 1, size: 20 });
  const router = useRouter();

  // 카테고리별 게시글 개수 계산
  const categoryStats = useMemo(() => {
    const stats: { [key: string]: number } = {
      '전체': totalElements,
      '자유게시판': 0,
      '장비': 0,
      '음반': 0,
      '아티스트': 0,
    };

    articles.forEach((article) => {
      switch (article.articleType) {
        case BoardType.FREE:
          stats['자유게시판']++;
          break;
        case BoardType.GEAR:
          stats['장비']++;
          break;
        case BoardType.ALBUM:
          stats['음반']++;
          break;
        case BoardType.ARTIST:
          stats['아티스트']++;
          break;
        default:
          // 예상치 못한 타입의 경우 자유게시판으로 분류
          stats['자유게시판']++;
      }
    });

    return stats;
  }, [articles, totalElements]);

  const filters: FilterItem[] = [
    { name: '전체', count: categoryStats['전체'] },
    { name: '자유게시판', count: categoryStats['자유게시판'] },
    { name: '장비', count: categoryStats['장비'] },
    { name: '음반', count: categoryStats['음반'] },
    { name: '아티스트', count: categoryStats['아티스트'] },
  ];

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  // BoardType을 한글 카테고리명으로 변환
  const getBoardTypeLabel = (boardType: BoardType): string => {
    switch (boardType) {
      case BoardType.FREE:
        return '자유게시판';
      case BoardType.GEAR:
        return '장비';
      case BoardType.ALBUM:
        return '음반';
      case BoardType.ARTIST:
        return '아티스트';
      default:
        return '자유게시판';
    }
  };

  // 게시글을 Post 형태로 변환
  const convertArticleToPost = (article: ArticleListItem) => ({
    id: parseInt(article.articleId.replace(/\D/g, '')) || 0,
    articleId: article.articleId,
    title: article.title,
    content: '', // API에서 목록에는 content가 제공되지 않음
    category: getBoardTypeLabel(article.articleType),
    likes: article.likeCount,
    comments: article.commentCount,
    views: article.viewCount.toString(),
    date: formatDate(article.createdAt),
  });

  const displayedArticles = articles.map(convertArticleToPost);

  // 카테고리 필터링 적용
  const filteredArticles = useMemo(() => {
    if (selectedFilter === '전체') {
      return displayedArticles;
    }
    return displayedArticles.filter(post => post.category === selectedFilter);
  }, [displayedArticles, selectedFilter]);

  // 편집 버튼 처리
  const handleEditClick = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/community/write?edit=${articleId}`);
  };

  // 게시글 클릭 처리 (상세 페이지로 이동)
  const handlePostClick = (articleId: string) => {
    router.push(`/community/${articleId}`);
  };

  const categoryConfig = {
    '자유게시판': {
      icon: MessageCircle,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/20',
    },
    '장비': {
      icon: Heart,
      color: 'text-pink-600 dark:text-pink-400',
      bg: 'bg-pink-100 dark:bg-pink-900/20',
    },
    '음반': {
      icon: FileText,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/20',
    },  
    '아티스트': {
      icon: User,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/20',
    },
  };

  const getCategoryIcon = (category: string) => {
    const config = categoryConfig[category as keyof typeof categoryConfig];
    if (!config) return <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />;

    const Icon = config.icon;
    return <Icon className={`h-5 w-5 ${config.color}`} />;
  };

  const getCategoryBg = (category: string) => {
    const config = categoryConfig[category as keyof typeof categoryConfig];
    return config?.bg || 'bg-gray-100 dark:bg-gray-900/20';
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">내 게시글</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                작성한 리뷰와 게시글을 관리하세요
              </p>
            </div>
          </div>
          <Link
            href="/community/write"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            새 게시글
          </Link>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setSelectedFilter(filter.name)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedFilter === filter.name
                    ? 'bg-indigo-500 text-white'
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

        {/* Posts List */}
        {/* 로딩 상태 */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">게시글을 불러오는 중...</span>
          </div>
        )}

        {/* 에러 상태 */}
        {error && !loading && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <FileText className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              게시글을 불러올 수 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {error}
            </p>
          </div>
        )}

        {/* 게시글 목록 */}
        {!loading && !error && (
          <div className="space-y-4">
            {filteredArticles.map((post) => (
              <div
                key={post.articleId}
                onClick={() => handlePostClick(post.articleId)}
                className="group block rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-indigo-200 hover:bg-gradient-to-br hover:from-indigo-50/50 hover:to-violet-50/50 hover:shadow-lg dark:border-gray-800 dark:hover:border-indigo-700 cursor-pointer"
              >
                <div className="flex justify-between">
                  <div className="flex flex-1 items-start gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${getCategoryBg(
                        post.category,
                      )} shadow-sm`}
                    >
                      {getCategoryIcon(post.category)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-xs font-medium uppercase text-indigo-600 dark:text-indigo-400">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </div>
                      </div>

                      <h4 className="mb-2 line-clamp-2 font-bold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                        {post.title}
                      </h4>

                      <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {post.content}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-red-500">
                          <Heart className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-500">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm font-medium">{post.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleEditClick(post.articleId, e)}
                        className="flex items-center justify-center rounded-2xl border border-gray-200 px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 빈 상태 */}
        {!loading && !error && (
          <>
            {/* 전체 게시글이 없는 경우 */}
            {displayedArticles.length === 0 && (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  작성한 게시글이 없습니다
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  커뮤니티로 가서 처음 게시글을 작성해보세요!
                </p>
              </div>
            )}
            
            {/* 필터링된 결과가 없는 경우 */}
            {displayedArticles.length > 0 && filteredArticles.length === 0 && (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  해당 카테고리에 게시글이 없습니다
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  &quot;{selectedFilter}&quot; 카테고리에는 작성한 게시글이 없습니다.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostsTab;
