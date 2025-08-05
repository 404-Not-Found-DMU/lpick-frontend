'use client';

import { UniversalWikiEditor } from './components/UniversalWikiEditor';
import dummyWikiData from './dummyWikiData.json';
import type { CategoryData, TextBlock } from '@/types/hierarchical.editor.types';

export default function WikiEditorPage() {
  // 기존 dummyWikiData를 새로운 형식으로 변환
  const initialData: { categoryData: CategoryData; textBlocks: TextBlock[] } = {
    categoryData: {
      type: 'lp',
      data: {
        infobox: dummyWikiData.infobox,
        tracklist: dummyWikiData.tracklist
      }
    },
    textBlocks: dummyWikiData.textBlocks.map((block: { id: string; title: string; content: string; depth: number }) => ({
      ...block,
      depth: (block.depth === 1 || block.depth === 2 || block.depth === 3)
        ? block.depth
        : 1, // 기본값 1로 처리
    }))
  };

  return (
    <div className="h-screen">
      <UniversalWikiEditor 
        category="lp"
        initialData={initialData}
        onSave={(data) => {
          console.log('LP 위키 저장:', data);
          // 여기에 실제 저장 로직을 구현할 수 있습니다
        }}
      />
    </div>
  );
}
