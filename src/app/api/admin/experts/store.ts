export type ExpertStatus = '대기' | '승인' | '반려'

export interface ExpertApplicationItem {
  id: number
  name: string
  email: string
  phone: string
  affiliation?: string
  fields: string[]
  docs: string[] // filenames or urls (mock)
  note?: string
  date: string // YYYY-MM-DD
  status: ExpertStatus
}

let autoIncrementId = 1
const store: ExpertApplicationItem[] = []

function seedOnce() {
  if (store.length > 0) return
  const now = '2025-08-10'
  for (let i = 0; i < 12; i += 1) {
    store.push({
      id: autoIncrementId++,
      name: i % 2 === 0 ? '홍길동' : '김개발',
      email: `user${i + 1}@lpick.com`,
      phone: '010-1234-5678',
      affiliation: i % 2 === 0 ? 'LP 커뮤니티' : '프리랜서',
      fields: i % 3 === 0 ? ['락', '메탈'] : i % 3 === 1 ? ['재즈'] : ['팝'],
      docs: ['portfolio.pdf', 'certificate.jpg'],
      note: '경력과 활동 내역을 참고 부탁드립니다.',
      date: now,
      status: i % 4 === 0 ? '승인' : i % 5 === 0 ? '반려' : '대기',
    })
  }
}

seedOnce()

export type ListParams = {
  q?: string
  status?: ExpertStatus | '전체'
  page?: number
  pageSize?: number
}

export function listExperts(params: ListParams = {}) {
  const { q = '', status = '전체', page = 1, pageSize = 10 } = params
  const s = q.trim().toLowerCase()
  const filtered = store.filter((n) => {
    const passQ = s ? [n.name, n.email, n.affiliation ?? '', n.fields.join(','), n.note ?? ''].some((t) => t.toLowerCase().includes(s)) : true
    const passStatus = status === '전체' ? true : n.status === status
    return passQ && passStatus
  })
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)
  return { total: filtered.length, items }
}

export function getExpertById(id: number) {
  return store.find((n) => n.id === id)
}

export type CreateExpertInput = Omit<ExpertApplicationItem, 'id' | 'status'> & { status?: ExpertStatus }

export function createExpert(input: CreateExpertInput) {
  const app: ExpertApplicationItem = { id: autoIncrementId++, status: input.status ?? '대기', ...input }
  store.unshift(app)
  return app
}

export type UpdateExpertInput = Partial<Omit<ExpertApplicationItem, 'id'>>

export function updateExpert(id: number, input: UpdateExpertInput) {
  const idx = store.findIndex((n) => n.id === id)
  if (idx === -1) return undefined
  store[idx] = { ...store[idx], ...input }
  return store[idx]
}

export function deleteExpert(id: number) {
  const idx = store.findIndex((n) => n.id === id)
  if (idx === -1) return false
  store.splice(idx, 1)
  return true
}


