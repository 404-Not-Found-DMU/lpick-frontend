'use client';

import React, { useState } from 'react';
import type { TextBlock } from '@/types/hierarchical.editor.types';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { nanoid } from 'nanoid';
import { produce } from 'immer';

import { Button } from '@/components/Button';
import { PlusCircle } from 'lucide-react';
import { SortableTextBlock } from './common/SortableTextBlock';
import { ClientOnly } from '@/components';

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

interface TextBlockEditorProps {
  textBlocks: TextBlock[];
  onTextBlocksChange: (blocks: TextBlock[]) => void;
}

export function TextBlockEditor({ textBlocks, onTextBlocksChange }: TextBlockEditorProps) {
  const [activeBlock, setActiveBlock] = useState<TextBlock | null>(null);

  const handleAddBlock = () => {
    const newBlock: TextBlock = {
      id: nanoid(),
      title: '새 섹션',
      content: '내용을 입력하세요.',
      depth: 1,
    };
    onTextBlocksChange([...textBlocks, newBlock]);
  };

  const handleUpdateBlock = (
    id: string,
    newTitle: string,
    newContent: string,
    newDepth: 1 | 2 | 3,
  ) => {
    onTextBlocksChange(
      produce(textBlocks, (draft) => {
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
    onTextBlocksChange(textBlocks.filter((b) => b.id !== id));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveBlock(textBlocks.find((b) => b.id === event.active.id) || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveBlock(null);
    if (over && active.id !== over.id) {
      const oldIndex = textBlocks.findIndex((item) => item.id === active.id);
      const newIndex = textBlocks.findIndex((item) => item.id === over.id);
      onTextBlocksChange(arrayMove(textBlocks, oldIndex, newIndex));
    }
  };

  const numberingMap = generateNumbering(textBlocks);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
        <ClientOnly fallback={<div className="space-y-4">텍스트 블록 로딩 중...</div>}>
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
        </ClientOnly>
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
  );
} 