'use client'

import Link from 'next/link'
import { ExternalLink, MessageCircle, Calendar, Disc, Music, Eye, Heart } from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components'

/**
 * 검색 결과 페이지 UI 스켈레톤
 * - 더미 데이터 제거
 * - 프로젝트 공용 컴포넌트( Button, Card, Badge ) 사용
 * - 실제 데이터 연동 전, 전달값이 없으면 섹션을 비표시하거나 빈 상태로 렌더링
 */
export default function SearchResultPage() {
  // 실제 연동 시 검색 파라미터와 서버 데이터로 대체
  const searchedImageUrl: string | undefined = undefined
  const wiki: {
    coverUrl?: string
    type?: string
    title?: string
    artist?: string
    year?: string
    genre?: string
    label?: string
    href?: string
    description?: string
  } | null = null
  const posts: Array<{
    id: string | number
    category?: string
    prefix?: string
    title?: string
    author?: string
    time?: string
    likes?: number
    comments?: number
    views?: number
    href?: string
    excerpt?: string
  }> | null = null

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
              <p className="text-gray-700 dark:text-gray-300">연동 후 결과 개수를 표시합니다.</p>
            </div>
          </div>
        </div>

        {/* 위키 문서 결과 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
            <Music className="w-5 h-5 mr-2 text-violet-500 dark:text-violet-400" />
            위키 문서
          </h2>

          {wiki ? (
            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <CardContent className="py-2 px-4">
                <div className="flex gap-4">
                  {/* 앨범 이미지 */}
                  <div className="w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {wiki.coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={wiki.coverUrl} alt={wiki.title ?? 'cover'} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">이미지 없음</div>
                    )}
                  </div>

                  {/* 앨범 정보 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        {wiki.type ? (
                          <Badge className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 mb-1.5">
                            <Disc className="w-3 h-3 mr-1" />
                            {wiki.type}
                          </Badge>
                        ) : null}
                        {wiki.title ? (
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{wiki.title}</h3>
                        ) : (
                          <div className="h-6 w-48 bg-gray-100 dark:bg-gray-700 rounded" />
                        )}
                        {wiki.artist ? (
                          <p className="text-lg text-gray-600 dark:text-gray-400 mt-0.5">{wiki.artist}</p>
                        ) : (
                          <div className="h-5 w-32 mt-1 bg-gray-100 dark:bg-gray-700 rounded" />
                        )}
                      </div>
                      {wiki.href ? (
                        <Link href={wiki.href}>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            문서 보기
                          </Button>
                        </Link>
                      ) : null}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2.5">
                      {wiki.year ? (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-1.5" />
                          <span>발매: {wiki.year}</span>
                        </div>
                      ) : null}
                      {wiki.genre ? (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">장르:</span> {wiki.genre}
                        </div>
                      ) : null}
                      {wiki.label ? (
                        <div className="text-sm text-gray-600 dark:text-gray-400 col-span-2">
                          <span className="font-medium">레이블:</span> {wiki.label}
                        </div>
                      ) : null}
                    </div>

                    {wiki.description ? (
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{wiki.description}</p>
                    ) : null}
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
            <Badge variant="secondary" className="ml-3">{posts?.length ?? 0}</Badge>
          </h2>

          {posts && posts.length > 0 ? (
            <div className="space-y-3">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
                >
                  <CardContent className="py-2 px-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {post.category ? (
                          <Badge
                            variant="outline"
                            className="text-violet-500 dark:text-violet-400 border-violet-300 dark:border-violet-600"
                          >
                            {post.category}
                          </Badge>
                        ) : null}
                      </div>
                      {post.time ? (
                        <span className="text-sm text-gray-400 dark:text-gray-500">{post.time}</span>
                      ) : null}
                    </div>

                    {post.href ? (
                      <Link href={post.href} className="block mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 hover:text-violet-500 dark:hover:text-violet-400 line-clamp-1">
                          {post.prefix ? <span className="text-violet-500 dark:text-violet-400">[{post.prefix}] </span> : null}
                          {post.title}
                        </h3>
                        {post.excerpt ? (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2">{post.excerpt}</p>
                        ) : null}
                      </Link>
                    ) : (
                      <div className="mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{post.title}</h3>
                        {post.excerpt ? (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2">{post.excerpt}</p>
                        ) : null}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2.5 border-t border-gray-100 dark:border-gray-700">
                      {post.author ? <span className="font-medium">{post.author}</span> : <span />}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes ?? 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments ?? 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views ?? 0}</span>
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


