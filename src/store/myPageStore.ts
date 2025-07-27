import { create } from 'zustand';
import type { User, ActivityStats } from '@/app/mypage/types/mypage.types';

interface MyPageState {
  activeTab: string;
  userProfile: User;
  activityStats: ActivityStats;
  setActiveTab: (tab: string) => void;
  updateUserProfile: (profile: Partial<User>) => void;
  updateActivityStats: (stats: Partial<ActivityStats>) => void;
}

export const useMyPageStore = create<MyPageState>((set) => ({
  activeTab: '개요',
  userProfile: {
    id: '1',
    name: '음악덕후',
    username: '@musiclover',
    email: 'music@example.com',
    level: 15,
    experience: 2340,
    maxExperience: 3000,
  },
  activityStats: {
    posts: 23,
    comments: 89,
    wikiEdits: 15,
    discussions: 7,
    followers: 234,
    following: 187,
    likes: 1240,
    shares: 89,
    saves: 156,
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  updateUserProfile: (profile) =>
    set((state) => ({
      userProfile: { ...state.userProfile, ...profile },
    })),
  updateActivityStats: (stats) =>
    set((state) => ({
      activityStats: { ...state.activityStats, ...stats },
    })),
}));
