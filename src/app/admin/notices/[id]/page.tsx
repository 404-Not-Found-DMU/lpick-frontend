import Link from 'next/link'

export default async function AdminNoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">공지 상세 #{id}</h2>
        <div className="flex items-center gap-2">
          <Link href={`/admin/notices/${id}/edit`} className="rounded-md border px-3 py-2 text-sm">수정</Link>
          <Link href="/admin/notices" className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">목록</Link>
        </div>
      </div>
      <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">LPick 서비스 점검 안내</h3>
        <p className="mt-2 text-sm text-gray-500">2025-08-10 · 조회수 1,234</p>
        <div className="mt-6 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          안녕하세요, LPick입니다.\n정기 시스템 점검이 예정되어 안내드립니다.\n감사합니다.
        </div>
      </article>
    </div>
  )
}



