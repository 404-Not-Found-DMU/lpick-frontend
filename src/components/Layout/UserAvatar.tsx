'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { useAuth } from '@/hooks/useAuth';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';
import { User } from 'lucide-react';

export const AuthButton = () => {
  const router = useRouter();

  return (
    <Button variant="primary" size="sm" onClick={() => router.push('/login')}>
      로그인
    </Button>
  );
};

export const UserAvatar = () => {
  const router = useRouter();
  const { userInfo } = useUserStore();

  const handleClick = () => {
    router.push('/mypage');
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
      title={`${userInfo?.nickname || '사용자'}님의 마이페이지로 이동`}
    >
      {userInfo?.profile ? (
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={userInfo.profile}
            alt={`${userInfo.nickname}님의 프로필`}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="relative w-8 h-8 rounded-full border-2 border-violet-300 bg-gray-100 dark:border-violet-700 dark:bg-gray-800">
          <User className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-violet-300 dark:text-violet-700" />
        </div>
      )}
    </button>
  );
};

export const UserAvatarWithAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('🔍 UserAvatarWithAuth 상태:', { isAuthenticated, isLoading });

  // 로딩 중일 때는 스켈레톤 표시
  if (isLoading) {
    console.log('⏳ 로딩 중 - 스켈레톤 표시');
    return <div className="w-16 h-8 animate-pulse bg-gray-200 rounded dark:bg-gray-700"></div>;
  }

  if (isAuthenticated) {
    console.log('✅ 인증됨 - UserAvatar 표시');
    return <UserAvatar />;
  } else {
    console.log('❌ 미인증 - AuthButton 표시');
    return <AuthButton />;
  }
};
export default UserAvatarWithAuth;
