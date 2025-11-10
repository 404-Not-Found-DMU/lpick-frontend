"use client"
import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import WikiLayout from "@/app/wiki/components/WikiLayout"
import { Button } from "@/components/Button"
import { Edit, History, MessageSquare, Star, Share2, Bookmark } from "lucide-react"
import BlocksWithToc from "@/app/wiki/components/BlocksWithToc"
import type { WikiCategory, TextBlock, CategoryData } from "@/types/hierarchical.editor.types"
import { fetcher } from "@/hooks/api/fetchers"
import RevisionHistoryDialog from "@/app/wiki/components/RevisionHistoryDialog"
import { getWikiRevision, type RevisionDetail } from "@/hooks/api/wiki.api"

type WikiContent = { textBlocks: TextBlock[]; categoryData: { type: WikiCategory; data: unknown } }
type WikiDetail = { wikiId: string; title: string; content: WikiContent; modifiedAt?: string | null }

export default function WikiArtistPage() {
  const params = useParams() as { slug: string }
  const wikiId = params?.slug
  const router = useRouter()
  const [showHistory, setShowHistory] = useState(false)
  const searchParams = useSearchParams()
  const rev = searchParams?.get("rev") || null
  const [revision, setRevision] = useState<RevisionDetail | null>(null)
  const [revError, setRevError] = useState<string | null>(null)

  const [data, setData] = useState<WikiDetail | null>(null)
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
            // 리비전 기반으로 제목 산출
            let derivedTitle = '문서'
            const cd = (revContent as any)?.categoryData
            switch (cd?.type) {
              case 'lp':
                derivedTitle = cd?.data?.infobox?.title || '문서'
                break
              case 'artist':
                derivedTitle = cd?.data?.name || '문서'
                break
              case 'equipment':
                derivedTitle = cd?.data?.name || '문서'
                break
              case 'other':
                derivedTitle = cd?.data?.title || '문서'
                break
            }
            setData({
              wikiId: wikiId,
              title: derivedTitle,
              content: revContent,
              modifiedAt: revisionRes.createdAt
            })
            setRevision(revisionRes)
          } catch {
            if (!active) return
            // 리비전 실패 시에만 기본 문서 폴백
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

  const category: WikiCategory = useMemo(() => {
    return (data?.content?.categoryData?.type ?? "artist") as WikiCategory
  }, [data])

  const title = data?.title ?? (loading ? "로딩 중..." : error ? "문서 로드 실패" : "")
  const categoryData = data?.content?.categoryData
  const textBlocks = data?.content?.textBlocks ?? []

  return (
    <WikiLayout
      title={title}
      category={"아티스트"}
      lastUpdated={data?.modifiedAt ? new Date(data.modifiedAt).toLocaleString() : "2023년 5월 18일"}
      views={892}
      contributors={18}
      badgeClassName="bg-purple-500/10 text-purple-500"
      showDocInfo={false}
      headerActions={(
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="h-8" onClick={() => router.push(`/wiki/edit/artist/${encodeURIComponent(wikiId)}`)}>
            <Edit className="w-4 h-4 mr-2" />
            편집하기
          </Button>
          <Button variant="outline" size="sm" className="h-8" onClick={() => setShowHistory(true)}>
            <History className="w-4 h-4 mr-2" />
            역사
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <MessageSquare className="w-4 h-4 mr-2" />
            토론
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Star className="w-4 h-4 mr-2" />
            평가
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Share2 className="w-4 h-4 mr-2" />
            공유
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Bookmark className="w-4 h-4 mr-2" />
            북마크
          </Button>
        </div>
      )}
    >
      {wikiId && (
        <RevisionHistoryDialog wikiId={wikiId} open={showHistory} onOpenChange={setShowHistory} category="artist" />
      )}
      {revError && (
        <div className="mb-4 text-xs text-red-500">
          {revError}
        </div>
      )}
      {revision && (
        <div className="mb-4 text-xs text-muted-foreground">
          이 문서는 리비전 <span className="font-mono">{revision.revisionId}</span> 기준으로 표시 중입니다.{" "}
          <button
            type="button"
            className="underline"
            onClick={() => router.push(`/wiki/artist/${encodeURIComponent(wikiId)}`)}
          >
            최신 보기
          </button>
        </div>
      )}
      {!error && !loading && categoryData && (
        <BlocksWithToc
          textBlocks={textBlocks}
          category={category}
          categoryData={categoryData as CategoryData}
          linkColorClass="text-purple-500"
          showIndex={false}
        />
      )}
      {loading && (
        <div className="text-sm text-muted-foreground">로딩 중...</div>
      )}
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </WikiLayout>
  )
}
