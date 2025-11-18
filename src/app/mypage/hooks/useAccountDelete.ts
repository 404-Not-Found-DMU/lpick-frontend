import { useState } from 'react';
import { fetcher } from '@/hooks/api/fetchers';
import { useUserStore } from '@/store/userStore';
import { setLoggedOutState } from '@/hooks/api/fetchers';

/**
 * 계정 삭제 API
 * @param oauthId 사용자의 OAuth ID
 */
const deleteAccount = async (oauthId: string): Promise<void> => {
  try {
    await fetcher(`/api/v1/auth/${oauthId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('계정 삭제 오류:', error);
    throw error;
  }
};

export const useAccountDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo, clearUserInfo } = useUserStore();

  const handleDeleteAccount = async () => {
    if (!userInfo?.oauthId) {
      throw new Error('사용자 정보를 찾을 수 없습니다.');
    }

    const confirmed = window.confirm(
      `정말로 계정을 삭제하시겠습니까?\n\n삭제된 계정은 복구할 수 없으며, 모든 데이터가 영구적으로 사라집니다.\n\n계속 진행하려면 "확인"을 클릭하세요.`
    );

    if (!confirmed) {
      return;
    }

    setIsLoading(true);

    try {
      // 계정 삭제 상태 설정 (자동 토큰 갱신 방지)
      setLoggedOutState(true);
      
      // 백엔드 계정 삭제 API 호출 (쿠키도 함께 삭제됨)
      await deleteAccount(userInfo.oauthId);
      
      alert('계정이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('계정 삭제 실패:', error);
      alert('계정 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.');
      return; // 에러 발생 시 더 이상 진행하지 않음
    } finally {
      setIsLoading(false);
    }

    // 성공한 경우에만 실행
    try {
      // 프론트엔드 상태 초기화
      clearUserInfo();
      
      // 홈페이지로 리다이렉트 (전체 페이지 새로고침으로 완전히 초기화)
      window.location.href = '/';
    } catch (error) {
      console.error('프론트엔드 정리 중 오류:', error);
      // 상태 정리 실패해도 홈으로 이동
      window.location.href = '/';
    }
  };

  return {
    handleDeleteAccount,
    isLoading,
  };
};