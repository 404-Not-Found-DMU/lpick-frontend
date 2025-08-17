'use client';
import { Eye, Heart, MessageSquare, Clock, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Post, SortOption } from '../../types/community.types';
import { CommunitySortDropdown } from '../SortDropdown';

interface PostListProps {
  posts: Post[];
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const PostList = ({ posts, sortBy, onSortChange }: PostListProps) => {
  const router = useRouter();

  const handlePostClick = (postId: number) => {
    router.push(`/community/${postId}`);
  };

  const getBoardColor = (board: string) => {
    const colors: { [key: string]: string } = {
      자유게시판: 'bg-gradient-to-r from-blue-500 to-blue-600',
      장비: 'bg-gradient-to-r from-green-500 to-green-600',
      음반: 'bg-gradient-to-r from-purple-500 to-purple-600',
      아티스트: 'bg-gradient-to-r from-orange-500 to-orange-600',
    };
    return colors[board] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  const getTagColor = (tag?: string) => {
    const colors: { [key: string]: string } = {
      질문: 'bg-blue-500',
      정보: 'bg-green-500',
      홍보: 'bg-orange-500',
    };
    return tag ? colors[tag] || 'bg-gray-500' : '';
  };

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

      {/* 심플한 게시물 목록 */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
            onClick={() => handlePostClick(post.id)}
          >
            {/* 게시물 헤더 */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* 프로필 아바타 */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-sm font-bold text-white">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {post.author}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium text-white ${getBoardColor(post.board)}`}
                    >
                      {post.board}
                    </span>
                    {post.tag && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium text-white ${getTagColor(post.tag)}`}
                      >
                        [{post.tag}]
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 게시물 제목 */}
            <h2 className="mb-3 text-lg font-bold leading-tight text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400 sm:text-xl">
              {post.title}
            </h2>

            {/* 게시물 설명 */}
            {post.description && (
              <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
                {post.description}
              </p>
            )}

            {/* 액션 버튼들 */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">{post.comments}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">
                    {post.views > 999 ? `${Math.floor(post.views / 1000)}k` : post.views}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 빈 상태 */}
      {posts.length === 0 && (
        <div className="py-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
            <MessageSquare className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            아직 게시물이 없습니다
          </h3>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            커뮤니티의 첫 번째 게시물을 작성해보세요!
          </p>
          <button
            onClick={() => router.push('/community/write')}
            className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-violet-700"
          >
            게시물 작성하기
          </button>
        </div>
      )}
    </div>
  );
};
