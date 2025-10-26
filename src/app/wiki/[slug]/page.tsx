"use client"
import { useState } from "react"
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
import { getDummyData } from "@/app/wiki/edit/data/dummyData"
import type { WikiCategory } from "@/types/hierarchical.editor.types"

export default function WikiViewPage({ params }: { params: { slug: string } }) {
  const [showTableOfContents, setShowTableOfContents] = useState(true)

  // 더미 데이터 사용 (후속 작업에서 실제 데이터 연동 예정)
  const wikiData = getDummyData('lp')
  const category: WikiCategory = 'lp'
  const categoryData = wikiData.categoryData
  const textBlocks = wikiData.textBlocks

  const slug = params.slug

  // 위키 메타데이터
  const wikiMeta = {
    title: categoryData.type === 'lp' 
      ? (categoryData.data as { infobox: { title: string } }).infobox.title
      : slug,
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

      {/* 푸터 (전역 Footer가 있어 중복일 수 있음) */}
      <footer className="py-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="container px-4 mx-auto">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <Link href="/" className="inline-block mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white font-bold text-sm">L</span>
                  </div>
                  <span className="text-2xl font-bold text-violet-500">LPick</span>
                </div>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                LP 컬렉션을 관리하고 음악 애호가들과 소통하는 공간
              </p>
            </div>

            <div>
              <h3 className="mb-6 text-sm font-medium text-gray-900 dark:text-gray-100">서비스 안내</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-500">
                    LPick 소개
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-500">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-500">
                    개인정보처리방침
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-sm font-medium text-gray-900 dark:text-gray-100">소셜 미디어</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-violet-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-violet-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-violet-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-10 mt-10 text-sm text-center text-gray-400 border-t border-gray-100 dark:border-gray-800">
            &copy; {new Date().getFullYear()} LPick. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}


