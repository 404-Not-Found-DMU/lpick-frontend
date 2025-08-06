'use client';

import React, { useState } from 'react';

import type { 
  WikiCategory, 
  CategoryData, 
  TextBlock, 
  InfoboxData, 
  TracklistData,
  EquipmentInfo,
  ArtistInfo,
  OtherInfo
} from '@/types/hierarchical.editor.types';

import { ClientOnly } from '@/components';

import { HierarchicalHeader } from './HierarchicalHeader';
import { CategoryFormSelector } from './CategoryFormSelector';
import { TextBlockEditor } from './TextBlockEditor';
import { LivePreview } from './preview/LivePreview';

// 기본 데이터 생성 함수들
const createDefaultLPData = (): CategoryData => ({
  type: 'lp',
  data: {
    infobox: {
      title: '',
      artist: '',
      coverUrl: '',
      releaseDate: '',
      genre: '',
      label: '',
      lpInfos: []
    },
    tracklist: {
      tracks: []
    }
  }
});

const createDefaultEquipmentData = (): CategoryData => ({
  type: 'equipment',
  data: {
    name: '',
    brand: '',
    releaseYear: '',
    description: '',
    equipmentType: 'other',
    imageUrl: ''
  }
});

const createDefaultArtistData = (): CategoryData => ({
  type: 'artist',
  data: {
    name: '',
    country: '',
    activePeriod: '',
    roles: [],
    imageUrl: '',
    discography: [],
    activities: []
  }
});

const createDefaultOtherData = (): CategoryData => ({
  type: 'other',
  data: {
    title: '',
    content: ''
  }
});

interface UniversalWikiEditorProps {
  category: WikiCategory;
  initialData?: {
    categoryData?: CategoryData;
    textBlocks?: TextBlock[];
  };
  onSave?: (data: { categoryData: CategoryData; textBlocks: TextBlock[] }) => void;
}

export function UniversalWikiEditor({ 
  category, 
  initialData, 
  onSave 
}: UniversalWikiEditorProps) {
  // 카테고리별 기본 데이터 생성
  const getDefaultCategoryData = (): CategoryData => {
    switch (category) {
      case 'lp':
        return createDefaultLPData();
      case 'equipment':
        return createDefaultEquipmentData();
      case 'artist':
        return createDefaultArtistData();
      case 'other':
        return createDefaultOtherData();
      default:
        return createDefaultLPData();
    }
  };

  const [categoryData, setCategoryData] = useState<CategoryData>(
    initialData?.categoryData || getDefaultCategoryData()
  );
  
  const [textBlocks, setTextBlocks] = useState<TextBlock[]>(
    initialData?.textBlocks || []
  );
  
  const [showJson, setShowJson] = useState(false);

  // JSON 내보내기
  const handleExportJson = () => {
    const exportData = {
      categoryData,
      textBlocks,
    };
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wiki-${category}-data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // JSON 불러오기
  const handleImportJson = (data: {
    categoryData: CategoryData;
    textBlocks: TextBlock[];
  }) => {
    if (data?.categoryData && data?.textBlocks) {
      setCategoryData(data.categoryData);
      setTextBlocks(data.textBlocks);
    } else {
      alert('올바른 형식의 JSON이 아닙니다.');
    }
  };

  // 저장 핸들러
  const handleSave = () => {
    if (onSave) {
      onSave({ categoryData, textBlocks });
    }
  };

  // 문서 제목 생성
  const getDocumentTitle = (): string => {
    switch (category) {
      case 'lp':
        const lpData = categoryData.data as { infobox: InfoboxData; tracklist: TracklistData };
        return lpData.infobox.title && lpData.infobox.artist 
          ? `${lpData.infobox.artist} - ${lpData.infobox.title}`
          : 'LP 위키 편집';
      case 'equipment':
        const equipmentData = categoryData.data as EquipmentInfo;
        return equipmentData.name || '장비 위키 편집';
      case 'artist':
        const artistData = categoryData.data as ArtistInfo;
        return artistData.name || '아티스트 위키 편집';
      case 'other':
        const otherData = categoryData.data as OtherInfo;
        return otherData.title || '기타 위키 편집';
      default:
        return '위키 편집';
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-100 dark:bg-gray-900">
      <HierarchicalHeader
        documentTitle={getDocumentTitle()}
        onShowJson={() => setShowJson(true)}
        onImportJson={handleImportJson}
        onSave={handleSave}
      />
      
      {/* JSON 모달 */}
      {showJson && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg max-w-2xl w-full">
            <pre className="overflow-auto max-h-96 text-xs">
              {JSON.stringify({ categoryData, textBlocks }, null, 2)}
            </pre>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowJson(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                닫기
              </button>
              <button
                onClick={handleExportJson}
                className="px-4 py-2 bg-lavender-600 text-white rounded hover:bg-lavender-700"
              >
                JSON 내보내기
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-1 flex-row gap-px overflow-hidden bg-gray-200 dark:bg-gray-700">
        {/* Editor Panel */}
        <main className="flex-2 flex flex-col overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900 md:p-8">
          <ClientOnly fallback={<div className="space-y-4">폼 로딩 중...</div>}>
            <CategoryFormSelector
              category={category}
              categoryData={categoryData}
              onCategoryDataChange={setCategoryData}
            />
          </ClientOnly>
          
          <TextBlockEditor
            textBlocks={textBlocks}
            onTextBlocksChange={setTextBlocks}
          />
        </main>

        {/* Preview Panel */}
        <aside className="flex-2 hidden overflow-y-auto bg-white p-4 dark:bg-gray-800 md:block md:p-8">
          <LivePreview
            category={category}
            categoryData={categoryData}
            textBlocks={textBlocks}
          />
        </aside>
      </div>
    </div>
  );
} 