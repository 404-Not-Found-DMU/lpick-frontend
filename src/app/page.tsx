"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Eye, TrendingUp } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/Button"
import { Card, CardContent } from "@/components/Card"
import { Badge } from "@/components/Badge"
import { WelcomeModal, useWelcomeModal } from "@/modules/welcomeModal"
import { fetcher } from "@/hooks/api/fetchers"
import { getPopularWiki, type PopularWikiItem } from "@/hooks/api"
import { usePopularArticles } from "@/app/community/hooks/usePopularArticles"
import { getCategoryColor } from "@/app/community/utils"
import RecentUpdatedCard from "@/app/wiki/components/RecentUpdatedCard"

type RecommendAlbum = {
  albumId: string
  name: string
  profile: string
  releaseDate: string
  releaseCountry: string
  label: string
  lpti: string
  imageUrl: string
}

type UIAlbum = {
  id: string
  title: string
  artist: string
  year: string
  imageUrl: string
  gradient: string
}

const GRADIENTS = [
  "from-red-300 via-red-200 to-orange-200 dark:from-red-900 dark:via-red-800 dark:to-orange-900",
  "from-violet-100 via-lavender-100 to-violet-200 dark:from-violet-900 dark:via-lavender-900 dark:to-violet-800",
  "from-amber-50 via-yellow-50 to-yellow-100 dark:from-amber-900 dark:via-yellow-900 dark:to-yellow-800",
  "from-pink-200 via-pink-100 to-rose-100 dark:from-pink-900 dark:via-pink-800 dark:to-rose-900",
  "from-purple-300 via-purple-200 to-indigo-200 dark:from-purple-900 dark:via-purple-800 dark:to-indigo-900",
]

