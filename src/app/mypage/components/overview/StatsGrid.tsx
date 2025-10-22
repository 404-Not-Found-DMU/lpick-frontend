'use client';

import React from 'react';
import { useMyPageStore } from '@/store/myPageStore';
import { FileText, MessageCircle, Edit, Users } from 'lucide-react';

const StatsGrid = () => {
  const { activityStats } = useMyPageStore();

  const stats = [
    {
      icon: FileText,
      value: activityStats.posts,
      label: '작성글',
      color: 'bg-blue-500',
    },
    {
      icon: MessageCircle,
      value: activityStats.comments,
      label: '댓글',
      color: 'bg-green-500',
    },
    {
      icon: Edit,
      value: activityStats.wikiEdits,
      label: '위키편집',
      color: 'bg-purple-500',
    },
    {
      icon: Users,
      value: activityStats.discussions,
      label: '토론참여',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
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
