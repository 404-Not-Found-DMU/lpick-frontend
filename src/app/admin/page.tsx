import Link from 'next/link'
import { listNotices } from '@/app/api/admin/notices/store'
import { listFaqs } from '@/app/api/admin/faqs/store'
import { listInquiries } from '@/app/api/admin/inquiries/store'

export default function AdminDashboardPage() {
  const recentNotices = listNotices({ page: 1, pageSize: 3, sortBy: 'date', sortDir: 'desc' }).items
  const recentFaqs = listFaqs({ page: 1, pageSize: 3 }).items
  const recentInquiries = listInquiries({ page: 1, pageSize: 3 }).items

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">대시보드</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">운영 현황을 한눈에 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '신규 가입', value: '124' },
          { label: '미답변 문의', value: '8' },
          { label: '위키 검수 대기', value: '5' },
          { label: '공지 노출수', value: '12.4k' },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-5 shadow-sm">
            <div className="text-xs text-gray-500 dark:text-gray-400">{c.label}</div>
            <div className="mt-2 text-2xl font-extrabold text-gray-900 dark:text-gray-100">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">최근 공지</h3>
            <Link href="/admin/notices" className="text-sm text-violet-600 hover:underline">전체 보기</Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
            {recentNotices.map((n) => (
              <div key={n.id} className="py-2 flex items-center justify-between">
                <Link href={`/admin/notices/${n.id}`} className="truncate pr-3 text-gray-800 dark:text-gray-200 hover:underline">
                  {n.title}
                </Link>
                <span className="text-gray-400">{n.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">최근 FAQ</h3>
            <Link href="/admin/faq" className="text-sm text-violet-600 hover:underline">전체 보기</Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
            {recentFaqs.map((f) => (
              <div key={f.id} className="py-2 flex items-center justify-between">
                <Link href={`/admin/faq/${f.id}`} className="truncate pr-3 text-gray-800 dark:text-gray-200 hover:underline">
                  {f.question}
                </Link>
                <span className="text-gray-400">{f.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">최근 문의</h3>
            <Link href="/admin/inquiry" className="text-sm text-violet-600 hover:underline">전체 보기</Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
            {recentInquiries.map((q) => (
              <div key={q.id} className="py-2 flex items-center justify-between">
                <Link href={`/admin/inquiry/${q.id}`} className="truncate pr-3 text-gray-800 dark:text-gray-200 hover:underline">
                  {q.title}
                </Link>
                <span className="text-gray-400">{q.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


