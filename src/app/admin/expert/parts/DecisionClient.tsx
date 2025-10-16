"use client"
import { useState } from 'react'

export default function DecisionClient({ status, onApprove, onReject }: { status: '대기' | '승인' | '반려'; onApprove: (formData: FormData) => void; onReject: (formData: FormData) => void }) {
  const [open, setOpen] = useState<null | 'approve' | 'reject'>(null)
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setOpen('approve')} className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50" disabled={status === '승인'}>
          승인
        </button>
        <button onClick={() => setOpen('reject')} className="rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50" disabled={status === '반려'}>
          반려
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{open === 'approve' ? '승인 사유(선택)' : '반려 사유(선택)'}</h3>
            <form action={open === 'approve' ? onApprove : onReject} className="mt-4 space-y-4" onSubmit={() => setOpen(null)}>
              <textarea name="reason" placeholder="사유를 입력하세요 (선택)" className="h-32 w-full rounded-md border px-3 py-2 text-sm dark:bg-gray-900 dark:border-gray-700" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setOpen(null)} className="rounded-md border px-4 py-2 text-sm">취소</button>
                <button type="submit" className={`rounded-md px-4 py-2 text-sm font-semibold text-white ${open === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'}`}>확인</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


