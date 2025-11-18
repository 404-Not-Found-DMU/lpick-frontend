import { fetcher } from '@/hooks/api/fetchers'

export interface InquiryAnswerInfo {
  answerId: string
  title: string
  content: string
  author: string
  createdAt?: string
  modifiedAt?: string
}

export interface InquirySummary {
  [key: string]: unknown
  no?: number
  questionId: string
  title: string
  author: string
  content?: string
  createdAt: string
  modifiedAt?: string
  answered: boolean
  answerInfo?: InquiryAnswerInfo | null
}

export interface InquiryListResponse {
  totalPages: number
  totalElements: number
  pageable: {
    pageNumber: number
    pageSize: number
    offset: number
    unpaged: boolean
    paged: boolean
    sort: {
      unsorted: boolean
      sorted: boolean
      empty: boolean
    }
  }
  numberOfElements: number
  size: number
  content: InquirySummary[]
  number: number
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  first: boolean
  last: boolean
  empty: boolean
}

export interface InquiryDetail extends InquirySummary {
  answerInfo?: InquiryAnswerInfo | null
}

export interface InquiryListParams {
  keyword?: string
  page?: number
  size?: number
}

export async function fetchInquiryList(params: InquiryListParams = {}): Promise<InquiryListResponse> {
  const searchParams = new URLSearchParams()
  if (params.keyword) searchParams.set('keyword', params.keyword)
  if (params.page) searchParams.set('page', String(params.page))
  if (params.size) searchParams.set('size', String(params.size))
  const qs = searchParams.toString()
  return fetcher(`/api/v1/question${qs ? `?${qs}` : ''}`)
}

export async function fetchInquiryDetail(questionId: string): Promise<InquiryDetail> {
  const url = `/api/v1/question/${questionId}`
  return fetcher<InquiryDetail>(url, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
    },
  })
}

export interface CreateInquiryPayload {
  title: string
  content: string
  author?: string
  secret?: boolean
}

export async function createInquiryQuestion(payload: CreateInquiryPayload) {
  return fetcher<{ id: string }>('/api/v1/question', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export interface InquiryAnswerPayload {
  title: string
  content: string
  author: string
}

export async function createInquiryAnswer(questionId: string, payload: InquiryAnswerPayload) {
  const url = `/api/v1/question/${questionId}`
  return fetcher(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function updateInquiryAnswer(answerId: string, payload: InquiryAnswerPayload) {
  return fetcher(`/api/v1/answer/${answerId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export async function deleteInquiryAnswer(answerId: string) {
  return fetcher(`/api/v1/answer/${answerId}`, {
    method: 'DELETE',
  })
}

export async function deleteInquiryQuestion(questionId: string) {
  return fetcher(`/api/v1/question/${questionId}`, {
    method: 'DELETE',
  })
}

