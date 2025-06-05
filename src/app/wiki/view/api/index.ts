// 파일명: app/api/wiki/[id]/route.ts (또는 route.js)
import { NextResponse } from 'next/server';

export const GET = async () => {
  const res = await fetch('https://example.com/api/wiki/123');
  if (!res.ok) {
    // 에러 처리
    return NextResponse.json({ error: 'API 호출 실패' }, { status: 502 });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
