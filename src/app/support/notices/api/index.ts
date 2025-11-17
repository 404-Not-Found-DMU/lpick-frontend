import { fetcher } from '@/hooks/api/fetchers'

export interface SupportNoticeListParams {
  keyword?: string
  page?: number
  size?: number
}

export interface SupportNoticeSummary {
  id?: number | string
  no?: number
  noticeId: string
  title: string
  author: string
  createdAt: string
  summary?: string
  views?: number
  type?: string
}

export interface SupportNoticeListResponse {
  content: SupportNoticeSummary[]
  totalPages: number
  totalElements: number
  number: number
  size: number
  first: boolean
  last: boolean
}

export interface SupportNoticeDetail {
  noticeId: string
  title: string
  content: string
  author: string
  createdAt: string
  views?: number
  type?: string
}

export async function fetchSupportNoticeList(params: SupportNoticeListParams = {}): Promise<SupportNoticeListResponse> {
  const searchParams = new URLSearchParams()
  if (params.keyword) searchParams.set('keyword', params.keyword)
  if (params.page) searchParams.set('page', String(params.page))
  if (params.size) searchParams.set('size', String(params.size))
  const qs = searchParams.toString()
  return fetcher(`/api/v1/notice${qs ? `?${qs}` : ''}`)
}

export async function fetchSupportNoticeDetail(noticeId: string): Promise<SupportNoticeDetail> {
  return fetcher(`/api/v1/notice/${noticeId}`)
}

