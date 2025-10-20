'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

import type { UseWelcomeModalReturn } from '../types/index';

/**
 * 환영 모달 관리 훅
 * - 로그인한 사용자에게 항상 모달 표시
 * - 모달 표시/숨김 상태 관리  
 * - LPTI 검사 페이지 이동
 */
export const useWelcomeModal = (): UseWelcomeModalReturn => {
  const router = useRouter();
  const { userInfo } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 사용자 정보가 있으면 항상 모달 표시
    if (userInfo) {
      setIsModalOpen(true);
    }
  }, [userInfo]);

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