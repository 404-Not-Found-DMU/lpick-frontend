'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, User } from 'lucide-react';

const ProfileSection = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
      <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">프로필</h2>

      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="프로필"
                width={96}
                height={96}
                className="h-full w-full object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>

          <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-violet-500 p-2 text-white shadow-lg hover:bg-indigo-600">
            <Camera className="h-4 w-4" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

        <h3 className="text-lg font-medium text-gray-900 dark:text-white">홍길동</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">user@example.com</p>

        <button className="mt-4 rounded-lg bg-violet-500 px-4 py-2 text-sm text-white hover:bg-violet-600">
          프로필 편집
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
