"use client"
import { useEffect, useRef, useState } from 'react'
import { useZustandStore } from '@/store/zustandStore'
import { useToast } from '@/components/Toast/ToastProvider'

export default function RoleToggle() {
  const { adminRole, setAdminRole } = useZustandStore()
  const { push } = useToast()
  const [modal, setModal] = useState<{ open: boolean; password: string }>({ open: false, password: '' })
  const expiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [remainingMs, setRemainingMs] = useState<number | null>(null)

  function clearExpiryTimer() {
    if (expiryTimerRef.current) {
      clearTimeout(expiryTimerRef.current)
      expiryTimerRef.current = null
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setRemainingMs(null)
  }

  function scheduleExpiryCheck(expiresAt: number) {
    clearExpiryTimer()
    const ms = Math.max(0, expiresAt - Date.now())
    expiryTimerRef.current = setTimeout(() => {
      setAdminRole('admin')
      localStorage.removeItem('adminRole')
      localStorage.removeItem('superadminExpiresAt')
      push('총관리자 권한이 만료되었습니다.', 'info')
    }, ms)
    setRemainingMs(ms)
    intervalRef.current = setInterval(() => {
      const left = Math.max(0, expiresAt - Date.now())
      setRemainingMs(left)
    }, 1000)
  }

  function handleChange(next: 'superadmin' | 'admin') {
    if (next === 'superadmin' && adminRole !== 'superadmin') {
      setModal({ open: true, password: '' })
      return
    }
    setAdminRole(next)
    if (next === 'admin') {
      clearExpiryTimer()
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminRole')
        localStorage.removeItem('superadminExpiresAt')
      }
    }
  }

  function submitPassword() {
    if (modal.password === 'admin1234!') {
      setAdminRole('superadmin')
      const expiresAt = Date.now() + 30 * 60 * 1000 // 30분
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminRole', 'superadmin')
        localStorage.setItem('superadminExpiresAt', String(expiresAt))
      }
      scheduleExpiryCheck(expiresAt)
      setModal({ open: false, password: '' })
      push('총관리자로 전환되었습니다.', 'success')
    } else {
      push('비밀번호가 올바르지 않습니다.', 'error')
    }
  }

  // 초기 로드 시 로컬 스토리지 기반으로 복구 + 만료 처리
  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedRole = localStorage.getItem('adminRole')
    const expiresAtRaw = localStorage.getItem('superadminExpiresAt')
    const expiresAt = expiresAtRaw ? Number(expiresAtRaw) : undefined
    if (savedRole === 'superadmin' && expiresAt) {
      if (Date.now() < expiresAt) {
        setAdminRole('superadmin')
        scheduleExpiryCheck(expiresAt)
      } else {
        localStorage.removeItem('adminRole')
        localStorage.removeItem('superadminExpiresAt')
        setAdminRole('admin')
      }
    }
    return () => clearExpiryTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function formatRemaining(ms: number) {
    const total = Math.max(0, Math.floor(ms / 1000))
    const m = Math.floor(total / 60)
    const s = total % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  function extendTime() {
    if (adminRole !== 'superadmin') return
    const base = (() => {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('superadminExpiresAt') : null
      const exp = raw ? Number(raw) : 0
      return exp > Date.now() ? exp : Date.now()
    })()
    const newExpiresAt = base + 30 * 60 * 1000
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminRole', 'superadmin')
      localStorage.setItem('superadminExpiresAt', String(newExpiresAt))
    }
    scheduleExpiryCheck(newExpiresAt)
    push('총관리자 시간이 30분 연장되었습니다.', 'success')
  }

  return (
    <div className="flex items-center gap-2 text-xs relative">
      {adminRole === 'superadmin' && remainingMs !== null && (
        <>
          <span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700">{formatRemaining(remainingMs)}</span>
          <button className="rounded border px-2 py-0.5 text-xs" onClick={extendTime}>연장</button>
        </>
      )}
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


