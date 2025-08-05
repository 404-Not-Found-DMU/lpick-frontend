'use client';

import { UniversalWikiEditor } from '../components/UniversalWikiEditor';
import dummyArtistData from '../dummyArtistData.json';
import type { CategoryData, TextBlock } from '@/types/hierarchical.editor.types';

export default function ArtistEditorPage() {
  const initialData: { categoryData: CategoryData; textBlocks: TextBlock[] } = {
    categoryData: dummyArtistData.categoryData as CategoryData,
    textBlocks: dummyArtistData.textBlocks as TextBlock[]
  };

  return (
    <div className="h-screen">
      <UniversalWikiEditor 
        category="artist"
        initialData={initialData}
        onSave={(data) => {
          console.log('아티스트 위키 저장:', data);
          // 여기에 실제 저장 로직을 구현할 수 있습니다
        }}
      />
    </div>
  );
} 