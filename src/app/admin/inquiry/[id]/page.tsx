import Link from 'next/link'
import { getInquiryById, updateInquiry } from '@/app/api/admin/inquiries/store'
import { redirect } from 'next/navigation'

export default async function AdminInquiryDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { id } = await params
  const sp = await searchParams
  const saved = sp.saved === '1'
  const item = getInquiryById(Number(id))
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">문의 상세 #{id}</h2>
        <Link href="/admin/inquiry" className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">목록</Link>
      </div>
      {saved ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">답변이 저장되었습니다.</div>
      ) : null}
      {!item ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">존재하지 않는 문의입니다.</div>
      ) : (
        <div className="space-y-6">
          <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{item.author} · {item.date}</p>
            <div className="mt-4 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">{item.question}</div>
          </article>
          <article className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20 p-6 shadow-sm">
            <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">답변</h4>
            <div className="mt-2 whitespace-pre-wrap text-sm text-emerald-900 dark:text-emerald-100 min-h-[80px]">{item.answer ?? '아직 등록된 답변이 없습니다.'}</div>
          </article>
          <AnswerForm id={item.id} initial={item.answer ?? ''} status={item.status} />
        </div>
      )}
    </div>
  )
}

function AnswerForm({ id, initial, status }: { id: number; initial: string; status: '대기' | '완료' }) {
  async function submit(formData: FormData) {
    'use server'
    const answer = String(formData.get('answer') ?? '')
    const nextStatus = (formData.get('status') as '대기' | '완료') ?? status
    updateInquiry(id, { answer: answer || undefined, status: nextStatus })
    redirect(`/admin/inquiry/${id}?saved=1`)
  }

  return (
    <form action={submit} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
      <div className="grid gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">상태</label>
          <select name="status" defaultValue={status} className="rounded-md border px-3 py-2 text-sm">
            <option value="대기">대기</option>
            <option value="완료">완료</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">답변</label>
          <textarea name="answer" defaultValue={initial} className="min-h-[140px] w-full rounded-md border px-3 py-2 text-sm" placeholder="답변 내용을 입력" />
        </div>
        <div className="flex justify-end gap-2">
          <button className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white">저장</button>
        </div>
      </div>
    </form>
  )
}


