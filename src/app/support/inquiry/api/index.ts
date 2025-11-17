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
  content: InquirySummary[]
  totalPages: number
  totalElements: number
  number: number
  size: number
  first: boolean
  last: boolean
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
  return fetcher(`/api/v1/question/${questionId}`)
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
  return fetcher(`/api/v1/question/${questionId}`, {
    method: 'POST',
    body: JSON.stringify(payload),
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

