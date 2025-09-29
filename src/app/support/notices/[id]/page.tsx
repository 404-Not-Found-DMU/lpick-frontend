'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NoticeDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  // 실제 구현 시 id로 서버 데이터 fetch
  const notice = {
    id,
    title: `공지사항 #${id} 상세 제목입니다`,
    date: '2025-03-12',
    content:
      '안정적인 서비스 제공을 위한 점검을 진행합니다. 점검 시간 동안 일부 기능이 제한될 수 있습니다. 이용에 불편을 드려 죄송합니다.',
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8 py-10">
        <div className="max-w-[1440px] mx-auto">
          {/* 돌아가기 */}
          <div className="mb-8">
            <Link href="/support/notices" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">공지사항 목록으로</span>
            </Link>
          </div>

          {/* 본문 */}
          <article className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <header className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{notice.title}</h1>
              <time className="text-sm text-gray-400 dark:text-gray-500">{notice.date}</time>
            </header>
            <div className="prose prose-sm md:prose-base max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
              <p>{notice.content}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}


