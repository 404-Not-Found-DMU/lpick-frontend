export default function FilterBar({
  children,
  right,
}: {
  children?: React.ReactNode
  right?: React.ReactNode
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      <div className="flex items-center gap-2">{right}</div>
    </div>
  )
}


