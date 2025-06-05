import Link from "next/link"
import { LPickLogo } from "@/components/Icon/LPickLogo"


export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 로고 및 설명 */}
          <div>
            <Link href="/" className="inline-flex items-center mb-4">
              <LPickLogo className="w-8 h-8 mr-2 text-violet-500 dark:text-violet-400" />
              <span className="text-2xl font-medium text-violet-500 dark:text-violet-400">LPick</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              LP 컬렉션을 관리하고 음악 애호가들과 소통하는 공간
            </p>
          </div>

          {/* 서비스 안내 */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">서비스 안내</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                >
                  LPick 소개
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                >
                  고객센터
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © 2025 LPick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
