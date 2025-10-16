export type ReportStatus = 'open' | 'ignored' | 'warned' | 'suspended' | 'banned'

export interface AdminReport {
  id: number
  targetType: 'post' | 'comment' | 'user'
  targetId: number
  targetTitle: string
  reason: string
  reporter: string
  date: string
  status: ReportStatus
}

let autoIncrementId = 1
const store: AdminReport[] = []

function seedOnce() {
  if (store.length > 0) return
  const now = '2025-08-10'
  const reasons = ['욕설/비방', '스팸/홍보', '저작권 침해', '기타']
  for (let i = 0; i < 20; i += 1) {
    store.push({
      id: autoIncrementId++,
      targetType: i % 3 === 0 ? 'post' : i % 3 === 1 ? 'comment' : 'user',
      targetId: (i % 25) + 1,
      targetTitle: `대상 ${i + 1}`,
      reason: reasons[i % reasons.length],
      reporter: i % 2 === 0 ? 'lpick_user' : 'guest',
      date: now,
      status: 'open',
    })
  }
}

seedOnce()

export type ListParams = { q?: string; status?: ReportStatus | '전체'; targetType?: 'all' | 'post' | 'comment' | 'user'; page?: number; pageSize?: number }

export function listReports(params: ListParams = {}) {
  const { q = '', status = '전체', targetType = 'all', page = 1, pageSize = 10 } = params
  const s = q.trim().toLowerCase()
  const filtered = store.filter((r) => {
    const passQ = s ? [r.targetTitle, r.reason, r.reporter].some((t) => t.toLowerCase().includes(s)) : true
    const passStatus = status === '전체' ? true : r.status === status
    const passType = targetType === 'all' ? true : r.targetType === targetType
    return passQ && passStatus && passType
  })
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)
  return { total: filtered.length, items }
}

export function getReportById(id: number) { return store.find((r) => r.id === id) }
export type UpdateReportInput = Partial<Omit<AdminReport, 'id'>>
export function updateReport(id: number, input: UpdateReportInput) {
  const idx = store.findIndex((r) => r.id === id)
  if (idx === -1) return undefined
  store[idx] = { ...store[idx], ...input }
  return store[idx]
}


