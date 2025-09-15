import { Send } from 'lucide-react';

interface CommentFormProps {
  newComment: string;
  onCommentChange: (value: string) => void;
  onCommentSubmit: (e: React.FormEvent) => void;
}

export const CommentForm = ({ newComment, onCommentChange, onCommentSubmit }: CommentFormProps) => {
  return (
    <div className="border-b border-gray-100 p-4 dark:border-gray-700 sm:p-6">
      <form onSubmit={onCommentSubmit}>
        <div className="flex items-center gap-3 sm:gap-4">
          {/* 사용자 아바타 */}
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm">
            U
          </div>

          {/* 댓글 입력 영역 */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="댓글을 입력하세요..."
              value={newComment}
              onChange={(e) => onCommentChange(e.target.value)}
              maxLength={500}
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm placeholder-gray-500 transition-all focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-400 dark:focus:bg-gray-600 sm:px-4 sm:py-3"
            />
          </div>

          {/* 전송 버튼 */}
          <button
            type="submit"
            disabled={!newComment.trim()}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all sm:h-10 sm:w-10 ${
              newComment.trim()
                ? 'bg-violet-600 text-white shadow-lg hover:scale-110 hover:bg-violet-700 hover:shadow-xl'
                : 'cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-600 dark:text-gray-500'
            }`}
            title={newComment.trim() ? '댓글 작성' : '댓글을 입력해주세요'}
          >
            <Send className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* 글자 수 카운터 - 우측 하단으로 이동 */}
        <div className="mt-2 flex justify-end">
          <span className={`text-xs ${newComment.length > 450 ? 'text-red-500' : 'text-gray-400'}`}>
            {newComment.length}/500
          </span>
        </div>
      </form>
    </div>
  );
};
