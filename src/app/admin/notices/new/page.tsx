import Link from 'next/link'

export default function AdminNoticeNewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">새 공지 작성</h2>
        <Link href="/admin/notices" className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">목록</Link>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">제목</label>
            <input className="w-full rounded-md border px-3 py-2 text-sm" placeholder="제목을 입력" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">내용</label>
            <textarea className="min-h-[240px] w-full rounded-md border px-3 py-2 text-sm" placeholder="내용을 입력" />
          </div>
          <div className="flex justify-end gap-2">
            <Link href="/admin/notices" className="rounded-md border px-4 py-2 text-sm">취소</Link>
            <button className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white">저장</button>
          </div>
        </div>
      </div>
    </div>
  )
}



