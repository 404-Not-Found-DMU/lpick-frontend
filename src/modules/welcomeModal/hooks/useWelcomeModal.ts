'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

import type { UseWelcomeModalReturn } from '../types/index';

/**
 * 환영 모달 관리 훅
 * - LPTI가 없는 사용자에게만 모달 표시
 * - 모달 표시/숨김 상태 관리  
 * - LPTI 검사 페이지 이동
 */
export const useWelcomeModal = (): UseWelcomeModalReturn => {
  const router = useRouter();
  const { userInfo } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 사용자 정보가 있고 LPTI가 없거나 비어있는 경우에만 모달 표시
    if (userInfo) {
      const hasLPTI = checkUserHasLPTI(userInfo);
      setIsModalOpen(!hasLPTI);
    }
  }, [userInfo]);

  // LPTI 존재 여부 검사 함수
  const checkUserHasLPTI = (user: any): boolean => {
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
    // localStorage에 저장하지 않고 단순히 모달만 닫기
    setIsModalOpen(false);
  };

  const handleTakeLPTI = () => {
    closeModal();
    // LPTI 검사 페이지로 이동
    router.push('/lpti');
  };

  // 사용자 정보가 있을 때만 모달에 전달할 정보 생성
  const modalUserInfo = userInfo ? {
    nickname: userInfo.nickname,
    profile: userInfo.profile,
    about: userInfo.about
  } : null;

  return {
    isModalOpen,
    closeModal,
    handleTakeLPTI,
    userInfo: modalUserInfo
  };
};