import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/Button"
import React from "react"

interface HierarchicalHeaderProps {
  documentTitle: string
  onShowJson?: () => void
  onImportJson?: (data: {
    infoboxData: import("@/types/hierarchical.editor.types").InfoboxData,
    tracklistData: import("@/types/hierarchical.editor.types").TracklistData,
    textBlocks: import("@/types/hierarchical.editor.types").TextBlock[]
  }) => void
}

export function HierarchicalHeader({ documentTitle, onShowJson, onImportJson }: HierarchicalHeaderProps) {
  // 파일 input 참조
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        onImportJson?.(json)
      } catch {
        alert('올바른 JSON 파일이 아닙니다.')
      }
    }
    reader.readAsText(file)
    e.target.value = '' // 같은 파일 연속 업로드 가능하게
  }

  return (
    <header className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/wiki">
              <Button variant="ghost" size="sm" className="h-10 w-10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">계층형 에디터</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">{documentTitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-gray-700 dark:text-gray-200" onClick={onShowJson}>
              JSON으로 보기
            </Button>
            <Button variant="outline" className="text-gray-700 dark:text-gray-200" onClick={handleImportClick}>
              JSON 불러오기
            </Button>
            <input
              type="file"
              accept="application/json"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button className="bg-lavender-500 hover:bg-lavender-600">
              <Save className="w-4 h-4 mr-2" />
              저장하기
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
