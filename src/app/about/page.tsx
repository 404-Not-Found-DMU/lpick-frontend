import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  BookOpen, 
  Disc, 
  Sparkles, 
  Users, 
  Award, 
  Mic2, 
  Cpu, 
  Music, 
  ArrowRight, 
  Quote
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components';

export const metadata: Metadata = {
  title: 'LPick 소개 - 아날로그 감성과 디지털의 만남',
  description: '음악 애호가와 오디오 매니아를 위한 올인원 플랫폼 LPick. 위키, LPTI 취향 분석, LPlayer, 전문가 커뮤니티를 경험해보세요.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-violet-100 selection:text-violet-900 dark:selection:bg-violet-900 dark:selection:text-violet-100">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-violet-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10 mask-image-gradient-to-b" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="outline" className="mb-6 px-4 py-1 border-violet-200 text-violet-700 dark:border-violet-800 dark:text-violet-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            Premium Audio Community Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            LPick
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            아날로그의 따뜻함과 디지털의 편리함이 만나는 곳.<br className="hidden md:block" />
            당신의 음악적 취향을 발견하고, 깊이 있는 지식을 나누세요.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/wiki">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-8 shadow-lg shadow-violet-200 dark:shadow-none">
                위키 탐험하기
              </Button>
            </Link>
            <Link href="/lpti">
              <Button variant="outline" size="lg" className="border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-300 dark:hover:bg-violet-900/20">
                내 취향 찾기 (LPTI)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Features Grid */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">LPick만의 특별한 경험</h2>
            <p className="text-gray-500 dark:text-gray-400">단순한 커뮤니티를 넘어선, 오디오 라이프스타일 플랫폼</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Wiki */}
            <Card className="border-t-4 border-t-violet-500 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <CardTitle className="text-xl">집단지성의 힘, 위키</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300">
                <p className="mb-4">
                  아티스트, 명반(LP), 그리고 오디오 장비까지. 누구나 문서를 작성하고 수정할 수 있는 개방형 지식 저장소입니다.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" /> 인기 문서 및 최근 수정 내역 실시간 반영
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" /> 체계적인 버전 관리와 리뷰 시스템
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* LPTI */}
            <Card className="border-t-4 border-t-pink-500 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle className="text-xl">음악 성향 분석 LPTI</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300">
                <p className="mb-4">
                  LPick Taste Indicator. 4가지 척도를 통해 당신의 숨겨진 음악적 취향을 분석해드립니다.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="flex justify-between px-2 py-1 bg-white dark:bg-gray-800 rounded shadow-sm"><span>Energy</span><span>Calm</span></div>
                  <div className="flex justify-between px-2 py-1 bg-white dark:bg-gray-800 rounded shadow-sm"><span>Analog</span><span>Modern</span></div>
                  <div className="flex justify-between px-2 py-1 bg-white dark:bg-gray-800 rounded shadow-sm"><span>Inst.</span><span>Vocal</span></div>
                  <div className="flex justify-between px-2 py-1 bg-white dark:bg-gray-800 rounded shadow-sm"><span>Exper.</span><span>Stable</span></div>
                </div>
              </CardContent>
            </Card>

            {/* LPlayer */}
            <Card className="border-t-4 border-t-indigo-500 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                  <Disc className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-xl">웹에서 즐기는 LPlayer</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300">
                <p className="mb-4">
                  소중한 LP 녹음 파일을 클라우드에 업로드하고 언제 어디서나 감상하세요.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-indigo-400" /> 가사 지원 및 미니 플레이어
                  </li>
                  <li className="flex items-center gap-2">
                    <Mic2 className="w-4 h-4 text-indigo-400" /> 개인 라이브러리 관리
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Community & Debate */}
            <Card className="border-t-4 border-t-emerald-500 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl">실시간 토론과 커뮤니티</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300">
                <p className="mb-4">
                  단순한 게시판을 넘어, 주제별 실시간 토론(Debate) 기능을 통해 깊이 있는 대화를 나눌 수 있습니다.
                </p>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 italic">
                  &quot;이 앰프와 매칭되는 스피커는?&quot;
                </p>
              </CardContent>
            </Card>

            {/* Expert System */}
            <Card className="border-t-4 border-t-amber-500 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-xl">검증된 전문가 시스템</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300">
                <p className="mb-4">
                  음향/디스크 분야의 검증된 전문가들이 제공하는 신뢰할 수 있는 정보와 답변을 만나보세요.
                </p>
                <Link href="/support/expert" className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
                  전문가 등업 신청하기 <ArrowRight className="w-3 h-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Philosophy / Quote */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 text-center">
          <Quote className="w-10 h-10 text-violet-300 mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-serif italic text-gray-800 dark:text-gray-200 mb-8 max-w-4xl mx-auto">
            &ldquo;음악은 시간의 예술이며, LP는 그 시간을 가장 아름답게 기록하는 매체입니다.<br />
            LPick은 그 기록을 영원히 기억하고 공유하는 공간입니다.&rdquo;
          </h3>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
             <span>Since 2024</span>
             <span>Frontend by Team 404 Not Found</span>
          </div>
        </div>
      </section>

      {/* 4. Tech Stack & Developer Info */}
      <section className="py-20 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-gray-400" />
                Technology
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                LPick은 최신 웹 기술을 사용하여 빠르고 부드러운 사용자 경험을 제공합니다.
                Next.js App Router와 React Server Components를 기반으로 설계되었습니다.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
               <div className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">Next.js 15</div>
               <div className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">TypeScript</div>
               <div className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">Tailwind CSS</div>
               <div className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">Zustand</div>
               <div className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">React Query</div>
               <div className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">WebSocket</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
