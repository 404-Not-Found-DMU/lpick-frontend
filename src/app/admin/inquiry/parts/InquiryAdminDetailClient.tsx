'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarClock, UserRound, MessageSquare, Reply } from 'lucide-react'
import {
  fetchInquiryDetail,
  createInquiryAnswer,
  updateInquiryAnswer,
  deleteInquiryAnswer,
  deleteInquiryQuestion,
  type InquiryDetail,
} from '@/app/support/inquiry/api'

export default function InquiryAdminDetailClient({ questionId }: { questionId: string }) {
  const router = useRouter()
  const [detail, setDetail] = useState<InquiryDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', content: '', author: '운영팀' })
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchInquiryDetail(questionId)
      setDetail(res)
      if (res.answerInfo && res.answerInfo.answerId) {
        setForm({
          title: res.answerInfo.title ?? '',
          content: res.answerInfo.content ?? '',
          author: res.answerInfo.author ?? '운영팀',
        })
      } else {
        setForm({
          title: res.title ?? '',
          content: '',
          author: '운영팀',
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '문의 상세를 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId])

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert('답변 제목과 내용을 입력해 주세요.')
      return
    }
    // 답변이 이미 있는 경우 새 답변 작성 방지 (수정만 가능)
    if (detail?.answerInfo?.answerId) {
      // 기존 답변 수정
      try {
        setSubmitting(true)
        await updateInquiryAnswer(detail.answerInfo.answerId, form)
        setSuccessMsg('답변이 수정되었습니다.')
        await load()
      } catch (err) {
        alert(err instanceof Error ? err.message : '답변 수정 중 오류가 발생했습니다.')
      } finally {
        setSubmitting(false)
      }
    } else {
      // 새 답변 작성
      try {
        setSubmitting(true)
        await createInquiryAnswer(questionId, form)
        setSuccessMsg('답변이 등록되었습니다.')
        
        // 답변 생성 후 여러 번 재조회 시도 (백엔드 처리 시간 고려)
        const maxRetries = 3
        let retryCount = 0
        let foundAnswer = false
        
        while (retryCount < maxRetries && !foundAnswer) {
          const delay = retryCount === 0 ? 500 : 1000
          await new Promise(resolve => setTimeout(resolve, delay))
          
          const currentDetail = await fetchInquiryDetail(questionId)
          
          if (currentDetail.answerInfo && currentDetail.answerInfo.answerId) {
            setDetail(currentDetail)
            setForm({
              title: currentDetail.answerInfo.title ?? '',
              content: currentDetail.answerInfo.content ?? '',
              author: currentDetail.answerInfo.author ?? '운영팀',
            })
            foundAnswer = true
            break
          }
          
          retryCount++
        }
        
        if (!foundAnswer) {
          // 마지막으로 한 번 더 로드
          await load()
        }
      } catch (err) {
        alert(err instanceof Error ? err.message : '답변 등록 중 오류가 발생했습니다.')
      } finally {
        setSubmitting(false)
      }
    }
  }

  const handleDeleteAnswer = async () => {
    if (!detail?.answerInfo?.answerId) {
      return
    }
    if (!confirm('등록된 답변을 삭제하시겠습니까?')) {
      return
    }
    try {
      setSubmitting(true)
      await deleteInquiryAnswer(detail.answerInfo.answerId)
      setSuccessMsg('답변이 삭제되었습니다.')
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : '답변 삭제 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteQuestion = async () => {
    if (!confirm('이 문의를 삭제하시겠습니까? 삭제 후에는 되돌릴 수 없습니다.')) {
      return
    }
    try {
      setSubmitting(true)
      
      // 답변이 있는 경우 먼저 답변 삭제
      if (detail?.answerInfo?.answerId) {
        try {
          await deleteInquiryAnswer(detail.answerInfo.answerId)
          // 답변 삭제 후 상세 정보 다시 로드
          await load()
        } catch (answerErr) {
          const answerErrorMsg = answerErr instanceof Error ? answerErr.message : '답변 삭제 중 오류가 발생했습니다.'
          alert(`답변 삭제 실패: ${answerErrorMsg}\n문의를 삭제하려면 먼저 답변을 삭제해야 합니다.`)
          setSubmitting(false)
          return
        }
      }
      
      // 문의 삭제
      await deleteInquiryQuestion(questionId)
      alert('문의가 삭제되었습니다.')
      router.push('/admin/inquiry')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '문의 삭제 중 오류가 발생했습니다.'
      // 백엔드 에러 메시지가 있는 경우 더 명확하게 표시
      if (errorMessage.includes('TransientObjectException') || errorMessage.includes('Hibernate')) {
        alert('문의 삭제 중 백엔드 오류가 발생했습니다. 답변이 있는 경우 먼저 답변을 삭제한 후 문의를 삭제해주세요.')
      } else {
        alert(`문의 삭제 실패: ${errorMessage}`)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const questionDate = detail ? formatDate(detail.createdAt) : '-'
  const answerDate = detail?.answerInfo?.createdAt ? formatDate(detail.answerInfo.createdAt) : '-'

  if (loading) {
    return <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-10 text-center">불러오는 중입니다...</div>
  }

  if (error || !detail) {
    return (
      <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 shadow-sm p-10 text-center text-sm text-red-600">
        {error ?? '문의 상세를 불러오지 못했습니다.'}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">문의 상세 #{questionId}</h2>
        <Link href="/admin/inquiry" className="rounded-md bg-gray-800 text-white px-3 py-2 text-sm">목록</Link>
      </div>
      {successMsg ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{successMsg}</div>
      ) : null}

      <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1"><UserRound className="h-4 w-4" /> {detail.author}</span>
          <span className="inline-flex items-center gap-1"><CalendarClock className="h-4 w-4" /> {questionDate}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          {detail.title}
        </h3>
        <div 
          className="mt-4 text-sm text-gray-700 dark:text-gray-300 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: detail.content || '' }}
        />
      </article>

  {detail.answerInfo && detail.answerInfo.answerId ? (
      <article className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="inline-flex items-center gap-1"><Reply className="h-4 w-4 text-green-600" /> {detail.answerInfo.title}</span>
          <span className="inline-flex items-center gap-1"><CalendarClock className="h-4 w-4" /> {answerDate}</span>
        </div>
        <div 
          className="mt-4 text-sm text-gray-800 dark:text-gray-100 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: detail.answerInfo.content || '' }}
        />
      </article>
  ) : (
      <article className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-sm text-gray-500 dark:text-gray-300">
        아직 등록된 답변이 없습니다.
      </article>
  )}

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm space-y-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {detail.answerInfo && detail.answerInfo.answerId ? '답변 수정' : '답변 작성'}
        </h4>
        {detail.answerInfo && detail.answerInfo.answerId ? (
          <div className="rounded-md border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
            이미 답변이 등록되어 있습니다. 답변은 하나만 등록할 수 있으며, 기존 답변을 수정하거나 삭제할 수 있습니다.
          </div>
        ) : null}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-300">답변 제목</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              placeholder="답변 제목을 입력하세요"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-300">작성자</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
              className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-300">답변 내용</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              className="min-h-[160px] rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              placeholder="답변 내용을 입력하세요"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 justify-end">
          {detail.answerInfo && detail.answerInfo.answerId ? (
            <>
              <button
                type="button"
                onClick={handleDeleteAnswer}
                disabled={submitting}
                className="rounded-md border border-red-200 text-red-600 px-4 py-2 text-sm hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                답변 삭제
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={submitting}
                className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
              >
                {submitting ? '저장 중...' : '답변 수정'}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              disabled={submitting}
              className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {submitting ? '저장 중...' : '답변 등록'}
            </button>
          )}
          <button
            type="button"
            onClick={handleDeleteQuestion}
            disabled={submitting}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            문의 삭제
          </button>
        </div>
      </section>
    </div>
  )
}

function formatDate(value?: string) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value.slice(0, 16)
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

