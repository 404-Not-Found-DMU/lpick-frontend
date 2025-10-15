import Link from 'next/link'
import FaqFormClient from '../../parts/FaqFormClient'
import { getFaqById } from '@/app/api/admin/faqs/store'

export default async function AdminFaqEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = getFaqById(Number(id))
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">FAQ 수정 #{id}</h2>
        <Link href={`/admin/faq/${id}`} className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">상세</Link>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        {!item ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">존재하지 않는 FAQ입니다.</div>
        ) : (
          <FaqFormClient
            id={item.id}
            submitText="수정"
            initial={{ question: item.question, answer: item.answer, tags: item.tags, visibility: item.visibility, date: item.date }}
          />
        )}
      </div>
    </div>
  )
}


