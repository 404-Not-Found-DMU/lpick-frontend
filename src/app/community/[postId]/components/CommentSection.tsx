'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Comment } from '../../types/community.types';
import { CommentHeader, type CommentSortOption } from './CommentHeader';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

interface CommentSectionProps {
  comments: Comment[];
  hasMoreComments?: boolean;
  remainingComments?: number;
  newComment: string;
  onCommentChange: (value: string) => void;
  onCommentSubmit: (e: React.FormEvent) => void;
  onCommentLike?: (commentId: number) => void;
  onLoadMore?: () => void;
}

export const CommentSection = ({
  comments,
  hasMoreComments = false,
  remainingComments = 0,
  newComment,
  onCommentChange,
  onCommentSubmit,
  onCommentLike,
  onLoadMore,
}: CommentSectionProps) => {
  const [sortBy, setSortBy] = useState<CommentSortOption>('latest');

  const handleCommentLike = (commentId: number) => {
    onCommentLike?.(commentId);
  };

  const handleReply = (commentId: number) => {
    console.log('답글 달기:', commentId);
    // TODO: 답글 로직 구현
  };

  const handleSortChange = (sort: CommentSortOption) => {
    setSortBy(sort);
  };

  // 댓글 정렬
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.likes - a.likes; // 좋아요 많은 순
    } else {
      // 최신순 - 날짜로 정렬 (임시로 id로 정렬)
      return b.id - a.id;
    }
  });

  return (
    <div className="rounded-3xl bg-white shadow-xl dark:bg-gray-800">
      <CommentHeader
        commentCount={comments.length}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      <CommentForm
        newComment={newComment}
        onCommentChange={onCommentChange}
        onCommentSubmit={onCommentSubmit}
      />

      <CommentList
        comments={sortedComments}
        onCommentLike={handleCommentLike}
        onReply={handleReply}
      />

      {/* 댓글 더보기 - 페이지네이션 */}
      {hasMoreComments && (
        <div className="border-t border-gray-100 p-4 dark:border-gray-700 sm:p-6">
          <button
            onClick={onLoadMore}
            className="w-full rounded-lg py-3 font-semibold text-violet-600 transition-colors hover:bg-violet-50 hover:text-violet-700 dark:text-violet-400 dark:hover:bg-violet-900/20"
          >
            댓글 더보기 ({remainingComments}개 남음)
          </button>
        </div>
      )}
    </div>
  );
};
