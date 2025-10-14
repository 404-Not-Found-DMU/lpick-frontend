"use client"
import { useMemo, useState } from 'react'
import Modal from '@/components/Modal/Modal'

export default function DocListClient({ docs }: { docs: string[] }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<string | null>(null)

  const isImage = useMemo(() => {
    if (!current) return false
    return /(\.png|\.jpg|\.jpeg|\.gif|\.webp)$/i.test(current)
  }, [current])

  return (
    <>
      <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {docs.map((d, i) => (
          <li key={`${d}-${i}`} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
            <span className="truncate pr-3 text-gray-700 dark:text-gray-300">{d}</span>
            <div className="flex gap-2">
              <button
                className="rounded-md border px-2 py-1 text-xs"
                onClick={() => {
                  setCurrent(d)
                  setOpen(true)
                }}
              >
                미리보기
              </button>
              <a href={`#${encodeURIComponent(d)}`} download className="rounded-md border px-2 py-1 text-xs">다운로드</a>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        open={open}
        title={current ?? ''}
        message={''}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        confirmText="닫기"
      >
      </Modal>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
          <div className="pointer-events-auto max-w-3xl w-full">
            <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
              {isImage ? (
                // 실제 파일 경로가 없는 목업이므로 파일명을 사용할 뿐입니다.
                <div className="flex h-[60vh] items-center justify-center text-sm text-gray-500 dark:text-gray-300">
                  이미지 미리보기(목업): {current}
                </div>
              ) : (
                <div className="flex h-[40vh] items-center justify-center text-sm text-gray-500 dark:text-gray-300">
                  미리보기를 지원하지 않는 파일입니다.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}


