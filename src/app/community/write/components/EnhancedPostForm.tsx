'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { RichTextEditor } from '@/components/RichTextEditor';
import { PostFormData, BoardType } from '../../community.types';
import { Send, AlertCircle, Hash, FileText, Save } from 'lucide-react';

interface EnhancedPostFormProps {
  formData: PostFormData;
  updateFormData: (updates: Partial<PostFormData>) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const BOARD_TYPES: { id: BoardType; label: string }[] = [
  { id: '자유게시판', label: '자유게시판' },
  { id: '음반', label: '음반' },
  { id: '아티스트', label: '아티스트' },
  { id: '장비', label: '장비' },
];

export const EnhancedPostForm = ({
  formData,
  updateFormData,
  onSubmit,
  isSubmitting,
}: EnhancedPostFormProps) => {
  const [wordCount, setWordCount] = useState(0);
  const searchParams = useSearchParams();
  const isEditMode = !!searchParams.get('edit');

  useEffect(() => {
    // Markdown에서 실제 텍스트 길이 계산
    const textContent = formData.content
      .replace(/[#*_~`\[\]]/g, '') // 마크다운 문법 제거
      .replace(/\n/g, ' ')
      .trim();
    setWordCount(textContent.length);
  }, [formData.content]);

  const isFormComplete =
    formData.title.trim() && formData.content.trim() && formData.boardType && formData.badgeType;
  const titleLength = formData.title.length;

  return (
    <div className="mx-auto max-w-4xl relative">
      {/* 로딩 오버레이 */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600"></div>
        </div>
      )}
      
      <div className="space-y-6">
        {/* 제목 섹션 */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FileText className="h-4 w-4" />
            제목
          </div>
          <Input
            placeholder="제목을 입력하세요..."
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            disabled={isSubmitting}
            className={`w-full border-2 bg-white px-4 py-3 text-lg font-medium transition-all duration-200 focus:border-violet-500 focus:shadow-sm dark:bg-gray-800 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
          <div className="mt-1 flex items-center justify-between text-sm">
            <span className={titleLength > 80 ? 'text-orange-500' : 'text-gray-500'}>
              {titleLength}/100자
            </span>
            {titleLength > 80 && (
              <div className="flex items-center gap-1 text-orange-500">
                <AlertCircle className="h-4 w-4" />
                <span>제목이 너무 길어요</span>
              </div>
            )}
          </div>
        </div>

        {/* 게시판 선택 */}
        <div className="grid gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Hash className="h-4 w-4" />
              게시판
            </div>
            <div className="flex flex-wrap gap-2">
              {BOARD_TYPES.map((boardType) => (
                <button
                  key={boardType.id}
                  onClick={() => !isSubmitting && updateFormData({ boardType: boardType.id })}
                  disabled={isSubmitting}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : formData.boardType === boardType.id
                      ? 'border-violet-500 bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500'
                  }`}
                >
                  {boardType.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 에디터 섹션 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FileText className="h-4 w-4" />
              내용
            </div>
            <span className="text-xs text-gray-500">{wordCount}자</span>
          </div>

          <div className={`overflow-hidden rounded-lg border-2 bg-white shadow-sm transition-all focus-within:border-violet-500 focus-within:shadow-md dark:bg-gray-800 ${
            isSubmitting ? 'opacity-50 pointer-events-none' : ''
          }`}>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => !isSubmitting && updateFormData({ content: value })}
              placeholder="내용을 입력하세요"
              className="border-0"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* 게시 버튼 */}
        <div className="pt-4 text-center">
          <Button
            onClick={onSubmit}
            disabled={isSubmitting || !isFormComplete}
            className={`rounded-lg px-8 py-3 text-base font-semibold transition-all duration-200 ${
              isFormComplete
                ? 'bg-violet-600 text-white shadow-md hover:bg-violet-700 hover:shadow-lg'
                : 'cursor-not-allowed bg-gray-200 text-gray-500'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {isEditMode ? '수정하는 중...' : '게시하는 중...'}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {isEditMode ? <Save className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {isEditMode ? '수정하기' : '게시하기'}
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
