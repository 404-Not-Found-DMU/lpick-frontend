'use client'

import Link from 'next/link'
import { ExternalLink, MessageCircle, Calendar, Disc, Music, Eye, Heart } from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components'
import { useSearchParams } from 'next/navigation'
import { useCustomQuery } from '@/hooks/useQuery'
import { fetcher } from '@/hooks/api/fetchers'

/**
 * 검색 결과 페이지 UI 스켈레톤
 * - 더미 데이터 제거
 * - 프로젝트 공용 컴포넌트( Button, Card, Badge ) 사용
 * - 실제 데이터 연동 전, 전달값이 없으면 섹션을 비표시하거나 빈 상태로 렌더링
 */
export default function SearchResultPage() {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword') ?? ''
  const page = Number(searchParams.get('page') ?? '1')
  const size = Number(searchParams.get('size') ?? '10')
  const searchedImageUrl: string | undefined = searchParams.get('imageUrl') ?? undefined

  type SearchItem = {
    id: string
    name: string
    documentType: string
  }

  const { data, isLoading, isError } = useCustomQuery<SearchItem[]>(
    ['search', keyword, String(page), String(size)],
    () =>
      fetcher<SearchItem[]>(
        `/api/v1/public/data/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`,
      ),
    {
      enabled: Boolean(keyword),
    },
  )

  const results = data ?? []
  const wikiItems = results.filter((r) => /wiki/i.test(r.documentType ?? ''))
  const postItems = results.filter((r) => /community|post/i.test(r.documentType ?? ''))
  const firstWiki = wikiItems[0]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* 이미지 검색 결과 섹션 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">이미지 검색 결과</h1>
          <div className="flex items-center gap-4">
            <div className="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              {searchedImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={searchedImageUrl} alt="검색된 이미지" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  이미지 미선택
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">검색된 이미지</p>
              {isLoading ? (
                <p className="text-gray-700 dark:text-gray-300">검색 중...</p>
              ) : isError ? (
                <p className="text-red-500">검색에 실패했습니다.</p>
              ) : keyword ? (
                <p className="text-gray-700 dark:text-gray-300">
                  "{keyword}"에 대한 <span className="font-bold text-violet-500 dark:text-violet-400">{results.length}</span>개 결과
                </p>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">검색어를 입력해 주세요.</p>
              )}
            </div>
          </div>
        </div>

        {/* 위키 문서 결과 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
            <Music className="w-5 h-5 mr-2 text-violet-500 dark:text-violet-400" />
            위키 문서
          </h2>

          {firstWiki ? (
            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <CardContent className="py-2 px-4">
                <div className="flex gap-4">
                  {/* 앨범 이미지 */}
                  <div className="w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">이미지 없음</div>
                  </div>

                  {/* 앨범 정보 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Badge className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 mb-1.5">
                          <Disc className="w-3 h-3 mr-1" />
                          WIKI
                        </Badge>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{firstWiki.name}</h3>
                      </div>
                      <Link href="/wiki/view">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          문서 보기
                        </Button>
                      </Link>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">검색 결과에서 제공된 메타 정보가 없습니다.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-10 flex flex-col items-center gap-2">
                <div className="text-gray-500 dark:text-gray-400 text-sm">일치하는 위키 문서가 없습니다.</div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 커뮤니티 게시글 결과 */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-violet-500 dark:text-violet-400" />
            관련 커뮤니티 게시글
            <Badge variant="secondary" className="ml-3">{postItems.length}</Badge>
          </h2>

          {postItems.length > 0 ? (
            <div className="space-y-3">
              {postItems.map((post) => (
                <Card
                  key={post.id}
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
                >
                  <CardContent className="py-2 px-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-violet-500 dark:text-violet-400 border-violet-300 dark:border-violet-600"
                        >
                          COMMUNITY
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-400 dark:text-gray-500">&nbsp;</span>
                    </div>

                    <Link href={`/community/${post.id}`} className="block mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 hover:text-violet-500 dark:hover:text-violet-400 line-clamp-1">
                        {post.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2.5 border-t border-gray-100 dark:border-gray-700">
                      <span />
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>0</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>0</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-10 flex flex-col items-center gap-2">
                <div className="text-gray-500 dark:text-gray-400 text-sm">관련 커뮤니티 게시글이 없습니다.</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}


