'use client'

import Link from 'next/link'
import { ExternalLink, MessageCircle, Disc, Music, Eye, Heart, Loader2 } from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components'
import { useSearchParams } from 'next/navigation'
import { useCustomQuery } from '@/hooks/useQuery'
import { fetcher } from '@/hooks/api/fetchers'
import { Suspense, useEffect, useState } from 'react'
import { searchAlbumByImage, blobUrlToFile, type ImageSearchResult } from '../api/imageSearch.api'
import Image from 'next/image'
 

/**
 * 검색 결과 페이지 UI 스켈레톤
 * - 더미 데이터 제거
 * - 프로젝트 공용 컴포넌트( Button, Card, Badge ) 사용
 * - 실제 데이터 연동 전, 전달값이 없으면 섹션을 비표시하거나 빈 상태로 렌더링
 */
function SearchResultContent() {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword') ?? ''
  const page = Number(searchParams.get('page') ?? '1')
  const size = Number(searchParams.get('size') ?? '10')
  const searchedImageUrl: string | undefined = searchParams.get('imageUrl') ?? undefined
  const isImageSearch = Boolean(searchedImageUrl)
  const isTextSearch = Boolean(keyword)
  const [imageFile, setImageFile] = useState<File | null>(null)

  type SearchItem = {
    id: string
    name: string
    documentType: string
  }

  // Blob URL을 File로 변환
  useEffect(() => {
    if (searchedImageUrl && isImageSearch) {
      blobUrlToFile(searchedImageUrl)
        .then((file) => {
          setImageFile(file)
        })
        .catch((error) => {
          console.error('이미지 파일 변환 실패:', error)
        })
    }
  }, [searchedImageUrl, isImageSearch])

  // 텍스트 검색 쿼리
  const { data, isLoading, isError } = useCustomQuery<SearchItem[]>(
    ['search', keyword, String(page), String(size)],
    () =>
      fetcher<SearchItem[]>(
        `/api/v1/public/data/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`,
      ),
    {
      enabled: Boolean(keyword) && !isImageSearch,
    },
  )

  // 이미지 검색 쿼리
  const { 
    data: imageSearchData, 
    isLoading: isImageSearchLoading, 
    isError: isImageSearchError 
  } = useCustomQuery<ImageSearchResult[]>(
    ['imageSearch', searchedImageUrl ?? ''],
    () => {
      if (!imageFile) {
        throw new Error('이미지 파일이 없습니다.')
      }
      return searchAlbumByImage(imageFile)
    },
    {
      enabled: isImageSearch && Boolean(imageFile),
    },
  )

  const results = data ?? []
  const normalizeType = (t?: string) => (t ?? '').toUpperCase()
  const isWikiType = (t: string) => ['ALBUM', 'ARTIST', 'GEAR', 'OTHER'].includes(t)
  const isArticleType = (t: string) => t === 'ARTICLE'
  const wikiItems = results.filter((r) => isWikiType(normalizeType(r.documentType)))
  const postItems = results.filter((r) => isArticleType(normalizeType(r.documentType)))
  const firstWiki = wikiItems[0]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* 통합검색 헤더 (텍스트 검색 전용) */}
        {isTextSearch && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">검색결과</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">{keyword}에 대한 검색결과입니다.</p>
          </div>
        )}

        {/* 이미지 검색 결과 섹션 */}
        {isImageSearch && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">이미지 검색 결과</h1>
            
            {/* 업로드한 이미지 표시 */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                {searchedImageUrl && (
                  <Image
                    src={searchedImageUrl}
                    alt="업로드한 이미지"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">업로드한 이미지</p>
                <p className="text-gray-700 dark:text-gray-300">유사한 앨범을 검색 중입니다...</p>
              </div>
            </div>

            {/* 검색 결과 로딩 상태 */}
            {isImageSearchLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
                <span className="ml-3 text-gray-600 dark:text-gray-400">검색 중...</span>
              </div>
            )}

            {/* 검색 결과 에러 상태 */}
            {isImageSearchError && (
              <Card className="border-dashed">
                <CardContent className="py-10 flex flex-col items-center gap-2">
                  <div className="text-red-500 dark:text-red-400 font-medium">검색 중 오류가 발생했습니다.</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">다시 시도해 주세요.</div>
                </CardContent>
              </Card>
            )}

            {/* 검색 결과 표시 */}
            {!isImageSearchLoading && !isImageSearchError && imageSearchData && (
              <>
                {imageSearchData.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                        <Music className="w-5 h-5 mr-2 text-violet-500 dark:text-violet-400" />
                        검색된 앨범
                        <Badge variant="secondary" className="ml-3">{imageSearchData.length}</Badge>
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {imageSearchData.map((result, index) => (
                        <Card
                          key={`${result.albumId}-${index}`}
                          className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
                        >
                          <CardContent className="p-4">
                            <Link href={`/wiki/${result.wikiId}`}>
                              <div className="space-y-3">
                                {/* 앨범 이미지 */}
                                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                  {result.imageUrl ? (
                                    <Image
                                      src={result.imageUrl}
                                      alt={result.name}
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                      이미지 없음
                                    </div>
                                  )}
                                </div>

                                {/* 앨범 정보 */}
                                <div>
                                  <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2 flex-1">
                                      {result.name}
                                    </h3>
                                  </div>
                                  
                                  {/* 유사도 표시 */}
                                  <div className="flex items-center justify-between">
                                    <Badge className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300">
                                      <Disc className="w-3 h-3 mr-1" />
                                      유사도: {Math.round(result.similarity * 100)}%
                                    </Badge>
                                    <Button variant="outline" size="sm">
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      보기
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="py-10 flex flex-col items-center gap-2">
                      <div className="text-gray-700 dark:text-gray-300 font-medium">검색 결과가 없습니다.</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">다른 이미지로 다시 시도해 보세요.</div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        )}

        {/* 전체 빈 상태 (검색 결과 없음) - 텍스트 검색에만 표시 */}
        {!isImageSearch && !isLoading && !isError && keyword && results.length === 0 && (
          <div className="mb-6">
            <Card className="border-dashed">
              <CardContent className="py-10 flex flex-col items-center gap-2">
                <div className="text-gray-700 dark:text-gray-300 font-medium">검색 결과가 없습니다.</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">다른 키워드로 다시 시도해 보세요.</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 위키 문서 결과 (텍스트 검색 전용) */}
        {!isImageSearch && (
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
        )}

        {/* 커뮤니티 게시글 결과 (텍스트 검색 전용) */}
        {!isImageSearch && (
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
        )}
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-6 max-w-5xl text-sm text-gray-500">로딩 중...</div>}>
      <SearchResultContent />
    </Suspense>
  )
}


