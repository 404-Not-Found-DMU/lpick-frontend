import type { Metadata } from "next"
import { headers } from "next/headers"
import { Badge } from "@/components/Badge"
import ActionButtons from "@/app/wiki/components/ActionButtons"
import InfoboxLP from "@/app/wiki/components/InfoboxLP"
import ContentWithToc from "@/app/wiki/components/ContentWithToc"
import ScrollTopButton from "@/app/wiki/components/ScrollTopButton"
import WikiLayout from "@/app/wiki/components/WikiLayout"
export default async function WikiViewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

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

  const hdrs = headers()
  const proto = hdrs.get('x-forwarded-proto') ?? 'http'
  const host = hdrs.get('host') ?? 'localhost:3000'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? `${proto}://${host}`
  const res = await fetchWithTimeout(`${baseUrl}/api/wiki/${encodeURIComponent(slug)}`, { timeoutMs: 5000, retries: 1 })
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
    <>
      <a href="#wiki-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 rounded bg-violet-600 px-3 py-2 text-white">본문으로 건너뛰기</a>
      <WikiLayout
        title={wikiMeta.title}
        category={wikiMeta.category}
        lastUpdated={new Date(wikiMeta.lastUpdated).toLocaleString()}
        views={wikiMeta.views}
        contributors={wikiMeta.contributors}
        bookmarks={wikiMeta.bookmarks}
        relatedPages={wikiMeta.relatedPages}
        headerActions={<ActionButtons slug={slug} />}
      >
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
      </WikiLayout>
      <ScrollTopButton />
    </>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const hdrs = headers()
    const proto = hdrs.get('x-forwarded-proto') ?? 'http'
    const host = hdrs.get('host') ?? 'localhost:3000'
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? `${proto}://${host}`
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


