'use client';

import { X, PartyPopper, Music, Target } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/Button';
import type { WelcomeModalProps } from '../types/index';

const WelcomeModal = ({ 
  isOpen, 
  onClose, 
  userInfo, 
  onTakeLPTI 
}: WelcomeModalProps) => {
  if (!isOpen) return null;

  // userInfo가 없을 때 기본값 사용
  const displayUserInfo = userInfo || {
    nickname: '새로운 멤버',
    profile: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop&crop=face',
    about: 'LPick에 오신 것을 환영합니다! 음악과 함께하는 특별한 여행을 시작해보세요.'
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        //onClick={onClose}
        aria-hidden="true"
      />
      
      {/* 모달 컨텐츠 */}
      <div className="relative w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] overflow-y-auto sm:rounded-3xl rounded-2xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors backdrop-blur-sm"
          aria-label="환영 모달 닫기"
          title="모달 닫기 (ESC)"
        >
          <X size={18} className="text-gray-500 dark:text-gray-400" />
        </button>

        {/* 헤더 - 메인 색상 배경 */}
        <div className="relative px-6 sm:px-8 pt-12 pb-6 bg-gradient-to-br from-violet-500 to-lavender-400 text-white">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white/20 rounded-full backdrop-blur-sm">
              <PartyPopper size={32} className="text-white" />
            </div>
            <h2 id="welcome-modal-title" className="text-2xl font-bold mb-2">
              환영합니다!
            </h2>
            <p className="text-white/90 text-sm">
              LPick 커뮤니티에 가입해주셔서 감사합니다
            </p>
          </div>
        </div>

        {/* 사용자 정보 */}
        <div className="px-6 sm:px-8 py-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-4">
            {/* 프로필 이미지 */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 ring-4 ring-white dark:ring-gray-900 shadow-lg">
                {displayUserInfo.profile ? (
                  <Image
                    src={displayUserInfo.profile}
                    alt={`${displayUserInfo.nickname}님의 프로필`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-lavender-400 text-white text-xl font-bold">
                    {displayUserInfo.nickname.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* 사용자 정보 */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {displayUserInfo.nickname}
              </h3>
              {displayUserInfo.about && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {displayUserInfo.about}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="px-6 sm:px-8 py-6">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-center">
              음악을 사랑하는 분들과 함께하는 특별한 공간입니다.
              <br />
              나만의 음악 취향을 발견해보세요!
            </p>

            <div className="bg-gradient-to-r from-violet-50 to-lavender-50 dark:from-violet-900/20 dark:to-lavender-900/20 rounded-xl p-4 border border-violet-100 dark:border-violet-800/30">
              <div className="flex items-center space-x-2 mb-2">
                <Music size={18} className="text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
                  LPTI 검사 추천
                </span>
              </div>
              <p className="text-xs text-violet-600 dark:text-violet-400 leading-relaxed">
                나의 음악 성향을 알아보고 맞춤형 추천을 받아보세요
              </p>
            </div>
          </div>
        </div>

        {/* 하단 액션 버튼 */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              onClick={onTakeLPTI}
              className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-medium py-3 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Target size={20} />
              <span>LPTI 검사하기</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;