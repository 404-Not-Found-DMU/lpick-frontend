'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { nanoid } from 'nanoid';
import { produce } from 'immer';

import type { TextBlock, InfoboxData, TracklistData } from '@/types/hierarchical.editor.types';
import { HierarchicalHeader } from './HierarchicalHeader';
import { FixedSections } from './FixedSections';
import { SortableTextBlock } from './SortableTextBlock';
import { Button } from '@/components/Button';
import { PlusCircle } from 'lucide-react';
import { LivePreview } from './LivePreview';
import React from 'react';

// 임시 데이터터
const initialInfoboxData: InfoboxData = {
  title: '꽃갈피 둘',
  artist: '아이유',
  coverUrl: '/placeholder.svg?height=300&width=300',
  releaseDate: '2017-09-22',
  genre: 'K-Pop, 발라드, 포크',
  label: '페이브엔터테인먼트',
  tableColor: '#f3e8ff',
  lpInfos: [],
};

const initialTracklistData: TracklistData = {
  tracks: [
    { id: nanoid(), number: '1', title: '가을 아침', length: '3:38' },
    { id: nanoid(), number: '2', title: '비밀의 화원', length: '3:45' },
    { id: nanoid(), number: '3', title: '잠 못 드는 밤 비는 내리고', length: '4:27' },  
    
  ],
};

const initialTextBlocks: TextBlock[] = [
  {
    id: nanoid(),
    title: '앨범 소개',
    content:
      "**꽃갈피 둘**은 2014년에 발매된 '꽃갈피'에 이은 아이유의 두 번째 리메이크 앨범입니다. 아날로그 세대의 감성과 향수를 아이유만의 색깔로 담아내어 전 세대로부터 큰 사랑을 받았습니다.",
    depth: 1,
  },
  {
    id: nanoid(),
    title: '제작 배경',
    content:
      '아이유는 평소 존경하던 선배 아티스트들의 곡을 자신만의 감성으로 재해석하고 싶었다고 밝혔습니다.',
    depth: 2,
  },
  {
    id: nanoid(),
    title: '평가',
    content:
      '평론가들로부터 원곡의 감성을 잘 살리면서도 현대적인 세련미를 더했다는 호평을 받았습니다.',
    depth: 1,
  },
];

const generateNumbering = (blocks: TextBlock[]): { [id: string]: string } => {
  const numbering: { [id: string]: string } = {};
  const counters = [0, 0, 0]; // for depth 1, 2, 3

  for (const block of blocks) {
    const depthIndex = block.depth - 1;

    counters[depthIndex]++;

    for (let i = depthIndex + 1; i < counters.length; i++) {
      counters[i] = 0;
    }

    const currentNumbering = counters
      .slice(0, depthIndex + 1)
      .filter((c) => c > 0)
      .join('.');
    numbering[block.id] = currentNumbering;
  }
  return numbering;
};

export function HierarchicalEditor() {
  const [infoboxData, setInfoboxData] = useState(initialInfoboxData);
  const [tracklistData, setTracklistData] = useState(initialTracklistData);
  const [textBlocks, setTextBlocks] = useState(initialTextBlocks);
  const [activeBlock, setActiveBlock] = useState<TextBlock | null>(null);
  const [showJson, setShowJson] = React.useState(false);

  // JSON 내보내기
  const handleExportJson = () => {
    const exportData = {
      infoboxData,
      tracklistData,
      textBlocks,
    };
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wiki-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // JSON 불러오기
  const handleImportJson = (data: {
    infoboxData: InfoboxData;
    tracklistData: TracklistData;
    textBlocks: TextBlock[];
  }) => {
    if (data?.infoboxData && data?.tracklistData && data?.textBlocks) {
      setInfoboxData(data.infoboxData);
      setTracklistData(data.tracklistData);
      setTextBlocks(data.textBlocks);
    } else {
      alert('올바른 형식의 JSON이 아닙니다.');
    }
  };

  const handleAddBlock = () => {
    const newBlock: TextBlock = {
      id: nanoid(),
      title: '새 섹션',
      content: '내용을 입력하세요.',
      depth: 1,
    };
    setTextBlocks((prev) => [...prev, newBlock]);
  };

  const handleUpdateBlock = (
    id: string,
    newTitle: string,
    newContent: string,
    newDepth: 1 | 2 | 3,
  ) => {
    setTextBlocks(
      produce((draft) => {
        const block = draft.find((b) => b.id === id);
        if (block) {
          block.title = newTitle;
          block.content = newContent;
          block.depth = newDepth;
        }
      }),
    );
  };

  const handleDeleteBlock = (id: string) => {
    setTextBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveBlock(textBlocks.find((b) => b.id === event.active.id) || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveBlock(null);
    if (over && active.id !== over.id) {
      setTextBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const numberingMap = generateNumbering(textBlocks);

  return (
    <div className="flex h-full flex-col bg-gray-100 dark:bg-gray-900">
      <HierarchicalHeader
        documentTitle={`${infoboxData.artist} - ${infoboxData.title}`}
        onShowJson={() => setShowJson(true)}
        onImportJson={handleImportJson}
      />
      {/* JSON 모달 */}
      {showJson && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg max-w-2xl w-full">
            <pre className="overflow-auto max-h-96 text-xs">{JSON.stringify({ infoboxData, tracklistData, textBlocks }, null, 2)}</pre>
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
        {/* 요소 추가 패널 */}
        <aside className="grid flex-1 grid-cols-1 gap-px overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900 md:p-8">
          <div className="h-10 items-center justify-center border-r border-gray-200 dark:border-gray-700">
            이미지 삽입
          </div>
          <div className="h-10 items-center justify-center border-r border-gray-200 dark:border-gray-700">
            링크 삽입
          </div>
          <div className="h-10 items-center justify-center border-r border-gray-200 dark:border-gray-700">
            각주 삽입
          </div>
          <div className="h-10 items-center justify-center border-r border-gray-200 dark:border-gray-700">
            표 삽입
          </div>
        </aside>
        {/* Editor Panel */}
        <main className="flex-2 flex flex-col overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900 md:p-8">
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <FixedSections
              infoboxData={infoboxData}
              onInfoboxUpdate={setInfoboxData}
              tracklistData={tracklistData}
              onTracklistUpdate={setTracklistData}
            />
            <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
              <SortableContext
                items={textBlocks.map((b) => b.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {textBlocks.map((block) => (
                    <SortableTextBlock
                      key={block.id}
                      block={block}
                      numbering={numberingMap[block.id] || ''}
                      onUpdate={handleUpdateBlock}
                      onDelete={handleDeleteBlock}
                    />
                  ))}
                </div>
              </SortableContext>
            </div>
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="h-14 w-full border-dashed bg-transparent"
                onClick={handleAddBlock}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                텍스트 블록 추가하기
              </Button>
            </div>
            {typeof window !== 'undefined' &&
              createPortal(
                <DragOverlay>
                  {activeBlock && (
                    <div className="rounded-lg bg-white p-4 opacity-80 shadow-lg">
                      <span className="font-bold text-lavender-600">
                        {numberingMap[activeBlock.id]}.
                      </span>{' '}
                      {activeBlock.title}
                    </div>
                  )}
                </DragOverlay>,
                document.body,
              )}
          </DndContext>
          <div></div>
        </main>

        {/* Preview Panel */}
        <aside className="flex-2 hidden overflow-y-auto bg-white p-4 dark:bg-gray-800 md:block md:p-8">
          <LivePreview
            infoboxData={infoboxData}
            tracklistData={tracklistData}
            textBlocks={textBlocks}
          />
        </aside>
      </div>
    </div>
  );
}
