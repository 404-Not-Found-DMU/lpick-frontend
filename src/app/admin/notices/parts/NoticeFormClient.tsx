"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createAdminNotice, fetchAdminNoticeDetail, updateAdminNotice } from '../api/notice.api'

export type NoticeFormValues = {
  title: string
  author: string
  content: string
}

export default function NoticeFormClient({
  initial,
  submitText = '저장',
  noticeId,
}: {
  initial?: Partial<NoticeFormValues>
  submitText?: string
  noticeId?: string
}) {
  const router = useRouter()
  const [values, setValues] = useState<NoticeFormValues>({
    title: initial?.title ?? '',
    author: initial?.author ?? '',
    content: initial?.content ?? '',
  })
  const [loadingInitial, setLoadingInitial] = useState<boolean>(Boolean(noticeId && !initial))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!noticeId || initial) return
    const targetId = noticeId
    let mounted = true
    async function load() {
      setLoadingInitial(true)
      setError(null)
      try {
        const detail = await fetchAdminNoticeDetail(targetId)
        if (!mounted) return
        setValues({
          title: detail.title ?? '',
          author: detail.author ?? '',
          content: detail.content ?? '',
        })
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : '공지 정보를 불러올 수 없습니다.')
      } finally {
        if (mounted) setLoadingInitial(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [noticeId, initial])

  async function handleSubmit() {
    const title = values.title.trim()
    const author = values.author.trim()
    const content = values.content.trim()
    if (!title || !author || !content) {
      setError('제목, 작성자, 내용을 모두 입력해 주세요.')
      return
    }

    setSaving(true)
    setError(null)
    try {
      if (noticeId) {
        await updateAdminNotice(noticeId, { title, author, content })
        router.push(`/admin/notices/${noticeId}`)
        return
      }
      const created = await createAdminNotice({ title, author, content })
      const newId = created?.id != null ? String(created.id) : ''
      router.push(newId ? `/admin/notices/${newId}` : '/admin/notices')
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-4">
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800/60 dark:bg-red-900/20 dark:text-red-200">
          {error}
        </div>
      ) : null}
      <div className="grid gap-2 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
            placeholder="제목을 입력하세요"
            value={values.title}
            onChange={(e) => setValues((prev) => ({ ...prev, title: e.target.value }))}
            disabled={loadingInitial || saving}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            작성자 <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
            placeholder="작성자명을 입력하세요"
            value={values.author}
            onChange={(e) => setValues((prev) => ({ ...prev, author: e.target.value }))}
            disabled={loadingInitial || saving}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          className="min-h-[260px] w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500"
          placeholder="공지 내용을 입력하세요"
          value={values.content}
          onChange={(e) => setValues((prev) => ({ ...prev, content: e.target.value }))}
          disabled={loadingInitial || saving}
        />
        <p className="mt-1 text-xs text-gray-500">마크다운을 사용하지 않고 순수 텍스트로 입력해 주세요.</p>
      </div>
      <div className="flex justify-end gap-2">
        <button
          disabled={saving || loadingInitial}
          onClick={handleSubmit}
          className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loadingInitial ? '불러오는 중...' : submitText}
        </button>
      </div>
    </div>
  )
}


