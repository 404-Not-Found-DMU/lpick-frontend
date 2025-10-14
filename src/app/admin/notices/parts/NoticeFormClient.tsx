"use client"
import { useState } from 'react'

export type NoticeFormValues = {
  title: string
  summary: string
  content: string
  date?: string
  type?: '공지' | '대회' | '이벤트'
}

export default function NoticeFormClient({
  initial,
  onSaved,
  submitText = '저장',
}: {
  initial?: NoticeFormValues
  onSaved?: (id: number) => void
  submitText?: string
}) {
  const [values, setValues] = useState<NoticeFormValues>(
    initial ?? { title: '', summary: '', content: '', date: undefined, type: undefined },
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    setSaving(true)
    setError(null)
    try {
      const method = initial ? 'PUT' : 'POST'
      const url = initial ? `/api/admin/notices/${(initial as any).id ?? ''}` : '/api/admin/notices'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
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
        <label className="block text-sm font-medium mb-1">제목 <span className="text-red-500">*</span></label>
        <input
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
          placeholder="제목을 입력"
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">요약</label>
        <input
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
          placeholder="간단한 요약"
          value={values.summary}
          onChange={(e) => setValues({ ...values, summary: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">내용 <span className="text-red-500">*</span></label>
        <textarea
          className="min-h-[240px] w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
          placeholder="내용을 입력"
          value={values.content}
          onChange={(e) => setValues({ ...values, content: e.target.value })}
        />
        <p className="mt-1 text-xs text-gray-500">간단히 핵심 변경사항을 요약해 주세요.</p>
      </div>
      <div className="flex items-center gap-3">
        <select
          className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
          value={values.type ?? ''}
          onChange={(e) => setValues({ ...values, type: (e.target.value || undefined) as any })}
        >
          <option value="">구분 없음</option>
          <option value="공지">공지</option>
          <option value="대회">대회</option>
          <option value="이벤트">이벤트</option>
        </select>
        <input
          type="date"
          className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
          value={values.date ?? ''}
          onChange={(e) => setValues({ ...values, date: e.target.value })}
        />
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


