import { Music, Disc, Users, BookOpen, Sparkles } from 'lucide-react';
import LoginCard from './components/LoginCard';
import FeatureCard from './components/FeatureCard';

const LoginPage = () => {
  return (
    <div className="relative flex-1 flex min-h-0 w-full bg-gradient-to-br from-lavender-50 via-white to-indigo-50 px-4 py-4 dark:from-gray-900 dark:via-gray-800 dark:to-lavender-900/20 sm:px-8 sm:py-6 lg:px-12 lg:py-8">
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
      <main className="relative z-10 flex flex-1 items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            {/* 왼쪽 섹션 */}
            <div className="flex flex-col space-y-8">
              {/* 메인 타이틀 */}
              <div className="order-1 text-center lg:order-1 lg:text-left">
                <div className="animate-slide-up mb-4 inline-flex items-center rounded-full bg-lavender-100 px-3 py-1.5 text-xs font-medium text-lavender-600 dark:bg-lavender-900/30 dark:text-lavender-400 sm:px-4 sm:py-2 sm:text-sm">
                  <Sparkles className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  LP 음악의 새로운 경험
                </div>
                <h1 className="animate-slide-up mb-4 text-3xl font-bold text-gray-900 delay-100 dark:text-white sm:text-4xl lg:text-5xl">
                  음악의 세계로
                  <br />
                  <span className="bg-gradient-to-r from-lavender-500 to-indigo-500 bg-clip-text text-transparent">
                    초대합니다
                  </span>
                </h1>
                <p className="animate-slide-up mb-6 text-base text-gray-600 delay-200 dark:text-gray-300 sm:text-lg">
                  LP 컬렉션을 관리하고 음악 애호가들과 소통하는 공간,
                  <br className="hidden sm:block" />
                  LPick에서 당신만의 음악 여정을 시작하세요.
                </p>
              </div>

              {/* 로그인 카드: 모바일에서는 2번째, 데스크탑에서는 오른쪽 */}
              <div className="order-2 flex justify-center lg:hidden">
                <LoginCard />
              </div>

              {/* 기능 카드 */}
              <div className="animate-slide-up order-3 grid grid-cols-1 gap-2 delay-300 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-4">
                <FeatureCard
                  icon={
                    <Disc className="h-4 w-4 text-lavender-500 dark:text-lavender-400 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  }
                  title="LP 컬렉션"
                  description="나만의 LP 컬렉션을 체계적으로 관리하세요"
                />
                <FeatureCard
                  icon={
                    <Users className="h-4 w-4 text-indigo-500 dark:text-indigo-400 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  }
                  title="커뮤니티"
                  description="음악 애호가들과 취향을 공유하고 소통하세요"
                />
                <FeatureCard
                  icon={
                    <BookOpen className="h-4 w-4 text-purple-500 dark:text-purple-400 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  }
                  title="음악 위키"
                  description="LP와 아티스트 정보를 함께 만들어가세요"
                />
              </div>

              {/* 통계 정보 */}
              <div className="animate-slide-up delay-400 order-4 flex items-center justify-center space-x-3 sm:space-x-4 md:space-x-6 lg:justify-start">
                <div className="text-center">
                  <div className="text-lg font-bold text-lavender-500 dark:text-lavender-400 sm:text-xl lg:text-2xl">
                    10K+
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">LP 정보</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-500 dark:text-indigo-400 sm:text-xl lg:text-2xl">
                    5K+
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                    활성 사용자
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-500 dark:text-purple-400 sm:text-xl lg:text-2xl">
                    50K+
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                    커뮤니티 글
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 섹션: 데스크탑 전용 로그인 카드 */}
            <div className="hidden justify-center lg:flex lg:justify-end h-full items-center">
              <LoginCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
