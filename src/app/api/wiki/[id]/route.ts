import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  // TODO: 실제 백엔드 연동으로 교체
  const { id } = params
  const now = new Date()
  const data = {
    id,
    title: `문서 ${id}`,
    content: `문서 ${id}의 내용입니다.`,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    author: { id: 1, name: 'LPick' },
    tags: ['wiki'],
    views: 1245,
    contributors: 24,
    relatedPages: [
      { title: '관련 문서 A', slug: 'related-a' },
      { title: '관련 문서 B', slug: 'related-b' },
    ],
    bookmarks: 12,
    recent: [
      { title: 'Miles Davis - Kind of Blue', slug: 'miles-davis-kind-of-blue', updatedAt: new Date(now.getTime() - 60 * 60 * 1000).toISOString() },
      { title: 'Technics SL-1200MK7', slug: 'technics-sl-1200mk7', updatedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString() },
      { title: 'The Beatles - Abbey Road', slug: 'the-beatles-abbey-road', updatedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString() },
    ],
  }
  return NextResponse.json(data)
}


