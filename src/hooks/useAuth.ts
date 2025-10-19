import { useState, useEffect, useCallback } from 'react';
import { hasAnyAuthToken } from '@/utils';
import { useUserStore } from '@/store/userStore';

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { getUserInfo, clearUserInfo } = useUserStore();

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // 클라이언트 환경에서만 실행
      if (typeof window === 'undefined') {
        setIsAuthenticated(false);
        return;
      }

      // 쿠키에 토큰이 있는지 확인
      const hasToken = hasAnyAuthToken();
      
      if (!hasToken) {
        setIsAuthenticated(false);
        clearUserInfo(); // 토큰이 없으면 사용자 정보도 클리어
        return;
      }

      // 토큰이 있으면 로그인 상태로 간주하고 사용자 정보 로드
      setIsAuthenticated(true);
      await getUserInfo(); // 사용자 정보 자동 로드
      
    } catch (error) {
      console.error('인증 확인 중 오류:', error);
      setIsAuthenticated(false);
      clearUserInfo();
    } finally {
      setIsLoading(false);
    }
  }, [getUserInfo, clearUserInfo]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isAuthenticated, isLoading, checkAuth };
};