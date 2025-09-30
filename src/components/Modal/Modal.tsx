"use client"

import { ReactNode } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  description?: ReactNode
  confirmText?: string
}

export default function Modal({ open, onClose, title, description, confirmText = '확인' }: ModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/20">
          <span className="text-xl">🔒</span>
        </div>
        {title && <h3 className="mb-2 text-center text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>}
        {description && <div className="mb-6 text-center text-sm text-gray-600 dark:text-gray-300">{description}</div>}
        <div className="flex justify-center">
          <button onClick={onClose} className="inline-flex min-w-[120px] items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}


