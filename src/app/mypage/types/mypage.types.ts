import { LucideIcon } from 'lucide-react';

export interface TabData {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface StatData {
  value: string;
  label: string;
  color: string;
  icon: LucideIcon;
}

export interface ActivityData {
  id: number;
  type: 'listen' | 'like' | 'share' | 'comment';
  title: string;
  subtitle: string;
  time: string;
  status?: 'completed' | 'in-progress';
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  color: string;
}

export interface RecentDocument {
  id: number;
  title: string;
  type: string;
  lastModified: string;
  status: string;
  category: 'review' | 'guide' | 'playlist' | 'tip';
}

export interface Playlist {
  id: number;
  title: string;
  trackCount: number;
  isPublic: boolean;
  likes: number;
}

export interface LikedItem {
  id: number;
  type: 'album' | 'review' | 'playlist' | 'article';
  title: string;
  artist?: string;
  author?: string;
  likes: number;
}

export interface FollowingUser {
  id: number;
  name: string;
  followers: string;
  isFollowing: boolean;
  avatar: string;
}
