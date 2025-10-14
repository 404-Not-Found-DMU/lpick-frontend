import Link from 'next/link'
import FaqFormClient from '../parts/FaqFormClient'
import { redirect } from 'next/navigation'

export default function AdminFaqNewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">새 FAQ 작성</h2>
        <Link href="/admin/faq" className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">목록</Link>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <FaqFormClient submitText="등록" onSaved={(id) => redirect(`/admin/faq/${id}`)} />
      </div>
    </div>
  )
}


