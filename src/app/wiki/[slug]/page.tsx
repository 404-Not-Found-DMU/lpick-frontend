import Link from "next/link"
import { Button } from "@/components/Button"
import { Badge } from "@/components/Badge"
import {
  Edit,
  History,
  MessageSquare,
  Star,
  Share2,
  Bookmark,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Info,
  FileText,
  Clock,
} from "lucide-react"
export default async function WikiViewPage({ params }: { params: { slug: string } }) {
  const slug = params.slug

  // 서버에서 문서 데이터 fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/wiki/${encodeURIComponent(slug)}`, { cache: 'no-store' })
  if (!res.ok) {
    // next/navigation 의 notFound를 쓰지 않고, 간단한 fallback 반환
    // 필요 시 실제 notFound()로 교체 가능
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">문서를 불러오지 못했습니다.</h1>
        <p className="mt-2 text-gray-600">잠시 후 다시 시도해주세요.</p>
      </div>
    )
  }
  const data = await res.json()

  const wikiMeta = {
    title: data.title as string,
    category: '문서',
    lastUpdated: (data.updatedAt ?? data.createdAt) as string,
    views: (data.views ?? 0) as number,
    contributors: (data.contributors ?? 0) as number,
    relatedPages: (data.relatedPages ?? []) as { title: string; slug: string }[],
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

              <div className="flex flex-wrap gap-3">
                <Link href={`/wiki/${encodeURIComponent(slug)}/edit`} className="inline-flex">
                  <Button variant="outline" size="sm" className="h-8">
                    <Edit className="w-4 h-4 mr-2" />
                    편집하기
                  </Button>
                </Link>
                <Link href={`/wiki/${encodeURIComponent(slug)}/history`} className="inline-flex">
                  <Button variant="outline" size="sm" className="h-8">
                    <History className="w-4 h-4 mr-2" />
                    역사
                  </Button>
                </Link>
                <Link href={`/wiki/discuss?docId=${encodeURIComponent(slug)}`} className="inline-flex">
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
                <Button variant="outline" size="sm" className="h-8">
                  <Bookmark className="w-4 h-4 mr-2" />
                  북마크
                </Button>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <div>{data.content}</div>
            </div>
          </div>

          <div className="w-full lg:w-1/4">
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
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-violet-500" />
                관련 문서
              </h3>
              <ul className="space-y-2">
                {wikiMeta.relatedPages.map((page: { title: string; slug: string }) => (
                  <li key={page.slug}>
                    <Link href={`/wiki/${page.slug}`} className="flex items-center text-violet-500 hover:underline">
                      <ChevronRight className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span>{page.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-violet-500" />
                최근 수정된 문서
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/wiki/miles-davis-kind-of-blue" className="block group">
                    <h4 className="text-gray-800 dark:text-gray-200 group-hover:text-violet-500 font-medium">Miles Davis - Kind of Blue</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">1시간 전</p>
                  </Link>
                </li>
                <li>
                  <Link href="/wiki/technics-sl-1200mk7" className="block group">
                    <h4 className="text-gray-800 dark:text-gray-200 group-hover:text-violet-500 font-medium">Technics SL-1200MK7</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">3시간 전</p>
                  </Link>
                </li>
                <li>
                  <Link href="/wiki/the-beatles-abbey-road" className="block group">
                    <h4 className="text-gray-800 dark:text-gray-200 group-hover:text-violet-500 font-medium">The Beatles - Abbey Road</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">5시간 전</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


