'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { tempFollowingUsers } from '../../temp/mypage.temp';

const FollowingTab = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">팔로잉</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tempFollowingUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 p-6 dark:border-gray-700"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xl">
                {user.avatar}
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user.followers} 팔로워</p>
              </div>

              <div className="flex gap-2">
                <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-600">
                  팔로잉
                </button>
                <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowingTab;
