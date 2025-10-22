import type { OtherInfo, CategoryFormProps } from "@/types/hierarchical.editor.types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/Card"
import { Input } from "@/components/Input"
import { Textarea } from "@/components/textarea"

type OtherFormProps = CategoryFormProps<OtherInfo>;

export function OtherForm({ data, onUpdate }: OtherFormProps) {
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
          <CardTitle className="text-base font-semibold">내용</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.content}
            onChange={(e) => handleFieldChange("content", e.target.value)}
            placeholder="자유롭게 내용을 작성하세요. 마크다운을 지원합니다..."
            className="min-h-[400px] resize-y"
          />
        </CardContent>
      </Card>
    </div>
  );
} 