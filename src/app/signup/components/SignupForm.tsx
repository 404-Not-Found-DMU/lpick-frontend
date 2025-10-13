'use client';

import { useState } from 'react';
import ProfileImageInput from './ProfileImageInput';
import NicknameInput from './NicknameInput';
import BioInput from './BioInput';
import { useRouter } from 'next/navigation';
import { registerUser } from '../hooks/registration.api';
import { RegisterUserParams } from '../types/registration.types';
import { getErrorMessage, validateNickname } from '../utils/validation.utils';

const SignupForm: React.FC = () => {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleProfileImageChange = (img: string | null, file: File | null) => {
    setProfileImg(img);
    setProfileFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 닉네임 유효성 검증
    const nicknameError = validateNickname(nickname);
    if (nicknameError) {
      setError(nicknameError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 회원가입 API 호출 (multipart/form-data)
      const registrationParams: RegisterUserParams = {
        userInfo: {
          nickname: nickname.trim(),
          about: bio.trim() || undefined,
        },
        profileImage: profileFile,
      };

      const response = await registerUser(registrationParams);

      console.log('회원가입 성공:', response);
      
      // 성공시 홈페이지로 이동
      router.push('/');
    } catch (error) {
      console.error('회원가입 오류:', error);
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in w-full rounded-2xl bg-white/95 px-6 py-7 shadow-xl ring-1 ring-lavender-100 backdrop-blur-md dark:bg-gray-900/95 dark:ring-gray-800 sm:px-8 sm:py-10"
    >
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
      
      <button
        type="submit"
        disabled={isLoading}
        className="mt-7 w-full rounded-xl bg-violet-500 px-6 py-3 text-lg font-bold text-white shadow-xl transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? '가입 중...' : '시작하기'}
      </button>
    </form>
  );
};

export default SignupForm;
