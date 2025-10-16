import { listComments } from '@/app/api/admin/comments/store'
import CommentsAdminClient from './parts/CommentsAdminClient'

export default async function AdminCommentsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const q = (sp.q as string) ?? ''
  const status = ((sp.status as string) as '전체' | 'visible' | 'hidden' | 'deleted') ?? '전체'
  const page = Number((sp.page as string) ?? '1')
  const pageSize = Number((sp.pageSize as string) ?? '10')
  const { items, total } = listComments({ q, status, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">댓글 관리</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">댓글을 조회하고 숨김/삭제할 수 있어요.</p>
      </div>
      <CommentsAdminClient items={items} total={total} q={q} status={status} page={Number.isFinite(page) ? page : 1} pageSize={Number.isFinite(pageSize) ? pageSize : 10} />
    </div>
  )
}


