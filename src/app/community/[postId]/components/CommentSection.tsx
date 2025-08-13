'use client';

import { Card } from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { MessageSquare, Send, Heart } from 'lucide-react';
import { Comment } from '../../types/community.types';

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
  return (
    <Card className="rounded-xl border-0 bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800 sm:rounded-2xl">
      {/* 댓글 헤더 */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-700 sm:p-6">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white sm:gap-3 sm:text-xl">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 sm:h-8 sm:w-8">
            <MessageSquare className="h-3 w-3 text-white sm:h-4 sm:w-4" />
          </div>
          댓글 {comments.length}
        </h3>
      </div>

      {/* 댓글 작성 */}
      <div className="border-b border-gray-100 bg-violet-50/50 p-4 dark:border-gray-700 dark:bg-violet-900/10 sm:p-6">
        <form onSubmit={onCommentSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <div className="flex-1">
            <Input
              placeholder="댓글을 작성하세요..."
              value={newComment}
              onChange={(e) => onCommentChange(e.target.value)}
              className="w-full rounded-lg border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-600 dark:bg-gray-800 sm:rounded-xl sm:px-4 sm:py-3"
            />
          </div>
          <Button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-violet-600 hover:to-purple-700 hover:shadow-lg sm:w-auto sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
          >
            <Send className="h-3 w-3 sm:h-4 sm:w-4" />
            댓글 작성
          </Button>
        </form>
      </div>

      {/* 댓글 목록 */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/30 sm:p-6"
          >
            <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 sm:h-8 sm:w-8">
                  <span className="text-xs font-bold text-white sm:text-sm">
                    {comment.author.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white sm:text-base">
                  {comment.author}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  <span className="hidden sm:inline">{comment.date}</span>
                  <span className="sm:hidden">{comment.date.slice(5)}</span>
                </span>
              </div>
              <Button
                onClick={() => onCommentLike?.(comment.id)}
                className="flex items-center justify-center gap-1 self-start rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 transition-all hover:bg-red-50 hover:text-red-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400 sm:self-center sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-sm"
              >
                <Heart className="h-3 w-3" />
                {comment.likes}
              </Button>
            </div>
            <p className="ml-8 text-sm leading-relaxed text-gray-800 dark:text-gray-200 sm:ml-11 sm:text-base">
              {comment.content}
            </p>
          </div>
        ))}

        {/* 댓글이 없을 때 */}
        {comments.length === 0 && (
          <div className="p-8 text-center sm:p-12">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 sm:mb-4 sm:h-16 sm:w-16">
              <MessageSquare className="h-6 w-6 text-violet-500 sm:h-8 sm:w-8" />
            </div>
            <h4 className="mb-2 text-base font-bold text-gray-900 dark:text-white sm:text-lg">
              아직 댓글이 없습니다
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              첫 번째 댓글을 작성해보세요!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
