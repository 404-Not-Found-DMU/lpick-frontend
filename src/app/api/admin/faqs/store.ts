export type Visibility = '모든 사용자' | '회원' | '비회원'

export interface AdminFaqItem {
  id: number
  question: string
  answer: string
  tags?: string[]
  visibility?: Visibility
  date: string // YYYY-MM-DD
  views: number
}

let autoIncrementId = 1
const store: AdminFaqItem[] = []

function seedOnce() {
  if (store.length > 0) return
  const now = '2025-08-10'
  for (let i = 0; i < 18; i += 1) {
    store.push({
      id: autoIncrementId++,
      question: `FAQ ${i + 1} - 자주 묻는 질문 제목`,
      answer: 'LPick 이용 방법과 관련된 자주 묻는 질문에 대한 답변입니다.',
      tags: i % 3 === 0 ? ['계정'] : i % 3 === 1 ? ['결제'] : ['서비스'],
      visibility: '모든 사용자',
      date: now,
      views: 500 + i * 5,
    })
  }
}

seedOnce()

export type ListParams = {
  q?: string
  page?: number
  pageSize?: number
}

export function listFaqs(params: ListParams = {}) {
  const { q = '', page = 1, pageSize = 10 } = params
  const s = q.trim().toLowerCase()
  const filtered = s
    ? store.filter((n) =>
        [n.question, n.answer, (n.tags ?? []).join(',')].some((t) => t.toLowerCase().includes(s)),
      )
    : store
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)
  return { total: filtered.length, items }
}

export function getFaqById(id: number) {
  return store.find((n) => n.id === id)
}

export type CreateFaqInput = Omit<AdminFaqItem, 'id' | 'views'> & { views?: number }

export function createFaq(input: CreateFaqInput) {
  const faq: AdminFaqItem = {
    id: autoIncrementId++,
    views: input.views ?? 0,
    ...input,
  }
  store.unshift(faq)
  return faq
}

export type UpdateFaqInput = Partial<Omit<AdminFaqItem, 'id'>>

export function updateFaq(id: number, input: UpdateFaqInput) {
  const idx = store.findIndex((n) => n.id === id)
  if (idx === -1) return undefined
  store[idx] = { ...store[idx], ...input }
  return store[idx]
}

export function deleteFaq(id: number) {
  const idx = store.findIndex((n) => n.id === id)
  if (idx === -1) return false
  store.splice(idx, 1)
  return true
}


