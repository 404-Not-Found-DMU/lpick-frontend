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
    <footer className="border-t border-gray-200 bg-gray-100 py-12 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* 로고 및 설명 */}
          <div>
            <Link href="/" className="mb-4 inline-flex items-center">
              <LPickLogo className="mr-2 h-8 w-8 text-violet-500 dark:text-violet-400" />
              <span className="text-2xl font-medium text-violet-500 dark:text-violet-400">
                LPick
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              LP 컬렉션을 관리하고 음악 애호가들과 소통하는 공간
            </p>
          </div>

          {/* 서비스 안내 */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-gray-100">
              서비스 안내
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-500 transition-colors hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-200 pt-8 text-center dark:border-gray-800">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © 2025 LPick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
