import Link from 'next/link'
import { getReviewById, updateReview } from '@/app/api/admin/wiki-review/store'
import { redirect } from 'next/navigation'

export default async function AdminWikiReviewDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { id } = await params
  const sp = await searchParams
  const saved = sp.saved === '1'
  const item = getReviewById(Number(id))
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">검수 상세 #{id}</h2>
        <Link href="/admin/wiki-review" className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">목록</Link>
      </div>
      {saved ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">처리가 완료되었습니다.</div>
      ) : null}
      {!item ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">존재하지 않는 항목입니다.</div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <section>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">기존 내용</h3>
                <pre className="mt-2 rounded-md border bg-gray-50 p-3 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 whitespace-pre-wrap">{item.beforeContent}</pre>
              </section>
              <section>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">수정 내용</h3>
                <pre className="mt-2 rounded-md border bg-emerald-50/40 p-3 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 whitespace-pre-wrap">{item.afterContent}</pre>
              </section>
            </div>
          </div>

          <Actions id={item.id} />
        </div>
      )}
    </div>
  )
}

function Actions({ id }: { id: number }) {
  async function approve() {
    'use server'
    updateReview(id, { status: '승인' })
    redirect(`/admin/wiki-review/${id}?saved=1`)
  }
  async function reject() {
    'use server'
    updateReview(id, { status: '반려' })
    redirect(`/admin/wiki-review/${id}?saved=1`)
  }
  return (
    <form action={approve} className="flex items-center gap-2">
      <button type="submit" className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">승인</button>
      <button formAction={reject} className="rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700">반려</button>
    </form>
  )
}


