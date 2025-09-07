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
}

export const PostList = ({ posts, sortBy, onSortChange }: PostListProps) => {
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
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};
