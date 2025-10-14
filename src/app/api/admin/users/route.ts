import { NextRequest, NextResponse } from 'next/server'
import { createUser, listUsers } from './store'

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? undefined
  const status = (searchParams.get('status') as any) ?? 'all'
  const role = (searchParams.get('role') as any) ?? 'all'
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const data = listUsers({ q, status, role, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body?.name || !body?.email) {
    return NextResponse.json({ message: 'name, email은 필수입니다.' }, { status: 400 })
  }
  const created = createUser({
    name: String(body.name),
    email: String(body.email),
    role: (body.role as any) ?? 'user',
    status: (body.status as any) ?? 'active',
    joinedAt: String(body.joinedAt ?? new Date().toISOString().slice(0, 10)),
  })
  return NextResponse.json(created, { status: 201 })
}


