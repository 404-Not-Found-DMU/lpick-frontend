import Link from 'next/link'
import NoticeFormClient from '../../parts/NoticeFormClient'

export default async function AdminNoticeEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">공지 수정 #{id}</h2>
        <Link href={`/admin/notices/${id}`} className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">
          상세
        </Link>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <NoticeFormClient submitText="수정" noticeId={id} />
      </div>
    </div>
  )
}



