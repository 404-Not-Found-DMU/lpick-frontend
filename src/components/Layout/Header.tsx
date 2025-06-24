'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { LPickLogo } from '@/assets/images/LPickLogo';
import { ThemeSelector } from '@/modules';
import { UserAvatarWithAuth } from '@/components/Layout/UserAvatar';
import clsx from 'clsx';

const Header = () => {
  const NAV_ITEMS = [
    { href: '/wiki', label: '위키' },
    { href: '/community', label: '커뮤니티' },
    { href: '/lplayer', label: 'LPlayer' },
  ];

  const pathname = usePathname();

  return (
    <header className="sticky overflow-clip top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-16 w-full items-center justify-between gap-5 px-4">
        <div className="flex-shrink-0 px-2">
          <Link href="/" className="flex items-center">
            <LPickLogo className="mr-2 h-8 w-8 flex-shrink-0 text-lavender-500 dark:text-lavender-400" />
            <span className="text-xl font-bold text-lavender-500 dark:text-lavender-400">LPick</span>
          </Link>
        </div>

        <nav className="flex-shrink-0 px-2">
          <ul className="flex items-center space-x-8 whitespace-nowrap">
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    'font-medium text-gray-600 transition-colors hover:text-lavender-500 dark:text-gray-300 dark:hover:text-lavender-400',
                    pathname.startsWith(href) && 'text-lavender-500 dark:text-lavender-400',
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex-1 flex-shrink-0 basis-[40%] px-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400 dark:text-gray-500" />
            <input
              placeholder="검색어를 입력하시거나 이미지를 업로드하세요."
              className="h-10 w-full rounded-full border-gray-200 bg-gray-50 pl-10 pr-4 text-sm placeholder:text-gray-500 focus:border-lavender-400 focus:ring-lavender-400 dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-gray-500 dark:focus:border-lavender-500 dark:focus:ring-lavender-500"
            />
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center justify-end px-2">
          <ThemeSelector />
          <Button variant="ghost" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-lavender-400 dark:bg-lavender-500" />
          </Button>
        </div>
        <div className="flex-shrink-0">
          <UserAvatarWithAuth />
        </div>
      </div>
    </header>
  );
};
export default Header;
