import Link from 'next/link'
import { getNoticeById } from '@/app/api/admin/notices/store'

export default async function AdminNoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = getNoticeById(Number(id))
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">공지 상세 #{id}</h2>
        <div className="flex items-center gap-2">
          <Link href={`/admin/notices/${id}/edit`} className="rounded-md border px-3 py-2 text-sm">수정</Link>
          <Link href="/admin/notices" className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">목록</Link>
        </div>
      </div>
      {!item ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">존재하지 않는 공지입니다.</div>
      ) : (
        <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
            <div className="text-sm text-gray-500">{item.date} · 조회수 {item.views.toLocaleString()}</div>
          </div>
          {item.type ? (
            <div className="mt-3 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-gray-700/50 dark:text-gray-200">{item.type}</div>
          ) : null}
          {item.summary ? (
            <p className="mt-4 text-[15px] text-gray-600 dark:text-gray-300">{item.summary}</p>
          ) : null}
          <div className="prose prose-sm mt-6 max-w-none text-gray-800 dark:prose-invert dark:text-gray-200">
            {item.content}
          </div>
        </article>
      )}
    </div>
  )
}



