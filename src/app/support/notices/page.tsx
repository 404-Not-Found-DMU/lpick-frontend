'use client'

import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'

const MOCK_NOTICES = [
  { id: 1, title: 'LPick 서비스 점검 안내 (3/15)', date: '2025-03-12', summary: '안정적인 서비스 제공을 위한 정기 점검을 진행합니다.' },
  { id: 2, title: '개인정보 처리방침 개정 안내', date: '2025-02-28', summary: '정책 개정 사항 및 주요 변경 내용을 안내드립니다.' },
  { id: 3, title: '신규 기능 출시: 전문가 등업 신청', date: '2025-02-10', summary: '전문가 인증 프로세스가 오픈되었습니다.' },
]

export default function NoticesPage() {
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

          {/* 목록 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
              <div className="col-span-2">번호</div>
              <div className="col-span-7">제목</div>
              <div className="col-span-2 text-center">작성일</div>
              <div className="col-span-1 text-right">조회수</div>
            </div>
            {MOCK_NOTICES.map((n, idx) => (
              <Link key={n.id} href={`/support/notices/${n.id}`} className="block">
                <div className={`grid grid-cols-12 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/60 ${idx % 2 === 1 ? 'bg-gray-50/50 dark:bg-gray-800/40' : ''}`}>
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-gray-900 text-white px-2 py-0.5 text-[11px]">공지</span>
                  </div>
                  <div className="col-span-7">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{n.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{n.summary}</p>
                  </div>
                  <div className="col-span-2 text-center text-sm text-gray-500">{n.date}</div>
                  <div className="col-span-1 text-right text-sm text-gray-500">{(300 + idx * 100).toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


