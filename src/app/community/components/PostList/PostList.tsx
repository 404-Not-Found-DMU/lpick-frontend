'use client';
import { Card } from '@/components/Card/Card';
import { Eye, Heart, MessageSquare, Clock, ChevronDown, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Post, SortOption } from '../../types/community.types';

interface PostListProps {
  posts: Post[];
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
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

export const PostList = ({ posts, sortBy, onSortChange }: PostListProps) => {
  const router = useRouter();

  const sortOptions = [
    { value: 'latest' as SortOption, label: '최신순', icon: Clock },
    { value: 'popular' as SortOption, label: '인기순', icon: Heart },
    { value: 'views' as SortOption, label: '조회순', icon: Eye },
  ];

  const handlePostClick = (postId: number) => {
    router.push(`/community/${postId}`);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-6 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <TrendingUp className="h-5 w-5 text-violet-600 sm:h-6 sm:w-6" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            최근 게시물
          </h2>
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full appearance-none rounded-lg border-0 bg-white px-3 py-2 pr-8 text-xs font-medium text-gray-700 shadow-sm transition-all hover:shadow-md focus:ring-2 focus:ring-violet-500 dark:bg-gray-800 dark:text-gray-200 sm:w-auto sm:rounded-xl sm:px-4 sm:py-3 sm:pr-10 sm:text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 transform text-gray-400 sm:right-3 sm:h-4 sm:w-4" />
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="group cursor-pointer overflow-hidden rounded-lg border-0 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-gray-800 sm:rounded-xl sm:p-6 sm:hover:-translate-y-1 sm:hover:shadow-xl"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start sm:gap-0">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-col gap-2 sm:mb-3 sm:flex-row sm:items-center sm:gap-3">
                  <span
                    className={`self-start rounded-md px-2 py-1 text-xs font-semibold sm:rounded-lg sm:px-3 ${getCategoryColor(post.category)}`}
                  >
                    {post.category}
                  </span>
                  <h3 className="line-clamp-2 text-base font-bold text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400 sm:line-clamp-1 sm:text-lg">
                    {post.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 sm:gap-4 sm:text-sm">
                  <span className="max-w-24 truncate font-semibold sm:max-w-none">
                    {post.author}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="hidden sm:inline">{post.date}</span>
                    <span className="sm:hidden">{post.date.slice(5)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 sm:ml-6 sm:gap-6 sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{post.views > 999 ? `${Math.floor(post.views / 1000)}k` : post.views}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="py-12 text-center sm:py-16">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 sm:mb-4 sm:h-20 sm:w-20">
            <MessageSquare className="h-8 w-8 text-gray-400 sm:h-10 sm:w-10" />
          </div>
          <p className="mb-2 text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
            게시물이 없습니다
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            첫 번째 게시물을 작성해보세요!
          </p>
        </div>
      )}
    </div>
  );
};
