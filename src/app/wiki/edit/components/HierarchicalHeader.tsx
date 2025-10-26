import React, { useState, useRef } from "react"
import { Button } from "@/components/Button"
import { DeleteConfirmModal } from "./common/DeleteConfirmModal"
import { ArrowLeft, Save } from "lucide-react"
import type { CategoryData, TextBlock } from "@/types/hierarchical.editor.types"

interface HierarchicalHeaderProps {
  documentTitle: string
  onShowJson?: () => void
  onLoadExample?: () => void
  onSave?: () => void
}

export function HierarchicalHeader({ 
  documentTitle, 
  onShowJson, 
  onLoadExample, 
  onSave 
}: HierarchicalHeaderProps) {
  // 모달 상태 관리
  const [showExitModal, setShowExitModal] = useState(false)

  const handleExitClick = () => {
    setShowExitModal(true)
  }

  const handleExitConfirm = () => {
    // 실제로는 router.push('/wiki') 또는 다른 네비게이션 로직을 사용
    window.location.href = '/wiki'
  }

  const handleSaveClick = () => {
    onSave?.()
  }

  return (
    <>
      <header className="sticky top-0 flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="h-10 w-10" onClick={handleExitClick}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">{documentTitle}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-gray-700 dark:text-gray-200" onClick={onShowJson}>
                JSON으로 보기
              </Button>
            <Button variant="outline" className="text-gray-700 dark:text-gray-200" onClick={onLoadExample}>
              예시 폼 불러오기
            </Button>
              <Button 
                className="bg-lavender-500 hover:bg-lavender-600"
                onClick={handleSaveClick}
              >
                <Save className="w-4 h-4 mr-2" />
                저장하기
              </Button>
            </div>
          </div>
        </div>
      </header>

      <DeleteConfirmModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleExitConfirm}
        title="편집 종료"
        message="편집 중인 내용이 저장되지 않았습니다. 정말로 편집을 종료하시겠습니까?"
      />
    </>
  )
}
