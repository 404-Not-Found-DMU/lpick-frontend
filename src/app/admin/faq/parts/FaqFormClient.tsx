"use client"
import { useState } from 'react'

export type FaqFormValues = {
  question: string
  answer: string
  tags?: string[]
  visibility?: '모든 사용자' | '회원' | '비회원'
  date?: string
}

export default function FaqFormClient({
  initial,
  onSaved,
  submitText = '저장',
  id,
}: {
  initial?: FaqFormValues
  onSaved?: (id: number) => void
  submitText?: string
  id?: number
}) {
  const [values, setValues] = useState<FaqFormValues>(
    initial ?? { question: '', answer: '', tags: [], visibility: '모든 사용자', date: undefined },
  )
  const [tagsInput, setTagsInput] = useState<string>((initial?.tags ?? []).join(', '))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    setSaving(true)
    setError(null)
    try {
      const method = id ? 'PUT' : 'POST'
      const url = id ? `/api/admin/faqs/${id}` : '/api/admin/faqs'
      const payload = {
        ...values,
        tags: tagsInput
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('저장 실패')
      const data = await res.json()
      onSaved?.(data.id)
    } catch (e: any) {
      setError(e.message ?? '에러가 발생했습니다')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-4">
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      ) : null}
      <div>
        <label className="block text-sm font-medium mb-1">질문 <span className="text-red-500">*</span></label>
        <input
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
          placeholder="질문을 입력"
          value={values.question}
          onChange={(e) => setValues({ ...values, question: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">답변 <span className="text-red-500">*</span></label>
        <textarea
          className="min-h-[200px] w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
          placeholder="답변을 입력"
          value={values.answer}
          onChange={(e) => setValues({ ...values, answer: e.target.value })}
        />
        <p className="mt-1 text-xs text-gray-500">핵심만 간결하게 작성해 주세요.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium mb-1">태그</label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
            placeholder="예: 계정, 결제"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">공개 범위</label>
          <select
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
            value={values.visibility ?? '모든 사용자'}
            onChange={(e) => setValues({ ...values, visibility: e.target.value as any })}
          >
            <option value="모든 사용자">모든 사용자</option>
            <option value="회원">회원</option>
            <option value="비회원">비회원</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">작성일</label>
          <input
            type="date"
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
            value={values.date ?? ''}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          disabled={saving}
          onClick={handleSubmit}
          className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {submitText}
        </button>
      </div>
    </div>
  )
}


