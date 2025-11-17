import Link from 'next/link'
import { ArrowLeft, Eye, UserRound, CalendarClock } from 'lucide-react'
import { fetchSupportNoticeDetail } from '../api'

export default async function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let notice
  try {
    notice = await fetchSupportNoticeDetail(id)
  } catch (error) {
    notice = null
  }

  const formatDateTime = (value?: string) => {
    if (!value) return '-'
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return value
    return d.toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8 py-10">
        <div className="max-w-[1440px] mx-auto">
          {/* 돌아가기 */}
          <div className="mb-6">
            <Link href="/support/notices" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">뒤로가기</span>
            </Link>
          </div>

          {/* 본문 카드 */}
          <article className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
            {/* 제목 영역 */}
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">{notice?.title ?? '공지사항'}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1"><UserRound className="h-4 w-4" /> 작성자: {notice?.author ?? '-'}</span>
                <span className="inline-flex items-center gap-1"><Eye className="h-4 w-4" /> 조회수: {notice?.views ?? '-'}</span>
                <span className="inline-flex items-center gap-1"><CalendarClock className="h-4 w-4" /> 작성일: {formatDateTime(notice?.createdAt)}</span>
              </div>
            </div>

            {/* 내용 영역 */}
            <div className="px-6 py-6">
              <div className="min-h-[320px] rounded-md bg-gray-50 dark:bg-gray-900/20 p-6">
                {notice ? (
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{notice.content}</p>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">공지사항을 불러오지 못했습니다.</p>
                )}
              </div>
              <div className="mt-8 flex justify-center">
                <Link href="/support/notices" className="rounded-md bg-gray-700 text-white px-5 py-2 text-sm hover:bg-gray-800">
                  뒤로가기
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}


