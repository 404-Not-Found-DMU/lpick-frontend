"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Clock } from "lucide-react"
import { useCustomQuery } from "@/hooks/useQuery"
import { fetcher } from "@/hooks/api/fetchers"

type RecentApi = { wikiId: string; title: string; modifiedBefore: string; wikiPageClass: string }

// API가 modifiedBefore를 바로 내려주므로 추가 가공 없이 표시합니다.

export default function RecentUpdatedCard() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const { data, isLoading, isError } = useCustomQuery<RecentApi[]>(
    ["recent-modify"],
    () => fetcher<RecentApi[]>("/api/v1/public/wiki/recent-modify"),
    { staleTime: 60_000 },
  )

  function toCategorySegment(cls: string): string {
    switch (cls) {
      case 'ARTIST':
        return 'artist'
      case 'GEAR':
        return 'equipment'
      case 'LP':
        return 'lp'
      case 'OTHER':
        return 'other'
      default:
        return 'other'
    }
  }

  const items = (data ?? []).map((x) => ({
    id: x.wikiId,
    title: x.title,
    modifiedBefore: x.modifiedBefore,
    category: toCategorySegment(x.wikiPageClass),
  }))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-violet-500" />
        최근 수정된 문서
      </h3>

      {!mounted || isLoading ? (
        <ul className="space-y-3 animate-pulse">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="h-5 rounded bg-gray-100 dark:bg-gray-700" />
          ))}
        </ul>
      ) : isError ? (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          최근 수정 문서를 불러오지 못했습니다.
        </div>
      ) : items.length === 0 ? (
        <div className="text-sm text-gray-500 dark:text-gray-400">최근 수정 문서가 없습니다.</div>
      ) : (
        <ul className="space-y-3">
          {items.map((r) => (
            <li key={`${r.category}-${r.id}`}>
              <Link href={`/wiki/${r.category}/${encodeURIComponent(r.id)}`} className="block rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-800/60">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{r.title}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{r.modifiedBefore}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


