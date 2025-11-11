"use client"
import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { FileText, ChevronRight } from "lucide-react"

type Related = { title: string; slug: string }

export default function RelatedPagesCard({ slug, initial }: { slug: string; initial?: Related[] }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<Related[]>(initial ?? [])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/wiki/${encodeURIComponent(slug)}`)
      if (!res.ok) throw new Error("failed")
      const json = await res.json()
      setItems((json.relatedPages ?? []) as Related[])
    } catch {
      setError("관련 문서를 불러오지 못했습니다.")
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    if (!initial || initial.length === 0) fetchData()
    else setLoading(false)
  }, [fetchData, initial])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-violet-500" />
        관련 문서
      </h3>

      {loading ? (
        <ul className="space-y-2 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="h-4 rounded bg-gray-100 dark:bg-gray-700" />
          ))}
        </ul>
      ) : error ? (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {error}
          <button className="ml-2 text-violet-600 hover:underline" onClick={fetchData}>다시 시도</button>
        </div>
      ) : items.length === 0 ? (
        <div className="text-sm text-gray-500 dark:text-gray-400">관련 문서가 없습니다.</div>
      ) : (
        <>
          <ul className="space-y-2">
            {items.slice(0, 5).map((page) => (
              <li key={page.slug}>
                <Link href={`/wiki/${page.slug}`} className="flex items-center text-violet-600 hover:underline">
                  <ChevronRight className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{page.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          {items.length > 5 && (
            <div className="mt-3 text-right">
              <Link href={`/wiki/${encodeURIComponent(slug)}?tab=related`} className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-400">더보기</Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}


