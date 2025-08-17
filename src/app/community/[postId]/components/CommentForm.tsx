import { Send } from 'lucide-react';

interface CommentFormProps {
  newComment: string;
  onCommentChange: (value: string) => void;
  onCommentSubmit: (e: React.FormEvent) => void;
}

// @멘션 미리보기를 렌더링하는 함수
const renderMentionPreview = (content: string) => {
  const mentionRegex = /@([^\s@]+)/g;
  const parts = content.split(mentionRegex);

  return parts.map((part, index) => {
    // 홀수 인덱스는 멘션된 사용자명
    if (index % 2 === 1) {
      return (
        <span key={index} className="font-semibold text-violet-600 dark:text-violet-400">
          @{part}
        </span>
      );
    }
    return part;
  });
};

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
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="댓글을 입력하세요..."
              value={newComment}
              onChange={(e) => onCommentChange(e.target.value)}
              maxLength={500}
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-3 py-2 pr-16 text-sm placeholder-gray-500 transition-all focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-400 dark:focus:bg-gray-600 sm:px-4 sm:py-3 sm:pr-20"
            />

            {/* 글자 수 카운터 */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 sm:right-16">
              <span
                className={`text-xs ${newComment.length > 450 ? 'text-red-500' : 'text-gray-400'}`}
              >
                {newComment.length}/500
              </span>
            </div>
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

        {/* 추가 옵션 및 미리보기 */}
        {newComment.length > 0 && (
          <div className="mt-3 space-y-2 pl-14">
            {/* @멘션 미리보기 */}
            {newComment.includes('@') && (
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                <div className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  미리보기:
                </div>
                <div className="text-sm text-gray-800 dark:text-gray-200">
                  {renderMentionPreview(newComment)}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <button
                  type="button"
                  className="flex items-center gap-1 transition-colors hover:text-violet-600"
                >
                  <span>@</span>
                  <span>멘션</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 transition-colors hover:text-violet-600"
                >
                  <span>#</span>
                  <span>태그</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => onCommentChange('')}
                className="text-xs text-gray-400 transition-colors hover:text-red-500"
              >
                취소
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
