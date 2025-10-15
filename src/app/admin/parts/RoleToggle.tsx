"use client"
import { useState } from 'react'
import { useZustandStore } from '@/store/zustandStore'
import { useToast } from '@/components/Toast/ToastProvider'

export default function RoleToggle() {
  const { adminRole, setAdminRole } = useZustandStore()
  const { push } = useToast()
  const [modal, setModal] = useState<{ open: boolean; password: string }>({ open: false, password: '' })

  function handleChange(next: 'superadmin' | 'admin') {
    if (next === 'superadmin' && adminRole !== 'superadmin') {
      setModal({ open: true, password: '' })
      return
    }
    setAdminRole(next)
  }

  function submitPassword() {
    if (modal.password === 'admin1234!') {
      setAdminRole('superadmin')
      setModal({ open: false, password: '' })
      push('총관리자로 전환되었습니다.', 'success')
    } else {
      push('비밀번호가 올바르지 않습니다.', 'error')
    }
  }

  return (
    <div className="flex items-center gap-2 text-xs relative">
      <span className="text-gray-500 dark:text-gray-400">역할:</span>
      <select
        className="rounded border px-2 py-1"
        value={adminRole ?? 'superadmin'}
        onChange={(e) => handleChange(e.target.value as 'superadmin' | 'admin')}
      >
        <option value="superadmin">superadmin</option>
        <option value="admin">admin</option>
      </select>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-0">
          <div className="w-full h-full max-w-none rounded-none bg-white p-6 shadow-lg dark:bg-gray-800 md:max-w-md md:h-auto md:rounded-lg md:p-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">총관리자 전환</h3>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">비밀번호를 입력하세요.</p>
            <input
              autoFocus
              type="password"
              className="mt-3 w-full rounded-md border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              placeholder="비밀번호"
              value={modal.password}
              onChange={(e) => setModal({ open: true, password: e.target.value })}
              onKeyDown={(e) => { if (e.key === 'Enter') submitPassword() }}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-md border px-3 py-1.5 text-xs" onClick={() => setModal({ open: false, password: '' })}>취소</button>
              <button className="rounded-md bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white" onClick={submitPassword}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


