import type { EquipmentInfo, CategoryFormProps } from "@/types/hierarchical.editor.types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/Card"
import { Input } from "@/components/Input"
import { Select } from "@/components"
import { Textarea } from "@/components/textarea"

type EquipmentFormProps = CategoryFormProps<EquipmentInfo>;

export function EquipmentForm({ data, onUpdate }: EquipmentFormProps) {
  const handleFieldChange = (field: keyof EquipmentInfo, value: unknown) => {
    onUpdate({ ...data, [field]: value });
  };

  const handleTypeSpecificChange = (type: string, field: string, value: unknown) => {
    const typeInfo = data[`${type}Info` as keyof EquipmentInfo] as unknown as Record<string, unknown>;
    const updatedTypeInfo = { ...typeInfo, [field]: value };
    handleFieldChange(`${type}Info` as keyof EquipmentInfo, updatedTypeInfo);
  };

  const renderTypeSpecificFields = () => {
    switch (data.equipmentType) {
      case 'turntable':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">회전속도</label>
              <Input
                value={(data.turntableInfo?.rotationSpeed as string) || ''}
                onChange={(e) => handleTypeSpecificChange('turntable', 'rotationSpeed', e.target.value)}
                placeholder="예: 33 1/3, 45 RPM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">구동 방식</label>
              <Input
                value={(data.turntableInfo?.driveType as string) || ''}
                onChange={(e) => handleTypeSpecificChange('turntable', 'driveType', e.target.value)}
                placeholder="예: 벨트 구동, 직접 구동"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">톤암 종류</label>
              <Input
                value={(data.turntableInfo?.tonearmType as string) || ''}
                onChange={(e) => handleTypeSpecificChange('turntable', 'tonearmType', e.target.value)}
                placeholder="예: S형, 직선형"
              />
            </div>
          </div>
        );
      
      case 'speaker':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">스피커 방식</label>
              <Input
                value={(data.speakerInfo?.type as string) || ''}
                onChange={(e) => handleTypeSpecificChange('speaker', 'type', e.target.value)}
                placeholder="예: 다이나믹, 정전형"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">인클로저 형태</label>
              <Input
                value={(data.speakerInfo?.enclosureType as string) || ''}
                onChange={(e) => handleTypeSpecificChange('speaker', 'enclosureType', e.target.value)}
                placeholder="예: 바스 리플렉스, 시리즈"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">출력</label>
              <Input
                value={(data.speakerInfo?.output as string) || ''}
                onChange={(e) => handleTypeSpecificChange('speaker', 'output', e.target.value)}
                placeholder="예: 100W, 8Ω"
              />
            </div>
          </div>
        );
      
      case 'amp':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">출력 (W)</label>
              <Input
                value={(data.ampInfo?.output as string) || ''}
                onChange={(e) => handleTypeSpecificChange('amp', 'output', e.target.value)}
                placeholder="예: 50W, 100W"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">입력단자</label>
              <Input
                value={(data.ampInfo?.inputTerminals as string) || ''}
                onChange={(e) => handleTypeSpecificChange('amp', 'inputTerminals', e.target.value)}
                placeholder="예: RCA, XLR"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">진공관 여부</label>
              <Select
                value={(data.ampInfo?.hasVacuumTubes as boolean) ? 'true' : 'false'}
                onChange={(e) => handleTypeSpecificChange('amp', 'hasVacuumTubes', e.target.value === 'true')}
                aria-label="진공관 여부"
              >
                <option value="false">아니오</option>
                <option value="true">예</option>
              </Select>
            </div>
          </div>
        );
      
      case 'headphone':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">헤드폰 형식</label>
              <Input
                value={(data.headphoneInfo?.type as string) || ''}
                onChange={(e) => handleTypeSpecificChange('headphone', 'type', e.target.value)}
                placeholder="예: 오픈백, 클로즈드백"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">임피던스</label>
              <Input
                value={(data.headphoneInfo?.impedance as string) || ''}
                onChange={(e) => handleTypeSpecificChange('headphone', 'impedance', e.target.value)}
                placeholder="예: 32Ω, 300Ω"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">장비명</label>
              <Input
                value={data.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="장비명을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">브랜드</label>
              <Input
                value={data.brand}
                onChange={(e) => handleFieldChange("brand", e.target.value)}
                placeholder="브랜드를 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">출시년도</label>
              <Input
                value={data.releaseYear}
                onChange={(e) => handleFieldChange("releaseYear", e.target.value)}
                placeholder="예: 2020"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">장비 분류</label>
              <Select
                value={data.equipmentType}
                onChange={(e) => handleFieldChange("equipmentType", e.target.value)}
                aria-label="장비 분류"
              >
                <option value="">분류 선택</option>
                <option value="turntable">턴테이블</option>
                <option value="speaker">스피커</option>
                <option value="amp">앰프</option>
                <option value="headphone">헤드폰</option>
                <option value="other">기타</option>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">이미지 URL</label>
              <Input
                value={data.imageUrl}
                onChange={(e) => handleFieldChange("imageUrl", e.target.value)}
                placeholder="이미지 URL을 입력하세요"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">간단 설명</label>
            <Textarea
              value={data.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              placeholder="장비에 대한 간단한 설명을 입력하세요"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* 분류별 상세 정보 */}
      {data.equipmentType && data.equipmentType !== 'other' && (
        <Card className="bg-white dark:bg-gray-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              {data.equipmentType === 'turntable' && '턴테이블 상세 정보'}
              {data.equipmentType === 'speaker' && '스피커 상세 정보'}
              {data.equipmentType === 'amp' && '앰프 상세 정보'}
              {data.equipmentType === 'headphone' && '헤드폰 상세 정보'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderTypeSpecificFields()}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 