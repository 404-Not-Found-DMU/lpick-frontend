'use client';

import React from 'react';
import { FileText, MessageCircle, Edit, Users } from 'lucide-react';
import { useUserActivityCount } from '@/shared/hooks';

const StatsGrid = () => {
  const { activityCount, loading } = useUserActivityCount();

  const stats = [
    {
      icon: FileText,
      value: activityCount?.articleCount || 0,
      label: '작성글',
      color: 'bg-blue-500',
    },
    {
      icon: MessageCircle,
      value: activityCount?.commentCount || 0,
      label: '댓글',
      color: 'bg-green-500',
    },
    {
      icon: Edit,
      value: activityCount?.wikiEditCount || 0,
      label: '위키편집',
      color: 'bg-purple-500',
    },
    {
      icon: Users,
      value: activityCount?.debateChatCount || 0,
      label: '토론참여',
      color: 'bg-orange-500',
    },
  ];

  // 로딩 상태
  if (loading) {
    return (
      <div className="relative z-10 mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="relative">
              <div className="mb-4 h-12 w-12 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="space-y-1">
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 에러나 데이터가 없어도 기본값으로 표시
  return (
    <div className="relative z-10 mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="group relative z-0 overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br opacity-5 ${stat.color.replace('bg-', 'from-')} to-transparent`}
            />

            <div className="relative">
              <div
                className={`inline-flex h-12 w-12 items-center justify-center ${stat.color} mb-4 rounded-2xl text-white shadow-lg`}
              >
                <IconComponent className="h-5 w-5" />
              </div>

              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
