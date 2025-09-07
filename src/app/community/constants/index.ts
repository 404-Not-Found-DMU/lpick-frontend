// 커뮤니티 관련 상수들
import { SortOption } from '../types/community.types';
import { Clock, Heart, Eye } from 'lucide-react';

// 게시판 옵션
export const BOARD_OPTIONS = [
  { id: 'all' as const, name: '전체' },
  { id: '자유게시판' as const, name: '자유게시판' },
  { id: '장비' as const, name: '장비' },
  { id: '음반' as const, name: '음반' },
  { id: '아티스트' as const, name: '아티스트' },
] as const;

// 태그 옵션
export const TAG_OPTIONS = [
  { id: '질문' as const, name: '질문', color: 'bg-blue-500' },
  { id: '정보' as const, name: '정보', color: 'bg-green-500' },
  { id: '홍보' as const, name: '홍보', color: 'bg-orange-500' },
] as const;

// 정렬 옵션
export const SORT_OPTIONS = [
  { value: 'latest' as SortOption, label: '최신순', icon: Clock },
  { value: 'popular' as SortOption, label: '인기순', icon: Heart },
  { value: 'views' as SortOption, label: '조회순', icon: Eye },
] as const;

// 페이지네이션 설정
export const POSTS_PER_PAGE = 6;
export const FEATURED_POSTS_LIMIT = 8;
