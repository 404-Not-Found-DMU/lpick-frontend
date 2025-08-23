'use client';
import Image from 'next/image';
import { Card } from '@/components/Card/Card';
import { Post, BoardType, TagType } from '../../types/community.types';
import { Eye, Heart, MessageSquare, Clock, Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FeaturedSectionProps {
  posts: Post[];
}

const getCategoryColor = (category: BoardType | TagType | string) => {
  const colors: Record<string, string> = {
    // TagType colors
    질문: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    정보: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
    홍보: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
    // BoardType colors
    자유게시판: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    장비: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    음반: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200',
    아티스트: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200',
    // Legacy support
    추천: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    토론: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
    자유: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  };
  return colors[category] || colors['자유게시판'];
};

export const FeaturedSection = ({ posts }: FeaturedSectionProps) => {
  const router = useRouter();

  const handlePostClick = (postId: number) => {
    router.push(`/community/${postId}`);
  };

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
        {posts.map((post) => (
          <Card
            key={post.id}
            onClick={() => handlePostClick(post.id)}
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
                      <span className="text-xs font-medium">
                        {post.views > 999 ? `${Math.floor(post.views / 1000)}k` : post.views}
                      </span>
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

              <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-xs font-bold text-white sm:h-7 sm:w-7">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900 dark:text-white sm:text-sm">
                      {post.author}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-2.5 w-2.5" />
                      <span className="text-xs">{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-gray-500 transition-colors hover:text-red-500 dark:text-gray-400">
                    <Heart className={`h-3 w-3 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="text-xs font-medium">{post.likeCount || post.likes || 0}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 transition-colors hover:text-blue-500 dark:text-gray-400">
                    <MessageSquare className="h-3 w-3" />
                    <span className="text-xs font-medium">
                      {post.commentCount || post.comments || 0}
                    </span>
                  </div>
                  {post.bookmarkCount !== undefined && (
                    <div className="flex items-center gap-1 text-gray-500 transition-colors hover:text-yellow-500 dark:text-gray-400">
                      <Bookmark
                        className={`h-3 w-3 ${post.bookmarked ? 'fill-yellow-500 text-yellow-500' : ''}`}
                      />
                      <span className="text-xs font-medium">{post.bookmarkCount}</span>
                    </div>
                  )}
                </div>
                <div className="hidden text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-500 sm:block">
                  자세히 보기 →
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
