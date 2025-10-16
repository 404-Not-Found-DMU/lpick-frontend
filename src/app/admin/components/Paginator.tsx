"use client"
import { useMemo } from 'react'

export default function Paginator({
  page,
  total,
  pageSize,
  onChange,
  onChangePageSize,
}: {
  page: number
  total: number
  pageSize: number
  onChange: (page: number) => void
  onChangePageSize?: (size: number) => void
}) {
  const pageCount = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize])
  return (
    <div className="mt-4 flex items-center justify-between text-sm">
      <div className="text-gray-500 dark:text-gray-400">총 {total}개</div>
      <div className="flex items-center gap-2">
        <button onClick={() => onChange(1)} disabled={page === 1} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">⏮︎</button>
        <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">〈</button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`h-8 min-w-8 px-3 rounded-full text-xs flex items-center justify-center ${
              n === page ? 'bg-gray-900 text-white' : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >
            {n}
          </button>
        ))}
        <button onClick={() => onChange(Math.min(pageCount, page + 1))} disabled={page === pageCount} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">〉</button>
        <button onClick={() => onChange(pageCount)} disabled={page === pageCount} className="h-8 w-8 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">⏭︎</button>
      </div>
      <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
        {onChangePageSize ? (
          <div className="relative">
            <select className="appearance-none rounded-full border pl-3 pr-10 py-1.5 text-xs bg-white dark:bg-gray-800" value={pageSize} onChange={(e) => onChangePageSize(Number(e.target.value))}>
              <option value={10}>10개</option>
              <option value={20}>20개</option>
              <option value={50}>50개</option>
            </select>
          </div>
        ) : null}
        <div>페이지 {page}/{pageCount}</div>
      </div>
    </div>
  )
}


