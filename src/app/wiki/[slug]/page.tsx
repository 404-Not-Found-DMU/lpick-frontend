import type { Metadata } from "next"
import { Badge } from "@/components/Badge"
import ActionButtons from "@/app/wiki/components/ActionButtons"
import InfoboxLP from "@/app/wiki/components/InfoboxLP"
import ContentWithToc from "@/app/wiki/components/ContentWithToc"
import RelatedPagesCard from "@/app/wiki/components/RelatedPagesCard"
import RecentUpdatedCard from "@/app/wiki/components/RecentUpdatedCard"
import ScrollTopButton from "@/app/wiki/components/ScrollTopButton"
import { Info } from "lucide-react"
export default async function WikiViewPage({ params }: { params: { slug: string } }) {
  const slug = params.slug

  // 서버에서 문서 데이터 fetch (timeout + retry)
  async function fetchWithTimeout(url: string, opts: RequestInit & { timeoutMs?: number; retries?: number } = {}) {
    const { timeoutMs = 5000, retries = 1, ...rest } = opts
    for (let attempt = 0; attempt <= retries; attempt++) {
      const ac = new AbortController()
      const id = setTimeout(() => ac.abort(), timeoutMs)
      try {
        const r = await fetch(url, { ...rest, signal: ac.signal, next: { revalidate: 60 } })
        clearTimeout(id)
        if (!r.ok) throw new Error('bad status')
        return r
      } catch (e) {
        clearTimeout(id)
        if (attempt === retries) throw e
      }
    }
    throw new Error('unreachable')
  }

  const res = await fetchWithTimeout(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/wiki/${encodeURIComponent(slug)}`, { timeoutMs: 5000, retries: 1 })
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

  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <a href="#wiki-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 rounded bg-violet-600 px-3 py-2 text-white">본문으로 건너뛰기</a>
      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div id="wiki-content" className="w-full lg:w-3/4">
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

          <aside aria-label="문서 보조 정보" className="w-full lg:w-1/4">
            <div className="sticky top-24">
            <section aria-labelledby="doc-info-heading" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h3 id="doc-info-heading" className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
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
            </section>

            <RelatedPagesCard slug={slug} initial={wikiMeta.relatedPages} />

            <RecentUpdatedCard slug={slug} initial={wikiMeta.recent} />
            </div>
          </aside>
        </div>
      </main>
      <ScrollTopButton />
    </div>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? ''
    const res = await fetch(`${base}/api/wiki/${encodeURIComponent(slug)}`, { cache: 'no-store' })
    if (!res.ok) return { title: `위키 - ${slug}`, alternates: { canonical: `/wiki/${slug}` } }
    const data = await res.json()
    const title: string = data.title ?? slug
    const description: string = String(data.content ?? '').replace(/<[^>]*>/g, '').slice(0, 160)
    const image: string | undefined = data.coverImage ?? '/logo.svg'
    const url = `${base}/wiki/${encodeURIComponent(slug)}`
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        images: image ? [{ url: image }] : undefined,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : undefined,
      },
    }
  } catch {
    return { title: `위키 - ${slug}`, alternates: { canonical: `/wiki/${slug}` } }
  }
}


