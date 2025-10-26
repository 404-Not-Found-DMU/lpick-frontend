import Link from "next/link"
import { Button } from "@/components/Button"
import { Badge } from "@/components/Badge"
import ActionButtons from "@/app/wiki/components/ActionButtons"
import InfoboxLP from "@/app/wiki/components/InfoboxLP"
import dynamic from "next/dynamic"
const ContentWithToc = dynamic(() => import("@/app/wiki/components/ContentWithToc"), { ssr: false })
import { ChevronRight, Info, FileText, Clock } from "lucide-react"
import RelatedPagesCard from "@/app/wiki/components/RelatedPagesCard"
import RecentUpdatedCard from "@/app/wiki/components/RecentUpdatedCard"
export default async function WikiViewPage({ params }: { params: { slug: string } }) {
  const slug = params.slug

  // 서버에서 문서 데이터 fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/wiki/${encodeURIComponent(slug)}`, { cache: 'no-store' })
  if (!res.ok) {
    // 404 처리
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { notFound } = await import('next/navigation')
    return notFound()
  }
  const data = await res.json()

  const wikiMeta = {
    title: data.title as string,
    category: '문서',
    lastUpdated: (data.updatedAt ?? data.createdAt) as string,
    views: (data.views ?? 0) as number,
    contributors: (data.contributors ?? 0) as number,
    relatedPages: (data.relatedPages ?? []) as { title: string; slug: string }[],
    bookmarks: (data.bookmarks ?? 0) as number,
    recent: (data.recent ?? []) as { title: string; slug: string; updatedAt: string }[],
  }

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-2">
                <Badge className="bg-violet-500/10 text-violet-500 font-normal mr-2">{wikiMeta.category}</Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400">최근 수정: {new Date(wikiMeta.lastUpdated).toLocaleString()}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{wikiMeta.title}</h1>

              <ActionButtons slug={slug} />
            </div>

            { /* 동적 로딩: 클라이언트에서 목차/스크롤스파이 */ }
            {/* 카테고리별 인포박스 예시: LP */}
            {data.category === 'lp' && (
              <InfoboxLP data={{
                title: data.title,
                artist: data.artist ?? 'Unknown',
                coverImage: data.coverImage,
                releaseDate: data.releaseDate,
                label: data.label,
                genres: data.genres,
              }} />
            )}

            <ContentWithToc content={data.content} />
          </div>

          <div className="w-full lg:w-1/4">
            <div className="sticky top-24">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-violet-500" />
                문서 정보
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">조회수</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{wikiMeta.views.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">기여자</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{wikiMeta.contributors}명</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">최근 수정</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{new Date(wikiMeta.lastUpdated).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">북마크</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{wikiMeta.bookmarks.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <RelatedPagesCard slug={slug} />

            <RecentUpdatedCard slug={slug} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


