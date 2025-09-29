'use client'

import { HelpCircle, MessageCircle, BookOpen, ShieldCheck, Search } from 'lucide-react'
import Link from 'next/link'
import { QUICK_ACTIONS } from '../constants'

const iconMap = {
  HelpCircle,
  MessageCircle,
  BookOpen,
  ShieldCheck,
} as const

type QuickActionsProps = {
  onSearch?: (value: string) => void
}

export function QuickActions({ onSearch }: QuickActionsProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6 md:px-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100 tracking-tight">고객센터</h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
          LPick 서비스 이용에 도움이 필요하신가요? 아래에서 주제를 선택해 주세요.
        </p>

        <div className="mt-6 max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="궁금한 내용을 검색해보세요..."
              className="w-full rounded-full border border-gray-200 bg-white px-10 py-3 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {QUICK_ACTIONS.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]

            // 시안과 동일한 톤을 위해 동적 클래스 대신 정적 매핑 사용
            const accent = item.accent === 'amber'
              ? {
                  cardBg: 'bg-amber-50 dark:bg-amber-900/10',
                  cardBorder: 'border-amber-200/60 dark:border-amber-800/50',
                  iconBg: 'bg-amber-100 dark:bg-amber-900/30',
                  iconColor: 'text-amber-600 dark:text-amber-400',
                }
              : {
                  cardBg: 'bg-white dark:bg-gray-800',
                  cardBorder: 'border-gray-200 dark:border-gray-700',
                  iconBg: 'bg-violet-100 dark:bg-violet-900/30',
                  iconColor: 'text-violet-600 dark:text-violet-400',
                }

            return (
              <Link
                key={item.id}
                href={item.id === 'expert' ? '/support/expert' : item.id === 'faq' ? '/support/faq' : '#'}
                className={`rounded-2xl ${accent.cardBg} ${accent.cardBorder} border p-6 text-center shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
              >
                <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${accent.iconBg}`}>
                  <Icon className={`h-5 w-5 ${accent.iconColor}`} />
                </div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">{item.label}</div>
                {('desc' in item) && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.desc as string}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}


