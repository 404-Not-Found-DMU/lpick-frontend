'use client';
import { Heart } from 'lucide-react';
import { Post } from '../../types/community.types';
import { FeaturedCard } from '../FeaturedCard';

interface FeaturedSectionProps {
  posts: Post[];
  loading?: boolean;
}

export const FeaturedSection = ({ posts, loading = false }: FeaturedSectionProps) => {
  if (loading) {
    return (
      <div className="mb-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-r from-violet-100 to-purple-100 p-3 dark:from-violet-900/30 dark:to-purple-900/30">
            <Heart className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
              인기 게시물
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              커뮤니티에서 가장 인기 있는 게시물들을 만나보세요
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/3] rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-r from-violet-100 to-purple-100 p-3 dark:from-violet-900/30 dark:to-purple-900/30">
          <Heart className="h-6 w-6 text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
            인기 게시물
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            커뮤니티에서 가장 인기 있는 게시물들을 만나보세요
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            아직 인기 게시물이 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {posts.map((post) => (
            <FeaturedCard 
              key={post.articleId || `featured-${post.id}-${post.title.slice(0, 10)}`} 
              post={post} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
