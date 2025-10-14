import { NextRequest, NextResponse } from 'next/server'
import { createFaq, listFaqs } from './store'

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? undefined
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const data = listFaqs({ q, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body?.question || !body?.answer) {
    return NextResponse.json({ message: 'question, answer는 필수입니다.' }, { status: 400 })
  }
  const created = createFaq({
    question: String(body.question),
    answer: String(body.answer),
    tags: Array.isArray(body.tags) ? body.tags.map(String) : undefined,
    visibility: body.visibility ?? '모든 사용자',
    date: String(body.date ?? new Date().toISOString().slice(0, 10)),
    views: 0,
  })
  return NextResponse.json(created, { status: 201 })
}


