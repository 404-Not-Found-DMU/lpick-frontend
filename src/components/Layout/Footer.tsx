import Link from 'next/link';
import { LPickLogo } from '@/assets/images/LPickLogo';

const Footer = () => {
  const serviceLinks = [
    { href: '/about', label: 'LPick 소개' },
    { href: '/terms', label: '이용약관' },
    { href: '/privacy', label: '개인정보처리방침' },
    { href: '/support', label: '고객센터' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* 왼쪽: 로고 */}
        <div className="flex items-center space-x-2">
          <LPickLogo className="h-6 w-6 text-lavender-500 dark:text-lavender-400" />
          <span className="text-md font-bold text-lavender-500 dark:text-lavender-400">
            LPick
          </span>
        </div>

        {/* 가운데: 링크 */}
        <nav>
          <ul className="flex flex-wrap items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            {serviceLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-lavender-500 dark:hover:text-lavender-300 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 오른쪽: 저작권 */}
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-600">
            © 2025 LPick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
