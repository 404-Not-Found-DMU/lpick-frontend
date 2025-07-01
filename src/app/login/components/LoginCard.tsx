'use client';
import { useState } from 'react';
import Link from 'next/link';
import KakaoIcon from '@/assets/icons/KakaoIcon';

const LoginCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleKakaoLogin = async () => {
    setIsLoading(true);
    try {
      console.log('카카오 로그인 시도');
    } catch (error) {
      console.error('로그인 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center lg:justify-end">
      <div className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[420px]">
        {/* 로그인 카드 */}
        <div className="animate-fade-in animation-delay-300 rounded-2xl border border-white/20 bg-white/80 p-5 shadow-2xl backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-800/80 sm:p-6 lg:p-8">
          <div className="mb-4 text-center sm:mb-6 lg:mb-8">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full shadow-lg sm:h-12 sm:w-12 lg:h-16 lg:w-16">
              {/* LP 레코드 배경 */}
              <div className="animate-fade-in animation-delay-200 relative mb-4 flex justify-center opacity-0 sm:mb-6 lg:mb-8">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gray-900 shadow-2xl dark:bg-black sm:h-32 sm:w-32 lg:h-48 lg:w-48">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-700 opacity-30 dark:border-gray-600"></div>
                    <div className="absolute inset-[15px] rounded-full border-2 border-gray-700 opacity-20 dark:border-gray-600 sm:inset-[20px] lg:inset-[30px]"></div>
                    <div className="absolute inset-[30px] rounded-full border-2 border-gray-700 opacity-20 dark:border-gray-600 sm:inset-[40px] lg:inset-[60px]"></div>
                    <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-violet-500 dark:bg-violet-400 sm:h-12 sm:w-12 lg:h-16 lg:w-16">
                      <div className="h-3 w-3 rounded-full bg-gray-900 dark:bg-black sm:h-4 sm:w-4 lg:h-6 lg:w-6"></div>
                    </div>
                  </div>
                  {/* 반짝이는 효과 */}
                  <div className="absolute right-4 top-4 h-1.5 w-1.5 animate-ping rounded-full bg-white opacity-100 sm:right-6 sm:top-6 sm:h-2 sm:w-2 lg:right-8 lg:top-8 lg:h-3 lg:w-3"></div>
                  <div className="absolute bottom-6 left-3 h-1 w-1 animate-pulse rounded-full bg-violet-300 sm:bottom-8 sm:left-4 sm:h-1.5 sm:w-1.5 lg:bottom-12 lg:left-6 lg:h-2 lg:w-2"></div>
                </div>
              </div>
            </div>
            <h2 className="mb-2 mt-3 text-lg font-bold text-gray-900 dark:text-white sm:text-xl lg:text-2xl">
              LPick에 오신 것을 환영합니다
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-300 sm:text-sm lg:text-base">
              로그인하고 LP 음악의 세계를 탐험하세요
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <button
              onClick={handleKakaoLogin}
              disabled={isLoading}
              className="flex h-10 w-full transform items-center justify-center space-x-2 rounded-xl bg-[#FEE500] font-medium text-black shadow-lg transition-all hover:scale-105 hover:bg-[#FDD835] hover:shadow-xl sm:h-12 lg:h-14"
            >
              <KakaoIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              <span className="text-sm sm:text-base lg:text-lg">카카오로 시작하기</span>
            </button>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-3 dark:border-gray-600 sm:mt-6 sm:pt-4 lg:mt-8 lg:pt-6">
            <p className="text-center text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              로그인 시 LPick의{' '}
              <Link href="/terms" className="text-violet-500 hover:underline dark:text-violet-400">
                이용약관
              </Link>{' '}
              및{' '}
              <Link
                href="/privacy"
                className="text-violet-500 hover:underline dark:text-violet-400"
              >
                개인정보처리방침
              </Link>
              에 동의하시는 것으로 간주합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;