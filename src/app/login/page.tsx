'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Music, Disc, Headphones, Users, BookOpen, Sparkles } from 'lucide-react';

const LoginPage = () => {
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
    <>
      {/* 페이지 전용 스타일 */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-delayed {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 2s;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite 1s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }

        .animate-bounce-delayed {
          animation: bounce-delayed 5s ease-in-out infinite 1.5s;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>

      <div className="relative flex h-full w-screen px-12 flex-col bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-violet-900/20">
        {/* 배경 장식 요소들 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* 떠다니는 LP 레코드들 */}
          <div className="animate-float absolute left-10 top-20 h-32 w-32 rounded-full bg-gray-800/10 opacity-30 dark:bg-white/5"></div>
          <div className="animate-float-delayed absolute right-20 top-40 h-24 w-24 rounded-full bg-violet-400/20 opacity-40 dark:bg-violet-400/10"></div>
          <div className="animate-float-slow absolute bottom-32 left-1/4 h-20 w-20 rounded-full bg-indigo-400/15 opacity-35 dark:bg-indigo-400/10"></div>
          <div className="animate-float absolute bottom-20 right-1/3 h-28 w-28 rounded-full bg-purple-400/10 opacity-25 dark:bg-purple-400/5"></div>

          {/* 음표 아이콘들 */}
          <div className="left-1/6 animate-bounce-slow absolute top-1/4 text-violet-300/30 dark:text-violet-400/20">
            <Music className="h-8 w-8" />
          </div>
          <div className="animate-bounce-delayed absolute right-1/4 top-1/3 text-indigo-300/30 dark:text-indigo-400/20">
            <Disc className="h-6 w-6" />
          </div>
          <div className="left-1/5 animate-bounce-slow absolute bottom-1/3 text-purple-300/30 dark:text-purple-400/20">
            <Headphones className="h-7 w-7" />
          </div>

          {/* 그라데이션 오브 */}
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gradient-to-bl from-violet-200/30 to-transparent blur-3xl dark:from-violet-800/20"></div>
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-200/30 to-transparent blur-3xl dark:from-indigo-800/20"></div>
        </div>

        {/* 메인 콘텐츠 */}
        <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
          <div className="container mx-auto">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-36 lg:gap-12  lg:grid-cols-2">
              {/* 왼쪽 섹션: 브랜딩 및 기능 소개 */}
              <div className="animate-fade-in space-y-8 opacity-0">
                {/* 메인 타이틀 */}
                <div className="text-center lg:text-left">
                  <div className="animate-slide-up mb-6 inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                    <Sparkles className="mr-2 h-4 w-4" />
                    LP 음악의 새로운 경험
                  </div>
                  <h1 className="animate-slide-up animation-delay-100 mb-6 text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
                    음악의 세계로
                    <br />
                    <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                      초대합니다
                    </span>
                  </h1>
                  <p className="animate-slide-up animation-delay-200 mb-8 text-lg text-gray-600 dark:text-gray-300">
                    LP 컬렉션을 관리하고 음악 애호가들과 소통하는 공간,
                    <br />
                    LPick에서 당신만의 음악 여정을 시작하세요.
                  </p>
                </div>

                {/* 기능 카드들 */}
                <div className="animate-slide-up animation-delay-300 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-white/20 bg-white/70 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/90 dark:border-gray-700/50 dark:bg-gray-800/70 dark:hover:bg-gray-800/90">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                      <Disc className="h-6 w-6 text-violet-500 dark:text-violet-400" />
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">LP 컬렉션</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      나만의 LP 컬렉션을 체계적으로 관리하세요
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/20 bg-white/70 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/90 dark:border-gray-700/50 dark:bg-gray-800/70 dark:hover:bg-gray-800/90">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                      <Users className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">커뮤니티</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      음악 애호가들과 취향을 공유하고 소통하세요
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/20 bg-white/70 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/90 dark:border-gray-700/50 dark:bg-gray-800/70 dark:hover:bg-gray-800/90">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <BookOpen className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">음악 위키</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      LP와 아티스트 정보를 함께 만들어가세요
                    </p>
                  </div>
                </div>

                {/* 통계 정보 */}
                <div className="animate-slide-up animation-delay-400 flex items-center justify-center space-x-8 lg:justify-start">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-500 dark:text-violet-400">
                      10K+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">LP 정보</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">
                      5K+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">활성 사용자</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500 dark:text-purple-400">
                      50K+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">커뮤니티 글</div>
                  </div>
                </div>
              </div>

              {/* 오른쪽 섹션: 로그인 폼 */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-[480px]">
                  {/* 로그인 카드 */}
                  <div className="animate-fade-in animation-delay-300 rounded-2xl border border-white/20 bg-white/80 p-8 opacity-0 shadow-2xl backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-800/80">
                    <div className="mb-8 text-center">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full shadow-lg">
                        {/* LP 레코드 배경 */}
                        <div className="animate-fade-in animation-delay-200 relative mb-8 flex justify-center opacity-0">
                          <div className="relative">
                            <div className="h-48 w-48 rounded-full bg-gray-900 shadow-2xl dark:bg-black">
                              <div className="absolute inset-0 rounded-full border-4 border-gray-700 opacity-30 dark:border-gray-600"></div>
                              <div className="absolute inset-[30px] rounded-full border-2 border-gray-700 opacity-20 dark:border-gray-600"></div>
                              <div className="absolute inset-[60px] rounded-full border-2 border-gray-700 opacity-20 dark:border-gray-600"></div>
                              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-violet-500 dark:bg-violet-400">
                                <div className="h-6 w-6 rounded-full bg-gray-900 dark:bg-black"></div>
                              </div>
                            </div>
                            {/* 반짝이는 효과 */}
                            <div className="absolute right-8 top-8 h-3 w-3 animate-ping rounded-full bg-white opacity-60"></div>
                            <div className="absolute bottom-12 left-6 h-2 w-2 animate-pulse rounded-full bg-violet-300"></div>
                          </div>
                        </div>
                      </div>
                      <h2 className="mb-2 mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                        LPick에 오신 것을 환영합니다
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        로그인하고 LP 음악의 세계를 탐험하세요
                      </p>
                    </div>

                    <div className="space-y-6">
                      <button
                        onClick={handleKakaoLogin}
                        disabled={isLoading}
                        className="flex h-14 w-full transform items-center justify-center space-x-3 rounded-xl bg-[#FEE500] font-semibold text-black shadow-lg transition-all hover:scale-105 hover:bg-[#FDD835] hover:shadow-xl"
                      >
                        <MessageCircle className="h-6 w-6" />
                        <span className="text-lg">카카오로 시작하기</span>
                      </button>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-600">
                      <p className="text-center text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        로그인 시 LPick의{' '}
                        <Link
                          href="/terms"
                          className="text-violet-500 hover:underline dark:text-violet-400"
                        >
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
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginPage;
