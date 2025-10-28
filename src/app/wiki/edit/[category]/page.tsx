'use client';

import { useParams, useRouter } from 'next/navigation';
import { UniversalWikiEditor } from '../components/UniversalWikiEditor';
import type { WikiCategory } from '@/types/hierarchical.editor.types';
import { createWikiPage } from '@/hooks/api/wiki.api';

export default function CategoryEditorPage() {
  const params = useParams();
  const category = params.category as WikiCategory;
  const router = useRouter();

  // 유효한 카테고리인지 확인
  if (!category || !['lp', 'artist', 'equipment', 'other'].includes(category)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">잘못된 카테고리</h1>
          <p className="text-gray-600">유효하지 않은 위키 카테고리입니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <UniversalWikiEditor 
        category={category}
        // 초기값은 빈 데이터로 시작 (예시 불러오기 버튼으로 주입)
        onSave={async ({ categoryData, textBlocks }) => {
          try {
            const wikiPageClass =
              category === 'artist' ? 'ARTIST' :
              category === 'equipment' ? 'GEAR' :
              category === 'lp' ? 'ALBUM' :
              'OTHER';

            let title = '새 위키';
            switch (categoryData.type) {
              case 'lp':
                title = categoryData.data.infobox.title || '새 LP';
                break;
              case 'artist':
                title = categoryData.data.name || '새 아티스트';
                break;
              case 'equipment':
                title = categoryData.data.name || '새 장비';
                break;
              case 'other':
                title = categoryData.data.title || '새 기타 항목';
                break;
            }

            const { id } = await createWikiPage({
              title,
              wikiPageClass,
              content: { categoryData, textBlocks }
            });

            router.push(`/wiki/${category}/${id}`);
          } catch (e) {
            console.error('위키 생성 실패:', e);
            alert('위키 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
          }
        }}
      />
    </div>
  );
} 