import Link from 'next/link'
import { getReviewById, updateReview } from '@/app/api/admin/wiki-review/store'
import { MarkdownRenderer } from '@/app/wiki/edit/components/common/MarkdownRenderer'
import SyncScrollButton from '../parts/SyncScrollButton'
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
          <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">{item.title}</h3>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.author} · {item.date}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-gray-700/50 dark:text-gray-200">
                  {item.category === 'lp' ? 'LP' : item.category === 'equipment' ? '장비' : item.category === 'artist' ? '아티스트' : '기타'}
                </span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === '승인' ? 'bg-emerald-100 text-emerald-700' : item.status === '반려' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'}`}>{item.status}</span>
              </div>
            </div>
          </section>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <div className="mb-3 flex justify-end gap-2">
              <SyncScrollButton />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <section>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">기존 내용</h3>
                <div id="before" className="prose prose-sm mt-2 max-h-80 overflow-auto rounded-md border bg-white p-3 text-gray-800 dark:prose-invert dark:border-gray-700 dark:bg-gray-900">
                  <MarkdownRenderer>{item.beforeContent}</MarkdownRenderer>
                </div>
              </section>
              <section>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">수정 내용</h3>
                <div id="after" className="prose prose-sm mt-2 max-h-80 overflow-auto rounded-md border bg-emerald-50/20 p-3 text-gray-800 dark:prose-invert dark:border-gray-700 dark:bg-gray-900">
                  <MarkdownRenderer>{item.afterContent}</MarkdownRenderer>
                </div>
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
      <Link href={`/wiki/edit`} className="ml-2 rounded-md border px-3 py-2 text-sm">편집 페이지 열기</Link>
    </form>
  )
}


