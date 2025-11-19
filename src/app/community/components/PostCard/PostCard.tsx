'use client';
import Image from 'next/image';
import { Eye, Heart, MessageSquare, Clock, Bookmark } from 'lucide-react';
import { Post } from '../../community.types';
import { getBoardColor, formatViews } from '../../utils';
import { usePostNavigation } from '../../hooks/usePostNavigation';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { navigateToPost } = usePostNavigation();

  const handleClick = () => {
    // articleId가 있으면 사용하고, 없으면 id를 문자열로 변환해서 사용
    const articleId = post.articleId || post.id.toString();
    navigateToPost(articleId);
  };

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-lg bg-white p-3 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-750 sm:p-4"
      onClick={handleClick}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {post.image && (
          <div className="flex-shrink-0">
            <Image
              src={post.image}
              alt={post.title}
              width={80}
              height={64}
              className="h-12 w-16 rounded-lg object-cover transition-transform duration-200 group-hover:scale-105 sm:h-16 sm:w-20"
              unoptimized
            />
          </div>
        )}

        {/* 메인 콘텐츠 영역 */}
        <div className="min-w-0 flex-1">
          {/* 상단: 제목과 태그들 */}
          <div className="mb-2 flex items-start justify-between gap-2 sm:gap-3">
            <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400 sm:text-base">
              {post.title}
            </h3>
            <div className="flex flex-shrink-0 items-center gap-1">
              {post.board && (
                <span
                  className={`rounded px-1.5 py-0.5 text-xs font-medium text-white sm:px-2 ${getBoardColor(post.board)}`}
                >
                  {post.board}
                </span>
              )}
            </div>
          </div>

          {/* 설명 (있는 경우만, 간략하게) */}
          {post.description && (
            <p className="mb-2 line-clamp-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              {post.description}
            </p>
          )}

          {/* 하단: 메타 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 sm:gap-2 sm:text-sm">
              {/* 작성자 */}
              <div className="flex items-center gap-1">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-xs font-bold text-white sm:h-5 sm:w-5">
                  {post.author.charAt(0)}
                </div>
                <span className="text-xs font-medium sm:text-sm">{post.author}</span>
              </div>

              {/* 시간 */}
              <div className="flex items-center gap-0.5">
                <Clock className="h-3 w-3" />
                <span className="text-xs">{post.date}</span>
              </div>
            </div>

            {/* 우측: 통계 정보 */}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 sm:gap-3">
              <div className="flex items-center gap-0.5">
                <Heart className={`h-3 w-3 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{post.likeCount || post.likes || 0}</span>
              </div>
              <div className="flex items-center gap-0.5">
                <MessageSquare className="h-3 w-3" />
                <span>{post.commentCount || post.comments || 0}</span>
              </div>
              {(post.viewCount !== undefined || post.views !== undefined) && (
                <div className="hidden items-center gap-0.5 sm:flex">
                  <Eye className="h-3 w-3" />
                  <span>{formatViews(post.viewCount ?? post.views ?? 0)}</span>
                </div>
              )}
              {post.bookmarkCount !== undefined && (
                <div className="hidden items-center gap-0.5 sm:flex">
                  <Bookmark
                    className={`h-3 w-3 ${post.bookmarked ? 'fill-yellow-500 text-yellow-500' : ''}`}
                  />
                  <span>{post.bookmarkCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
