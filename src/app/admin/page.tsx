import Link from 'next/link'
import { listNotices } from '@/app/api/admin/notices/store'
import { listFaqs } from '@/app/api/admin/faqs/store'
import { listInquiries } from '@/app/api/admin/inquiries/store'

export default function AdminDashboardPage() {
  const recentNotices = listNotices({ page: 1, pageSize: 3, sortBy: 'date', sortDir: 'desc' }).items
  const recentFaqs = listFaqs({ page: 1, pageSize: 3 }).items
  const recentInquiries = listInquiries({ page: 1, pageSize: 3 }).items

  // Mock: 금일 시간대별 이용자 수 (0~23시)
  const hourly = Array.from({ length: 24 }, (_, h) => {
    const base = 50 + 40 * Math.sin((Math.PI * (h - 8)) / 12) // 출근/저녁 피크
    const noise = Math.max(0, Math.round(base + (Math.random() * 10 - 5)))
    return noise
  })
  const todayTotal = hourly.reduce((a, b) => a + b, 0)

  function sparklinePath(values: number[], width: number, height: number, padding = 12) {
    const max = Math.max(...values)
    const min = Math.min(...values)
    const span = Math.max(1, max - min)
    const stepX = (width - padding * 2) / Math.max(1, values.length - 1)
    const points = values.map((v, i) => {
      const x = padding + i * stepX
      const y = padding + (height - padding * 2) * (1 - (v - min) / span)
      return { x, y }
    })
    return `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
  }

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

      {/* 금일 이용자 수 대형 그래프 (페이지 하단) */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">금일 이용자 수 (시간대별)</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">00시 ~ 23시</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">오늘 합계</div>
            <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">{todayTotal.toLocaleString()}</div>
          </div>
        </div>
        <div className="relative w-full overflow-hidden">
          <svg viewBox="0 0 800 260" className="h-64 w-full">
            <defs>
              <linearGradient id="u-chart" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${sparklinePath(hourly, 800, 240)} L 788 240 L 12 240 Z`} fill="url(#u-chart)" transform="translate(0,10)" />
            <path d={sparklinePath(hourly, 800, 240)} stroke="#8b5cf6" strokeWidth="3" fill="none" transform="translate(0,10)" />
            <g stroke="#e5e7eb" className="dark:stroke-gray-700" transform="translate(0,10)">
              <line x1="12" y1="240" x2="788" y2="240" />
              {[0, 6, 12, 18, 23].map((h) => {
                const x = 12 + (h / 23) * (788 - 12)
                return <line key={h} x1={x} y1={240} x2={x} y2={246} />
              })}
            </g>
            <g fontSize="10" fill="#6b7280" className="dark:fill-gray-400">
              {[0, 6, 12, 18, 23].map((h) => {
                const x = 12 + (h / 23) * (788 - 12)
                return <text key={h} x={x} y={258} textAnchor="middle">{h}</text>
              })}
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}


