import { NextRequest, NextResponse } from 'next/server'
import { createExpert, listExperts } from './store'

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? undefined
  const status = (searchParams.get('status') as any) ?? '전체'
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const data = listExperts({ q, status, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body?.name || !body?.email) {
    return NextResponse.json({ message: 'name, email은 필수입니다.' }, { status: 400 })
  }
  const created = createExpert({
    name: String(body.name),
    email: String(body.email),
    phone: String(body.phone ?? ''),
    affiliation: body.affiliation ? String(body.affiliation) : undefined,
    fields: Array.isArray(body.fields) ? body.fields.map(String) : [],
    docs: Array.isArray(body.docs) ? body.docs.map(String) : [],
    note: body.note ? String(body.note) : undefined,
    date: String(body.date ?? new Date().toISOString().slice(0, 10)),
    status: body.status ?? '대기',
  })
  return NextResponse.json(created, { status: 201 })
}


