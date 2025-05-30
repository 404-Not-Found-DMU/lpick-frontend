"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bell } from "lucide-react"
import { Button } from "@/components/Button/Button"


import { LPickLogo } from "@/components/Icon/LPickLogo"
import { ThemeSelector } from "@/modules/theme/ThemeSelector"

import { UserAvatarWithAuth } from "@/components/Layout/UserAvatar"
import clsx from "clsx"

export function Header() {
  const pathname = usePathname()

  // 현재 경로가 어떤 섹션에 속하는지 확인
  const isWikiSection = pathname.startsWith("/wiki")
  const isCommunitySection = pathname.startsWith("/community")
  const isLPlayerSection = pathname.startsWith("/lplayer")

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-x-hidden">

        <div className="flex w-full items-center px-4 h-16 justify-between gap-5">
          {/* 로고 영역 (1/7) */}
          <div className="flex-shrink-0 px-2">
            <Link href="/" className="flex items-center">
              <LPickLogo className="w-8 h-8 flex-shrink-0 text-violet-500 dark:text-violet-400 mr-2" />
              <span className="text-xl font-bold text-violet-500 dark:text-violet-400">
                LPick
              </span>
            </Link>
          </div>

          {/* 네비게이션 영역 (2/7) */}
          <div className="flex-shrink-0 px-2">
            <nav className="flex items-center space-x-8 whitespace-nowrap">
              <Link
                href="/wiki"
                className={clsx(
                  "text-gray-600 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400 font-medium transition-colors",
                  isWikiSection && "text-violet-500 dark:text-violet-400"
                )}
              >
                위키
              </Link>
              <Link
                href="/community"
                className={clsx(
                  "text-gray-600 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400 font-medium transition-colors",
                  isCommunitySection && "text-violet-500 dark:text-violet-400"
                )}
              >
                커뮤니티
              </Link>
              <Link
                href="/lplayer"
                className={clsx(
                  "text-gray-600 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400 font-medium transition-colors",
                  isLPlayerSection && "text-violet-500 dark:text-violet-400"
                )}
              >
                LPlayer
              </Link>
            </nav>
          </div>

          {/* 검색창 영역 (3/7) */}
          <div className="flex-shrink-0 flex-1 basis-[40%] px-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <input
                placeholder="검색어를 입력하시거나 이미지를 업로드하세요."
                className="pl-10 pr-4 w-full h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-full text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:border-violet-400 dark:focus:border-violet-500 focus:ring-violet-400 dark:focus:ring-violet-500"
              />
            </div>
          </div>

          {/* 알림·아바타 영역 (1/7) */}
          <div className="flex-shrink-0 flex items-center justify-end  px-2">
            <ThemeSelector />

            <Button
              variant="ghost"
              className="relative "
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-violet-400 dark:bg-violet-500 rounded-full" />
            </Button>

            
          </div>
          <div className="flex-shrink-0 ">
          <UserAvatarWithAuth />
          </div>
        </div>

    </header>
  )
}
