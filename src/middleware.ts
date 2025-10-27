import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // /admin 하위만 보호
  if (pathname.startsWith('/admin')) {
    const mockBypass = process.env.NEXT_PUBLIC_ADMIN_MOCK === '1'
    const role = request.cookies.get('role')?.value
    const isAdmin = role === 'admin'
    if (!isAdmin && !mockBypass) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/login'
      loginUrl.searchParams.set('redirect', pathname)
      // return NextResponse.redirect(loginUrl)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}


