import Link from 'next/link'
import SideNav from './parts/SideNav'
import { ToastProvider } from '@/components/Toast/ToastProvider'
import RoleToggle from './parts/RoleToggle'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // 헤더에서 role 토글 제공 (superadmin/admin)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex min-h-screen">
        {/* 사이드 내비게이션 */}
        <aside className="w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <Link href="/admin" className="block text-lg font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              LPick Admin
            </Link>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">운영자 전용 콘솔</p>
          </div>
          <SideNav />
        </aside>

        {/* 메인 컨텐츠 */}
        <main className="flex-1">
          <ToastProvider>
            <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
              <div className="container mx-auto max-w-[1440px] px-6 md:px-8 py-3 flex items-center justify-between">
                <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-300">관리자 페이지</h1>
                <RoleToggle />
              </div>
            </header>
            <div className="container mx-auto max-w-[1440px] px-6 md:px-8 py-8">
              {children}
            </div>
          </ToastProvider>
        </main>
      </div>
    </div>
  )
}

// RoleToggle는 클라이언트 컴포넌트로 분리


