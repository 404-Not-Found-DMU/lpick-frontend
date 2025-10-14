import Link from 'next/link'
import { getExpertById, updateExpert } from '@/app/api/admin/experts/store'
import { redirect } from 'next/navigation'

export default async function AdminExpertDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { id } = await params
  const sp = await searchParams
  const saved = sp.saved === '1'
  const item = getExpertById(Number(id))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">등업 신청 상세 #{id}</h2>
        <Link href="/admin/expert" className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">목록</Link>
      </div>
      {saved ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">변경 사항이 저장되었습니다.</div>
      ) : null}
      {!item ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">존재하지 않는 신청입니다.</div>
      ) : (
        <div className="space-y-6">
          <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="이름" value={item.name} />
              <Field label="이메일" value={item.email} />
              <Field label="연락처" value={item.phone} />
              <Field label="소속" value={item.affiliation ?? '-'} />
              <Field label="신청일" value={item.date} />
              <Field label="상태" value={item.status} />
            </div>
            <div className="mt-6">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">전문 분야</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.fields.map((f) => (
                  <span key={f} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-gray-700/50 dark:text-gray-200">{f}</span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">첨부 문서</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                {item.docs.map((d, i) => (
                  <li key={`${d}-${i}`}>{d}</li>
                ))}
              </ul>
            </div>
            {item.note ? (
              <div className="mt-6">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">메모</div>
                <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">{item.note}</div>
              </div>
            ) : null}
          </section>

          <Actions id={item.id} status={item.status} />
        </div>
      )}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>
      <div className="mt-1 text-sm text-gray-900 dark:text-gray-100">{value}</div>
    </div>
  )
}

function Actions({ id, status }: { id: number; status: '대기' | '승인' | '반려' }) {
  async function approve() {
    'use server'
    updateExpert(id, { status: '승인' })
    redirect(`/admin/expert/${id}?saved=1`)
  }
  async function reject() {
    'use server'
    updateExpert(id, { status: '반려' })
    redirect(`/admin/expert/${id}?saved=1`)
  }
  return (
    <form action={approve} className="flex flex-wrap items-center gap-2">
      <button type="submit" className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50" disabled={status === '승인'}>
        승인
      </button>
      <button formAction={reject} className="rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50" disabled={status === '반려'}>
        반려
      </button>
    </form>
  )
}


