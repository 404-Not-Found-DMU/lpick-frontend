import Link from 'next/link'

export default async function AdminNoticeEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">공지 수정 #{id}</h2>
        <Link href={`/admin/notices/${id}`} className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">상세</Link>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">제목</label>
            <input defaultValue="LPick 서비스 점검 안내" className="w-full rounded-md border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">내용</label>
            <textarea defaultValue={"안녕하세요, LPick입니다.\n점검 안내 드립니다."} className="min-h-[240px] w-full rounded-md border px-3 py-2 text-sm" />
          </div>
          <div className="flex justify-end gap-2">
            <Link href={`/admin/notices/${id}`} className="rounded-md border px-4 py-2 text-sm">취소</Link>
            <button className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white">저장</button>
          </div>
        </div>
      </div>
    </div>
  )
}



