'use client';

import React, { useEffect } from 'react';
import { Music, Settings, LogOut, User, Target } from 'lucide-react';
import Image from 'next/image';
import { useMyPageStore } from '@/store/myPageStore';
import { useUserStore } from '@/store/userStore';
import { useLogout } from '../../hooks/useLogout';
import { useRouter } from 'next/navigation';
import { useUserActivityCount } from '@/shared/hooks';

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
}

const StatCard = ({ label, value, className = '' }: StatCardProps) => (
  <div className={`rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/50 ${className}`}>
    <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
    <span className="mt-1 block text-lg font-bold text-gray-900 dark:text-white">{value}</span>
  </div>
);

const ProfileSidebar = () => {
  const { userProfile, setActiveTab, syncUserInfo } = useMyPageStore();
  const { userInfo } = useUserStore();
  const { handleLogout } = useLogout();
  const router = useRouter();
  const { activityCount } = useUserActivityCount();

  // LPTI 유효성 체크 함수
  const hasValidLPTI = () => {
    if (!userInfo?.lpti) return false;
    
    if (typeof userInfo.lpti === 'string') {
      return userInfo.lpti.trim() !== '';
    }
    
    if (typeof userInfo.lpti === 'object') {
      return !!(userInfo.lpti.code && userInfo.lpti.code.trim() !== '');
    }
    
    return false;
  };

  // 컴포넌트 마운트 시 실제 사용자 정보로 동기화
  useEffect(() => {
    syncUserInfo();
  }, [userInfo, syncUserInfo]);

  return (
    <div className="sticky top-6 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      {/* Profile Header */}
      <div className="mb-4 text-center">
        <div className="relative mb-3 inline-block">
          {userInfo?.profile ? (
            <div className="h-16 w-16 rounded-full overflow-hidden shadow-lg">
              <Image
                src={userInfo.profile}
                alt={`${userInfo.nickname}님의 프로필`}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 p-0.5 shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-900">
                <User className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        <h3 className="mb-1 text-base font-bold text-gray-900 dark:text-white">
          {userInfo?.nickname || userProfile.name}
        </h3>
        <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
          @{userInfo?.oauthId || userProfile.username}
        </p>
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          <Music className="h-2.5 w-2.5" />
          LP 덕후
        </span>
      </div>

      {/* LPTI Section */}
      <div className="mb-4 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-purple-50 p-3 dark:border-violet-900/30 dark:from-gray-800/30 dark:to-gray-800/10">
        {hasValidLPTI() ? (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-bold text-gray-900 dark:text-white">내 LPTI</span>
              </div>
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                {typeof userInfo!.lpti === 'string' ? userInfo!.lpti : userInfo!.lpti!.code}
              </span>
            </div>
            {typeof userInfo!.lpti === 'object' && userInfo!.lpti.nickname && (
              <p className="text-xs text-gray-700 dark:text-gray-300">{userInfo!.lpti.nickname}</p>
            )}
            {typeof userInfo!.lpti === 'object' && userInfo!.lpti.summary && (
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{userInfo!.lpti.summary}</p>
            )}
            <button 
              onClick={() => router.push('/lpti')}
              className="mt-3 w-full rounded-xl bg-violet-600 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-violet-700"
            >
              결과 보기 / 다시 검사하기
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">LPTI 검사</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              아직 LPTI 결과가 없습니다. 나의 음악 성향을 알아보세요!
            </p>
            <button 
              onClick={() => router.push('/lpti')}
              className="mt-3 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:from-violet-700 hover:to-purple-700"
            >
              LPTI 검사하러 가기
            </button>
          </div>
        )}
      </div>

      {/* Bio */}
      {userInfo?.about && (
        <div className="mb-4 rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/50">
          <p className="text-center text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            {userInfo.about}
          </p>
        </div>
      )}

      {/* Additional Stats */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <StatCard label="작성글" value={activityCount?.articleCount || 0} />
        <StatCard label="댓글" value={activityCount?.commentCount || 0} />
        <StatCard label="위키편집" value={activityCount?.wikiEditCount || 0} />
        <StatCard label="토론참여" value={activityCount?.debateChatCount || 0} />
      </div>

      {/* Action Buttons */}
      <div className="mb-4 space-y-2">
        <button className="w-full transform rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl">
          프로필 편집
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveTab('설정')}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gray-100 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Settings className="h-3 w-3" />
            설정
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-red-100 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
          >
            <LogOut className="h-3 w-3" />
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
