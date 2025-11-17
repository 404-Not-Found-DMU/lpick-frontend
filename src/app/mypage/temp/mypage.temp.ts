import { FileText, MessageCircle, Users, Edit } from 'lucide-react';
import type {
  StatCard,
  Album,
  Playlist,
  FollowingUser,
  Post,
  Comment,
  LikedItem,
  BookmarkItem,
} from '../types/mypage.types';

export const tempStats: StatCard[] = [
  {
    icon: FileText,
    value: '23',
    label: '작성글',
    color: 'bg-blue-500',
    trend: '+12%',
  },
  {
    icon: MessageCircle,
    value: '89',
    label: '댓글',
    color: 'bg-green-500',
    trend: '+8%',
  },
  {
    icon: Edit,
    value: '15',
    label: '위키편집',
    color: 'bg-purple-500',
    trend: '+15%',
  },
  {
    icon: Users,
    value: '7',
    label: '토론참여',
    color: 'bg-orange-500',
    trend: '+5%',
  },
];

export const tempAlbums: Album[] = [
  {
    id: 1,
    title: 'Abbey Road',
    artist: 'The Beatles',
    color: 'bg-gradient-to-br from-yellow-400 to-orange-500',
  },
  {
    id: 2,
    title: 'Dark Side',
    artist: 'Pink Floyd',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Led Zeppelin IV',
    artist: 'Led Zeppelin',
    color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  },
  {
    id: 4,
    title: 'Thriller',
    artist: 'Michael Jackson',
    color: 'bg-gradient-to-br from-red-500 to-pink-600',
  },
  {
    id: 5,
    title: 'Back in Black',
    artist: 'AC/DC',
    color: 'bg-gradient-to-br from-gray-800 to-gray-600',
  },
  {
    id: 6,
    title: 'Rumours',
    artist: 'Fleetwood Mac',
    color: 'bg-gradient-to-br from-green-500 to-teal-500',
  },
  {
    id: 7,
    title: 'Hotel California',
    artist: 'Eagles',
    color: 'bg-gradient-to-br from-amber-500 to-yellow-500',
  },
  {
    id: 8,
    title: 'Nevermind',
    artist: 'Nirvana',
    color: 'bg-gradient-to-br from-blue-600 to-cyan-500',
  },
  {
    id: 9,
    title: 'Born to Run',
    artist: 'Bruce Springsteen',
    color: 'bg-gradient-to-br from-indigo-600 to-purple-600',
  },
  {
    id: 10,
    title: 'The Wall',
    artist: 'Pink Floyd',
    color: 'bg-gradient-to-br from-slate-600 to-gray-700',
  },
  {
    id: 11,
    title: 'Kind of Blue',
    artist: 'Miles Davis',
    color: 'bg-gradient-to-br from-blue-400 to-sky-500',
  },
  {
    id: 12,
    title: "What's Going On",
    artist: 'Marvin Gaye',
    color: 'bg-gradient-to-br from-emerald-500 to-green-600',
  },
  {
    id: 13,
    title: 'Pet Sounds',
    artist: 'The Beach Boys',
    color: 'bg-gradient-to-br from-orange-400 to-red-500',
  },
  {
    id: 14,
    title: 'OK Computer',
    artist: 'Radiohead',
    color: 'bg-gradient-to-br from-violet-600 to-purple-700',
  },
  {
    id: 15,
    title: 'Are You Experienced',
    artist: 'Jimi Hendrix',
    color: 'bg-gradient-to-br from-pink-500 to-rose-600',
  },
  {
    id: 16,
    title: 'Blood on the Tracks',
    artist: 'Bob Dylan',
    color: 'bg-gradient-to-br from-red-600 to-orange-600',
  },
];

export const tempPlaylists: Playlist[] = [
  {
    id: 1,
    title: '새벽의 감성',
    trackCount: 23,
    isPublic: true,
    likes: 45,
  },
  {
    id: 2,
    title: '드라이브 뮤직',
    trackCount: 31,
    isPublic: true,
    likes: 78,
  },
  {
    id: 3,
    title: '개인 취향',
    trackCount: 18,
    isPublic: false,
    likes: 12,
  },
  {
    id: 4,
    title: '재즈 컬렉션',
    trackCount: 27,
    isPublic: true,
    likes: 89,
  },
  {
    id: 5,
    title: '클래식 명곡',
    trackCount: 15,
    isPublic: true,
    likes: 34,
  },
  {
    id: 6,
    title: '록의 전설',
    trackCount: 42,
    isPublic: true,
    likes: 156,
  },
];

