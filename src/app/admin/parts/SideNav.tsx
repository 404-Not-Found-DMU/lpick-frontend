"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useZustandStore } from '@/store/zustandStore'

const NAV_ITEMS = [
  { href: '/admin', label: '대시보드' },
  { href: '/admin/notices', label: '공지사항 관리' },
  { href: '/admin/faq', label: 'FAQ 관리' },
  { href: '/admin/inquiry', label: '1:1 문의 관리' },
  { href: '/admin/expert', label: '전문가 등업' },
  { href: '/admin/wiki-review', label: '위키 검수' },
  { href: '/admin/users', label: '사용자 관리' },
  { href: '/admin/admins', label: '관리자 관리' },
  { href: '/admin/lplayer', label: 'LPlayer 관리' },
  { href: '/admin/posts', label: '게시물 관리' },
  { href: '/admin/comments', label: '댓글 관리' },
  { href: '/admin/reports', label: '신고/제재' },
  { href: '/admin/settings/roles', label: '설정 · 권한' },
  { href: '/admin/settings/emails', label: '설정 · 이메일' },
]

export default function SideNav() {
  const pathname = usePathname()
  const role = useZustandStore((s) => s.adminRole)
  return (
    <nav className="p-2">
      {NAV_ITEMS.map((item) => {
        // superadmin은 모든 메뉴, 일반 admin은 제한된 메뉴만 노출
        const isRestricted = [
          '/admin/users',
          '/admin/admins',
          '/admin/settings/roles',
          '/admin/settings/emails',
          '/admin/notices',
          '/admin/faq',
          '/admin/inquiry',
        ].includes(item.href)
        if (role === 'admin' && isRestricted) return null
        const active = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? 'bg-violet-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}


