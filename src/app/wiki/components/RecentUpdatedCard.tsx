"use client"
import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Clock } from "lucide-react"

type Recent = { title: string; slug: string; updatedAt: string }

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const sec = Math.floor(diff / 1000)
  if (sec < 60) return `${sec}초 전`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}분 전`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}시간 전`
  const day = Math.floor(hr / 24)
  if (day < 7) return `${day}일 전`
  const wk = Math.floor(day / 7)
  if (wk < 5) return `${wk}주 전`
  const mo = Math.floor(day / 30)
  if (mo < 12) return `${mo}개월 전`
  const yr = Math.floor(day / 365)
  return `${yr}년 전`
}

export default function RecentUpdatedCard({ slug, initial }: { slug: string; initial?: Recent[] }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<Recent[]>(initial ?? [])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/wiki/${encodeURIComponent(slug)}`)
      if (!res.ok) throw new Error("failed")
      const json = await res.json()
      setItems((json.recent ?? []) as Recent[])
    } catch (e) {
      setError("최근 수정 문서를 불러오지 못했습니다.")
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    if (!initial || initial.length === 0) fetchData()
    else setLoading(false)
  }, [fetchData])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-violet-500" />
        최근 수정된 문서
      </h3>

      {loading ? (
        <ul className="space-y-3 animate-pulse">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="h-5 rounded bg-gray-100 dark:bg-gray-700" />
          ))}
        </ul>
      ) : error ? (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {error}
          <button className="ml-2 text-violet-600 hover:underline" onClick={fetchData}>다시 시도</button>
        </div>
      ) : items.length === 0 ? (
        <div className="text-sm text-gray-500 dark:text-gray-400">최근 수정 문서가 없습니다.</div>
      ) : (
        <ul className="space-y-3">
          {items.map((r) => (
            <li key={r.slug}>
              <Link href={`/wiki/${r.slug}`} className="block rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-800/60">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{r.title}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(r.updatedAt)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


