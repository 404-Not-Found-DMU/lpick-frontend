"use client"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import WikiLayout from "@/app/wiki/components/WikiLayout"
import { Button } from "@/components/Button"
import { Edit, History, MessageSquare, Star, Share2, Bookmark } from "lucide-react"
import BlocksWithToc from "@/app/wiki/components/BlocksWithToc"
import type { WikiCategory } from "@/types/hierarchical.editor.types"
import { fetcher } from "@/hooks/api/fetchers"

type TextBlock = { id: string; depth: number; title: string; content: string }
type WikiContent = { textBlocks: TextBlock[]; categoryData: { type: WikiCategory; data: unknown } }
type WikiDetail = { wikiId: string; title: string; content: WikiContent; modifiedAt?: string | null }

export default function WikiOtherPage() {
  const params = useParams() as { slug: string }
  const wikiId = params?.slug

  const [data, setData] = useState<WikiDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    async function run() {
      if (!wikiId) return
      try {
        setLoading(true)
        const res = await fetcher<WikiDetail>(`/api/v1/public/wiki/${encodeURIComponent(wikiId)}`)
        if (active) setData(res)
      } catch {
        if (active) setError("문서를 불러오지 못했습니다.")
      } finally {
        if (active) setLoading(false)
      }
    }
    run()
    return () => { active = false }
  }, [wikiId])

  const category: WikiCategory = useMemo(() => {
    return (data?.content?.categoryData?.type ?? "other") as WikiCategory
  }, [data])

  const title = data?.title ?? (loading ? "로딩 중..." : error ? "문서 로드 실패" : "")
  const categoryData = data?.content?.categoryData
  const textBlocks = data?.content?.textBlocks ?? []

  return (
    <WikiLayout
      title={title}
      category={"기타"}
      lastUpdated={data?.modifiedAt ? new Date(data.modifiedAt).toLocaleString() : "2023년 5월 12일"}
      views={456}
      contributors={8}
      badgeClassName="bg-orange-500/10 text-orange-500"
      showDocInfo={false}
      headerActions={(
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="h-8">
            <Edit className="w-4 h-4 mr-2" />
            편집하기
          </Button>
          <Button variant="outline" size="sm" className="h-8">
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
      {!error && !loading && categoryData && (
        <BlocksWithToc
          textBlocks={textBlocks}
          category={category}
          categoryData={categoryData as unknown}
          linkColorClass="text-orange-500"
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
