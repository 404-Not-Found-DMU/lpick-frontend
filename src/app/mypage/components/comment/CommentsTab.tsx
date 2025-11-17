'use client';

import React from 'react';
import { MessageCircle, Heart, Reply, Calendar, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useMyComments } from '@/shared/hooks';
import { CommentListItem, ChildComment } from '@/shared/types';

const CommentsTab = () => {
  const { comments, loading, error } = useMyComments({ page: 1, size: 20 });

  // 날짜 포맧팅 함수
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  // 댓글이 자식 댓글인지 확인
  const isChildComment = (comment: CommentListItem | ChildComment): comment is ChildComment => {
    return 'parentCommentId' in comment;
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
                좋아요한 댓글들을 확인하세요
              </p>
            </div>
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
            <p className="text-gray-600 dark:text-gray-400">
              {error}
            </p>
          </div>
        )}

        {/* 댓글 목록 */}
        {!loading && !error && (
          <div className="space-y-4">
            {comments.map((comment) => {
              const isReply = isChildComment(comment);
              return (
                <Link
                  key={comment.commentId}
                  href={`/community/${comment.articleId}`}
                  className="group block rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-green-200 hover:bg-gradient-to-br hover:from-green-50/50 hover:to-teal-50/50 hover:shadow-lg dark:border-gray-800 dark:hover:border-green-700 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isReply
                          ? 'bg-teal-100 dark:bg-teal-900/20'
                          : 'bg-green-100 dark:bg-green-900/20'
                      } shadow-sm`}
                    >
                      {isReply ? (
                        <Reply className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      ) : (
                        <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className={`text-xs font-medium uppercase ${
                            isReply
                              ? 'text-teal-600 dark:text-teal-400'
                              : 'text-green-600 dark:text-green-400'
                          }`}
                        >
                          {isReply ? '답글' : '댓글'}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {formatDate(comment.createdAt)}
                        </div>
                      </div>

                      <p className="mb-3 leading-relaxed text-gray-900 dark:text-white line-clamp-3">
                        {comment.content}
                      </p>

                      <div className="mb-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {comment.author}
                          </span>
                          <span className="text-gray-400">의 글에서</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-red-500">
                          <Heart className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">{comment.likeCount}</span>
                        </div>
                        {!isReply && 'childsCommentList' in comment && (
                          <div className="flex items-center gap-1 text-green-600">
                            <Reply className="h-4 w-4" />
                            <span className="text-sm font-medium">{comment.childsCommentList?.length || 0}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* 빈 상태 */}
        {!loading && !error && comments.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <MessageCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              좋아요한 댓글이 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              다른 사용자의 댓글에 좋아요를 눌러보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsTab;
