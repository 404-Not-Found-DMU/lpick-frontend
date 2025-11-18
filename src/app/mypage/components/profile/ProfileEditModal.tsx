'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Save, Loader2 } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useMyPageStore } from '@/store/myPageStore';
import { updateUserProfile } from '@/shared/api/user.api';
import { getErrorMessage } from '@/app/signup/utils/validation.utils';
import ProfileImageInput from './ProfileImageInput';
import NicknameInput from './NicknameInput';
import BioInput from './BioInput';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose }) => {
  const { userInfo, updateUserInfo } = useUserStore();
  const { syncUserInfo } = useMyPageStore();
  
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드에서만 포탈 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  // 모달이 열릴 때 현재 사용자 정보로 초기화
  useEffect(() => {
    if (isOpen && userInfo) {
      setNickname(userInfo.nickname || '');
      setBio(userInfo.about || '');
      setProfileImg(userInfo.profile || null);
      setProfileFile(null);
      setError(null);
    }
  }, [isOpen, userInfo]);

  const handleProfileImageChange = (img: string | null, file: File | null) => {
    setProfileImg(img);
    setProfileFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    if (nickname.trim().length < 2 || nickname.trim().length > 16) {
      setError('닉네임은 2-16자 사이로 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 프로필 업데이트 API 호출
      const formData = new FormData();
      
      // 사용자 정보 JSON 추가 (회원가입과 동일한 형태로 userinfo 키 사용)
      const userInfoData = {
        nickname: nickname.trim(),
        about: bio.trim() || undefined,
      };
      
      formData.append('userinfo', JSON.stringify(userInfoData));
      
      // 프로필 이미지가 있으면 추가
      if (profileFile) {
        formData.append('profileImage', profileFile);
      }

      const response = await updateUserProfile(formData);

      console.log('프로필 업데이트 성공:', response);
      
      // 스토어 업데이트
      updateUserInfo({
        nickname: nickname.trim(),
        about: bio.trim(),
        profile: profileImg || userInfo?.profile,
      });
      
      // 마이페이지 스토어 동기화
      syncUserInfo();
      
      onClose();
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
      style={{ zIndex: 99999 }}
    >
      <div className="relative w-full max-w-md">
        {/* 배경 장식 요소들 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* 그라데이션 오브 */}
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-bl from-lavender-200/20 to-transparent blur-3xl dark:from-lavender-800/10" />
        </div>

        {/* 모달 콘텐츠 */}
        <div 
          className="relative z-[100000] animate-fade-in rounded-2xl bg-white/95 shadow-xl ring-1 ring-lavender-100 backdrop-blur-md dark:bg-gray-900/95 dark:ring-gray-800"
          style={{ zIndex: 100000 }}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">프로필 편집</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* 폼 콘텐츠 */}
          <form onSubmit={handleSubmit} className="px-6 py-6">
            <ProfileImageInput value={profileImg} onChange={handleProfileImageChange} />
            
            <div className="space-y-5">
              <NicknameInput value={nickname} onChange={setNickname} />
              <BioInput value={bio} onChange={setBio} />
            </div>
            
            {/* 에러 메시지 */}
            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}
            
            {/* 버튼 영역 */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-base font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-base font-bold text-white shadow-xl transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    저장
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // 포탈을 사용해서 body에 직접 렌더링
  return createPortal(modalContent, document.body);
};

export default ProfileEditModal;