import { listPosts } from '@/app/api/admin/posts/store'
import PostsAdminClient from './parts/PostsAdminClient'

export default async function AdminPostsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const q = (sp.q as string) ?? ''
  const status = ((sp.status as string) as '전체' | 'published' | 'hidden' | 'deleted') ?? '전체'
  const sortBy = ((sp.sortBy as string) as 'date' | 'views') ?? 'date'
  const sortDir = ((sp.sortDir as string) as 'asc' | 'desc') ?? 'desc'
  const page = Number((sp.page as string) ?? '1')
  const pageSize = Number((sp.pageSize as string) ?? '10')
  const { items, total } = listPosts({ q, status, sortBy, sortDir, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">게시물 관리</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">게시글을 조회/정렬하고 숨김/삭제할 수 있어요.</p>
      </div>
      <PostsAdminClient
        items={items}
        total={total}
        q={q}
        status={status}
        sortBy={sortBy}
        sortDir={sortDir}
        page={Number.isFinite(page) ? page : 1}
        pageSize={Number.isFinite(pageSize) ? pageSize : 10}
      />
    </div>
  )
}


