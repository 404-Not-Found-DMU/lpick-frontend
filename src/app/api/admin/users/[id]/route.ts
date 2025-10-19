import { NextResponse } from 'next/server'
import { deleteUser, getUserById, updateUser } from '../store'

function getIdFromRequest(req: Request): number {
  const url = new URL(req.url)
  const segments = url.pathname.split('/').filter(Boolean)
  const idStr = segments[segments.length - 1]
  return Number(idStr)
}

export function GET(req: Request) {
  const id = getIdFromRequest(req)
  const item = getUserById(id)
  if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: Request) {
  const id = getIdFromRequest(req)
  const body = await req.json()
  const updated = updateUser(id, body)
  if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export function DELETE(req: Request) {
  const id = getIdFromRequest(req)
  const ok = deleteUser(id)
  if (!ok) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}


