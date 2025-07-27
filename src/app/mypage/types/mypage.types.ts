import { LucideIcon } from 'lucide-react';

// 기본 타입들
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  level: number;
  experience: number;
  maxExperience: number;
}

export interface ActivityStats {
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

// 게시글 관련 타입
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  isBookmarked: boolean;
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  date: string;
  likes: number;
}

// 좋아요 관련 타입
export interface LikedItem {
  id: number;
  title: string;
  artist: string;
  album: string;
  year: number;
  type: 'album' | 'song';
}

// 북마크 관련 타입
export interface BookmarkItem {
  id: number;
  title: string;
  description: string;
  url: string;
}

// 앨범 관련 타입
export interface Album {
  id: number;
  title: string;
  artist: string;
  color: string;
  genre?: string;
}

// 플레이리스트 관련 타입
export interface Playlist {
  id: number;
  title: string;
  trackCount: number;
  isPublic: boolean;
  likes: number;
}

// 활동 관련 타입
export interface Activity {
  id: number;
  type: 'listen' | 'comment' | 'like' | 'share' | 'post' | 'follow' | 'wiki';
  title: string;
  subtitle?: string;
  description?: string;
  time: string;
  likes?: number;
  comments?: number;
  status?: 'completed' | null;
}

// 문서 관련 타입
export interface RecentDocument {
  id: number;
  title: string;
  type: string;
  category: 'review' | 'guide' | 'playlist' | 'tip';
  status: '작성중' | '완료' | '공개';
  lastModified: string;
  views: number;
}

// 팔로우 관련 타입
export interface FollowingUser {
  id: number;
  name: string;
  username: string;
  avatar: string | null;
  bio: string;
  followers: string;
  posts: number;
  isVerified: boolean;
  lastActive: string;
}

// 필터 관련 타입
export interface FilterItem {
  name: string;
  count: number;
}

// 통계 카드 타입
export interface StatCard {
  icon: LucideIcon;
  value: number | string;
  label: string;
  color: string;
  trend?: string;
}

// 설정 관련 타입
export interface NotificationSettings {
  followers: boolean;
  comments: boolean;
  likes: boolean;
  mentions: boolean;
  email: boolean;
}

export interface PrivacySettings {
  profilePublic: boolean;
  postsPublic: boolean;
  activityPublic: boolean;
}

// 탭 관련 타입
export interface TabData {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// 카테고리 설정 타입
export interface CategoryConfig {
  icon: LucideIcon;
  color: string;
  bg: string;
}
