export type UserStatus = 'active' | 'blocked'
export type UserRole = 'user' | 'admin' | 'superadmin'

export interface AdminUserItem {
  id: number
  name: string
  email: string
  role: UserRole
  status: UserStatus
  joinedAt: string // YYYY-MM-DD
}

let autoIncrementId = 1
const store: AdminUserItem[] = []

function seedOnce() {
  if (store.length > 0) return
  const now = '2025-08-10'
  for (let i = 0; i < 32; i += 1) {
    store.push({
      id: autoIncrementId++,
      name: i % 2 === 0 ? '홍길동' : '김유저',
      email: `member${i + 1}@lpick.com`,
      role: i === 0 ? 'superadmin' : i % 10 === 0 ? 'admin' : 'user',
      status: i % 7 === 0 ? 'blocked' : 'active',
      joinedAt: now,
    })
  }
}

seedOnce()

export type ListParams = {
  q?: string
  status?: UserStatus | 'all'
  role?: UserRole | 'all'
  page?: number
  pageSize?: number
}

export function listUsers(params: ListParams = {}) {
  const { q = '', status = 'all', role = 'all', page = 1, pageSize = 10 } = params
  const s = q.trim().toLowerCase()
  const filtered = store.filter((u) => {
    const passQ = s ? [u.name, u.email].some((t) => t.toLowerCase().includes(s)) : true
    const passStatus = status === 'all' ? true : u.status === status
    const passRole = role === 'all' ? true : u.role === role
    return passQ && passStatus && passRole
  })
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)
  return { total: filtered.length, items }
}

export function getUserById(id: number) {
  return store.find((u) => u.id === id)
}

export type CreateUserInput = Omit<AdminUserItem, 'id'>

export function createUser(input: CreateUserInput) {
  const user: AdminUserItem = { id: autoIncrementId++, ...input }
  store.unshift(user)
  return user
}

export type UpdateUserInput = Partial<Omit<AdminUserItem, 'id'>>

export function updateUser(id: number, input: UpdateUserInput) {
  const idx = store.findIndex((u) => u.id === id)
  if (idx === -1) return undefined
  store[idx] = { ...store[idx], ...input }
  return store[idx]
}

export function deleteUser(id: number) {
  const idx = store.findIndex((u) => u.id === id)
  if (idx === -1) return false
  store.splice(idx, 1)
  return true
}


