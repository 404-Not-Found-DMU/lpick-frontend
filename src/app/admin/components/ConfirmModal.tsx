"use client"
import { X } from 'lucide-react'

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onClose,
}: {
  open: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onClose: () => void
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <button onClick={onClose} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm?.()
              onClose()
            }}
            className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}


