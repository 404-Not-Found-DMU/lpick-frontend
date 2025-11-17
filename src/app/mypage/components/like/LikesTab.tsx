'use client';

import React from 'react';
import { Heart, MessageCircle, User, FileText, Calendar, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useLikedArticles } from '@/shared/hooks';
import { BoardType } from '@/shared/types';

const LikesTab = () => {
  const { articles, loading, error } = useLikedArticles({ page: 1, size: 20 });

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  // BoardType을 한글 라벨로 변환
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

  // 카테고리별 아이콘 및 색상 설정
  const getCategoryIcon = (boardType: BoardType) => {
    switch (boardType) {
      case BoardType.FREE:
        return <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case BoardType.GEAR:
        return <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />;
      case BoardType.ALBUM:
        return <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case BoardType.ARTIST:
        return <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getCategoryBg = (boardType: BoardType) => {
    switch (boardType) {
      case BoardType.FREE:
        return 'bg-green-100 dark:bg-green-900/20';
      case BoardType.GEAR:
        return 'bg-pink-100 dark:bg-pink-900/20';
      case BoardType.ALBUM:
        return 'bg-purple-100 dark:bg-purple-900/20';
      case BoardType.ARTIST:
        return 'bg-blue-100 dark:bg-blue-900/20';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">좋아요</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                좋아요한 게시글을 확인하세요
              </p>
            </div>
          </div>
        </div>

        {/* 로딩 상태 */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">게시글을 불러오는 중...</span>
          </div>
        )}

        {/* 에러 상태 */}
        {error && !loading && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <Heart className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              좋아요한 게시글을 불러올 수 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {error}
            </p>
          </div>
        )}

        {/* 좋아요한 게시글 목록 */}
        {!loading && !error && (
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.articleId}
                href={`/community/${article.articleId}`}
                className="group block rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-red-200 hover:bg-gradient-to-br hover:from-red-50/50 hover:to-pink-50/50 hover:shadow-lg dark:border-gray-800 dark:hover:border-red-700 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 items-start gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${getCategoryBg(article.articleType)} shadow-sm`}
                    >
                      {getCategoryIcon(article.articleType)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-xs font-medium uppercase text-red-600 dark:text-red-400">
                          {getBoardTypeLabel(article.articleType)}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {article.author}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {formatDate(article.createdAt)}
                        </div>
                      </div>

                      <h4 className="mb-2 line-clamp-2 font-bold text-gray-900 transition-colors group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400">
                        {article.title}
                      </h4>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-red-500">
                          <Heart className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">{article.likeCount}</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-500">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">{article.commentCount}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm font-medium">{article.viewCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 빈 상태 */}
        {!loading && !error && articles.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              좋아요한 게시글이 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              마음에 드는 게시글에 좋아요를 눌러보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikesTab;
