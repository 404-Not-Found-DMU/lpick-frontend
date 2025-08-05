'use client';

import { UniversalWikiEditor } from '../components/UniversalWikiEditor';
import dummyEquipmentData from '../dummyEquipmentData.json';
import type { CategoryData, TextBlock } from '@/types/hierarchical.editor.types';

export default function EquipmentEditorPage() {
  const initialData: { categoryData: CategoryData; textBlocks: TextBlock[] } = {
    categoryData: dummyEquipmentData.categoryData as CategoryData,
    textBlocks: dummyEquipmentData.textBlocks as TextBlock[]
  };

  return (
    <div className="h-screen">
      <UniversalWikiEditor 
        category="equipment"
        initialData={initialData}
        onSave={(data) => {
          console.log('장비 위키 저장:', data);
          // 여기에 실제 저장 로직을 구현할 수 있습니다
        }}
      />
    </div>
  );
} 