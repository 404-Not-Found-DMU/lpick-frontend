'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { useAuth } from '@/hooks/useAuth';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';

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
        <span className="text-2xl">😎</span>
      )}
    </button>
  );
};

export const UserAvatarWithAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // 로딩 중일 때는 스켈레톤 표시
  if (isLoading) {
    return <div className="w-16 h-8 animate-pulse bg-gray-200 rounded dark:bg-gray-700"></div>;
  }

  return isAuthenticated ? <UserAvatar /> : <AuthButton />;
};
export default UserAvatarWithAuth;
