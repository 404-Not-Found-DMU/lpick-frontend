'use client';

import React from 'react';
import { Music } from 'lucide-react';

// 기능별로 그룹화된 컴포넌트 import
import { TabNavigation } from './components/common';
import { ProfileSidebar } from './components/profile';
import { StatsGrid } from './components/stats';
import { AlbumCollection, EquipmentSection } from './components/collection';
import { ActivitySections, RecentDocuments } from './components/activity';
import {
  PostsTab,
  LikesTab,
  CommentsTab,
  FollowingTab,
  SettingsTab,
  InquiryTab,
  BookmarkTab,
} from './components/tabs';

// 커스텀 훅
import { useMyPageTabs } from './hooks/useMyPageTabs';

const MyPage = () => {
  const { activeTab, setActiveTab } = useMyPageTabs();

  const renderTabContent = () => {
    switch (activeTab) {
      case '개요':
        return (
          <div className="space-y-6">
            <StatsGrid />
            <AlbumCollection />
            <EquipmentSection />
            <RecentDocuments />
            <ActivitySections />
          </div>
        );
      case '게시글':
        return <PostsTab />;
      case '댓글':
        return <CommentsTab />;
      case '좋아요':
        return <LikesTab />;
      case '북마크':
        return <BookmarkTab />;
      case '설정':
        return <SettingsTab />;
      case '문의':
        return <InquiryTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <div className="flex min-h-screen w-full justify-center">
        <div className="w-full max-w-7xl px-4 py-6">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
            <div className="w-full lg:col-span-1">
              <ProfileSidebar />
            </div>

            <div className="w-full min-w-0 lg:col-span-3">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
