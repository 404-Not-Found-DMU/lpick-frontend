"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"


export const MainNav = () => {
  const pathname = usePathname()

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center">
        <div className="w-8 h-8 bg-lavender-500 rounded-full flex items-center justify-center mr-2">

        </div>
        <span className="text-2xl font-medium text-lavender-500">LPick</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-8">
        <Link
          href="/"
          className={clsx(
            "text-gray-600 hover:text-lavender-500 font-medium",
            pathname === "/" && "text-lavender-500 border-b-2 border-lavender-500 pb-[17px]",
          )}
        >
          홈
        </Link>
        <Link
          href="/wiki"
          className={clsx(
            "text-gray-600 hover:text-lavender-500 font-medium",
            pathname === "/wiki" && "text-lavender-500 border-b-2 border-lavender-500 pb-[17px]",
          )}
        >
          위키
        </Link>
        <Link
          href="/community"
          className={clsx(
            "text-gray-600 hover:text-lavender-500 font-medium",
            pathname === "/community" && "text-lavender-500 border-b-2 border-lavender-500 pb-[17px]",
          )}
        >
          커뮤니티
        </Link>
        <Link
          href="/lplayer"
          className={clsx(
            "text-gray-600 hover:text-lavender-500 font-medium",
            pathname === "/lplayer" && "text-lavender-500 border-b-2 border-lavender-500 pb-[17px]",
          )}
        >
          LPlayer
        </Link>
      </nav>
    </div>
  )
}
