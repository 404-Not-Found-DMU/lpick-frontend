import { NextRequest, NextResponse } from 'next/server'
import { createTrack, listTracks, reorderTracks } from './store'

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? undefined
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const data = listTracks({ q, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (Array.isArray(body?.order)) {
    reorderTracks(body.order.map((n: unknown) => Number(n)).filter((n: number) => Number.isFinite(n)))
    return NextResponse.json({ success: true })
  }
  if (!body?.title || !body?.artist || !body?.mp3 || !body?.cover) {
    return NextResponse.json({ message: 'title, artist, mp3, cover 필수' }, { status: 400 })
  }
  const created = createTrack({ title: String(body.title), artist: String(body.artist), mp3: String(body.mp3), cover: String(body.cover), order: 0 })
  return NextResponse.json(created, { status: 201 })
}


