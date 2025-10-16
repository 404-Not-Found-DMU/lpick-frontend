import { NextRequest, NextResponse } from 'next/server'
import { listReports } from './store'

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? undefined
  const status = (searchParams.get('status') as '전체' | 'open' | 'ignored' | 'warned' | 'suspended' | 'banned' | null) ?? '전체'
  const targetType = (searchParams.get('targetType') as 'all' | 'post' | 'comment' | 'user' | null) ?? 'all'
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const data = listReports({ q, status, targetType, page: Number.isFinite(page) ? page : 1, pageSize: Number.isFinite(pageSize) ? pageSize : 10 })
  return NextResponse.json(data)
}


