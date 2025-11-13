"use client"
import { useMemo, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import WikiLayout from "@/app/wiki/components/WikiLayout"
import { Button } from "@/components/Button"
import { Edit, History, MessageSquare, Star, Share2, Bookmark } from "lucide-react"
import BlocksWithToc from "@/app/wiki/components/BlocksWithToc"
import type { WikiCategory, CategoryData } from "@/types/hierarchical.editor.types"
import RevisionHistoryDialog from "@/app/wiki/components/RevisionHistoryDialog"
import { useWikiDocument } from "@/app/wiki/components/useWikiDocument"
import { useWikiBookmark } from "@/app/wiki/components/useWikiBookmark"
import { CATEGORY_META } from "@/app/wiki/components/categoryMeta"
import ReviewSection from "@/app/wiki/components/review/ReviewSection"

export default function WikiOtherPage() {
  const params = useParams() as { slug: string }
  const wikiId = params?.slug
  const router = useRouter()
  const [showHistory, setShowHistory] = useState(false)
  const searchParams = useSearchParams()
  const rev = searchParams?.get("rev") || null
  const { data, revision, revError, loading, error } = useWikiDocument(wikiId, rev)
  const { bookmarkId, pending: bookmarkPending, toggle: handleToggleBookmark } = useWikiBookmark(wikiId)

  const category: WikiCategory = useMemo(() => {
    return (data?.content?.categoryData?.type ?? "other") as WikiCategory
  }, [data])
  const meta = CATEGORY_META[category]

  const title = data?.title ?? (loading ? "로딩 중..." : error ? "문서 로드 실패" : "")
  const categoryData = data?.content?.categoryData
  const textBlocks = data?.content?.textBlocks ?? []

  return (
    <WikiLayout
      title={title}
      category={meta.label}
      lastUpdated={data?.modifiedAt ? new Date(data.modifiedAt).toLocaleString() : "2023년 5월 12일"}
      views={456}
      contributors={8}
      badgeClassName={meta.badgeClassName}
      showDocInfo={false}
      headerActions={(
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="h-8" onClick={() => router.push(`/wiki/edit/${meta.editPath}/${encodeURIComponent(wikiId)}`)}>
            <Edit className="w-4 h-4 mr-2" />
            편집하기
          </Button>
          <Button variant="outline" size="sm" className="h-8" onClick={() => setShowHistory(true)}>
            <History className="w-4 h-4 mr-2" />
            역사
          </Button>
          <Link href={`/wiki/${encodeURIComponent(wikiId)}/discuss`} className="inline-flex" aria-label="문서 토론 페이지로 이동">
            <Button variant="outline" size="sm" className="h-8">
              <MessageSquare className="w-4 h-4 mr-2" />
              토론
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="h-8">
            <Star className="w-4 h-4 mr-2" />
            평가
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Share2 className="w-4 h-4 mr-2" />
            공유
          </Button>
          <Button variant="outline" size="sm" className="h-8" onClick={handleToggleBookmark} disabled={bookmarkPending} aria-pressed={!!bookmarkId}>
            <Bookmark className="w-4 h-4 mr-2" fill={bookmarkId ? "currentColor" : "none"} />
            {bookmarkId ? "북마크 해제" : "북마크"}
          </Button>
        </div>
      )}
    >
      {wikiId && (
        <RevisionHistoryDialog wikiId={wikiId} open={showHistory} onOpenChange={setShowHistory} category="other" />
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
            onClick={() => router.push(`/wiki/${meta.editPath}/${encodeURIComponent(wikiId)}`)}
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
          linkColorClass={meta.linkColorClass}
          showIndex={false}
        />
      )}
      {loading && (
        <div className="text-sm text-muted-foreground">로딩 중...</div>
      )}
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      {!error && !loading && wikiId ? (
        <ReviewSection wikiId={wikiId} />
      ) : null}
    </WikiLayout>
  )
}
