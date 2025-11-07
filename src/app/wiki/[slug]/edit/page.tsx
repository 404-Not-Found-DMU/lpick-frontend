"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { UniversalWikiEditor } from "@/app/wiki/edit/components/UniversalWikiEditor"
import type { CategoryData, TextBlock, WikiCategory } from "@/types/hierarchical.editor.types"
import { createWikiRevision } from "@/hooks/api/wiki.api"
import { fetcher } from "@/hooks/api/fetchers"

function toWikiCategory(raw: unknown): WikiCategory {
  switch (raw) {
    case "lp":
    case "artist":
    case "equipment":
    case "other":
      return raw as WikiCategory
    default:
      return "other"
  }
}

export default function WikiEditPage() {
  const params = useParams() as { slug?: string }
  const router = useRouter()
  const wikiId = params?.slug ?? ""

  const [category, setCategory] = useState<WikiCategory | null>(null)
  const [initialData, setInitialData] = useState<{ categoryData?: CategoryData; textBlocks?: TextBlock[] } | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let aborted = false
    async function load() {
      if (!wikiId) return
      setLoading(true)
      try {
        // 공개 API로 문서 상세 조회 (뷰 페이지와 동일 포맷)
        type WikiContent = { textBlocks?: TextBlock[]; categoryData?: { type: WikiCategory; data: unknown } }
        type WikiDetail = { wikiId: string; title: string; content?: WikiContent; category?: WikiCategory }
        const data = await fetcher<WikiDetail>(`/api/v1/public/wiki/${encodeURIComponent(wikiId)}`)

        if (aborted) return
        const detectedCategory: WikiCategory | null = (data?.content?.categoryData?.type as WikiCategory) || (data?.category as WikiCategory) || null
        setCategory(detectedCategory ?? "other")

        if (data?.content?.categoryData) {
          setInitialData({
            categoryData: data.content.categoryData as unknown as CategoryData,
            textBlocks: data.content.textBlocks ?? []
          })
        }
      } catch {
        if (!aborted) {
          setCategory((prev) => prev ?? "other")
        }
      } finally {
        if (!aborted) setLoading(false)
      }
    }
    load()
    return () => {
      aborted = true
    }
  }, [wikiId])

  const handleSave = useMemo(() => {
    return async ({ categoryData, textBlocks }: { categoryData: CategoryData; textBlocks: TextBlock[] }) => {
      if (!wikiId) return
      try {
        await createWikiRevision(wikiId, { content: { categoryData, textBlocks } })
        router.push(`/wiki/${encodeURIComponent(wikiId)}`)
      } catch (e) {
        // 간단 알림
        alert("수정 내용을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.")
        // 실패 시 머무름
      }
    }
  }, [router, wikiId])

  if (!wikiId) {
    return <div className="p-6">잘못된 경로입니다.</div>
  }

  if (loading && !category) {
    return <div className="p-6">편집기 로딩 중...</div>
  }

  const effectiveCategory: WikiCategory = category ?? "other"

  return (
    <div className="flex-1">
      <UniversalWikiEditor
        category={effectiveCategory}
        initialData={initialData}
        onSave={handleSave}
      />
    </div>
  )
}


