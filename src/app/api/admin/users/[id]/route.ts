import { NextRequest, NextResponse } from 'next/server'
import { deleteUser, getUserById, updateUser } from '../store'

export function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const item = getUserById(id)
  if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const body = await req.json()
  const updated = updateUser(id, body)
  if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const ok = deleteUser(id)
  if (!ok) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}


