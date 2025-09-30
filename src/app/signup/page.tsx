import { Music } from 'lucide-react';
import SignupForm from './components/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="relative flex min-h-0 w-full flex-1 bg-gradient-to-br from-lavender-50 via-white to-indigo-50 px-0 py-0 dark:from-gray-900 dark:via-gray-800 dark:to-lavender-900/20 sm:px-0 sm:py-0 lg:px-0 lg:py-0">
      {/* 배경 장식 요소들 (떠다니는 음표만 남김) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 떠다니는 음표 아이콘 */}
        <div className="absolute left-8 top-24 animate-[float_14s_ease-in-out_infinite] text-lavender-300/30 dark:text-lavender-400/10 sm:left-16 sm:top-32">
          <Music className="h-24 w-24 sm:h-32 sm:w-32" />
        </div>
        {/* 그라데이션 오브(1개만) */}
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gradient-to-bl from-lavender-200/20 to-transparent blur-3xl dark:from-lavender-800/10 sm:h-96 sm:w-96" />
      </div>

      {/* 메인 콘텐츠 */}
      <main className="relative z-10 flex flex-1 items-center justify-center py-8 sm:py-16">
        <div className="flex w-full max-w-md flex-col items-center">
          {/* 헤더/로고 영역 */}
          <div className="mb-8 flex w-full flex-col items-center">
            <div className="mb-2 flex w-full items-center justify-center">
              <span
                className="select-none text-4xl font-bold tracking-tight text-gray-900 drop-shadow-sm dark:text-gray-100"
                style={{ letterSpacing: '-0.02em' }}
              >
                LPick
              </span>
            </div>
            <div className="max-w-2xl text-lg text-gray-500 dark:text-gray-400">
              음악 커뮤니티 회원가입
            </div>
          </div>
          <SignupForm />
          {/* 하단 안내 */}
          <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="font-semibold text-violet-500 hover:underline">
              로그인
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
