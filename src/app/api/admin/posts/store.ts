export type PostStatus = 'published' | 'hidden' | 'deleted'

export interface AdminPost {
  id: number
  title: string
  author: string
  date: string
  views: number
  status: PostStatus
  reportedCount?: number
}

let autoIncrementId = 1
const store: AdminPost[] = []

function seedOnce() {
  if (store.length > 0) return
  const now = '2025-08-10'
  for (let i = 0; i < 25; i += 1) {
    store.push({
      id: autoIncrementId++,
      title: `게시물 제목 ${i + 1}`,
      author: i % 3 === 0 ? 'lpick_user' : 'guest',
      date: now,
      views: Math.floor(Math.random() * 1000),
      status: i % 11 === 0 ? 'hidden' : 'published',
      reportedCount: i % 5 === 0 ? Math.floor(Math.random() * 3) : 0,
    })
  }
}

seedOnce()

export type ListParams = {
  q?: string
  status?: PostStatus | '전체'
  sortBy?: 'date' | 'views'
  sortDir?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

export function listPosts(params: ListParams = {}) {
  const { q = '', status = '전체', sortBy = 'date', sortDir = 'desc', page = 1, pageSize = 10 } = params
  const s = q.trim().toLowerCase()
  const filtered = store.filter((p) => {
    const passQ = s ? [p.title, p.author].some((t) => t.toLowerCase().includes(s)) : true
    const passStatus = status === '전체' ? true : p.status === status
    return passQ && passStatus
  })
  filtered.sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1
    if (sortBy === 'views') return (a.views - b.views) * dir
    return a.date.localeCompare(b.date) * dir
  })
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)
  return { total: filtered.length, items }
}

export function getPostById(id: number) {
  return store.find((p) => p.id === id)
}

export type UpdatePostInput = Partial<Omit<AdminPost, 'id'>>

export function updatePost(id: number, input: UpdatePostInput) {
  const idx = store.findIndex((p) => p.id === id)
  if (idx === -1) return undefined
  store[idx] = { ...store[idx], ...input }
  return store[idx]
}

export function deletePost(id: number) {
  const idx = store.findIndex((p) => p.id === id)
  if (idx === -1) return false
  store.splice(idx, 1)
  return true
}


