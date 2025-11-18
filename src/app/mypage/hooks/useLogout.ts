import { logout } from '@/app/login/hooks/auth.api';
import { useUserStore } from '@/store/userStore';

export const useLogout = () => {
  const { clearUserInfo } = useUserStore();

  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 API 호출 (쿠키 삭제 + 로그아웃 상태 자동 설정)
      await logout();
      
      // 프론트엔드 상태 초기화
      clearUserInfo();
      
      // 브라우저 캐시 무력화를 위해 전체 페이지 리로드
      window.location.href = '/login';
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // API 호출이 실패해도 프론트엔드 상태는 초기화
      clearUserInfo();
      window.location.href = '/login';
    }
  };

  return { handleLogout };
};