"use client"

import { Input } from "@/components/Input"
import { Label } from "@/components/label"
import { Textarea } from "@/components/textarea"
import { Button } from "@/components/Button"
import { Plus, Trash2, ChevronDown, ChevronRight, GripVertical } from "lucide-react"
import { useState } from "react"
import { nanoid } from "nanoid"
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DeleteConfirmModal } from "../common/DeleteConfirmModal"
import type { InfoboxData, LPInfo } from "@/types/hierarchical.editor.types"

interface InfoboxFormProps {
  data: InfoboxData
  onUpdate: (newData: InfoboxData) => void
}

interface SortableLPItemProps {
  lp: LPInfo
  index: number
  isExpanded: boolean
  onToggleExpansion: (lpId: string) => void
  onLPChange: (lpId: string, field: keyof LPInfo, value: string | boolean) => void
  onRemoveLP: (lpId: string) => void
}

function SortableLPItem({ lp, index, isExpanded, onToggleExpansion, onLPChange, onRemoveLP }: SortableLPItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lp.id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div ref={setNodeRef} style={style} className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden">
      {/* LP 헤더 */}
      <div 
        className="bg-gray-50 dark:bg-gray-800 px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={() => onToggleExpansion(lp.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab p-1 text-gray-400 hover:text-gray-600"
              aria-label="Drag to reorder"
            >
              <GripVertical className="w-4 h-4" />
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              LP #{index + 1}
            </span>
            {lp.alias && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {lp.alias}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              setShowDeleteModal(true)
            }}
            className="h-8 w-8"
          >
            <Trash2 className="w-3 h-3 text-lavender-400" />
          </Button>
        </div>
      </div>
      
      {/* LP 상세 정보 */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div>
            <Label htmlFor={`alias-${lp.id}`}>별칭</Label>
            <Input 
              id={`alias-${lp.id}`}
              value={lp.alias} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onLPChange(lp.id, "alias", e.target.value)}
              placeholder="일본판, 독일판, 한정판 등"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`material-${lp.id}`}>재질</Label>
              <Input 
                id={`material-${lp.id}`}
                value={lp.material} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onLPChange(lp.id, "material", e.target.value)}
                placeholder="바이닐, PVC, 컬러 바이닐 등"
              />
            </div>
            <div>
              <Label htmlFor={`rpm-${lp.id}`}>RPM</Label>
              <Input 
                id={`rpm-${lp.id}`}
                value={lp.rpm} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onLPChange(lp.id, "rpm", e.target.value)}
                placeholder="33⅓, 45, 78"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor={`diameter-${lp.id}`}>직경</Label>
              <Input 
                id={`diameter-${lp.id}`}
                value={lp.diameter} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onLPChange(lp.id, "diameter", e.target.value)}
                placeholder="7인치, 10인치, 12인치"
              />
            </div>
            <div>
              <Label htmlFor={`weight-${lp.id}`}>무게/그램수</Label>
              <Input 
                id={`weight-${lp.id}`}
                value={lp.weight} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onLPChange(lp.id, "weight", e.target.value)}
                placeholder="120g, 140g, 180g"
              />
            </div>
            <div>
              <Label htmlFor={`pressingCountry-${lp.id}`}>제조국/프레싱 국가</Label>
              <Input 
                id={`pressingCountry-${lp.id}`}
                value={lp.pressingCountry} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onLPChange(lp.id, "pressingCountry", e.target.value)}
                placeholder="일본, 독일, 미국 등"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor={`pressingInfo-${lp.id}`}>프레싱 정보</Label>
            <Input 
              id={`pressingInfo-${lp.id}`}
              value={lp.pressingInfo} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onLPChange(lp.id, "pressingInfo", e.target.value)}
              placeholder="오리지널, 재발매, 첫 프레싱 등"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`isColored-${lp.id}`}>컬러판 여부</Label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`isColored-${lp.id}`}
                    checked={lp.isColored === true}
                    onChange={() => onLPChange(lp.id, "isColored", true)}
                    className="w-4 h-4"
                  />
                  <span>컬러판</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`isColored-${lp.id}`}
                    checked={lp.isColored === false}
                    onChange={() => onLPChange(lp.id, "isColored", false)}
                    className="w-4 h-4"
                  />
                  <span>일반 블랙판</span>
                </label>
              </div>
            </div>
            <div>
              <Label htmlFor={`labelType-${lp.id}`}>라벨</Label>
              <Input 
                id={`labelType-${lp.id}`}
                value={lp.labelType} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onLPChange(lp.id, "labelType", e.target.value)}
                placeholder="레이블 로고나 디자인 종류"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`format-${lp.id}`}>수록 방식</Label>
              <Input 
                id={`format-${lp.id}`}
                value={lp.format} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onLPChange(lp.id, "format", e.target.value)}
                placeholder="싱글 LP, 더블 LP, 게이트폴드 등"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor={`specialNotes-${lp.id}`}>특이사항</Label>
            <Textarea 
              id={`specialNotes-${lp.id}`}
              value={lp.specialNotes} 
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onLPChange(lp.id, "specialNotes", e.target.value)}
              placeholder="한정판 넘버링, 포스터 포함 여부 등 부가 구성"
              className="min-h-[80px]"
            />
          </div>
        </div>
      )}
      
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => onRemoveLP(lp.id)}
        title="LP 정보 삭제"
        message={`LP #${index + 1}${lp.alias ? ` (${lp.alias})` : ''} 정보를 정말 삭제하시겠습니까?`}
      />
    </div>
  )
}

