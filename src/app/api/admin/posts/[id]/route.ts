import { NextRequest, NextResponse } from 'next/server'
import { deletePost, getPostById, updatePost } from '../store'

function getId(req: Request) {
  const url = new URL(req.url)
  const segs = url.pathname.split('/').filter(Boolean)
  return Number(segs[segs.length - 1])
}

export function GET(req: NextRequest) {
  const id = getId(req)
  const item = getPostById(id)
  if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: NextRequest) {
  const id = getId(req)
  const body = await req.json()
  const updated = updatePost(id, body)
  if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export function DELETE(req: NextRequest) {
  const id = getId(req)
  const ok = deletePost(id)
  if (!ok) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}


