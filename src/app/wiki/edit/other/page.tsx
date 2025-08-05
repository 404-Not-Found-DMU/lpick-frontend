'use client';

import { UniversalWikiEditor } from '../components/UniversalWikiEditor';
import dummyOtherData from '../dummyOtherData.json';
import type { CategoryData, TextBlock } from '@/types/hierarchical.editor.types';

export default function OtherEditorPage() {
  const initialData: { categoryData: CategoryData; textBlocks: TextBlock[] } = {
    categoryData: dummyOtherData.categoryData as CategoryData,
    textBlocks: dummyOtherData.textBlocks as TextBlock[]
  };

  return (
    <div className="h-screen">
      <UniversalWikiEditor 
        category="other"
        initialData={initialData}
        onSave={(data) => {
          console.log('기타 위키 저장:', data);
          // 여기에 실제 저장 로직을 구현할 수 있습니다
        }}
      />
    </div>
  );
} 