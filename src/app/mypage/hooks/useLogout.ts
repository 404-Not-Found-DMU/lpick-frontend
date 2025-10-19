import { useRouter } from 'next/navigation';
import { logout } from '@/app/login/hooks/auth.api';
import { useUserStore } from '@/store/userStore';

export const useLogout = () => {
  const router = useRouter();
  const { clearUserInfo } = useUserStore();

  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 API 호출 (쿠키 삭제)
      await logout();
      
      // 프론트엔드 상태 초기화
      clearUserInfo();
      
      // 로그인 페이지로 리다이렉트
      router.push('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // API 호출이 실패해도 프론트엔드 상태는 초기화
      clearUserInfo();
      router.push('/login');
    }
  };

  return { handleLogout };
};