'use client';

import React from 'react';
import { UserRound, FileText, MessageCircle, Heart, Bookmark } from 'lucide-react';
import { TabData } from '../../types/mypage.types';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  const tabs: TabData[] = [
    { id: '개요', label: '개요', icon: <UserRound className="h-4 w-4" /> },
    { id: '게시글', label: '게시글', icon: <FileText className="h-4 w-4" /> },
    { id: '댓글', label: '댓글', icon: <MessageCircle className="h-4 w-4" /> },
    { id: '좋아요', label: '좋아요', icon: <Heart className="h-4 w-4" /> },
    { id: '북마크', label: '북마크', icon: <Bookmark className="h-4 w-4" /> },
    // { id: '문의', label: '문의', icon: <HelpCircle className="h-4 w-4" /> }, // 비활성화
  ];

  return (
    <div className="mb-6 w-full">
      <div className="w-full rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="grid w-full grid-cols-3 gap-1 md:grid-cols-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-row items-center justify-center gap-1.5 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-br from-blue-50 to-violet-50 text-blue-600 shadow-sm dark:from-blue-900/30 dark:to-violet-900/30 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
              }`}
            >
              {activeTab === tab.id && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10" />
              )}
              <div className="relative">{tab.icon}</div>
              <span className="relative text-xs font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
