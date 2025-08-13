'use client';
import Image from 'next/image';
import { Card } from '@/components/Card/Card';
import { Post } from '../../types/community.types';
import { Star, Eye, Heart, MessageSquare, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FeaturedSectionProps {
  posts: Post[];
}

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    추천: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    질문: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    토론: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
    정보: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
    자유: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  };
  return colors[category] || colors['자유'];
};

export const FeaturedSection = ({ posts }: FeaturedSectionProps) => {
  const router = useRouter();

  const handlePostClick = (postId: number) => {
    router.push(`/community/${postId}`);
  };

  return (
    <div className="mb-8 sm:mb-12">
      <div className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3">
        <Star className="h-5 w-5 text-yellow-500 sm:h-6 sm:w-6" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">추천 게시물</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="group cursor-pointer overflow-hidden rounded-lg border-0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 sm:rounded-xl sm:hover:-translate-y-2 sm:hover:shadow-2xl"
          >
            {post.image && (
              <div className="relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={192}
                  className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-110 sm:h-48"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-semibold backdrop-blur-sm sm:rounded-lg sm:px-3 sm:py-1.5 ${getCategoryColor(post.category)}`}
                  >
                    {post.category}
                  </span>
                </div>
              </div>
            )}
            <div className="p-3 sm:p-5">
              <h3 className="mb-2 overflow-hidden text-base font-bold text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400 sm:mb-3 sm:text-lg">
                <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                  {post.title}
                </span>
              </h3>
              {post.description && (
                <p
                  className="mb-3 overflow-hidden text-xs leading-relaxed text-gray-600 dark:text-gray-400 sm:mb-4 sm:text-sm"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.description}
                </p>
              )}

              <div className="flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-700 sm:pt-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  <span className="max-w-20 truncate font-semibold sm:max-w-none">
                    {post.author}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="hidden text-xs sm:inline">{post.date}</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 sm:mt-3">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{post.views > 999 ? `${Math.floor(post.views / 1000)}k` : post.views}</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
