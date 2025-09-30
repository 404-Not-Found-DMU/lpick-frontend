'use client';

import { useState } from 'react';
import ProfileImageInput from './ProfileImageInput';
import NicknameInput from './NicknameInput';
import BioInput from './BioInput';
import { useRouter } from 'next/navigation';

const SignupForm: React.FC = () => {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in w-full rounded-2xl bg-white/95 px-6 py-7 shadow-xl ring-1 ring-lavender-100 backdrop-blur-md dark:bg-gray-900/95 dark:ring-gray-800 sm:px-8 sm:py-10"
    >
      <ProfileImageInput value={profileImg} onChange={setProfileImg} />
      <div className="space-y-5">
        <NicknameInput value={nickname} onChange={setNickname} />
        <BioInput value={bio} onChange={setBio} />
      </div>
      <button
        type="submit"
        className="mt-7 w-full rounded-xl bg-violet-500 px-6 py-3 text-lg font-bold text-white shadow-xl transition hover:bg-violet-700"
      >
        시작하기
      </button>
    </form>
  );
};

export default SignupForm;
