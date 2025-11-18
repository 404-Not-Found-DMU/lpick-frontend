import { fetcher } from '@/hooks/api/fetchers'

const API_PREFIX = '/api/v1/notice'

export type NoticePayload = {
  author: string
  title: string
  content: string
}

export type AdminNoticeRecord = {
  id: string
  title: string
  content: string
  author?: string
  createdAt?: string
  updatedAt?: string
  views?: number
  imageUrl?: string
}

export type AdminNoticeListResult = {
  items: AdminNoticeRecord[]
  total: number
  page: number
  size: number
}

type ListParams = {
  page?: number
  size?: number
  keyword?: string
  query?: string
  sort?: string
}

const FALLBACK_PAGE_SIZE = 10

export async function fetchAdminNoticeList(params: ListParams = {}): Promise<AdminNoticeListResult> {
  const search = new URLSearchParams()
  const page = Number.isFinite(params.page) && params.page ? Math.max(1, params.page) : 1
  const size = Number.isFinite(params.size) && params.size ? Math.max(1, params.size) : FALLBACK_PAGE_SIZE
  search.set('page', String(page))
  search.set('size', String(size))
  const keyword = params.keyword ?? params.query
  if (keyword) search.set('keyword', keyword)
  if (params.sort) search.set('sort', params.sort)
  const qs = search.toString()
  const data = await fetcher<unknown>(`${API_PREFIX}${qs ? `?${qs}` : ''}`)
  return normalizeListResponse(data, { page, size })
}

export async function fetchAdminNoticeDetail(noticeId: string | number): Promise<AdminNoticeRecord> {
  if (!noticeId && noticeId !== 0) throw new Error('공지 ID가 필요합니다.')
  const data = await fetcher<unknown>(`${API_PREFIX}/${noticeId}`)
  return normalizeNotice(data)
}

export async function createAdminNotice(payload: NoticePayload) {
  return fetcher<{ id: string | number }>(API_PREFIX, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updateAdminNotice(noticeId: string | number, payload: NoticePayload) {
  return fetcher(API_PREFIX + `/${noticeId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export async function deleteAdminNotice(noticeId: string | number) {
  return fetcher(API_PREFIX + `/${noticeId}`, {
    method: 'DELETE',
  })
}

type LooseRecord = Record<string, unknown>

function normalizeListResponse(payload: unknown, fallback: { page: number; size: number }): AdminNoticeListResult {
  if (!payload) {
    return { items: [], total: 0, page: fallback.page, size: fallback.size }
  }
  if (Array.isArray(payload)) {
    return {
      items: payload.map((item) => normalizeNotice(item)),
      total: payload.length,
      page: fallback.page,
      size: fallback.size,
    }
  }

  if (typeof payload === 'object') {
    const obj = payload as LooseRecord
    const collection =
      obj['content'] ??
      obj['items'] ??
      obj['data'] ??
      obj['results'] ??
      obj['list'] ??
      []
    const collectionArray = Array.isArray(collection) ? collection : []
    const total =
      obj['totalElements'] ??
      obj['total'] ??
      obj['totalCount'] ??
      collectionArray.length ??
      0
    const page =
      obj['page'] ??
      obj['pageNumber'] ??
      obj['currentPage'] ??
      obj['pageIndex'] ??
      fallback.page
    const size =
      obj['size'] ??
      obj['pageSize'] ??
      obj['limit'] ??
      obj['perPage'] ??
      fallback.size

    return {
      items: collectionArray.map((item) => normalizeNotice(item)),
      total: isFiniteNumber(total) ? Number(total) : collectionArray.length,
      page: isFiniteNumber(page) ? Number(page) : fallback.page,
      size: isFiniteNumber(size) ? Number(size) : fallback.size,
    }
  }

  return { items: [], total: 0, page: fallback.page, size: fallback.size }
}

function normalizeNotice(payload: unknown): AdminNoticeRecord {
  const item = (payload ?? {}) as LooseRecord
  const rawId =
    item['id'] ??
    item['noticeId'] ??
    item['noticeID'] ??
    item['notice_id'] ??
    item['uuid'] ??
    item['uid'] ??
    item['_id']
  const id = rawId != null ? String(rawId) : generateFallbackId()
  const created =
    item['createdAt'] ??
    item['created_at'] ??
    item['createdDate'] ??
    item['created_date'] ??
    item['date'] ??
    item['registeredAt']
  const updated =
    item['updatedAt'] ??
    item['updated_at'] ??
    item['modifiedAt'] ??
    item['modified_at'] ??
    item['lastModifiedAt']
  const viewsLike = item['views'] ?? item['viewCount'] ?? item['hit'] ?? item['readCnt']

  return {
    id,
    title: (item['title'] ?? item['subject'] ?? '') as string,
    content: (item['content'] ?? item['body'] ?? item['description'] ?? '') as string,
    author: (item['author'] ?? item['writer'] ?? item['createdBy'] ?? item['registrant'] ?? '') as string,
    createdAt: created ? String(created) : undefined,
    updatedAt: updated ? String(updated) : undefined,
    views: isFiniteNumber(viewsLike) ? Number(viewsLike) : undefined,
    imageUrl: (item['imageUrl'] ?? item['thumbnailUrl'] ?? item['coverImageUrl'] ?? item['photoUrl']) as string | undefined,
  }
}

function generateFallbackId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2)
}

function isFiniteNumber(value: unknown): value is number | `${number}` {
  if (typeof value === 'number') return Number.isFinite(value)
  if (typeof value === 'string' && value.trim() !== '') {
    return Number.isFinite(Number(value))
  }
  return false
}

