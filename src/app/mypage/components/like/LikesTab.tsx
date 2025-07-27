'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, User, FileText, Music, Calendar, Eye, Filter } from 'lucide-react';

const LikesTab = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = [
    { name: '전체', count: 156 },
    { name: '게시글', count: 45 },
    { name: '댓글', count: 67 },
    { name: '아티스트', count: 23 },
    { name: '위키 리뷰', count: 21 },
  ];

  const likedItems = [
    {
      id: 1,
      type: 'post',
      title: 'Pink Floyd - The Wall 앨범 리뷰',
      author: 'MusicCritic',
      date: '2024-01-15',
      likes: 234,
      views: '1.2k',
      content: '이 앨범은 정말 대단한 작품입니다...',
    },
    {
      id: 2,
      type: 'comment',
      title: '정말 좋은 분석이네요! 저도 같은 생각입니다.',
      author: 'VinylLover',
      date: '2024-01-14',
      likes: 12,
      views: '89',
      originalPost: 'David Bowie 디스코그래피 분석',
    },
    {
      id: 3,
      type: 'artist',
      title: 'The Beatles',
      author: 'Official Artist',
      date: '2024-01-12',
      likes: 567,
      views: '15k',
      content: '영국 리버풀 출신의 전설적인 록 밴드',
    },
    {
      id: 4,
      type: 'wiki',
      title: 'Led Zeppelin IV 앨범 분석',
      author: 'WikiEditor',
      date: '2024-01-10',
      likes: 89,
      views: '456',
      content: 'Stairway to Heaven이 수록된 명반...',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'artist':
        return <User className="h-5 w-5 text-violet-600 dark:text-violet-400" />;
      case 'wiki':
        return <Music className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
      default:
        return <Heart className="h-5 w-5 text-red-500" />;
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'post':
        return 'bg-blue-100 dark:bg-blue-900/20';
      case 'comment':
        return 'bg-green-100 dark:bg-green-900/20';
      case 'artist':
        return 'bg-violet-100 dark:bg-violet-900/20';
      case 'wiki':
        return 'bg-orange-100 dark:bg-orange-900/20';
      default:
        return 'bg-red-100 dark:bg-red-900/20';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'post':
        return '게시글';
      case 'comment':
        return '댓글';
      case 'artist':
        return '아티스트';
      case 'wiki':
        return '위키 리뷰';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">좋아요한 콘텐츠</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                마음에 들어한 콘텐츠를 모아보세요
              </p>
            </div>
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-6 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="mb-3 flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              카테고리 필터
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.name
                    ? 'scale-105 bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md'
                    : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    selectedCategory === category.name
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 좋아요 목록 */}
        <div className="space-y-4">
          {likedItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-red-200 hover:bg-gradient-to-br hover:from-red-50/50 hover:to-pink-50/50 hover:shadow-lg dark:border-gray-800 dark:hover:border-red-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-1 items-start gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${getTypeBg(item.type)} shadow-sm`}
                  >
                    {getTypeIcon(item.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                        {getTypeLabel(item.type)}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.author}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </div>
                    </div>

                    <h4 className="mb-2 line-clamp-2 font-bold text-gray-900 transition-colors group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400">
                      {item.title}
                    </h4>

                    {item.content && (
                      <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {item.content}
                      </p>
                    )}

                    {item.originalPost && (
                      <p className="mb-3 text-sm text-blue-600 dark:text-blue-400">
                        원글: {item.originalPost}
                      </p>
                    )}

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-red-500">
                        <Heart className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{item.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.views}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="text-red-500 transition-colors hover:text-red-600">
                  <Heart className="h-5 w-5 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {likedItems.length === 0 && (
          <div className="py-12 text-center">
            <Heart className="mx-auto mb-4 h-16 w-16 text-gray-400 opacity-50" />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              아직 좋아요한 콘텐츠가 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              마음에 드는 게시글, 댓글, 아티스트에 좋아요를 눌러보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikesTab;
