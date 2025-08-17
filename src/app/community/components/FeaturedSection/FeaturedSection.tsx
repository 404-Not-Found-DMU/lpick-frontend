'use client';
import Image from 'next/image';
import { Card } from '@/components/Card/Card';
import { Post } from '../../types/community.types';
import { Eye, Heart, MessageSquare, Clock } from 'lucide-react';
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
    <div className="mb-10">
      <div className="mb-8 text-center">
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          커뮤니티에서 가장 인기 있는 게시물들을 만나보세요
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="group cursor-pointer overflow-hidden rounded-3xl border-0 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-200/20 dark:bg-gray-800 dark:hover:shadow-violet-900/20"
          >
            {post.image && (
              <div className="relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={240}
                  className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4">
                  <span
                    className={`rounded-2xl px-4 py-2 text-sm font-bold backdrop-blur-md ${getCategoryColor(post.category)}`}
                  >
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 text-white backdrop-blur-sm">
                    <Eye className="h-3 w-3" />
                    <span className="text-xs font-medium">
                      {post.views > 999 ? `${Math.floor(post.views / 1000)}k` : post.views}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="p-6">
              <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
                {post.title}
              </h3>
              {post.description && (
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>
              )}

              <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-sm font-bold text-white">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {post.author}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-gray-500 transition-colors hover:text-red-500 dark:text-gray-400">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 transition-colors hover:text-blue-500 dark:text-gray-400">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-500">
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
