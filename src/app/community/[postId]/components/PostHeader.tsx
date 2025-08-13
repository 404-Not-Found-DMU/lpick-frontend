'use client';

import { Button } from '@/components/Button/Button';
import { Share2, Flag } from 'lucide-react';

interface PostHeaderProps {
  onShare?: () => void;
  onReport?: () => void;
}

export const PostHeader = ({ onShare, onReport }: PostHeaderProps) => {
  return (
    <div className="mb-4 flex justify-end sm:mb-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          onClick={onShare}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-blue-400 bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-2.5 text-xs text-white shadow-md transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg dark:border-blue-500 sm:flex-none sm:gap-2 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
        >
          <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="font-semibold">공유</span>
        </Button>
        <Button
          onClick={onReport}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-red-400 bg-gradient-to-r from-red-500 to-red-600 px-3 py-2.5 text-xs text-white shadow-md transition-all hover:from-red-600 hover:to-red-700 hover:shadow-lg dark:border-red-500 sm:flex-none sm:gap-2 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm"
        >
          <Flag className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="font-semibold">신고</span>
        </Button>
      </div>
    </div>
  );
};