export function InfoboxForm({ data, onUpdate }: InfoboxFormProps) {
  const [expandedLPs, setExpandedLPs] = useState<Set<string>>(new Set())

  const handleChange = (field: keyof InfoboxData, value: string) => {
    onUpdate({ ...data, [field]: value })
  }

  const handleLPChange = (lpId: string, field: keyof LPInfo, value: string | boolean) => {
    const updatedLpInfos = data.lpInfos?.map(lp => 
      lp.id === lpId ? { ...lp, [field]: value } : lp
    ) || []
    onUpdate({ ...data, lpInfos: updatedLpInfos })
  }

  const addLP = () => {
    const newLP: LPInfo = {
      id: nanoid(),
      alias: "",
      material: "",
      rpm: "",
      diameter: "",
      weight: "",
      pressingCountry: "",
      pressingInfo: "",
      isColored: false,
      labelType: "",
      format: "",
      specialNotes: "",
    }
    onUpdate({ ...data, lpInfos: [...(data.lpInfos || []), newLP] })
  }

  const removeLP = (lpId: string) => {
    const updatedLpInfos = data.lpInfos?.filter(lp => lp.id !== lpId) || []
    onUpdate({ ...data, lpInfos: updatedLpInfos })
  }

  const toggleLPExpansion = (lpId: string) => {
    const newExpanded = new Set(expandedLPs)
    if (newExpanded.has(lpId)) {
      newExpanded.delete(lpId)
    } else {
      newExpanded.add(lpId)
    }
    setExpandedLPs(newExpanded)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = data.lpInfos?.findIndex((lp) => lp.id === active.id) || 0
      const newIndex = data.lpInfos?.findIndex((lp) => lp.id === over.id) || 0
      const reorderedLPs = arrayMove(data.lpInfos || [], oldIndex, newIndex)
      onUpdate({ ...data, lpInfos: reorderedLPs })
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">앨범명</Label>
          <Input id="title" value={data.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("title", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="artist">아티스트</Label>
          <Input id="artist" value={data.artist} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("artist", e.target.value)} />
        </div>
      </div>
      <div>
        <Label htmlFor="coverUrl">커버 이미지 URL</Label>
        <Input id="coverUrl" value={data.coverUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("coverUrl", e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="releaseDate">발매일</Label>
          <Input
            id="releaseDate"
            type="date"
            value={data.releaseDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("releaseDate", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="genre">장르</Label>
          <Input id="genre" value={data.genre} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("genre", e.target.value)} />
        </div>
      </div>
      <div>
        <Label htmlFor="label">레이블</Label>
        <Input id="label" value={data.label} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("label", e.target.value)} />
      </div>
      
      {/* LP 정보 섹션 */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">LP 정보</h3>
          <Button variant="outline" size="sm" onClick={addLP} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            LP 추가
          </Button>
        </div>
        
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={data.lpInfos?.map(lp => lp.id) || []} strategy={verticalListSortingStrategy}>
            {data.lpInfos?.map((lp, index) => (
              <SortableLPItem
                key={lp.id}
                lp={lp}
                index={index}
                isExpanded={expandedLPs.has(lp.id)}
                onToggleExpansion={toggleLPExpansion}
                onLPChange={handleLPChange}
                onRemoveLP={removeLP}
              />
            ))}
          </SortableContext>
        </DndContext>
        
        {(!data.lpInfos || data.lpInfos.length === 0) && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>아직 LP 정보가 없습니다.</p>
            <p className="text-sm">LP 추가 버튼을 클릭하여 LP 정보를 입력하세요.</p>
          </div>
        )}
      </div>
    </div>
  )
}
