'use client';

import React from 'react';
import {
  Play,
  Heart,
  Share2,
  MessageCircle,
  Calendar,
  ExternalLink,
  Users,
  Zap,
} from 'lucide-react';
import { tempActivities } from '../../temp/mypage.temp';

const ActivitySections = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'listen':
        return <Play className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'like':
        return <Heart className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'share':
        return <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-violet-600 dark:text-violet-400" />;
      default:
        return <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getActivityBg = (type: string) => {
    switch (type) {
      case 'listen':
        return 'bg-green-100 dark:bg-green-900';
      case 'like':
        return 'bg-red-100 dark:bg-red-900';
      case 'share':
        return 'bg-blue-100 dark:bg-blue-900';
      case 'comment':
        return 'bg-violet-100 dark:bg-violet-900';
      default:
        return 'bg-gray-100 dark:bg-gray-900';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Activity Feed */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">활동 피드</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">실시간 활동 현황</p>
          </div>
        </div>

        <div className="space-y-4">
          {tempActivities.map((activity) => (
            <div
              key={activity.id}
              className="group flex items-start gap-4 rounded-2xl p-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900/20"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${getActivityBg(activity.type)} shadow-sm`}
              >
                {getActivityIcon(activity.type)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {activity.title}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                </div>
                <div className="mb-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                  {activity.subtitle}
                </div>
                <div className="flex items-center justify-between">
                  {activity.status && (
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        activity.status === 'completed'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}
                    >
                      {activity.status === 'completed' ? '✨ 완료' : '⚡ 진행중'}
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="h-3 w-3" />
                    <span>12명이 좋아해요</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-violet-50 py-3 font-semibold text-blue-600 transition-all duration-200 hover:from-blue-100 hover:to-violet-100 dark:border-blue-800 dark:from-blue-900/20 dark:to-violet-900/20 dark:text-blue-400">
          <ExternalLink className="h-4 w-4" />더 많은 활동 보기
        </button>
      </div>

      {/* Activity Timeline */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-lg">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">최근 활동</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">활동 타임라인</p>
          </div>
        </div>

        <div className="space-y-6">
          {tempActivities.map((activity, index) => (
            <div key={activity.id} className="relative">
              {index !== tempActivities.length - 1 && (
                <div className="absolute left-4 top-12 h-16 w-0.5 bg-gradient-to-b from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800"></div>
              )}
              <div className="flex items-start gap-4">
                <div
                  className={`h-8 w-8 rounded-full border-2 border-white shadow-lg dark:border-gray-900 ${
                    [
                      'bg-gradient-to-br from-yellow-400 to-orange-500',
                      'bg-gradient-to-br from-violet-400 to-pink-500',
                      'bg-gradient-to-br from-green-400 to-teal-500',
                    ][index % 3]
                  }`}
                ></div>

                <div className="min-w-0 flex-1 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
                  <div className="mb-2 font-semibold text-gray-900 dark:text-white">
                    {activity.title}
                  </div>
                  <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {activity.subtitle}
                  </div>
                  <div className="flex items-center justify-between">
                    {activity.status && (
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          activity.status === 'completed'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}
                      >
                        {activity.status === 'completed' ? '완료' : '진행중'}
                      </span>
                    )}
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitySections;
