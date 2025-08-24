'use client';

import Image from 'next/image';
import { Hash, Clock, Edit3, Trash2, Eye, Heart, Bookmark, MessageSquare } from 'lucide-react';
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
  const getTagColor = (tag?: string) => {
    const colors: { [key: string]: string } = {
      질문: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
      정보: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
      홍보: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
    };
    return colors[tag || ''] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
  };

  const getBoardColor = (board?: string) => {
    const colors: { [key: string]: string } = {
      자유게시판: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
      장비: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
      음반: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white',
      아티스트: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white',
    };
    return colors[board || ''] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
      {/* 게시글 헤더 - 작성자 정보 */}
      <div className="px-4 py-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* 프로필 아바타 */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-sm font-bold text-white shadow-lg sm:h-12 sm:w-12 sm:text-lg">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-gray-900 dark:text-white">{post.author}</h3>
                {post.board && (
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${getBoardColor(post.board)}`}
                  >
                    {post.board}
                  </span>
                )}
                {post.tag && (
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getTagColor(post.tag)}`}
                  >
                    {post.tag}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>
                    {post.views && post.views > 999
                      ? `${Math.floor(post.views / 1000)}k`
                      : post.views || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 작성자 액션 버튼 */}
          {canEdit && (
            <div className="flex items-center gap-2">
              <button
                onClick={onEdit}
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <Edit3 className="h-5 w-5" />
              </button>
              <button
                onClick={onDelete}
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* 제목 */}
        <h1 className="mb-4 text-xl font-bold leading-tight text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">
          {post.title}
        </h1>
      </div>

      {/* 이미지 */}
      {post.image && (
        <div className="relative mx-auto max-w-lg">
          <Image
            src={post.image}
            alt={post.title}
            width={500}
            height={300}
            className="h-64 w-full rounded-2xl object-cover"
          />
        </div>
      )}

      {/* 액션 버튼들 - Instagram 스타일 */}
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* 좋아요 버튼 - Instagram 스타일 */}
            <button
              onClick={onLike}
              className="group flex items-center gap-2 transition-transform hover:scale-110"
            >
              <div
                className={`rounded-full p-1.5 transition-colors sm:p-2 ${
                  isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500 dark:text-gray-300'
                }`}
              >
                <Heart
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${isLiked ? 'fill-current' : ''} transition-all`}
                />
              </div>
            </button>

            {/* 댓글 버튼 */}
            <button className="group transition-transform hover:scale-110">
              <div className="rounded-full p-1.5 text-gray-700 transition-colors hover:text-blue-500 dark:text-gray-300 sm:p-2">
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </button>

            {/* 북마크 버튼 */}
            <button onClick={onBookmark} className="group transition-transform hover:scale-110">
              <div
                className={`rounded-full p-2 transition-colors ${
                  isBookmarked
                    ? 'text-yellow-500'
                    : 'text-gray-700 hover:text-yellow-500 dark:text-gray-300'
                }`}
              >
                <Bookmark
                  className={`h-6 w-6 ${isBookmarked ? 'fill-current' : ''} transition-all`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* 좋아요 수 */}
        <div className="mb-3">
          <p className="font-semibold text-gray-900 dark:text-white">
            좋아요 <span className="font-bold">{post.likes.toLocaleString()}</span>개
          </p>
        </div>

        {/* 본문 내용 */}
        <div className="mb-4">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div
              className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
            />
          </div>
        </div>

        {/* 댓글 수 */}
        <button className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          댓글 <span className="font-bold text-gray-900 dark:text-white">{post.comments}</span>개
          모두 보기
        </button>
      </div>
    </div>
  );
};
