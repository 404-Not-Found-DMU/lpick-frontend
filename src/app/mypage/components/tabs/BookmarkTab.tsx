'use client';

import React, { useState } from 'react';
import {
  Bookmark,
  FileText,
  Music,
  Calendar,
  Search,
  Filter,
  Heart,
  Eye,
  User,
} from 'lucide-react';

const BookmarkTab = () => {
  const [selectedFilter, setSelectedFilter] = useState('전체');

  const filters = [
    { name: '전체', count: 47 },
    { name: '게시글 북마크', count: 28 },
    { name: '위키 북마크', count: 19 },
  ];

  const bookmarks = [
    {
      id: 1,
      type: 'post',
      category: '게시글 북마크',
      title: 'Pink Floyd - The Wall 완벽 분석',
      author: 'MusicCritic',
      date: '2024-01-15',
      likes: 234,
      views: '1.2k',
      content: '이 앨범의 숨겨진 의미와 음악적 구조를 분석해보겠습니다...',
    },
    {
      id: 2,
      type: 'wiki',
      category: '위키 북마크',
      title: 'Led Zeppelin 디스코그래피',
      author: 'WikiEditor',
      date: '2024-01-14',
      likes: 167,
      views: '2.1k',
      content: 'Led Zeppelin의 모든 앨범에 대한 상세한 분석과 리뷰...',
    },
    {
      id: 3,
      type: 'post',
      category: '게시글 북마크',
      title: '재즈 입문자를 위한 추천 앨범 50선',
      author: 'JazzMaster',
      date: '2024-01-12',
      likes: 89,
      views: '678',
      content: '재즈를 처음 듣는 분들을 위한 필수 앨범들을 소개합니다...',
    },
    {
      id: 4,
      type: 'wiki',
      category: '위키 북마크',
      title: 'David Bowie 아티스트 프로필',
      author: 'WikiContributor',
      date: '2024-01-10',
      likes: 345,
      views: '3.4k',
      content: '혁신적인 아티스트 David Bowie의 생애와 음악적 여정...',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'wiki':
        return <Music className="h-5 w-5 text-violet-600 dark:text-violet-400" />;
      default:
        return <Bookmark className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'post':
        return 'bg-blue-100 dark:bg-blue-900/20';
      case 'wiki':
        return 'bg-violet-100 dark:bg-violet-900/20';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const filteredBookmarks =
    selectedFilter === '전체'
      ? bookmarks
      : bookmarks.filter((bookmark) => bookmark.category === selectedFilter);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
              <Bookmark className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">북마크</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                저장한 게시글과 위키 콘텐츠
              </p>
            </div>
          </div>
        </div>

        {/* 필터 */}
        <div className="mb-6 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="mb-3 flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              북마크 분류
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setSelectedFilter(filter.name)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedFilter === filter.name
                    ? 'scale-105 bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                    : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {filter.name}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    selectedFilter === filter.name
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 북마크 목록 */}
        <div className="space-y-4">
          {filteredBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="group rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:border-amber-200 hover:bg-gradient-to-br hover:from-amber-50/50 hover:to-orange-50/50 hover:shadow-lg dark:border-gray-800 dark:hover:border-amber-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-1 items-start gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${getTypeBg(bookmark.type)} shadow-sm`}
                  >
                    {getTypeIcon(bookmark.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xs font-medium uppercase text-amber-600 dark:text-amber-400">
                        {bookmark.category}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <User className="h-3 w-3" />
                        {bookmark.author}
                      </div>
                      <span className="text-xs text-gray-400">•</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {bookmark.date}
                      </div>
                    </div>

                    <h4 className="mb-2 line-clamp-2 font-bold text-gray-900 transition-colors group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
                      {bookmark.title}
                    </h4>

                    <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                      {bookmark.content}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-red-500">
                        <Heart className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{bookmark.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm font-medium">{bookmark.views}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="text-amber-500 transition-colors hover:text-amber-600">
                  <Bookmark className="h-5 w-5 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBookmarks.length === 0 && (
          <div className="py-12 text-center">
            <Bookmark className="mx-auto mb-4 h-16 w-16 text-gray-400 opacity-50" />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              {selectedFilter}에 해당하는 북마크가 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              마음에 드는 게시글이나 위키 콘텐츠를 북마크해보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkTab;
