'use client';

import React from 'react';
import { Music, Eye, Lock, Heart, Plus, Edit, Play, Users, Clock } from 'lucide-react';
import { tempPlaylists } from '../../temp/mypage.temp';

const PlaylistsTab = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">내 플레이리스트</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              나만의 음악 컬렉션을 만들어보세요
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <Plus className="h-5 w-5" />새 플레이리스트
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tempPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl dark:border-gray-800 dark:from-gray-900 dark:to-gray-800 dark:hover:border-indigo-700"
            >
              {/* Header with Status */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg">
                      <Music className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-900">
                      <Play className="ml-0.5 h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-bold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                      {playlist.title}
                    </h4>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{playlist.trackCount}곡</span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  {playlist.isPublic ? (
                    <div className="flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-3 py-1 dark:border-green-800 dark:bg-green-900/20">
                      <Eye className="h-3 w-3 text-green-600 dark:text-green-400" />
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">
                        공개
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 dark:border-gray-700 dark:bg-gray-800">
                      <Lock className="h-3 w-3 text-gray-500" />
                      <span className="text-xs font-medium text-gray-500">비공개</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-red-500">
                    <Heart className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{playlist.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">1.2k</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">2시간 전</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 py-2.5 text-sm font-semibold text-white transition-all hover:from-indigo-600 hover:to-violet-700 hover:shadow-lg">
                  재생
                </button>
                <button className="flex items-center justify-center rounded-2xl border border-gray-200 px-3 py-2.5 text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistsTab;
