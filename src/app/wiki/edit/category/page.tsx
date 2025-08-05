'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card/Card';
import { Button } from '@/components/Button';
import { ArrowLeft, Disc, Guitar, User, FileText } from 'lucide-react';

const categories = [
  {
    id: 'lp',
    title: 'LP',
    description: '음반 정보와 트랙리스트를 편집합니다',
    icon: Disc,
    color: 'bg-blue-500',
    href: '/wiki/edit'
  },
  {
    id: 'equipment',
    title: '장비',
    description: '음악 장비 정보를 편집합니다',
    icon: Guitar,
    color: 'bg-green-500',
    href: '/wiki/edit/equipment'
  },
  {
    id: 'artist',
    title: '아티스트',
    description: '아티스트 정보를 편집합니다',
    icon: User,
    color: 'bg-purple-500',
    href: '/wiki/edit/artist'
  },
  {
    id: 'other',
    title: '기타',
    description: '기타 위키 항목을 편집합니다',
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/wiki')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            위키로 돌아가기
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            위키 편집 카테고리 선택
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            편집할 위키의 카테고리를 선택해주세요
          </p>
        </div>

        {/* 카테고리 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id}
                className="hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-gray-800"
                onClick={() => handleCategorySelect(category.href)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {category.description}
                  </p>
                  <Button 
                    className="mt-4 w-full bg-lavender-500 hover:bg-lavender-600"
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
  );
} 