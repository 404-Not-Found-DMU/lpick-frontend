export type ReviewStatus = '대기' | '승인' | '반려'

export interface WikiReviewItem {
  id: number
  title: string
  author: string
  date: string // YYYY-MM-DD
  status: ReviewStatus
  beforeContent: string
  afterContent: string
}

let autoIncrementId = 1
const store: WikiReviewItem[] = []

function seedOnce() {
  if (store.length > 0) return
  const now = '2025-08-10'
  for (let i = 0; i < 14; i += 1) {
    store.push({
      id: autoIncrementId++,
      title: `위키 문서 제안 ${i + 1}`,
      author: i % 2 === 0 ? 'lpick_user' : 'guest',
      date: now,
      status: i % 5 === 0 ? '승인' : i % 7 === 0 ? '반려' : '대기',
      beforeContent: '기존 내용\n- 문장 A\n- 문장 B',
      afterContent: '수정 내용\n- 문장 A(개선)\n- 문장 B(보강)',
    })
  }
}

seedOnce()

export type ListParams = {
  q?: string
  status?: ReviewStatus | '전체'
  page?: number
  pageSize?: number
}

export function listReviews(params: ListParams = {}) {
  const { q = '', status = '전체', page = 1, pageSize = 10 } = params
  const s = q.trim().toLowerCase()
  const filtered = store.filter((n) => {
    const passQ = s ? [n.title, n.author].some((t) => t.toLowerCase().includes(s)) : true
    const passStatus = status === '전체' ? true : n.status === status
    return passQ && passStatus
  })
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)
  return { total: filtered.length, items }
}

export function getReviewById(id: number) {
  return store.find((n) => n.id === id)
}

export type CreateReviewInput = Omit<WikiReviewItem, 'id' | 'status'> & { status?: ReviewStatus }

export function createReview(input: CreateReviewInput) {
  const item: WikiReviewItem = { id: autoIncrementId++, status: input.status ?? '대기', ...input }
  store.unshift(item)
  return item
}

export type UpdateReviewInput = Partial<Omit<WikiReviewItem, 'id'>>

export function updateReview(id: number, input: UpdateReviewInput) {
  const idx = store.findIndex((n) => n.id === id)
  if (idx === -1) return undefined
  store[idx] = { ...store[idx], ...input }
  return store[idx]
}

export function deleteReview(id: number) {
  const idx = store.findIndex((n) => n.id === id)
  if (idx === -1) return false
  store.splice(idx, 1)
  return true
}


