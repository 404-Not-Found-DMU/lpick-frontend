"use client"

import { useEffect, useState } from "react"
import { Plus, TrendingUp } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@/components"
import Link from "next/link"
import RecentUpdatedCard from "@/app/wiki/components/RecentUpdatedCard"
import { getPopularWiki, getPublicWiki, type PopularWikiItem } from "@/hooks/api"
 
type PopularRow = { id: string; rank: number; title: string; views: number; category?: 'artist' | 'lp' | 'equipment' | 'other' }

const WikiRootPage = () => {
  const [popular, setPopular] = useState<PopularRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    async function run() {
      try {
        setLoading(true)
        setError(null)
        const list = await getPopularWiki({ type: 'ALL', size: 10 })
        if (!active) return
        const base: PopularRow[] = (list || []).map((it, idx) => ({
          id: it.id,
          rank: idx + 1,
          title: it.name,
          views: Number(it.viewCount ?? 0),
        }))
        const enriched = await Promise.all(base.map(async (r) => {
          try {
            const w = await getPublicWiki(r.id)
            const seg = w.wikiPageClass === 'ARTIST' ? 'artist' :
              w.wikiPageClass === 'ALBUM' ? 'lp' :
              w.wikiPageClass === 'GEAR' ? 'equipment' : 'other'
            return { ...r, category: seg }
          } catch {
            return r
          }
        }))
        setPopular(enriched)
      } catch (e) {
        setError("인기 문서를 불러오지 못했습니다.")
      } finally {
        setLoading(false)
      }
    }
    run()
    return () => { active = false }
  }, [])

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-white dark:bg-gray-800/50">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">LPick 위키</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              LP 음반, 아티스트, 장비에 대한 모든 정보를 찾고 공유하는 공간입니다. 함께 만들어가는 음악 애호가들의 지식
              저장소입니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8 items-center justify-center">
              <Link href="/wiki/edit">
                <Button size="lg">
                  <Plus className="w-5 h-5 mr-2" />새 문서 만들기
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="pb-16">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Articles */}
              <div className="lg:col-span-2">
                <RecentUpdatedCard />
              </div>

              {/* Popular Articles */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-violet-500" />
                      인기 문서
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
                    <div className="space-y-3">
                      {loading
                        ? Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="animate-pulse">
                              <div className="h-[46px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md" />
                            </div>
                          ))
                        : popular.map((row) => {
                            const content = (
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                                    row.rank === 1
                                      ? "bg-yellow-500"
                                      : row.rank === 2
                                        ? "bg-gray-400"
                                        : row.rank === 3
                                          ? "bg-orange-500"
                                          : "bg-violet-400"
                                  }`}
                                >
                                  {row.rank}
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-violet-500 line-clamp-1">
                                    {row.title}
                                  </div>
                                  <div className="flex items-center justify-between mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {row.category === 'lp' ? 'LP' : row.category === 'artist' ? '아티스트' : row.category === 'equipment' ? '장비' : '기타'}
                                    </Badge>
                                    <span className="text-xs text-gray-500">{row.views.toLocaleString()} views</span>
                                  </div>
                                </div>
                              </div>
                            )
                            return row.category ? (
                              <Link key={row.id} href={`/wiki/${row.category}/${encodeURIComponent(row.id)}`}>{content}</Link>
                            ) : (
                              <div key={row.id}>{content}</div>
                            )
                          })}
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default WikiRootPage
