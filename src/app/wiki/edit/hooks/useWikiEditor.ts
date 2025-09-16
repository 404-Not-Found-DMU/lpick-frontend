import { useState, useCallback } from 'react';
import type { CategoryData, TextBlock, WikiCategory } from '@/types/hierarchical.editor.types';
import { getDummyData } from '../data/dummyData';

interface UseWikiEditorProps {
  category: WikiCategory;
  initialData?: {
    categoryData?: CategoryData;
    textBlocks?: TextBlock[];
  };
  onSave?: (data: { categoryData: CategoryData; textBlocks: TextBlock[] }) => void;
}

export function useWikiEditor({ category, initialData, onSave }: UseWikiEditorProps) {
  // 카테고리별 기본 데이터 생성
  const getDefaultCategoryData = useCallback((): CategoryData => {
    const dummyData = getDummyData(category);
    return dummyData.categoryData;
  }, [category]);

  // 초기 데이터 설정
  const [categoryData, setCategoryData] = useState<CategoryData>(
    initialData?.categoryData || getDefaultCategoryData()
  );

  const [textBlocks, setTextBlocks] = useState<TextBlock[]>(
    initialData?.textBlocks || getDummyData(category).textBlocks
  );

  // 카테고리 데이터 업데이트
  const updateCategoryData = useCallback((newData: CategoryData) => {
    setCategoryData(newData);
  }, []);

  // 텍스트 블록 업데이트
  const updateTextBlocks = useCallback((newBlocks: TextBlock[]) => {
    setTextBlocks(newBlocks);
  }, []);

  // 텍스트 블록 추가
  const addTextBlock = useCallback((block: Omit<TextBlock, 'id'>) => {
    const newBlock: TextBlock = {
      ...block,
      id: Date.now().toString()
    };
    setTextBlocks(prev => [...prev, newBlock]);
  }, []);

  // 텍스트 블록 삭제
  const removeTextBlock = useCallback((id: string) => {
    setTextBlocks(prev => prev.filter(block => block.id !== id));
  }, []);

  // 텍스트 블록 수정
  const updateTextBlock = useCallback((id: string, updates: Partial<TextBlock>) => {
    setTextBlocks(prev => 
      prev.map(block => 
        block.id === id ? { ...block, ...updates } : block
      )
    );
  }, []);

  // 저장 처리
  const handleSave = useCallback(() => {
    const data = { categoryData, textBlocks };
    onSave?.(data);
    console.log(`${category} 위키 저장:`, data);
  }, [categoryData, textBlocks, onSave, category]);

  // JSON 내보내기
  const handleExportJson = useCallback(() => {
    const data = { categoryData, textBlocks };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${category}-wiki-data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [categoryData, textBlocks, category]);

  // JSON 가져오기
  const handleImportJson = useCallback((data: {
    categoryData: CategoryData;
    textBlocks: TextBlock[];
  }) => {
    setCategoryData(data.categoryData);
    setTextBlocks(data.textBlocks);
  }, []);

  // 문서 제목 생성
  const getDocumentTitle = useCallback((): string => {
    switch (category) {
      case 'lp':
        if (categoryData.type === 'lp') {
          return categoryData.data.infobox.title || '새 LP';
        }
        return '새 LP';
      case 'artist':
        if (categoryData.type === 'artist') {
          return categoryData.data.name || '새 아티스트';
        }
        return '새 아티스트';
      case 'equipment':
        if (categoryData.type === 'equipment') {
          return categoryData.data.name || '새 장비';
        }
        return '새 장비';
      case 'other':
        if (categoryData.type === 'other') {
          return categoryData.data.title || '새 기타 항목';
        }
        return '새 기타 항목';
      default:
        return '새 위키';
    }
  }, [category, categoryData]);

  return {
    categoryData,
    textBlocks,
    updateCategoryData,
    updateTextBlocks,
    addTextBlock,
    removeTextBlock,
    updateTextBlock,
    handleSave,
    handleExportJson,
    handleImportJson,
    getDocumentTitle
  };
} 