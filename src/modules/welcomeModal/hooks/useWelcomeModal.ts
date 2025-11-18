'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@/store/userStore';
import { UserInfo } from '@/app/login/types/user.types';
import { 
  UseWelcomeModalReturn, 
  WelcomeModalUserInfo 
} from '../types';

/**
 * 환영 모달 관리 훅
 * - LPTI가 없는 사용자에게만 모달 표시
 * - 모달 표시/숨김 상태 관리  
 * - LPTI 검사 페이지 이동
 * - 사용자 정보 로딩 완료 후 모달 표시
 */
export const useWelcomeModal = (): UseWelcomeModalReturn => {
  const router = useRouter();
  const { userInfo, isLoading } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 로딩 중이면 대기
    if (isLoading) {
      return;
    }

    // 사용자 정보가 있고 닉네임이 있을 때만 모달 표시 여부 결정
    if (userInfo && userInfo.nickname) {
      const hasLPTI = checkUserHasLPTI(userInfo);
      setIsModalOpen(!hasLPTI);
    } else {
      // 사용자 정보가 없거나 불완전한 경우 모달 표시하지 않음
      setIsModalOpen(false);
    }
  }, [userInfo, isLoading]);

  // LPTI 존재 여부 검사 함수
  const checkUserHasLPTI = (user: UserInfo & { lpti?: string | { code: string } }): boolean => {
    if (!user.lpti) return false;
    
    // LPTI가 문자열인 경우
    if (typeof user.lpti === 'string') {
      return user.lpti.trim() !== '';
    }
    
    // LPTI가 객체인 경우
    if (typeof user.lpti === 'object') {
      return !!(user.lpti.code && user.lpti.code.trim() !== '');
    }
    
    return false;
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTakeLPTI = () => {
    closeModal();
    // LPTI 검사 페이지로 이동
    router.push('/lpti');
  };

  // 실제 사용자 정보를 우선 사용, 로딩 중이거나 없을 때는 기본값 사용
  // 사용자 정보를 WelcomeModalUserInfo 형태로 변환
  const modalUserInfo: WelcomeModalUserInfo = userInfo && userInfo.nickname ? {
    nickname: userInfo.nickname,
    about: userInfo.about,
    profile: userInfo.profile,
    lpti: typeof userInfo.lpti === 'string' ? userInfo.lpti : userInfo.lpti?.code,
    point: 0 // 기본값 설정 (실제 API에서 point 정보가 있다면 해당 값 사용)
  } : {
    nickname: '새로운 멤버',
    profile: null,
    about: 'LPick에 오신 것을 환영합니다!'
  };

  return {
    isModalOpen,
    closeModal,
    handleTakeLPTI,
    userInfo: modalUserInfo,
    isLoading // 로딩 상태도 반환
  };
};