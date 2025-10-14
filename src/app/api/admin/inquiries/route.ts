import { NextRequest, NextResponse } from 'next/server'
import { createInquiry, listInquiries } from './store'

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? undefined
  const status = (searchParams.get('status') as any) ?? '전체'
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const data = listInquiries({ q, status, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body?.title || !body?.question || !body?.author) {
    return NextResponse.json({ message: 'title, author, question은 필수입니다.' }, { status: 400 })
  }
  const created = createInquiry({
    title: String(body.title),
    author: String(body.author),
    question: String(body.question),
    answer: body.answer ? String(body.answer) : undefined,
    secret: !!body.secret,
    date: String(body.date ?? new Date().toISOString().slice(0, 10)),
    views: 0,
    status: body.status ?? '대기',
  })
  return NextResponse.json(created, { status: 201 })
}


