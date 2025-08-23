'use client';
import { Eye, Heart, MessageSquare, Clock, TrendingUp, Bookmark } from 'lucide-react';
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

      {/* 효율적인 리스트 형태 게시물 목록 */}
      <div className="space-y-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="dark:hover:bg-gray-750 group cursor-pointer overflow-hidden rounded-lg bg-white p-3 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md dark:bg-gray-800 sm:p-4"
            onClick={() => handlePostClick(post.id)}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              {/* 왼쪽: 썸네일 이미지 (있는 경우만) */}
              {post.image && (
                <div className="flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-12 w-16 rounded-lg object-cover transition-transform duration-200 group-hover:scale-105 sm:h-16 sm:w-20"
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
                    {post.tag && (
                      <span
                        className={`rounded px-1.5 py-0.5 text-xs font-medium text-white sm:px-2 ${getTagColor(post.tag)}`}
                      >
                        {post.tag}
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
                      <Heart
                        className={`h-3 w-3 ${post.liked ? 'fill-red-500 text-red-500' : ''}`}
                      />
                      <span>{post.likeCount || post.likes || 0}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <MessageSquare className="h-3 w-3" />
                      <span>{post.commentCount || post.comments || 0}</span>
                    </div>
                    {post.views !== undefined && (
                      <div className="hidden items-center gap-0.5 sm:flex">
                        <Eye className="h-3 w-3" />
                        <span>
                          {post.views > 999 ? `${Math.floor(post.views / 1000)}k` : post.views}
                        </span>
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
