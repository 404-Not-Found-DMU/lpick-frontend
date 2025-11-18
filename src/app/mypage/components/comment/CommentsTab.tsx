'use client';

import React, { useState } from 'react';
import { MessageCircle, Heart, Reply, Calendar, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useMyComments } from '@/shared/hooks';
import { MyCommentFilter } from '@/shared/types';

const CommentsTab = () => {
  const [selectedFilter, setSelectedFilter] = useState<MyCommentFilter>('ALL');
  // 전체 데이터를 가져와서 클라이언트에서 필터링
  const { comments: allComments, loading, error } = useMyComments({ 
    page: 1, 
    size: 100, // 카운트를 위해 충분한 수를 가져옴
    filter: 'ALL'
  });

  // 클라이언트 사이드 필터링
  const comments = allComments.filter(comment => {
    switch (selectedFilter) {
      case 'ONLY_COMMENT':
        return !comment.isReplyComment;
      case 'ONLY_REPLY':
        return comment.isReplyComment;
      case 'LIKE_DESC':
        return comment.commentLikeCount > 0;
      default:
        return true;
    }
  });

  // 정렬 (좋아요 필터일 때만 좋아요 내림차순)
  const sortedComments = selectedFilter === 'LIKE_DESC' 
    ? [...comments].sort((a, b) => b.commentLikeCount - a.commentLikeCount)
    : comments;

  // 필터 옵션 정의 (전체 데이터로 정확한 개수 계산)
  const filterOptions = [
    { value: 'ALL' as MyCommentFilter, label: '전체', count: allComments.length },
    { value: 'ONLY_COMMENT' as MyCommentFilter, label: '댓글만', count: allComments.filter(c => !c.isReplyComment).length },
    { value: 'ONLY_REPLY' as MyCommentFilter, label: '답글만', count: allComments.filter(c => c.isReplyComment).length },
    { value: 'LIKE_DESC' as MyCommentFilter, label: '좋아요', count: allComments.filter(c => c.commentLikeCount > 0).length },
  ];

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">내 댓글</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                작성한 댓글들을 확인하세요
              </p>
            </div>
          </div>
        </div>

        {/* 필터 선택 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedFilter === option.value
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {option.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    selectedFilter === option.value
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
                  }`}
                >
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 로딩 상태 */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">댓글을 불러오는 중...</span>
          </div>
        )}

        {/* 에러 상태 */}
        {error && !loading && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <MessageCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              댓글을 불러올 수 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {error}
            </p>
            <p className="text-xs text-gray-500">
              필터: {selectedFilter} | 서버 연결을 확인해주세요
            </p>
          </div>
        )}

        {/* 댓글 목록 */}
        {!loading && !error && (
          <div className="space-y-4">
            {sortedComments.map((comment, index) => (
              <Link
                key={`${comment.articleId}-${index}`}
                href={`/community/${comment.articleId}`}
                className="group block rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-green-200 hover:bg-gradient-to-br hover:from-green-50/50 hover:to-teal-50/50 hover:shadow-lg dark:border-gray-800 dark:hover:border-green-700 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      comment.isReplyComment
                        ? 'bg-teal-100 dark:bg-teal-900/20'
                        : 'bg-green-100 dark:bg-green-900/20'
                    } shadow-sm`}
                  >
                    {comment.isReplyComment ? (
                      <Reply className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    ) : (
                      <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`text-xs font-medium uppercase ${
                          comment.isReplyComment
                            ? 'text-teal-600 dark:text-teal-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}
                      >
                        {comment.isReplyComment ? '답글' : '댓글'}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {formatDate(comment.createdAt)}
                      </div>
                    </div>

                    {/* 답글인 경우 원본 댓글 작성자 표시 */}
                    {comment.isReplyComment && comment.parentCommentWriterName && (
                      <div className="mb-2 text-xs text-gray-500">
                        <span className="font-medium">{comment.parentCommentWriterName}</span>
                        <span className="ml-1">님의 댓글에 답글</span>
                      </div>
                    )}

                    {/* 댓글 내용 */}
                    <h4 className="mb-3 line-clamp-3 font-semibold text-gray-900 transition-colors group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
                      {comment.commentValue}
                    </h4>

                    {/* 게시글 제목 */}
                    <div className="mb-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                      <div className="font-medium text-gray-800 dark:text-gray-200 line-clamp-2">
                        {comment.articleTitle}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-red-500">
                        <Heart className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{comment.commentLikeCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 빈 상태 */}
        {!loading && !error && sortedComments.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <MessageCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              작성한 댓글이 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              커뮤니티 글에 댓글을 작성해보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsTab;