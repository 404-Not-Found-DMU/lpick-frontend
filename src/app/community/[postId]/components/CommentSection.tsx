'use client';

import { Comment } from '../../types/community.types';
import { CommentHeader } from './CommentHeader';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

interface CommentSectionProps {
  comments: Comment[];
  newComment: string;
  onCommentChange: (value: string) => void;
  onCommentSubmit: (e: React.FormEvent) => void;
  onCommentLike?: (commentId: number) => void;
}

export const CommentSection = ({
  comments,
  newComment,
  onCommentChange,
  onCommentSubmit,
  onCommentLike,
}: CommentSectionProps) => {
  const handleCommentLike = (commentId: number) => {
    onCommentLike?.(commentId);
  };

  const handleReply = (commentId: number) => {
    console.log('답글 달기:', commentId);
    // TODO: 답글 로직 구현
  };

  return (
    <div className="rounded-3xl bg-white shadow-xl dark:bg-gray-800">
      <CommentHeader commentCount={comments.length} />

      <CommentForm
        newComment={newComment}
        onCommentChange={onCommentChange}
        onCommentSubmit={onCommentSubmit}
      />

      <CommentList comments={comments} onCommentLike={handleCommentLike} onReply={handleReply} />

      {/* 댓글 더보기 */}
      {comments.length > 5 && (
        <div className="border-t border-gray-100 p-4 dark:border-gray-700 sm:p-6">
          <button className="w-full py-3 font-semibold text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400">
            댓글 더보기 ({comments.length - 5}개)
          </button>
        </div>
      )}
    </div>
  );
};
