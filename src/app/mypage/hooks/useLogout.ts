import { logout } from '@/app/login/hooks/auth.api';
import { useUserStore } from '@/store/userStore';
import { setLoggedOutState } from '@/hooks/api/fetchers';

export const useLogout = () => {
  const { clearUserInfo } = useUserStore();

  const handleLogout = async () => {
    try {
      // 로그아웃 상태 먼저 설정 (토큰 갱신 방지)
      setLoggedOutState(true);
      
      // 백엔드 로그아웃 API 호출 (쿠키 삭제)
      await logout();
      
      // 프론트엔드 상태 초기화
      clearUserInfo();
      
      // 브라우저 캐시 무력화를 위해 전체 페이지 리로드
      window.location.href = '/login';
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // API 호출이 실패해도 로그아웃 상태 설정
      setLoggedOutState(true);
      // 프론트엔드 상태 초기화
      clearUserInfo();
      window.location.href = '/login';
    }
  };

  return { handleLogout };
};