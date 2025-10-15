import { NextRequest, NextResponse } from 'next/server'
import { listComments } from './store'

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? undefined
  const status = (searchParams.get('status') as '전체' | 'visible' | 'hidden' | 'deleted' | null) ?? '전체'
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const data = listComments({ q, status, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return NextResponse.json(data)
}


