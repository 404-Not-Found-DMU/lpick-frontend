"use client"
import { useEffect, useState } from "react"
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
import { LivePreview } from "@/app/wiki/edit/components/preview/LivePreview"
import RecentUpdatedCard from "../components/RecentUpdatedCard"
import { getDummyData } from "@/lib/dummy/wiki"
import type { WikiCategory } from "@/types/hierarchical.editor.types"

export default function WikiViewPage() {
  const [showTableOfContents, setShowTableOfContents] = useState(true)

  // 데모 사용 플래그가 꺼져 있으면 안내
  const demoEnabled = process.env.NEXT_PUBLIC_WIKI_DUMMY === 'true'
  useEffect(() => {
    // 클라이언트 전용: 필요한 경우 라우팅 처리 가능
  }, [])

  // 더미 데이터 사용
  const wikiData = getDummyData('lp')
  const category: WikiCategory = 'lp'
  const categoryData = wikiData.categoryData
  const textBlocks = wikiData.textBlocks

  // 위키 메타데이터
  const wikiMeta = {
    title: categoryData.type === 'lp' 
      ? (categoryData.data as { infobox: { title: string } }).infobox.title
      : "The Dark Side of the Moon",
    category: "음반",
    lastUpdated: "2023년 5월 20일",
    views: 1245,
    contributors: 24,
    relatedPages: [
      { title: "Pink Floyd", slug: "pink-floyd" },
      { title: "Roger Waters", slug: "roger-waters" },
      { title: "David Gilmour", slug: "david-gilmour" },
      { title: "프로그레시브 록", slug: "progressive-rock" },
      { title: "1970년대 음악", slug: "1970s-music" },
    ],
  }

  if (!demoEnabled) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 max-w-lg w-full text-center">
          <h1 className="text-2xl font-bold mb-2">데모 페이지 비활성화됨</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            환경변수 NEXT_PUBLIC_WIKI_DUMMY=true 일 때만 /wiki/view 데모가 활성화됩니다.
          </p>
          <Link href="/wiki" className="inline-flex">
            <Button>위키로 이동</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 메인 콘텐츠 */}
          <div className="w-full lg:w-3/4">
            {/* 문서 헤더 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-2">
                <Badge className="bg-violet-500/10 text-violet-500 font-normal mr-2">{wikiMeta.category}</Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400">최근 수정: {wikiMeta.lastUpdated}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{wikiMeta.title}</h1>

              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="h-8">
                  <Edit className="w-4 h-4 mr-2" />
                  편집하기
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <History className="w-4 h-4 mr-2" />
                  역사
                </Button>
                <Link href="/wiki/discuss" className="inline-flex">
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

            {/* 목차 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowTableOfContents(!showTableOfContents)}
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">목차</h2>
                {showTableOfContents ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </div>

              {showTableOfContents && (
                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <ol className="list-decimal list-inside space-y-2">
                    {textBlocks.map((block, index) => (
                      <li key={block.id}>
                        <a href={`#${block.id}`} className="text-violet-500 hover:underline">
                          {index + 1}. {block.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* 위키 문서 본문 - LivePreview 컴포넌트 사용 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <LivePreview 
                category={category}
                categoryData={categoryData}
                textBlocks={textBlocks}
              />
            </div>
          </div>

          {/* 사이드바 */}
          <div className="w-full lg:w-1/4">
            {/* 문서 정보 */}
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
                  <span className="font-medium text-gray-900 dark:text-gray-100">{wikiMeta.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* 관련 문서 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-violet-500" />
                관련 문서
              </h3>
              <ul className="space-y-2">
                {wikiMeta.relatedPages.map((page) => (
                  <li key={page.slug}>
                    <Link href={`/wiki/${page.slug}`} className="flex items-center text-violet-500 hover:underline">
                      <ChevronRight className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span>{page.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 최근 수정된 문서 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-violet-500" />
                최근 수정된 문서
              </h3>
              <RecentUpdatedCard />
            </div>
          </div>
        </div>
    </main>
    </div>
  )
}
