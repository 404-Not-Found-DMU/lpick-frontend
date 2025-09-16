'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card/Card';
import { Button } from '@/components/Button';
import { ArrowLeft, Disc, Guitar, User, FileText } from 'lucide-react';

const categories = [
  {
    id: 'lp',
    title: 'LP (음반)',
    description: 'LP 음반에 대한 정보를 작성합니다',
    icon: Disc,
    color: 'bg-blue-500',
    href: '/wiki/edit/lp'
  },
  {
    id: 'equipment',
    title: '장비 (Equipment)',
    description: '음악 장비에 대한 정보를 작성합니다',
    icon: Guitar,
    color: 'bg-green-500',
    href: '/wiki/edit/equipment'
  },
  {
    id: 'artist',
    title: '아티스트 (Artist)',
    description: '아티스트에 대한 정보를 작성합니다',
    icon: User,
    color: 'bg-purple-500',
    href: '/wiki/edit/artist'
  },
  {
    id: 'other',
    title: '기타 (Other)',
    description: '레이블, 장르, 기타 음악 관련 정보를 작성합니다',
    icon: FileText,
    color: 'bg-orange-500',
    href: '/wiki/edit/other'
  }
];

export default function CategorySelectionPage() {
  const router = useRouter();

  const handleCategorySelect = (href: string) => {
    router.push(href);
  };

  return (
    <div className="relative flex-1 flex min-h-0 w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 sm:px-8 sm:py-6 lg:px-12 lg:py-8">
      {/* 메인 콘텐츠 */}
              <main className="relative z-10 flex flex-1 flex-col">
          <div className="h-full w-full flex flex-col">
            {/* 헤더 */}
            <div className="mb-8 text-left">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/wiki')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                위키로 돌아가기
              </Button>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                새 문서 만들기
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                작성할 문서의 카테고리를 선택해주세요
              </p>
            </div>

            {/* 카테고리 그리드 */}
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-gray-800 h-full flex flex-col"
                  onClick={() => handleCategorySelect(category.href)}
                >
                  <CardHeader className="text-center pb-4 flex-shrink-0">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-1 flex flex-col justify-between">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                      {category.description}
                    </p>
                    <Button 
                      className="w-full bg-lavender-500 hover:bg-lavender-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategorySelect(category.href);
                      }}
                    >
                      편집 시작
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
