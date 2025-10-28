'use client';
import Image from 'next/image';
import { Eye, Heart, MessageSquare, Clock, Bookmark } from 'lucide-react';
import { Card } from '@/components/Card/Card';
import { Post } from '../../types/community.types';
import { getCategoryColor, formatViews } from '../../utils';
import { usePostNavigation } from '../../hooks/usePostNavigation';

interface FeaturedCardProps {
  post: Post;
}

export const FeaturedCard = ({ post }: FeaturedCardProps) => {
  const { navigateToPost } = usePostNavigation();

  const handleClick = () => {
    // articleId가 있으면 사용하고, 없으면 id를 문자열로 변환해서 사용
    const articleId = post.articleId || post.id.toString();
    navigateToPost(articleId);
  };

  return (
    <Card
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-200/20 dark:bg-gray-800 dark:hover:shadow-violet-900/20"
    >
      {post.image && (
        <div className="relative overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            width={300}
            height={160}
            className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-28 lg:h-32"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
          <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
            {(post.tag || post.board) && (
              <span
                className={`rounded-lg px-2 py-1 text-xs font-medium backdrop-blur-md sm:px-3 sm:text-sm ${getCategoryColor(post.tag || post.board || '')}`}
              >
                {post.tag || post.board}
              </span>
            )}
          </div>
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
            {post.views !== undefined && (
              <div className="flex items-center gap-1 rounded-full bg-black/20 px-2 py-0.5 text-white backdrop-blur-sm">
                <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span className="text-xs font-medium">{formatViews(post.views)}</span>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="p-3 sm:p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-tight text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400 sm:text-base">
          {post.title}
        </h3>
        {post.description && (
          <p className="mb-3 line-clamp-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400 sm:text-sm">
            {post.description}
          </p>
        )}
        <div className="flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          <div className="flex items-center gap-1 overflow-hidden">
            <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-xs font-bold text-white">
              {post.author.charAt(0)}
            </div>
            <span className="max-w-[60px] truncate font-medium sm:max-w-[80px]">{post.author}</span>
            <Clock className="ml-1 h-3 w-3 flex-shrink-0" />
            <span className="flex-shrink-0 text-xs">{post.date}</span>
          </div>
          <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-0.5">
              <Heart className={`h-3 w-3 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="text-xs">{post.likeCount || post.likes || 0}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <MessageSquare className="h-3 w-3" />
              <span className="text-xs">{post.commentCount || post.comments || 0}</span>
            </div>
            {post.bookmarkCount !== undefined && (
              <div className="flex items-center gap-0.5">
                <Bookmark
                  className={`h-3 w-3 ${post.bookmarked ? 'fill-yellow-500 text-yellow-500' : ''}`}
                />
                <span className="text-xs">{post.bookmarkCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
