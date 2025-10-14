type Column<T> = {
  key: keyof T
  header: string
  className?: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

export default function DataTable<T extends { id?: string | number }>({
  columns,
  rows,
}: {
  columns: Column<T>[]
  rows: T[]
}) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
      <div className="grid grid-cols-12 px-6 py-3 text-[13px] font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-700">
        {columns.map((c, colIdx) => (
          <div key={`${String(c.key)}-${colIdx}`} className={`col-span-${12 / columns.length} ${c.className ?? ''}`.trim()}>
            {c.header}
          </div>
        ))}
      </div>
      {rows.map((row, idx) => (
        <div
          key={(row.id as string) ?? idx}
          className={`grid grid-cols-12 px-6 py-4 items-center border-b last:border-0 border-gray-100 dark:border-gray-700 ${
            idx % 2 === 1 ? 'bg-gray-50/40 dark:bg-gray-800/30' : ''
          }`}
        >
          {columns.map((c, colIdx) => {
            const value = row[c.key]
            return (
              <div key={`${String(c.key)}-${colIdx}`} className={`col-span-${12 / columns.length} ${c.className ?? ''}`.trim()}>
                {c.render ? c.render(value, row) : (value as React.ReactNode)}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}


