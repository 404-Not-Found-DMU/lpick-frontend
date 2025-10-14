export type InquiryStatus = '대기' | '완료'

export interface AdminInquiryItem {
  id: number
  title: string
  author: string
  date: string // YYYY-MM-DD
  secret?: boolean
  status: InquiryStatus
  question: string
  answer?: string
  views: number
}

let autoIncrementId = 1
const store: AdminInquiryItem[] = []

function seedOnce() {
  if (store.length > 0) return
  const now = '2025-08-10'
  for (let i = 0; i < 23; i += 1) {
    store.push({
      id: autoIncrementId++,
      title: `문의 ${i + 1} - 계정 관련 문의`,
      author: i % 2 === 0 ? 'guest' : 'lpick_user',
      date: now,
      secret: i % 4 === 0,
      status: i % 3 === 0 ? '완료' : '대기',
      question: '계정 설정 및 이용과 관련된 문의 내용입니다.',
      answer: i % 3 === 0 ? '문의 주셔서 감사합니다. 아래와 같이 안내드립니다.' : undefined,
      views: 200 + i * 3,
    })
  }
}

seedOnce()

export type ListParams = {
  q?: string
  status?: InquiryStatus | '전체'
  page?: number
  pageSize?: number
}

export function listInquiries(params: ListParams = {}) {
  const { q = '', status = '전체', page = 1, pageSize = 10 } = params
  const s = q.trim().toLowerCase()
  const filtered = store.filter((n) => {
    const passQ = s
      ? [n.title, n.author, n.question, n.answer ?? ''].some((t) => t.toLowerCase().includes(s))
      : true
    const passStatus = status === '전체' ? true : n.status === status
    return passQ && passStatus
  })
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)
  return { total: filtered.length, items }
}

export function getInquiryById(id: number) {
  return store.find((n) => n.id === id)
}

export type CreateInquiryInput = Omit<AdminInquiryItem, 'id' | 'views' | 'status'> & { views?: number; status?: InquiryStatus }

export function createInquiry(input: CreateInquiryInput) {
  const inquiry: AdminInquiryItem = {
    id: autoIncrementId++,
    status: input.status ?? '대기',
    views: input.views ?? 0,
    ...input,
  }
  store.unshift(inquiry)
  return inquiry
}

export type UpdateInquiryInput = Partial<Omit<AdminInquiryItem, 'id'>>

export function updateInquiry(id: number, input: UpdateInquiryInput) {
  const idx = store.findIndex((n) => n.id === id)
  if (idx === -1) return undefined
  store[idx] = { ...store[idx], ...input }
  return store[idx]
}

export function deleteInquiry(id: number) {
  const idx = store.findIndex((n) => n.id === id)
  if (idx === -1) return false
  store.splice(idx, 1)
  return true
}


