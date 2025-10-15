import Link from 'next/link'
import NoticeFormClient from '../../parts/NoticeFormClient'
import { getNoticeById } from '@/app/api/admin/notices/store'

export default async function AdminNoticeEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = getNoticeById(Number(id))
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">공지 수정 #{id}</h2>
        <Link href={`/admin/notices/${id}`} className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">상세</Link>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        {!item ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">존재하지 않는 공지입니다.</div>
        ) : (
          <NoticeFormClient submitText="수정" initial={{ title: item.title, summary: item.summary, content: item.content, date: item.date, type: item.type }} />
        )}
      </div>
    </div>
  )
}



