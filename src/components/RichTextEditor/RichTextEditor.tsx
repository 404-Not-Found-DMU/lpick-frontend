import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bold, Italic, Link, List, Quote, Code, Heading1, Heading2, Heading3, Image, Table, Minus } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 마크다운 삽입 함수
  const insertMarkdown = (syntax: string, placeholder: string = '') => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = selectedText || placeholder;
    
    let newText;
    if (syntax.includes('{}')) {
      newText = syntax.replace('{}', replacement);
    } else {
      newText = syntax + replacement;
    }

    const newContent = 
      value.substring(0, start) + 
      newText + 
      value.substring(end);
    
    onChange(newContent);
    
    // 커서 위치 조정
    setTimeout(() => {
      const newCursorPos = start + newText.length;
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Heading1, label: '제목 1', syntax: '# ', placeholder: '제목 1' },
    { icon: Heading2, label: '제목 2', syntax: '## ', placeholder: '제목 2' },
    { icon: Heading3, label: '제목 3', syntax: '### ', placeholder: '제목 3' },
    { icon: Bold, label: '굵게', syntax: '**{}**', placeholder: '굵은 텍스트' },
    { icon: Italic, label: '기울임', syntax: '*{}*', placeholder: '기울임 텍스트' },
    { icon: Quote, label: '인용', syntax: '> ', placeholder: '인용문' },
    { icon: Code, label: '인라인 코드', syntax: '`{}`', placeholder: '코드' },
    { icon: Link, label: '링크', syntax: '[{}](url)', placeholder: '링크 텍스트' },
    { icon: Image, label: '이미지', syntax: '![{}](image-url)', placeholder: '이미지 설명' },
    { icon: List, label: '목록', syntax: '\n- ', placeholder: '목록 항목' },
    { icon: Table, label: '테이블', syntax: '\n| 헤더1 | 헤더2 |\n|-------|-------|\n| ', placeholder: '내용1 | 내용2 |' },
    { icon: Minus, label: '구분선', syntax: '\n---\n', placeholder: '' },
  ];

  return (
    <div className={className}>
      {/* 탭 버튼 */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-600 dark:bg-gray-700">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsPreviewMode(false)}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              !isPreviewMode
                ? 'bg-white text-violet-600 shadow-sm dark:bg-gray-800 dark:text-violet-400'
                : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setIsPreviewMode(true)}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              isPreviewMode
                ? 'bg-white text-violet-600 shadow-sm dark:bg-gray-800 dark:text-violet-400'
                : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* 에디터/미리보기 */}
      {isPreviewMode ? (
        <div className="min-h-[300px] p-4">
          {value.trim() ? (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ ...props }) => (
                    <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="mb-3 leading-relaxed text-gray-800 dark:text-gray-200" {...props} />
                  ),
                  strong: ({ ...props }) => (
                    <strong className="font-bold text-gray-900 dark:text-white" {...props} />
                  ),
                  em: ({ ...props }) => (
                    <em className="italic text-gray-800 dark:text-gray-200" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="mb-3 ml-4 list-disc space-y-1 text-gray-800 dark:text-gray-200" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="mb-3 ml-4 list-decimal space-y-1 text-gray-800 dark:text-gray-200" {...props} />
                  ),
                  blockquote: ({ ...props }) => (
                    <blockquote className="border-l-4 border-violet-500 pl-3 italic text-gray-700 dark:text-gray-300 my-3 bg-gray-50 dark:bg-gray-800 py-1" {...props} />
                  ),
                  code: ({ inline, ...props }: { inline?: boolean; children?: React.ReactNode; className?: string }) => 
                    inline ? (
                      <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200" {...props} />
                    ) : (
                      <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto" {...props} />
                    ),
                }}
              >
                {value}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              내용을 입력하면 미리보기가 여기에 표시됩니다
            </p>
          )}
        </div>
      ) : (
        <div>
          {/* 마크다운 툴바 */}
          <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
            <div className="flex flex-wrap items-center gap-1">
              {toolbarButtons.map((tool, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => insertMarkdown(tool.syntax, tool.placeholder)}
                  className="rounded-md p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
                  title={tool.label}
                >
                  <tool.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
          
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[300px] w-full resize-none border-0 bg-transparent p-4 text-sm leading-relaxed outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
          />
        </div>
      )}
    </div>
  );
} 