'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { PostFormData } from '../../types/community.types';
import { Send, Image, AlertCircle, X } from 'lucide-react';
import NextImage from 'next/image';

interface EnhancedPostFormProps {
  formData: PostFormData;
  updateFormData: (updates: Partial<PostFormData>) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const EnhancedPostForm = ({
  formData,
  updateFormData,
  onSubmit,
  isSubmitting,
}: EnhancedPostFormProps) => {
  const [titleFocused, setTitleFocused] = useState(false);
  const [contentFocused, setContentFocused] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    // HTML 태그 제거하여 실제 텍스트 길이 계산
    const textContent = formData.content.replace(/<[^>]*>/g, '');
    setWordCount(textContent.length);
  }, [formData.content]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ image: file });
    }
  };

  const isFormComplete = formData.title.trim() && formData.content.trim();
  const titleLength = formData.title.length;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-8">
        {/* 제목 섹션 */}
        <div className="text-center">
          <div
            className={`relative transition-all duration-300 ${titleFocused ? 'scale-105' : ''}`}
          >
            <Input
              placeholder="제목을 입력하세요..."
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              className={`w-full border-0 bg-transparent px-4 py-4 text-center text-2xl font-bold placeholder:text-gray-300 focus:ring-0 dark:placeholder:text-gray-600 ${
                titleFocused
                  ? 'border-b-4 border-violet-500'
                  : 'border-b-2 border-gray-200 dark:border-gray-700'
              }`}
            />
            <div className="mt-2 flex items-center justify-center gap-2 text-sm">
              <span className={titleLength > 50 ? 'text-orange-500' : 'text-gray-500'}>
                {titleLength}/100자
              </span>
              {titleLength > 50 && <AlertCircle className="h-4 w-4 text-orange-500" />}
            </div>
          </div>
        </div>

        {/* 카테고리 선택 제거 */}

        {/* 에디터 섹션 */}
        <div className={`transition-all duration-300 ${contentFocused ? 'scale-[1.02]' : ''}`}>
          <div
            className={`overflow-hidden rounded-xl border-2 bg-white shadow-lg transition-all dark:bg-gray-800 ${
              contentFocused
                ? 'border-violet-500 shadow-xl'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div
              onFocus={() => setContentFocused(true)}
              onBlur={() => setContentFocused(false)}
              className="text-center"
              style={{ textAlign: 'center' }}
            >
              <div
                className="prose prose-lg mx-auto max-w-none text-center"
                style={{ textAlign: 'center' }}
              >
                <div style={{ textAlign: 'center' }}>
                  <textarea
                    value={formData.content}
                    onChange={(e) => updateFormData({ content: e.target.value })}
                    placeholder="여기에 당신의 이야기를 들려주세요..."
                    className="min-h-[400px] w-full resize-none border-0 bg-transparent p-6 text-center text-lg placeholder:text-gray-400 focus:outline-none"
                    style={{ textAlign: 'center' }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-700">
              <span className="text-xs text-gray-500">{wordCount}자 작성됨</span>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-1 rounded-lg bg-white px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500">
                    <Image className="h-3 w-3" />
                    {formData.image ? '이미지 변경' : '이미지 추가'}
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* 이미지 미리보기 */}
          {formData.image && (
            <div className="mt-4 text-center">
              <div className="inline-block rounded-xl border-2 border-gray-200 bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <NextImage
                  src={URL.createObjectURL(formData.image)}
                  alt="미리보기"
                  width={400}
                  height={256}
                  className="max-h-64 rounded-lg object-cover"
                />
                <div className="mt-2 flex items-center justify-between px-2 py-1">
                  <span className="text-xs text-gray-500">{formData.image.name}</span>
                  <button
                    onClick={() => updateFormData({ image: null })}
                    className="rounded-full bg-red-100 p-1 text-red-500 hover:bg-red-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 게시 버튼 */}
        <div className="pt-4 text-center">
          <Button
            onClick={onSubmit}
            disabled={isSubmitting || !isFormComplete}
            className={`relative overflow-hidden rounded-full px-12 py-4 text-lg font-semibold transition-all duration-300 ${
              isFormComplete
                ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-xl hover:scale-105 hover:from-violet-600 hover:to-purple-700 hover:shadow-2xl'
                : 'cursor-not-allowed bg-gray-200 text-gray-500'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                게시하는 중...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Send className="h-5 w-5" />
                게시하기
                {isFormComplete && (
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      animation: isFormComplete ? 'shimmer 2s infinite' : 'none',
                    }}
                  />
                )}
              </div>
            )}
          </Button>

          {!isFormComplete && (
            <p className="mt-3 text-sm text-gray-500">
              {!formData.title.trim()
                ? '제목을 입력해주세요'
                : !formData.content.trim()
                  ? '내용을 입력해주세요'
                  : ''}
            </p>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* 전체 화면 배경 보장 */
        html,
        body {
          min-height: 100vh;
        }

        /* 텍스트 영역 중앙 정렬 스타일 */
        .text-editor {
          text-align: center !important;
        }

        /* 전역 중앙 정렬 */
        div[data-placeholder] {
          text-align: center !important;
        }
      `}</style>
    </div>
  );
};
