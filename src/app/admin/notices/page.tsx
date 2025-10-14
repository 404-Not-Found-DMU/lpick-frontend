import NoticesAdminClient from './parts/NoticesAdminClient'
import type { NoticeItem } from '@/app/support/types'

const MOCK: NoticeItem[] = Array.from({ length: 27 }, (_, i) => ({
  id: i + 1,
  title: `공지 ${i + 1} - LPick 운영 안내`,
  date: '2025-08-10',
  summary: '서비스 점검 및 업데이트 관련 안내입니다.',
  type: i % 5 === 0 ? '공지' : i % 3 === 0 ? '이벤트' : undefined,
  views: 1000 + i * 7,
}))

export default function AdminNoticesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">공지사항 관리</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">공지 목록/작성/수정을 관리합니다.</p>
      </div>
      <NoticesAdminClient items={MOCK} />
    </div>
  )
}


