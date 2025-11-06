'use client';
import { TrendingUp } from 'lucide-react';
import { Post, SortOption } from '../../types/community.types';
import { CommunitySortDropdown } from '../SortDropdown';
import { PostCard } from '../PostCard';
import { EmptyState } from '../EmptyState';

interface PostListProps {
  posts: Post[];
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  loading?: boolean;
}

export const PostList = ({ posts, sortBy, onSortChange, loading = false }: PostListProps) => {
  if (loading) {
    return (
      <div>
        {/* 헤더 */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-r from-violet-100 to-purple-100 p-3 dark:from-violet-900/30 dark:to-purple-900/30">
              <TrendingUp className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                최근 게시물
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                커뮤니티의 새로운 소식을 확인하세요
              </p>
            </div>
          </div>

          <div className="relative">
            <CommunitySortDropdown sortBy={sortBy} onSortChange={onSortChange} />
          </div>
        </div>

        {/* 로딩 스켈레톤 */}
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6"
            >
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="flex items-center gap-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-r from-violet-100 to-purple-100 p-3 dark:from-violet-900/30 dark:to-purple-900/30">
            <TrendingUp className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
              최근 게시물
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              커뮤니티의 새로운 소식을 확인하세요
            </p>
          </div>
        </div>

        <div className="relative">
          <CommunitySortDropdown sortBy={sortBy} onSortChange={onSortChange} />
        </div>
      </div>

      {/* 게시물 목록 */}
      {posts.length > 0 ? (
        <div className="space-y-2">
          {posts.map((post) => (
            <PostCard 
              key={post.articleId || `post-${post.id}-${post.title.slice(0, 10)}`} 
              post={post}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};
