"use client"

import React, { useState } from "react"
import type { TextBlock } from "@/types/hierarchical.editor.types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash2 } from "lucide-react"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Textarea } from "@/components/textarea"
import { RadioGroupItem } from "@/components/radio-group"
import { Label } from "@/components/label"
import { DeleteConfirmModal } from "./DeleteConfirmModal"

interface SortableTextBlockProps {
  block: TextBlock
  numbering: string
  onUpdate: (id: string, newTitle: string, newContent: string, newDepth: 1 | 2 | 3) => void
  onDelete: (id: string) => void
}

export function SortableTextBlock({ block, numbering, onUpdate, onDelete }: SortableTextBlockProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: block.id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
  }

  const indentationClass = {
    1: "pl-0",
    2: "pl-8",
    3: "pl-16",
  }[block.depth]

  return (
    <div ref={setNodeRef} style={style} className={`relative group ${indentationClass}`}>
      <div className="flex items-start gap-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab p-2 mt-1 text-gray-400 hover:text-gray-600"
          aria-label={`${numbering} 섹션 순서 변경 (스페이스로 잡기, 화살표로 이동)`}
        >
          <GripVertical className="w-5 h-5" />
        </div>
        <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 flex-1">
              <span className="font-bold text-lavender-600 dark:text-lavender-400">{numbering}.</span>
              <Input
                value={block.title}
                onChange={(e) => onUpdate(block.id, e.target.value, block.content, block.depth)}
                placeholder="섹션 제목"
                className="text-lg font-semibold border-none focus:ring-0 p-0 h-auto bg-transparent"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowDeleteModal(true)}
              aria-label="Delete section"
            >
              <Trash2 className="w-3 h-3 text-lavender-400" />
            </Button>
          </div>
          <Textarea
            value={block.content}
            onChange={(e) => onUpdate(block.id, block.title, e.target.value, block.depth)}
            placeholder="내용을 입력하세요 (Markdown 지원)"
            className="min-h-[120px] border-none focus:ring-0 p-0 bg-transparent"
          />
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <Label className="text-sm font-medium">깊이:</Label>
              {[1, 2, 3].map((depth) => (
                <div key={depth} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={String(depth)} 
                    id={`${block.id}-depth-${depth}`}
                    checked={block.depth === depth}
                    onChange={() => onUpdate(block.id, block.title, block.content, depth as 1 | 2 | 3)}
                  />
                  <Label htmlFor={`${block.id}-depth-${depth}`}>{depth}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => onDelete(block.id)}
        title="텍스트 블록 삭제"
        message={`"${block.title}" 블록을 정말 삭제하시겠습니까?`}
      />
    </div>
  )
}
