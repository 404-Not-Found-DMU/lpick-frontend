'use client';

import { useState, useEffect, useRef } from 'react';
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
  const { userInfo, isLoading, getUserInfo } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasTriedLoading = useRef(false); // 로딩 시도 여부 추적

  useEffect(() => {
    const loadUserInfoAndShowModal = async () => {
      // 중복 실행 방지
      if (hasTriedLoading.current) return;

      try {
        hasTriedLoading.current = true;
        
        // 사용자 정보가 없으면 먼저 로딩
        if (!userInfo && !isLoading) {
          await getUserInfo();
        }
        
      } catch {
        // 로딩 실패시 에러 처리만 하고 모달은 표시하지 않음
      }
    };

    // 페이지 로드 완료 후 실행
    if (!isLoading) {
      loadUserInfoAndShowModal();
    }
  }, [isLoading, userInfo, getUserInfo]);

  // 별도 useEffect로 LPTI 검사 및 모달 표시
  useEffect(() => {
    // 사용자 정보가 있고, LPTI 정보가 없거나 코드가 빈 값일 때만 모달 표시
    if (userInfo && (!userInfo.lpti || !userInfo.lpti.code || userInfo.lpti.code.trim() === '')) {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 500);
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

  // 실제 사용자 정보를 우선 사용, 없을 때만 기본값 사용
  const modalUserInfo = userInfo || {
    nickname: '새로운 멤버',
    profile: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop&crop=face',
    about: 'LPick에 오신 것을 환영합니다! 음악과 함께하는 특별한 여행을 시작해보세요.'
  };

  return {
    isModalOpen,
    closeModal,
    handleTakeLPTI,
    userInfo: modalUserInfo
  };
};