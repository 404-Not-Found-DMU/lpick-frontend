import { MessageSquare } from 'lucide-react';

interface CommentHeaderProps {
  commentCount: number;
}

export const CommentHeader = ({ commentCount }: CommentHeaderProps) => {
  return (
    <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-700 sm:px-6 sm:py-5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white sm:gap-3 sm:text-xl">
          <MessageSquare className="h-5 w-5 text-violet-600 dark:text-violet-400 sm:h-6 sm:w-6" />
          댓글
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-sm text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 sm:px-3 sm:py-1 sm:text-lg">
            {commentCount}
          </span>
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">최신순</div>
      </div>
    </div>
  );
};
