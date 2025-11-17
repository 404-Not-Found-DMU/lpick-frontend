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
  Filter,
  User,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useMyArticles } from '../../hooks/useMyArticles';
import { ArticleListItem } from '../../../community/types/api.types';

interface FilterItem {
  name: string;
  count: number;
}

const PostsTab = () => {
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const { articles, loading, error, totalElements } = useMyArticles({ page: 1, size: 20 });

  // 카테고리별 게시글 개수 계산
  const categoryStats = useMemo(() => {
    const stats: { [key: string]: number } = {
      '전체': totalElements,
      '앨범 리뷰': 0,
      '장비 리뷰': 0,
      '기타': 0,
    };

    articles.forEach(article => {
      // 여기서는 카테고리 정보가 없으므로 임시로 '기타'로 분류
      // 실제로는 게시판 타입이나 카테고리 정보가 있어야 함
      stats['기타']++;
    });

    return stats;
  }, [articles, totalElements]);

  const filters: FilterItem[] = [
    { name: '전체', count: categoryStats['전체'] },
    { name: '앨범 리뷰', count: categoryStats['앨범 리뷰'] },
    { name: '장비 리뷰', count: categoryStats['장비 리뷰'] },
    { name: '기타', count: categoryStats['기타'] },
  ];

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  // 게시글을 Post 형태로 변환
  const convertArticleToPost = (article: ArticleListItem) => ({
    id: parseInt(article.articleId.replace(/\D/g, '')) || 0,
    articleId: article.articleId,
    title: article.title,
    content: article.content || '',
    category: '기타', // 실제로는 게시판 정보에서 가져와야 함
    likes: article.likeCount,
    comments: article.commentCount,
    views: article.viewCount?.toString() || '0',
    date: formatDate(article.createdAt),
  });

  const displayedArticles = articles.map(convertArticleToPost);

  const categoryConfig = {
    '앨범 리뷰': {
      icon: FileText,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/20',
    },
    '음악 가이드': {
      icon: User,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/20',
    },
    '개인 일기': {
      icon: Heart,
      color: 'text-pink-600 dark:text-pink-400',
      bg: 'bg-pink-100 dark:bg-pink-900/20',
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

  const FilterButton = ({
    filter,
    isSelected,
    onClick,
  }: {
    filter: FilterItem;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
        isSelected
          ? 'scale-105 bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md'
          : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {filter.name}
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
          isSelected
            ? 'bg-white/20 text-white'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
        }`}
      >
        {filter.count}
      </span>
    </button>
  );

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
          <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <Plus className="h-5 w-5" />새 게시글
          </button>
        </div>

        {/* Filter */}
        <div className="mb-6 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="mb-3 flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              카테고리 필터
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <FilterButton
                key={filter.name}
                filter={filter}
                isSelected={selectedFilter === filter.name}
                onClick={() => setSelectedFilter(filter.name)}
              />
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
            {displayedArticles.map((post) => (
              <Link
                key={post.articleId}
                href={`/community/${post.articleId}`}
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

                  <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/community/write?edit=${post.articleId}`}
                        className="flex items-center justify-center rounded-2xl border border-gray-200 px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 빈 상태 */}
        {!loading && !error && displayedArticles.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              작성한 게시글이 없습니다
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              첫 번째 게시글을 작성해보세요!
            </p>
            <Link
              href="/community/write"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 font-semibold text-white transition-all hover:from-indigo-600 hover:to-violet-700"
            >
              <Plus className="h-4 w-4" />
              새 게시글 작성
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsTab;
