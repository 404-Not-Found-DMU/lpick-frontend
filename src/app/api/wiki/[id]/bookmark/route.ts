import { NextResponse } from 'next/server'

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  // TODO: 실제 북마크 토글 로직으로 교체
  const { id } = params
  const updated = { id, bookmarked: true, bookmarks: Math.floor(Math.random() * 100) + 1 }
  return NextResponse.json(updated)
}


