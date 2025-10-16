export type CommentStatus = 'visible' | 'hidden' | 'deleted'

export interface AdminComment {
  id: number
  postId: number
  postTitle: string
  author: string
  date: string
  content: string
  status: CommentStatus
  reportedCount?: number
}

let autoIncrementId = 1
const store: AdminComment[] = []

function seedOnce() {
  if (store.length > 0) return
  const now = '2025-08-10'
  for (let i = 0; i < 40; i += 1) {
    store.push({
      id: autoIncrementId++,
      postId: (i % 25) + 1,
      postTitle: `게시물 제목 ${(i % 25) + 1}`,
      author: i % 2 === 0 ? 'lpick_user' : 'guest',
      date: now,
      content: `댓글 내용 샘플 ${i + 1}`,
      status: i % 13 === 0 ? 'hidden' : 'visible',
      reportedCount: i % 7 === 0 ? 1 : 0,
    })
  }
}

seedOnce()

export type ListParams = {
  q?: string
  status?: CommentStatus | '전체'
  page?: number
  pageSize?: number
}

export function listComments(params: ListParams = {}) {
  const { q = '', status = '전체', page = 1, pageSize = 10 } = params
  const s = q.trim().toLowerCase()
  const filtered = store.filter((c) => {
    const passQ = s ? [c.content, c.author, c.postTitle].some((t) => t.toLowerCase().includes(s)) : true
    const passStatus = status === '전체' ? true : c.status === status
    return passQ && passStatus
  })
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)
  return { total: filtered.length, items }
}

export function getCommentById(id: number) {
  return store.find((c) => c.id === id)
}

export type UpdateCommentInput = Partial<Omit<AdminComment, 'id'>>

export function updateComment(id: number, input: UpdateCommentInput) {
  const idx = store.findIndex((c) => c.id === id)
  if (idx === -1) return undefined
  store[idx] = { ...store[idx], ...input }
  return store[idx]
}

export function deleteComment(id: number) {
  const idx = store.findIndex((c) => c.id === id)
  if (idx === -1) return false
  store.splice(idx, 1)
  return true
}