const SpinningRecord = ({ size = 220, coverImage, rotation = 0 }: { size?: number; coverImage?: string; rotation?: number }) => {
  const centerSize = size * 0.45
  const spindleSize = size * 0.08

  return (
    <div
      className="relative flex items-center justify-center pointer-events-none select-none"
      style={{ width: size, height: size }}
    >
      <div
        className="relative w-full h-full animate-[spin_10s_linear_infinite] rounded-full shadow-[0_20px_45px_rgba(0,0,0,0.25)]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(15,15,15,0.9) 0%, rgba(6,6,6,1) 55%, rgba(0,0,0,1) 70%),
            repeating-radial-gradient(circle, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)
          `,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* 하이라이트 */}
        <div className="absolute top-6 left-8 right-12 h-10 rounded-full bg-white/10 blur-3xl" />

        {/* 라벨/커버 */}
        <div
          className="absolute overflow-hidden rounded-full border border-white/30 shadow-inner"
          style={{
            width: centerSize,
            height: centerSize,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {coverImage ? (
            <Image
              src={coverImage}
              alt="앨범 커버"
              fill
              sizes={`${centerSize}px`}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-200 via-rose-200 to-emerald-200" />
          )}
        </div>

        {/* 스핀들 */}
        <div
          className="absolute rounded-full bg-gradient-to-b from-gray-200 to-gray-500 shadow-lg"
          style={{
            width: spindleSize,
            height: spindleSize,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </div>
  )
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [featuredAlbums, setFeaturedAlbums] = useState<UIAlbum[]>([])
  const [loadingAlbums, setLoadingAlbums] = useState<boolean>(true)
  const [albumError, setAlbumError] = useState<string | null>(null)
  const [loadingChart, setLoadingChart] = useState<boolean>(true)
  const [chartError, setChartError] = useState<string | null>(null)

  // 인기 게시글 데이터 가져오기
  const { 
    articles: popularArticles, 
    loading: articlesLoading, 
  } = usePopularArticles()

  type ChartRow = { id: string; rank: number; title: string; subtitle: string }
  type ChartState = { ALBUM: ChartRow[]; GEAR: ChartRow[]; ARTIST: ChartRow[] }
  const [chartData, setChartData] = useState<ChartState>({
    ALBUM: [],
    GEAR: [],
    ARTIST: [],
  })
  
  // 환영 모달 훅
  const { isModalOpen, closeModal, handleTakeLPTI, userInfo } = useWelcomeModal()

  useEffect(() => {
    let active = true
    async function load() {
      try {
        setLoadingAlbums(true)
        const data = await fetcher<RecommendAlbum[]>(`/api/v1/public/data/album/recommend`)
        if (!active) return
        const mapped: UIAlbum[] = (data || []).slice(0, 5).map((a, idx) => ({
          id: a.albumId,
          title: a.name,
          artist: a.profile,
          year: a.releaseDate ? String(new Date(a.releaseDate).getFullYear()) : "",
          imageUrl: a.imageUrl,
          gradient: GRADIENTS[idx % GRADIENTS.length],
        }))
        setFeaturedAlbums(mapped)
        setCurrentSlide(0)
      } catch {
        if (active) setAlbumError("추천 앨범을 불러오지 못했습니다.")
      } finally {
        if (active) setLoadingAlbums(false)
      }
    }
    load()
    return () => { active = false }
  }, [])

  const nextSlide = () => {
    if (isAnimating || featuredAlbums.length === 0) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % featuredAlbums.length)
  }

  const prevSlide = () => {
    if (isAnimating || featuredAlbums.length === 0) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + featuredAlbums.length) % featuredAlbums.length)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [currentSlide])

  useEffect(() => {
    let active = true
    async function loadChart() {
      try {
        setLoadingChart(true)
        setChartError(null)
        const [album, gear, artist] = await Promise.all<PopularWikiItem[]>([
          getPopularWiki({ type: 'ALBUM', size: 5 }),
          getPopularWiki({ type: 'GEAR', size: 5 }),
          getPopularWiki({ type: 'ARTIST', size: 5 }),
        ])
        if (!active) return
        const toRows = (list: PopularWikiItem[]): ChartRow[] =>
          (list || []).map((it, idx) => ({
            id: it.id,
            rank: idx + 1,
            title: it.name,
            subtitle: `조회수 ${Number(it.viewCount ?? 0).toLocaleString()}`,
          }))
        setChartData({
          ALBUM: toRows(album),
          GEAR: toRows(gear),
          ARTIST: toRows(artist),
        })
      } catch {
        if (active) setChartError("인기 위키를 불러오지 못했습니다.")
      } finally {
        if (active) setLoadingChart(false)
      }
    }
    loadChart()
    return () => { active = false }
  }, [])

  // 게시글 시간 포맷 함수
  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const postDate = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}시간 전`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}일 전`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 오늘의 추천 음반 섹션 */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">오늘의 추천 음반</h2>
            <Link
              href="/wiki"
              className="text-violet-500 dark:text-violet-400 hover:text-violet-600 dark:hover:text-violet-300 font-medium"
            >
              더 보기
            </Link>
          </div>

          {/* 중앙 앨범 정보 */}
          <div className="text-center mb-6">
            {loadingAlbums && (
              <p className="text-sm text-gray-500 dark:text-gray-400">로딩 중...</p>
            )}
            {!loadingAlbums && featuredAlbums.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {featuredAlbums[currentSlide].artist} - {featuredAlbums[currentSlide].title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {featuredAlbums[currentSlide].year}
                </p>
              </>
            )}
            {albumError && (
              <p className="text-sm text-red-500">{albumError}</p>
            )}
          </div>

          {/* 앨범 캐러셀 */}
          <div className="relative">
            <div className="flex items-center justify-center overflow-hidden h-[340px] relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="absolute left-4 z-30 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 shadow-md"
                disabled={isAnimating || featuredAlbums.length === 0}
              >
                <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </Button>

              {/* 로딩 / 데이터 없음 상태 */}
              {(loadingAlbums || (!loadingAlbums && featuredAlbums.length === 0)) && (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <SpinningRecord size={260} />
                  <p className="mt-4 text-sm">
                    {loadingAlbums ? '추천 앨범을 불러오는 중입니다.' : '추천 앨범을 준비 중입니다.'}
                  </p>
                </div>
              )}

              {/* 앨범 커버 캐러셀 */}
              {!loadingAlbums && featuredAlbums.length > 0 && (
                <div className="relative z-10 flex items-center justify-center gap-16">
                  {featuredAlbums.map((album, index) => {
                  const position = (index - currentSlide + featuredAlbums.length) % featuredAlbums.length
                  let translateX = 0
                  let scale = 0
                  let zIndex = 0
                  let opacity = 0
                  const isCenter = position === 0

                  // 위치에 따른 스타일 조정
                  if (isCenter) {
                    // 중앙 (3번)
                    translateX = 0
                    scale = 1
                    zIndex = 20
                    opacity = 1
                  } else if (position === 1 || position === -4) {
                    // 오른쪽 첫번째 (4번)
                    translateX = 280
                    scale = 0.8
                    zIndex = 10
                    opacity = 0.9
                  } else if (position === -1 || position === 4) {
                    // 왼쪽 첫번째 (2번)
                    translateX = -280
                    scale = 0.8
                    zIndex = 10
                    opacity = 0.9
                  } else if (position === 2 || position === -3) {
                    // 오른쪽 두번째 (5번)
                    translateX = 500
                    scale = 0.6
                    zIndex = 5
                    opacity = 0.7
                  } else if (position === -2 || position === 3) {
                    // 왼쪽 두번째 (1번)
                    translateX = -500
                    scale = 0.6
                    zIndex = 5
                    opacity = 0.7
                  } else {
                    return null // 너무 멀리 있는 앨범은 렌더링하지 않음
                  }

                    return (
                      <div
                        key={album.id}
                        className="absolute transition-all duration-500 ease-in-out cursor-pointer"
                        style={{
                          transform: `translateX(${translateX}px) scale(${scale})`,
                          zIndex,
                          opacity,
                        }}
                        onClick={() => {
                          if (!isCenter && !isAnimating) {
                            setIsAnimating(true)
                            setCurrentSlide(index)
                          }
                        }}
                      >
                        <div className="relative flex items-center justify-center">
                          {isCenter && (
                            <div className="pointer-events-none absolute right-[-70px] top-1/2 -translate-y-1/2 -z-10 hidden sm:block">
                              <SpinningRecord size={150} coverImage={album.imageUrl} rotation={-8} />
                            </div>
                          )}
                          <div
                            className={`w-[220px] h-[220px] bg-gradient-to-br ${album.gradient} shadow-xl rounded-[26px] overflow-hidden border border-white/40 dark:border-gray-700 relative backdrop-blur`}
                          >
                            <Image
                              src={album.imageUrl}
                              alt={`${album.title} 앨범 커버`}
                              fill
                              sizes="220px"
                              className="object-cover"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement
                                target.style.display = 'none'
                              }}
                            />

                            {!isCenter && (
                              <div
                                className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 text-white opacity-0 transition-opacity duration-300 hover:opacity-100"
                                style={{ textShadow: "0 6px 18px rgba(0,0,0,0.4)" }}
                              >
                                <p className="text-sm font-medium">{album.artist}</p>
                                <h4 className="text-lg font-semibold mt-1">{album.title}</h4>
                                <p className="text-xs mt-2 opacity-90">{album.year}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="absolute right-4 z-30 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 shadow-md"
                disabled={isAnimating || featuredAlbums.length === 0}
              >
                <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </Button>
            </div>

            {/* 인디케이터 */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredAlbums.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true)
                      setCurrentSlide(index)
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-violet-500 dark:bg-violet-400" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 실시간 인기 위키 차트 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              <TrendingUp className="inline-block w-6 h-6 mr-2 text-violet-500 dark:text-violet-400" />
              실시간 인기 위키 차트
            </h2>
            <Link
              href="/wiki"
              className="text-violet-500 dark:text-violet-400 hover:text-violet-600 dark:hover:text-violet-300 font-medium"
            >
              전체보기 →
            </Link>
          </div>

          {chartError && (
            <p className="text-sm text-red-500 mb-4">{chartError}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { key: 'ALBUM' as const, label: '음반', icon: '🎵', segment: 'lp' },
              { key: 'GEAR' as const, label: '장비', icon: '🎧', segment: 'equipment' },
              { key: 'ARTIST' as const, label: '아티스트', icon: '🎤', segment: 'artist' },
            ].map(({ key, label, icon, segment }) => (
              <div key={key} className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center">
                  {icon} {label}
                </h3>

                <div className="space-y-3">
                  {loadingChart
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-[46px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md" />
                        </div>
                      ))
                    : chartData[key].map((item) => (
                        <Link key={item.id} href={`/wiki/${segment}/${encodeURIComponent(item.id)}`}>
                          <Card className="hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-violet-300 dark:hover:border-violet-600">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-center space-x-3">
                                <div
                                  className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                    item.rank === 1
                                      ? "bg-yellow-500 dark:bg-yellow-600"
                                      : item.rank === 2
                                        ? "bg-gray-400 dark:bg-gray-500"
                                        : item.rank === 3
                                          ? "bg-orange-500 dark:bg-orange-600"
                                          : "bg-violet-400 dark:bg-violet-500"
                                  }`}
                                >
                                  {item.rank}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm line-clamp-1 hover:text-violet-600 dark:hover:text-violet-400">
                                    {item.title}
                                  </h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.subtitle}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 최근 수정된 문서 - 위키 메인 컴포넌트 사용 */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <RecentUpdatedCard />
        </div>
      </section>

      {/* 커뮤니티 핫이슈 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">커뮤니티 핫이슈</h2>
            <Link
              href="/community"
              className="text-violet-500 dark:text-violet-400 hover:text-violet-600 dark:hover:text-violet-300 font-medium"
            >
              커뮤니티 가기 →
            </Link>
          </div>

          {articlesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <Card
                  key={index}
                  className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : popularArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularArticles.slice(0, 4).map((article) => (
                <Card
                  key={article.articleId}
                  className="hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge
                        className={getCategoryColor(article.articleType)}
                      >
                        {article.articleType}
                      </Badge>
                      <span className="text-sm text-gray-400 dark:text-gray-500">
                        {formatTimeAgo(article.createdAt)}
                      </span>
                    </div>
                    <Link href={`/community/${article.articleId}`} className="block">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-violet-500 dark:hover:text-violet-400 line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{article.author}</span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span>{article.likeCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span>{article.commentCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span>{article.viewCount}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-gray-300 dark:border-gray-600">
              <CardContent className="py-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">아직 인기 게시글이 없습니다.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* 환영 모달 - isModalOpen 상태와 userInfo 존재 여부로 표시 */}
      <WelcomeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userInfo={userInfo}
        onTakeLPTI={handleTakeLPTI}
      />
    </div>
  )
}
