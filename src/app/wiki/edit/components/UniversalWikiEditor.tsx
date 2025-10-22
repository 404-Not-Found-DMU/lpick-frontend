'use client';

import React, { useState } from 'react';
import type { 
  WikiCategory, 
  CategoryData, 
  TextBlock
} from '@/types/hierarchical.editor.types';

import { ClientOnly } from '@/components';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/Dialog';
import { useWikiEditor } from '../hooks/useWikiEditor';

import { HierarchicalHeader } from './HierarchicalHeader';
import { CategoryFormSelector } from './CategoryFormSelector';
import { TextBlockEditor } from './TextBlockEditor';
import { LivePreview } from './preview/LivePreview';

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
  const [showJson, setShowJson] = useState(false);
  
  const {
    categoryData,
    textBlocks,
    updateCategoryData,
    updateTextBlocks,
    handleSave,
    handleExportJson,
    handleImportJson,
    getDocumentTitle
  } = useWikiEditor({ category, initialData, onSave });

  // JSON 가져오기 핸들러
  const handleImportJsonWithValidation = (data: {
    categoryData: CategoryData;
    textBlocks: TextBlock[];
  }) => {
    if (data?.categoryData && data?.textBlocks) {
      handleImportJson(data);
    } else {
      alert('올바른 형식의 JSON이 아닙니다.');
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-100 dark:bg-gray-900">
      <HierarchicalHeader
        documentTitle={getDocumentTitle()}
        onShowJson={() => setShowJson(true)}
        onImportJson={handleImportJsonWithValidation}
        onSave={handleSave}
      />
      
      {/* JSON 모달 - Dialog 사용 */}
      <Dialog open={showJson} onOpenChange={setShowJson}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>현재 문서 데이터(JSON)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <pre className="overflow-auto max-h-96 text-xs bg-gray-50 dark:bg-gray-900/50 p-4 rounded border border-gray-200 dark:border-gray-700">
              {JSON.stringify({ categoryData, textBlocks }, null, 2)}
            </pre>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(JSON.stringify({ categoryData, textBlocks }, null, 2));
                  } catch {}
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                복사
              </button>
              <button
                onClick={handleExportJson}
                className="px-4 py-2 bg-lavender-600 text-white rounded hover:bg-lavender-700"
              >
                다운로드
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="flex flex-1 flex-row gap-px overflow-hidden bg-gray-200 dark:bg-gray-700">
        {/* Editor Panel */}
        <main className="flex-[2] basis-0 flex flex-col overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900 md:p-8">
          <ClientOnly fallback={<div className="space-y-4">폼 로딩 중...</div>}>
            <CategoryFormSelector
              category={category}
              categoryData={categoryData}
              onCategoryDataChange={updateCategoryData}
            />
          </ClientOnly>
          
          <TextBlockEditor
            textBlocks={textBlocks}
            onTextBlocksChange={updateTextBlocks}
          />
        </main>

        {/* Preview Panel */}
        <aside className="flex-[2] basis-0 hidden overflow-y-auto bg-white p-4 dark:bg-gray-800 md:block md:p-8">
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