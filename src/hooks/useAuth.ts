import { useState, useEffect, useCallback } from 'react';
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

      // HttpOnly 쿠키 환경에서는 바로 API 호출로 인증 상태 확인
      // /api/v1/user-info 호출이 성공하면 로그인됨 + 사용자 정보도 함께 로드
      await getUserInfo(); 
      
      // API 호출이 성공하면 로그인된 상태
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('인증 확인 중 오류:', error);
      // API 호출 실패 = 로그인 안됨 (401 등)
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