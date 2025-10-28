"use client"
import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/Badge'
import { Info, FileText } from 'lucide-react'
import RecentUpdatedCard from './RecentUpdatedCard'

type RelatedPage = { title: string; slug: string }

interface WikiLayoutProps {
  title: string
  category: string
  lastUpdated: string
  views?: number
  contributors?: number
  bookmarks?: number
  relatedPages?: RelatedPage[]
  headerActions?: React.ReactNode
  children: React.ReactNode
  showDocInfo?: boolean
  showRelatedPages?: boolean
  badgeClassName?: string
}

export default function WikiLayout({
  title,
  category,
  lastUpdated,
  views = 0,
  contributors = 0,
  bookmarks,
  relatedPages = [],
  headerActions,
  children,
  showDocInfo = true,
  showRelatedPages = true,
  badgeClassName,
}: WikiLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 메인 콘텐츠 */}
          <div className="w-full lg:w-3/4">
            {/* 문서 헤더 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-2">
                <Badge className={`${badgeClassName ?? 'bg-violet-500/10 text-violet-500'} font-normal mr-2`}>{category}</Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400">최근 수정: {lastUpdated}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{title}</h1>

              {headerActions ? <div className="flex flex-wrap gap-3">{headerActions}</div> : null}
            </div>

            {children}
          </div>

          {/* 사이드바 */}
          <div className="w-full lg:w-1/4">
            {/* 문서 정보 */}
            {showDocInfo && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-violet-500" />
                  문서 정보
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">조회수</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">기여자</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{contributors}명</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">최근 수정</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{lastUpdated}</span>
                  </div>
                  {typeof bookmarks === 'number' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">북마크</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{bookmarks.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 관련 문서 */}
            {showRelatedPages && relatedPages && relatedPages.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-violet-500" />
                  관련 문서
                </h3>
                <ul className="space-y-2">
                  {relatedPages.map((page) => (
                    <li key={page.slug}>
                      <Link href={`/wiki/${page.slug}`} className="flex items-center text-violet-500 hover:underline">
                        <span>{page.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 최근 수정된 문서 */}
            <RecentUpdatedCard />
          </div>
        </div>
      </main>
    </div>
  )
}


