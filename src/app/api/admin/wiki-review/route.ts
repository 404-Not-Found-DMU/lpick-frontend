import { NextRequest, NextResponse } from 'next/server'
import { createReview, listReviews } from './store'

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? undefined
  const status = (searchParams.get('status') as '전체' | '대기' | '승인' | '반려' | null) ?? '전체'
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const data = listReviews({ q, status, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body?.title || !body?.author || !body?.beforeContent || !body?.afterContent) {
    return NextResponse.json({ message: 'title, author, beforeContent, afterContent는 필수입니다.' }, { status: 400 })
  }
  const created = createReview({
    title: String(body.title),
    author: String(body.author),
    beforeContent: String(body.beforeContent),
    afterContent: String(body.afterContent),
    date: String(body.date ?? new Date().toISOString().slice(0, 10)),
    status: body.status ?? '대기',
  })
  return NextResponse.json(created, { status: 201 })
}


