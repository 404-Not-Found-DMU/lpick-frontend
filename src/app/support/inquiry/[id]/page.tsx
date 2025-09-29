'use client'

import Link from 'next/link'
import { ArrowLeft, CalendarClock, MessageSquare, Reply } from 'lucide-react'

export default function InquiryDetailPage({ params }: { params: { id: string } }) {
  const threadId = params.id

  // 실제 구현 시 threadId로 원글+답변 fetch
  const question = {
    title: '기록증이 제대로 표기되지 않습니다.',
    author: '문**',
    date: '2025-08-03 10:12',
    content: '마라톤 기록증 시간 표기가 이상합니다. 확인 부탁드립니다.',
  }
  const answer = {
    title: '[RE] 기록증이 제대로 표기되지 않습니다.',
    author: '총관리자',
    date: '2025-08-03 12:20',
    content: '안녕하세요. 기록증 시스템 업데이트 이후 반영 지연이 있었습니다. 현재 정상화되었습니다.',
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8 py-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-6">
            <Link href="/support/inquiry" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">목록으로</span>
            </Link>
          </div>

          {/* 원글 */}
          <article className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2"><MessageSquare className="h-5 w-5 text-blue-500" /> {question.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>작성자: {question.author}</span>
                <span className="inline-flex items-center gap-1"><CalendarClock className="h-4 w-4" /> {question.date}</span>
              </div>
            </div>
            <div className="px-6 py-6">
              <div className="min-h-[220px] rounded-md bg-gray-50 dark:bg-gray-900/20 p-6">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{question.content}</p>
              </div>
            </div>
          </article>

          {/* 답변 */}
          <article className="rounded-2xl border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-green-50/60 dark:bg-green-900/20">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2"><Reply className="h-5 w-5 text-green-600" /> {answer.title}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>작성자: {answer.author}</span>
                <span className="inline-flex items-center gap-1"><CalendarClock className="h-4 w-4" /> {answer.date}</span>
              </div>
            </div>
            <div className="px-6 py-6">
              <div className="min-h-[160px] rounded-md bg-gray-50 dark:bg-gray-900/20 p-6">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{answer.content}</p>
              </div>
              <div className="mt-8 flex justify-center">
                <Link href="/support/inquiry" className="rounded-md bg-gray-700 text-white px-5 py-2 text-sm hover:bg-gray-800">목록으로</Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}


