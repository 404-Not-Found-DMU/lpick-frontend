'use client';

import { Card } from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';
import Image from 'next/image';
import {
  Hash,
  Clock,
  User,
  Edit3,
  Trash2,
  Eye,
  Heart,
  Bookmark,
  MessageSquare,
} from 'lucide-react';
import { Post } from '../../types/community.types';

interface PostContentProps {
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
}

export const PostContent = ({
  post,
  isLiked,
  isBookmarked,
  onLike,
  onBookmark,
  onEdit,
  onDelete,
  canEdit = false,
}: PostContentProps) => {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      추천: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
      질문: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
      토론: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
      정보: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
      자유: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
    };
    return colors[category] || colors['자유'];
  };

  return (
    <Card className="mb-4 overflow-hidden rounded-xl border-0 bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800 sm:mb-6 sm:rounded-2xl">
      {/* 게시글 헤더 */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-700 sm:p-6">
        <div className="mb-3 flex flex-col justify-between gap-3 sm:mb-4 sm:flex-row sm:items-start sm:gap-0">
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4 sm:gap-3">
              <span
                className={`rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm ${getCategoryColor(post.category)}`}
              >
                {post.category}
              </span>
              {post.tags &&
                post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-md bg-violet-50 px-2 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 sm:rounded-lg sm:px-3 sm:py-1.5"
                  >
                    <Hash className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
            </div>
            <h1 className="mb-3 text-xl font-bold leading-tight text-gray-900 dark:text-white sm:mb-4 sm:text-2xl lg:text-3xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400 sm:gap-6 sm:text-sm">
              <div className="flex items-center gap-2 font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-violet-400 to-purple-500 sm:h-8 sm:w-8">
                  <User className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{post.date}</span>
                <span className="sm:hidden">{post.date.slice(5)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{post.views > 999 ? `${Math.floor(post.views / 1000)}k` : post.views}</span>
              </div>
            </div>
          </div>

          {/* 작성자 액션 버튼 */}
          {canEdit && (
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <Button
                onClick={onEdit}
                className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-blue-400 bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-md transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg dark:border-blue-500 sm:flex-none sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
              >
                <Edit3 className="h-3 w-3 sm:h-4 sm:w-4" />
                수정
              </Button>
              <Button
                onClick={onDelete}
                className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-red-400 bg-gradient-to-r from-red-500 to-red-600 px-3 py-2 text-xs font-semibold text-white shadow-md transition-all hover:from-red-600 hover:to-red-700 hover:shadow-lg dark:border-red-500 sm:flex-none sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                삭제
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 게시글 본문 */}
      <div>
        {post.image && (
          <div className="mb-4 sm:mb-6">
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={300}
              className="w-full rounded-none object-cover shadow-md"
            />
          </div>
        )}

        <div className="p-4 sm:p-6">
          {/* 음악 관련 특별 섹션 (피그마 디자인 참고) */}
          <div className="mb-4 rounded-lg bg-gradient-to-r from-violet-50 to-purple-50 p-4 dark:from-violet-900/20 dark:to-purple-900/20 sm:mb-6 sm:rounded-xl sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 sm:h-16 sm:w-16">
                <div className="h-8 w-8 rounded-full bg-black/20 sm:h-10 sm:w-10"></div>
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-gray-900 dark:text-white sm:text-lg">
                  LP 추천 - 클래식 명반
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                  음질과 감성을 모두 만족하는 특별한 앨범
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none text-sm sm:text-base">
            <div
              className="leading-relaxed text-gray-800 dark:text-gray-200"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
            />
          </div>
        </div>
      </div>

      {/* 게시글 액션 */}
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-700/50 sm:px-6 sm:py-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              onClick={onLike}
              className={`flex flex-1 items-center justify-center gap-1 rounded-lg border px-4 py-2.5 text-xs font-semibold shadow-md transition-all hover:shadow-lg sm:flex-none sm:gap-2 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm ${
                isLiked
                  ? 'border-red-400 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600'
                  : 'border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:border-red-300 hover:from-red-50 hover:to-pink-50 hover:text-red-600 dark:border-gray-600 dark:from-gray-700 dark:to-gray-800 dark:text-gray-200 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 dark:hover:text-red-400'
              }`}
            >
              <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">좋아요</span> {post.likes}
            </Button>

            <Button
              onClick={onBookmark}
              className={`flex flex-1 items-center justify-center gap-1 rounded-lg border px-4 py-2.5 text-xs font-semibold shadow-md transition-all hover:shadow-lg sm:flex-none sm:gap-2 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm ${
                isBookmarked
                  ? 'border-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600'
                  : 'border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:border-yellow-300 hover:from-yellow-50 hover:to-orange-50 hover:text-yellow-600 dark:border-gray-600 dark:from-gray-700 dark:to-gray-800 dark:text-gray-200 dark:hover:from-yellow-900/20 dark:hover:to-orange-900/20 dark:hover:text-yellow-400'
              }`}
            >
              <Bookmark className={`h-4 w-4 sm:h-5 sm:w-5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">북마크</span>
              <span className="sm:hidden">저장</span>
            </Button>
          </div>

          <div className="order-first flex items-center justify-center gap-2 rounded-lg border border-violet-200 bg-gradient-to-r from-violet-100 to-purple-100 px-4 py-2.5 shadow-md dark:border-violet-700 dark:from-violet-900/30 dark:to-purple-900/30 sm:order-last sm:rounded-xl sm:px-5">
            <MessageSquare className="h-4 w-4 text-violet-600 dark:text-violet-400 sm:h-5 sm:w-5" />
            <span className="text-xs font-semibold text-violet-700 dark:text-violet-300 sm:text-sm">
              댓글 {post.comments}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
