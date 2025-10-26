import type { OtherInfo, CategoryFormProps } from "@/types/hierarchical.editor.types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/Card"
import { Input } from "@/components/Input"
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor"
import { MarkdownRenderer } from "../common/MarkdownRenderer"
import { useState } from "react"

type OtherFormProps = CategoryFormProps<OtherInfo>;

export function OtherForm({ data, onUpdate }: OtherFormProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>(() => 'edit')

  const handleFieldChange = (field: keyof OtherInfo, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* 제목 */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">제목</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={data.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            placeholder="위키 항목의 제목을 입력하세요"
            className="text-lg font-medium"
          />
        </CardContent>
      </Card>

      {/* 마크다운 에디터 */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">내용</CardTitle>
            <div className="inline-flex items-center gap-1 rounded-md bg-gray-100 p-1 text-sm dark:bg-gray-700">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 rounded ${activeTab === 'edit' ? 'bg-white shadow dark:bg-gray-800' : 'text-gray-600 dark:text-gray-300'}`}
                aria-pressed={activeTab === 'edit'}
              >
                편집
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded ${activeTab === 'preview' ? 'bg-white shadow dark:bg-gray-800' : 'text-gray-600 dark:text-gray-300'}`}
                aria-pressed={activeTab === 'preview'}
              >
                미리보기
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'edit' ? (
            <RichTextEditor
              value={data.content}
              onChange={(val) => handleFieldChange("content", val)}
              placeholder="자유롭게 내용을 작성하세요. 마크다운을 지원합니다..."
              className="min-h-[400px]"
            />
          ) : (
            <div className="prose dark:prose-invert max-w-none min-h-[400px] p-4 border border-gray-200 rounded-md dark:border-gray-700">
              <MarkdownRenderer>{data.content || ''}</MarkdownRenderer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 