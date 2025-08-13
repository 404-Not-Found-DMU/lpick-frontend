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
    <div className="mb-12">
      <div className="mb-6 flex items-center gap-3">
        <Star className="h-6 w-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">추천 게시물</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="group cursor-pointer overflow-hidden rounded-xl border-0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800"
          >
            {post.image && (
              <div className="relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={192}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute left-4 top-4">
                  <span
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold backdrop-blur-sm ${getCategoryColor(post.category)}`}
                  >
                    {post.category}
                  </span>
                </div>
              </div>
            )}
            <div className="p-5">
              <h3 className="mb-3 overflow-hidden text-lg font-bold text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
                <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                  {post.title}
                </span>
              </h3>
              {post.description && (
                <p
                  className="mb-4 overflow-hidden text-sm leading-relaxed text-gray-600 dark:text-gray-400"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.description}
                </p>
              )}

              <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">{post.author}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{post.date}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{post.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-4">
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