export const tempFollowingUsers: FollowingUser[] = [
  {
    id: 1,
    name: 'MusicCritic',
    username: '@musiccritic',
    avatar: null,
    bio: '음악 평론가 | 클래식부터 현대음악까지',
    followers: '2.1k',
    posts: 156,
    isVerified: true,
    lastActive: '방금 전',
  },
  {
    id: 2,
    name: 'VinylCollector',
    username: '@vinylcollector',
    avatar: null,
    bio: '비닐 수집가 | 희귀 LP 전문',
    followers: '1.8k',
    posts: 89,
    isVerified: false,
    lastActive: '1시간 전',
  },
  {
    id: 3,
    name: 'JazzMaster',
    username: '@jazzmaster',
    avatar: null,
    bio: '재즈 애호가 | Blue Note Records 컬렉터',
    followers: '3.2k',
    posts: 234,
    isVerified: true,
    lastActive: '3시간 전',
  },
  {
    id: 4,
    name: 'RockLegend',
    username: '@rocklegend',
    avatar: null,
    bio: '록음악 역사 연구자',
    followers: '1.5k',
    posts: 67,
    isVerified: false,
    lastActive: '12시간 전',
  },
  {
    id: 5,
    name: 'ClassicalFan',
    username: '@classicalfan',
    avatar: null,
    bio: '클래식 음악 평론 | 오케스트라 리뷰',
    followers: '987',
    posts: 123,
    isVerified: false,
    lastActive: '1일 전',
  },
];

export const tempPosts: Post[] = [
  {
    id: 1,
    title: '새로운 재즈 앨범 발매 소식',
    content: '재즈 피아니스트 존 스미스의 새로운 앨범이 발매되었습니다. 감상해보세요!',
    author: 'JazzLover',
    date: '2023-10-10',
    likes: 120,
    comments: 45,
    isBookmarked: false,
  },
  {
    id: 2,
    title: '클래식 음악의 이해',
    content: '클래식 음악을 처음 접하는 분들을 위한 가이드입니다. 주요 작곡가와 작품을 소개합니다.',
    author: 'ClassicalExpert',
    date: '2023-10-09',
    likes: 95,
    comments: 30,
    isBookmarked: true,
  },
  {
    id: 3,
    title: '록의 역사',
    content: '록 음악의 발전과 주요 아티스트에 대한 포스팅입니다.',
    author: 'RockFan',
    date: '2023-10-08',
    likes: 110,
    comments: 25,
    isBookmarked: false,
  },
];

export const tempComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: 'MusicCritic',
    content: '이 앨범은 정말 대단합니다! 특히 피아노 솔로가 인상적이었어요.',
    date: '2023-10-10',
    likes: 10,
  },
  {
    id: 2,
    postId: 1,
    author: 'VinylCollector',
    content: '재즈는 역시 비닐로 들어야 제맛이죠!',
    date: '2023-10-11',
    likes: 5,
  },
  {
    id: 3,
    postId: 2,
    author: 'JazzMaster',
    content: '클래식 입문자에게 정말 유용한 정보네요!',
    date: '2023-10-09',
    likes: 8,
  },
];

export const tempLikedItems: LikedItem[] = [
  {
    id: 1,
    title: 'Abbey Road',
    artist: 'The Beatles',
    album: 'Abbey Road',
    year: 1969,
    type: 'album',
  },
  {
    id: 2,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    year: 1975,
    type: 'song',
  },
  {
    id: 3,
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    year: 1971,
    type: 'song',
  },
];

export const tempBookmarks: BookmarkItem[] = [
  {
    id: 1,
    title: '재즈 명반 모음',
    description: '재즈의 역사적인 앨범들을 모아놓은 플레이리스트',
    url: 'https://example.com/jazz-essentials',
  },
  {
    id: 2,
    title: '클래식 음악 감상법',
    description: '클래식 음악을 더 깊이 이해하기 위한 자료들',
    url: 'https://example.com/classical-listening',
  },
  {
    id: 3,
    title: '록 음악의 모든 것',
    description: '록 음악의 역사, 앨범, 아티스트에 대한 정보',
    url: 'https://example.com/rock-music',
  },
];
