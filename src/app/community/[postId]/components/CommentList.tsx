import { MessageSquare } from 'lucide-react';
import { Comment } from '../../types/community.types';
import { CommentItem } from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  onCommentLike: (commentId: number) => Promise<boolean>;
  onReply: (commentId: number, replyText: string) => Promise<boolean>;
}

export const CommentList = ({ comments, onCommentLike, onReply }: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <div className="p-16 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30">
          <MessageSquare className="h-10 w-10 text-violet-400" />
        </div>
        <h4 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
          아직 댓글이 없습니다
        </h4>
        <p className="mb-6 text-gray-500 dark:text-gray-400">
          이 게시글에 대한 첫 번째 댓글을 작성해보세요!
        </p>
        <div className="flex justify-center">
          <button
            onClick={() =>
              (document.querySelector('input[placeholder*="댓글"]') as HTMLInputElement)?.focus()
            }
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-violet-700"
          >
            <MessageSquare className="h-4 w-4" />첫 댓글 작성하기
          </button>
        </div>
      </div>
    );
  }

  // 댓글을 계층 구조로 정리 (최대 depth 1)
  const topLevelComments = comments.filter((comment) => !comment.parentId);
  const repliesMap = comments.reduce(
    (acc, comment) => {
      if (comment.parentId) {
        if (!acc[comment.parentId]) {
          acc[comment.parentId] = [];
        }
        acc[comment.parentId].push(comment);
      }
      return acc;
    },
    {} as Record<number, typeof comments>,
  );

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {topLevelComments.map((comment) => (
        <div key={comment.id}>
          <CommentItem comment={comment} onLike={onCommentLike} onReply={onReply} />
          {/* 답글들 렌더링 (depth 1만) */}
          {repliesMap[comment.id] && (
            <div className="ml-12 divide-y divide-gray-50 border-l-2 border-violet-100 dark:divide-gray-600 dark:border-violet-800/30">
              {repliesMap[comment.id].map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onLike={onCommentLike}
                  onReply={onReply}
                  isReply={true}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
