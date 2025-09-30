import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import NoticesClient from './parts/NoticesClient'

export default function NoticesPage() {
  // 서버에서 목업 데이터를 구성 (나중에 fetch 대체)
  const RAW_NOTICES = [
    { id: 101, title: '홈페이지 공지 안내', date: '2025-08-02', summary: '서비스 개선 관련 공지입니다.', type: '공지', views: 331 },
    { id: 100, title: '홈페이지 공지4 안내', date: '2025-08-02', summary: '일부 기능 업데이트 안내.', type: '공지', views: 122 },
    { id: 99, title: '홈페이지 공지 안내', date: '2025-08-02', summary: '서비스 안정화 공지.', type: '공지', views: 331 },
    { id: 2, title: '홈페이지 공지2 안내', date: '2025-08-02', summary: '대회 관련 공지입니다.', type: '대회', views: 687 },
    { id: 1, title: '홈페이지 공지3 안내', date: '2025-08-02', summary: '이벤트 안내입니다.', type: '이벤트', views: 112 },
  ] as const
  const MOCK_NOTICES = [
    ...RAW_NOTICES,
    ...Array.from({ length: 18 }).map((_, i) => ({
      id: 80 - i,
      title: `일반 공지 ${i + 1}`,
      date: '2025-07-15',
      summary: '일반 공지입니다.',
      views: 200 + i * 3,
    })),
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8 py-10">
        <div className="max-w-[1440px] mx-auto">
          {/* 돌아가기 */}
          <div className="mb-8">
            <Link href="/support" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">고객센터로 돌아가기</span>
            </Link>
          </div>

          {/* 제목 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">공지사항</h1>
            <p className="mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400">LPick의 최신 소식과 안내를 확인하세요.</p>
          </div>

          {/* 검색 */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                placeholder="공지사항 검색..."
                className="w-full rounded-full border border-gray-200 bg-white px-10 py-3 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          <NoticesClient notices={MOCK_NOTICES} />
        </div>
      </div>
    </div>
  )
}


