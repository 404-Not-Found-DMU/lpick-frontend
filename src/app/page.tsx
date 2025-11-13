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

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [featuredAlbums, setFeaturedAlbums] = useState<UIAlbum[]>([])
  const [loadingAlbums, setLoadingAlbums] = useState<boolean>(true)
  const [albumError, setAlbumError] = useState<string | null>(null)
  const [loadingChart, setLoadingChart] = useState<boolean>(true)
  const [chartError, setChartError] = useState<string | null>(null)

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

  

  const hotPosts = [
    {
      id: 1,
      category: "구매후기",
      title: "처음 구매한 LP 턴테이블 후기입니다!",
      author: "음악애호가",
      time: "1시간 전",
      likes: 24,
      comments: 8,
      views: 156,
    },
    {
      id: 2,
      category: "질문답변",
      title: "오래 고민한 장비 선택에 대한 조언을 구합니다",
      author: "초보자",
      time: "2시간 전",
      likes: 18,
      comments: 12,
      views: 203,
    },
    {
      id: 3,
      category: "자유게시판",
      title: "LP 레코드 관리 팁 공유합니다",
      author: "레코드매니아",
      time: "3시간 전",
      likes: 31,
      comments: 15,
      views: 287,
    },
    {
      id: 4,
      category: "구매정보",
      title: "Pink Floyd - The Dark Side of the Moon 리뷰",
      author: "클래식록팬",
      time: "4시간 전",
      likes: 42,
      comments: 23,
      views: 398,
    },
  ]

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
            <div className="flex items-center justify-center overflow-hidden h-[320px]">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="absolute left-4 z-30 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 shadow-md"
                disabled={isAnimating}
              >
                <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </Button>

              {/* LP 레코드 배경 - 고정 위치 */}
              <div className="absolute left-1/2 transform translate-x-2 z-0">
                <div className="relative">
                  <div className="w-[180px] h-[180px] rounded-full bg-gray-900 dark:bg-black shadow-xl"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[65px] h-[65px] rounded-full bg-violet-400 dark:bg-violet-500"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>

              {/* 앨범 커버 캐러셀 */}
              <div className="relative z-10 flex items-center justify-center">
                {featuredAlbums.map((album, index) => {
                  const position = (index - currentSlide + featuredAlbums.length) % featuredAlbums.length
                  let translateX = 0
                  let scale = 0
                  let zIndex = 0
                  let opacity = 0

                  // 위치에 따른 스타일 조정
                  if (position === 0) {
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
                        if (position !== 0 && !isAnimating) {
                          setIsAnimating(true)
                          setCurrentSlide(index)
                        }
                      }}
                    >
                      <div
                        className={`w-[220px] h-[220px] bg-gradient-to-br ${album.gradient} shadow-lg dark:shadow-xl rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 relative`}
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
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex flex-col items-center justify-center text-white opacity-0 hover:opacity-100">
                          <div className="text-center">
                            <p className="text-sm font-medium">{album.artist}</p>
                            <h4 className="text-lg font-bold mt-2">{album.title}</h4>
                            <p className="text-xs mt-1">{album.year}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="absolute right-4 z-30 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 shadow-md"
                disabled={isAnimating}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotPosts.map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge
                      variant="outline"
                      className="text-violet-500 dark:text-violet-400 border-violet-300 dark:border-violet-600"
                    >
                      {post.category}
                    </Badge>
                    <span className="text-sm text-gray-400 dark:text-gray-500">{post.time}</span>
                  </div>
                  <Link href={`/community/${post.id}`} className="block">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-violet-500 dark:hover:text-violet-400 line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{post.author}</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
