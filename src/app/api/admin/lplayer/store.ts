export interface AdminTrack {
  id: number
  title: string
  artist: string
  mp3: string
  cover: string
  date: string
  order: number
}

let autoIncrementId = 1
const store: AdminTrack[] = []

function seedOnce() {
  if (store.length > 0) return
  const now = '2025-08-10'
  const samples = [
    { title: 'Pink Floyd - The Dark Side of the Moon', artist: 'Pink Floyd', mp3: '/lplayer/temp/mp3/sample1.mp3', cover: '/lplayer/temp/images/album1.png' },
    { title: 'Miles Davis - Kind of Blue', artist: 'Miles Davis', mp3: '/lplayer/temp/mp3/sample2.mp3', cover: '/lplayer/temp/images/album2.png' },
    { title: 'Fleetwood Mac - Rumours', artist: 'Fleetwood Mac', mp3: '/lplayer/temp/mp3/sample3.mp3', cover: '/lplayer/temp/images/album3.png' },
  ]
  samples.forEach((s, i) => store.push({ id: autoIncrementId++, date: now, order: i + 1, ...s }))
}

seedOnce()

export type ListParams = { q?: string; page?: number; pageSize?: number }

export function listTracks(params: ListParams = {}) {
  const { q = '', page = 1, pageSize = 10 } = params
  const s = q.trim().toLowerCase()
  const filtered = s
    ? store.filter((n) => [n.title, n.artist].some((t) => t.toLowerCase().includes(s)))
    : store
  filtered.sort((a, b) => a.order - b.order)
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)
  return { total: filtered.length, items }
}

export function getTrackById(id: number) {
  return store.find((t) => t.id === id)
}

export type CreateTrackInput = Omit<AdminTrack, 'id' | 'date' | 'order'> & { date?: string; order?: number }

export function createTrack(input: CreateTrackInput) {
  const t: AdminTrack = { id: autoIncrementId++, date: input.date ?? new Date().toISOString().slice(0, 10), order: store.length + 1, title: input.title, artist: input.artist, mp3: input.mp3, cover: input.cover }
  store.unshift(t)
  // 앞에 넣었으니 order 재정렬
  store.forEach((x, idx) => (x.order = idx + 1))
  return t
}

export type UpdateTrackInput = Partial<Omit<AdminTrack, 'id'>>

export function updateTrack(id: number, input: UpdateTrackInput) {
  const idx = store.findIndex((t) => t.id === id)
  if (idx === -1) return undefined
  store[idx] = { ...store[idx], ...input }
  return store[idx]
}

export function deleteTrack(id: number) {
  const idx = store.findIndex((t) => t.id === id)
  if (idx === -1) return false
  store.splice(idx, 1)
  store.forEach((x, i) => (x.order = i + 1))
  return true
}

export function reorderTracks(ids: number[]) {
  const map = new Map(store.map((t) => [t.id, t]))
  const next: AdminTrack[] = []
  ids.forEach((id) => {
    const t = map.get(id)
    if (t) next.push(t)
  })
  // Append any missing (safety)
  store.forEach((t) => { if (!ids.includes(t.id)) next.push(t) })
  next.forEach((t, i) => (t.order = i + 1))
  store.splice(0, store.length, ...next)
  return store
}


