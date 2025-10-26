import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  // TODO: 실제 백엔드 연동으로 교체
  const { id } = params
  const data = {
    id,
    title: `문서 ${id}`,
    content: `문서 ${id}의 내용입니다.`,
    createdAt: new Date().toISOString(),
    author: { id: 1, name: 'LPick' },
    tags: ['wiki']
  }
  return NextResponse.json(data)
}


