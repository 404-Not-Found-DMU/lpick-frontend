'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { PostFormData, BoardType, TagType } from '../../types/community.types';
import { Send, AlertCircle, Hash, FileText, Tag, Eye, Edit3 } from 'lucide-react';

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

const BADGE_TYPES: { id: TagType; label: string }[] = [
  { id: '질문', label: '질문' },
  { id: '정보', label: '정보' },
  { id: '홍보', label: '홍보' },
];

export const EnhancedPostForm = ({
  formData,
  updateFormData,
  onSubmit,
  isSubmitting,
}: EnhancedPostFormProps) => {
  const [wordCount, setWordCount] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

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
    <div className="mx-auto max-w-6xl">
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
            className="w-full border-2 bg-white px-4 py-3 text-lg font-medium transition-all duration-200 focus:border-violet-500 focus:shadow-sm dark:bg-gray-800"
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

        {/* 게시판 및 글머리 섹션 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* 게시판 선택 */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Hash className="h-4 w-4" />
              게시판
            </div>
            <div className="flex flex-wrap gap-2">
              {BOARD_TYPES.map((boardType) => (
                <button
                  key={boardType.id}
                  onClick={() => updateFormData({ boardType: boardType.id })}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    formData.boardType === boardType.id
                      ? 'border-violet-500 bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500'
                  }`}
                >
                  {boardType.label}
                </button>
              ))}
            </div>
          </div>

          {/* 글머리 선택 */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Tag className="h-4 w-4" />
              글머리
            </div>
            <div className="flex flex-wrap gap-2">
              {BADGE_TYPES.map((badgeType) => (
                <button
                  key={badgeType.id}
                  onClick={() => updateFormData({ badgeType: badgeType.id })}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    formData.badgeType === badgeType.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500'
                  }`}
                >
                  {badgeType.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 에디터/미리보기 섹션 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FileText className="h-4 w-4" />
              내용
            </div>
            <span className="text-xs text-gray-500">{wordCount}자</span>
          </div>

          <div className="overflow-hidden rounded-lg border-2 bg-white shadow-sm transition-all focus-within:border-violet-500 focus-within:shadow-md dark:bg-gray-800">
            {isPreviewMode ? (
              // 미리보기 모드
              <div className="min-h-[400px] p-6">
                {formData.content.trim() ? (
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ ...props }) => (
                          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2" {...props} />
                        ),
                        h2: ({ ...props }) => (
                          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1" {...props} />
                        ),
                        h3: ({ ...props }) => (
                          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white" {...props} />
                        ),
                        h4: ({ ...props }) => (
                          <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white" {...props} />
                        ),
                        h5: ({ ...props }) => (
                          <h5 className="text-base font-semibold mb-2 text-gray-900 dark:text-white" {...props} />
                        ),
                        h6: ({ ...props }) => (
                          <h6 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white" {...props} />
                        ),
                        p: ({ ...props }) => (
                          <p className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200" {...props} />
                        ),
                        strong: ({ ...props }) => (
                          <strong className="font-bold text-gray-900 dark:text-white" {...props} />
                        ),
                        em: ({ ...props }) => (
                          <em className="italic text-gray-800 dark:text-gray-200" {...props} />
                        ),
                        ul: ({ ...props }) => (
                          <ul className="mb-4 ml-6 list-disc space-y-1 text-gray-800 dark:text-gray-200" {...props} />
                        ),
                        ol: ({ ...props }) => (
                          <ol className="mb-4 ml-6 list-decimal space-y-1 text-gray-800 dark:text-gray-200" {...props} />
                        ),
                        li: ({ ...props }) => (
                          <li className="leading-relaxed" {...props} />
                        ),
                        blockquote: ({ ...props }) => (
                          <blockquote className="border-l-4 border-violet-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4 bg-gray-50 dark:bg-gray-800 py-2" {...props} />
                        ),
                        hr: ({ ...props }) => (
                          <hr className="my-6 border-gray-300 dark:border-gray-700" {...props} />
                        ),
                        a: ({ ...props }) => (
                          <a className="text-violet-600 hover:text-violet-700 underline dark:text-violet-400 dark:hover:text-violet-300" {...props} target="_blank" rel="noopener noreferrer" />
                        ),
                        img: ({ ...props }) => (
                          <div className="my-4 max-w-full">
                            <Image 
                              src={String(props.src || '')} 
                              alt={String(props.alt || '')} 
                              width={800} 
                              height={600} 
                              className="rounded-lg object-contain" 
                              style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
                            />
                          </div>
                        ),
                        code: ({ inline, ...props }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) =>
                          inline ? (
                            <code className="rounded bg-violet-100 px-1.5 py-0.5 text-sm text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 font-mono" {...props} />
                          ) : (
                            <code className="block rounded-lg bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto font-mono" {...props} />
                          ),
                        pre: ({ ...props }) => (
                          <pre className="mb-4 rounded-lg bg-gray-900 p-4 dark:bg-gray-800 overflow-x-auto" {...props} />
                        ),
                      }}
                    >
                      {formData.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500">
                    미리보기할 내용이 없습니다. 편집 모드에서 내용을 작성해보세요.
                  </div>
                )}
              </div>
            ) : (
              // 편집 모드
              <textarea
                value={formData.content}
                onChange={(e) => updateFormData({ content: e.target.value })}
                placeholder="당신의 이야기를 들려주세요... 마크다운 문법을 사용할 수 있습니다.

# 제목
## 부제목
**굵은 글씨** *기울임* 
- 목록 아이템
- 목록 아이템

```javascript
// 코드 블록
console.log('Hello World');
```

> 인용문

[링크](https://example.com)
![이미지](이미지_URL)"
                className="min-h-[400px] w-full resize-none border-0 bg-transparent p-6 text-base leading-relaxed outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
              />
            )}
          </div>

          {/* 에디터/미리보기 토글 버튼 */}
          <div className="mt-3 flex justify-center">
            <div className="flex rounded-lg border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800 shadow-sm">
              <button
                onClick={() => setIsPreviewMode(false)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-l-lg ${
                  !isPreviewMode
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <Edit3 className="h-4 w-4" />
                편집 모드
              </button>
              <button
                onClick={() => setIsPreviewMode(true)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-r-lg ${
                  isPreviewMode
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <Eye className="h-4 w-4" />
                미리보기
              </button>
            </div>
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
                게시하는 중...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                게시하기
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
