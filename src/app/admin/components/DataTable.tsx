type Column<T extends Record<string, unknown>> = {
  key: keyof T
  header: string
  className?: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
  span?: number
  headerClassName?: string
  sortable?: boolean
  sortActive?: boolean
  sortDir?: 'asc' | 'desc'
  onSort?: () => void
  stickyLeft?: boolean
  truncate?: boolean
}

export default function DataTable<T extends Record<string, unknown>>({
  columns = [],
  rows = [],
}: {
  columns?: Column<T>[]
  rows?: T[]
}) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
      <div className="grid grid-cols-12 px-6 py-3 text-[13px] font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-700">
        {columns.map((c, colIdx) => {
          const span = c.span ?? 12 / columns.length
          return (
            <div
              key={`${String(c.key)}-${colIdx}`}
              style={{ gridColumn: `span ${span} / span ${span}` }}
              className={`min-w-0 ${c.headerClassName ?? c.className ?? ''}`.trim()}
            >
              {c.sortable ? (
                <button
                  type="button"
                  onClick={c.onSort}
                  className="inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <span>{c.header}</span>
                  <span className="inline-flex h-4 w-4 items-center justify-center">
                    {c.sortActive ? (
                      c.sortDir === 'asc' ? (
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M7 14l5-5 5 5H7z"/></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M7 10l5 5 5-5H7z"/></svg>
                      )
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M7 10h10l-5-5-5 5zm0 4l5 5 5-5H7z"/></svg>
                    )}
                  </span>
                </button>
              ) : (
                c.header
              )}
            </div>
          )
        })}
      </div>
      {rows.map((row, idx) => (
        <div
          key={(row.id as string) ?? idx}
          className={`grid grid-cols-12 px-6 py-4 items-center border-b last:border-0 border-gray-100 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
            idx % 2 === 1 ? 'bg-gray-50/40 dark:bg-gray-800/30' : ''
          }`}
        >
          {columns.map((c, colIdx) => {
            const value = row[c.key]
            const span = c.span ?? 12 / columns.length
            return (
            <div
              key={`${String(c.key)}-${colIdx}`}
              style={{ gridColumn: `span ${span} / span ${span}` }}
              className={`min-w-0 ${c.truncate === false ? '' : 'truncate'} ${c.className ?? ''}`.trim()}
            >
                {c.render ? c.render(value, row) : (value as React.ReactNode)}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}


