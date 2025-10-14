export type NoticeType = '공지' | '대회' | '이벤트'

export interface AdminNoticeItem {
  id: number
  title: string
  summary: string
  content: string
  date: string // YYYY-MM-DD
  type?: NoticeType
  views: number
}

let autoIncrementId = 1

const store: AdminNoticeItem[] = []

function seedOnce() {
  if (store.length > 0) return
  const now = '2025-08-10'
  for (let i = 0; i < 15; i += 1) {
    store.push({
      id: autoIncrementId++,
      title: `공지 ${i + 1} - LPick 운영 안내`,
      summary: '서비스 점검 및 업데이트 관련 안내입니다.',
      content: '안녕하세요, LPick입니다. 정기 시스템 점검이 예정되어 안내드립니다. 감사합니다.',
      date: now,
      type: i % 5 === 0 ? '공지' : i % 3 === 0 ? '이벤트' : undefined,
      views: 1000 + i * 7,
    })
  }
}

seedOnce()

export type ListParams = {
  q?: string
  page?: number
  pageSize?: number
  sortBy?: 'date' | 'views'
  sortDir?: 'asc' | 'desc'
}

export function listNotices(params: ListParams = {}) {
  const { q = '', page = 1, pageSize = 10, sortBy = 'date', sortDir = 'desc' } = params
  const s = q.trim().toLowerCase()
  const filtered = s
    ? store.filter((n) =>
        [n.title, n.summary, n.content, n.type ?? ''].some((t) => t.toLowerCase().includes(s)),
      )
    : store
  const sorted = [...filtered].sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1
    if (sortBy === 'views') {
      return (a.views - b.views) * dir
    }
    // date string compare YYYY-MM-DD
    return (a.date.localeCompare(b.date)) * dir
  })
  const start = (page - 1) * pageSize
  const items = sorted.slice(start, start + pageSize)
  return { total: filtered.length, items }
}

export function getNoticeById(id: number) {
  return store.find((n) => n.id === id)
}

export type CreateNoticeInput = Omit<AdminNoticeItem, 'id' | 'views'> & { views?: number }

export function createNotice(input: CreateNoticeInput) {
  const notice: AdminNoticeItem = {
    id: autoIncrementId++,
    views: input.views ?? 0,
    ...input,
  }
  store.unshift(notice)
  return notice
}

export type UpdateNoticeInput = Partial<Omit<AdminNoticeItem, 'id'>>

export function updateNotice(id: number, input: UpdateNoticeInput) {
  const idx = store.findIndex((n) => n.id === id)
  if (idx === -1) return undefined
  store[idx] = { ...store[idx], ...input }
  return store[idx]
}

export function deleteNotice(id: number) {
  const idx = store.findIndex((n) => n.id === id)
  if (idx === -1) return false
  store.splice(idx, 1)
  return true
}


