import { NextRequest, NextResponse } from 'next/server'
import { deleteReview, getReviewById, updateReview } from '../store'

export function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const item = getReviewById(id)
  if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const body = await req.json()
  const updated = updateReview(id, body)
  if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const ok = deleteReview(id)
  if (!ok) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}


