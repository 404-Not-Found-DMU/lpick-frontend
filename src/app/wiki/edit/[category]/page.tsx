'use client';

import { useParams } from 'next/navigation';
import { UniversalWikiEditor } from '../components/UniversalWikiEditor';
import type { WikiCategory } from '@/types/hierarchical.editor.types';

export default function CategoryEditorPage() {
  const params = useParams();
  const category = params.category as WikiCategory;

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
        onSave={(data) => {
          console.log(`${category} 위키 저장:`, data);
          // 여기에 실제 저장 로직을 구현할 수 있습니다
        }}
      />
    </div>
  );
} 