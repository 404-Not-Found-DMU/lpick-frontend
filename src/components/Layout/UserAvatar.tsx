// /components/AuthButton.tsx
'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import Link from 'next/link';

export const AuthButton = () => {
  const router = useRouter();

  return (
    <Button variant="fill" size="sm" onClick={() => router.push('/login')}>
      로그인
    </Button>
  );
}

export const UserAvatar = () => {
  return (
    <Link href="/mypage">
      😎
    </Link>
  );
}

export const UserAvatarWithAuth = () => {
    const isAuthenticated = false; // 로그인 관련 로직 작성 필요
    
    return isAuthenticated ? (
        <UserAvatar />
    ) : (
        <AuthButton />
    );
}
export default UserAvatarWithAuth;
