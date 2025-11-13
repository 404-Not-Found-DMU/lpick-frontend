"use client"
import { useEffect, useState } from "react"
import { fetcher } from "@/hooks/api/fetchers"
import { getWikiRevision, type RevisionDetail } from "@/hooks/api/wiki.api"
import { deriveTitleFromCategoryData } from "./deriveTitle"
import type { TextBlock, CategoryData } from "@/types/hierarchical.editor.types"

type WikiContent = { textBlocks: TextBlock[]; categoryData: CategoryData }
type WikiDetail = { wikiId: string; title: string; content: WikiContent; modifiedAt?: string | null }

export function useWikiDocument(wikiId?: string | null, rev?: string | null) {
  const [data, setData] = useState<WikiDetail | null>(null)
  const [revision, setRevision] = useState<RevisionDetail | null>(null)
  const [revError, setRevError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    async function run() {
      if (!wikiId) return
      setRevError(null)
      try {
        setLoading(true)
        if (rev) {
          try {
            const revisionRes = await getWikiRevision(wikiId, rev)
            if (!active) return
            const revContent = (revisionRes?.content ?? {}) as WikiContent
            const derivedTitle = deriveTitleFromCategoryData(revContent?.categoryData)
            setData({
              wikiId,
              title: derivedTitle,
              content: revContent,
              modifiedAt: revisionRes.createdAt
            })
            setRevision(revisionRes)
          } catch {
            if (!active) return
            const base = await fetcher<WikiDetail>(`/api/v1/public/wiki/${encodeURIComponent(wikiId)}`)
            if (!active) return
            setData(base)
            setRevision(null)
            setRevError("해당 리비전을 불러오지 못해 최신 문서를 표시합니다.")
          }
        } else {
          const base = await fetcher<WikiDetail>(`/api/v1/public/wiki/${encodeURIComponent(wikiId)}`)
          if (!active) return
          setData(base)
          setRevision(null)
        }
      } catch {
        if (active) setError("문서를 불러오지 못했습니다.")
      } finally {
        if (active) setLoading(false)
      }
    }
    run()
    return () => { active = false }
  }, [wikiId, rev])

  return { data, revision, revError, loading, error }
}

