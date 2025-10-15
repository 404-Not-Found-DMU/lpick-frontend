"use client"
import { useZustandStore } from '@/store/zustandStore'
import Link from 'next/link'

export default function withSuperadminGuard<P extends object>(Component: (props: P) => React.ReactElement) {
  return function Guarded(props: P): React.ReactElement {
    const role = useZustandStore((s) => s.adminRole)
    if (role !== 'superadmin') {
      return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
          이 페이지는 총관리자만 접근할 수 있습니다. 필요한 권한이 없습니다.
          <div className="mt-3">
            <Link href="/admin" className="rounded-md border px-3 py-2">대시보드로 돌아가기</Link>
          </div>
        </div>
      )
    }
    return <Component {...props} />
  }
}


