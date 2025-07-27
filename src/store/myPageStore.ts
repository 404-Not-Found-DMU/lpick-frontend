import { create } from 'zustand';

interface UserProfile {
  name: string;
  email: string;
  level: number;
  experience: number;
  maxExperience: number;
  nextLevelExperience: number;
  followers: number;
  albums: number;
  posts: number;
  profileImage?: string;
}

interface ActivityStats {
  posts: number;
  comments: number;
  wikiEdits: number;
  discussions: number;
  followers: number;
  following: number;
  likes: number;
  shares: number;
  saves: number;
}

interface MyPageState {
  activeTab: string;
  userProfile: UserProfile;
  activityStats: ActivityStats;
  setActiveTab: (tab: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateActivityStats: (stats: Partial<ActivityStats>) => void;
}

export const useMyPageStore = create<MyPageState>((set) => ({
  activeTab: '개요',
  userProfile: {
    name: '음악덕후',
    email: 'user@example.com',
    level: 15,
    experience: 1250,
    maxExperience: 2000,
    nextLevelExperience: 2000,
    followers: 2400,
    albums: 42,
    posts: 156,
  },
  activityStats: {
    posts: 23,
    comments: 89,
    wikiEdits: 12,
    discussions: 34,
    followers: 2400,
    following: 180,
    likes: 456,
    shares: 67,
    saves: 234,
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  updateProfile: (profile) =>
    set((state) => ({
      userProfile: { ...state.userProfile, ...profile },
    })),
  updateActivityStats: (stats) =>
    set((state) => ({
      activityStats: { ...state.activityStats, ...stats },
    })),
}));
