"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { LivePreview } from "@/app/wiki/edit/components/preview/LivePreview"
import type { WikiCategory, TextBlock, CategoryData } from "@/types/hierarchical.editor.types"

interface BlocksWithTocProps {
  textBlocks: TextBlock[]
  category: WikiCategory
  categoryData: CategoryData
  linkColorClass?: string
  showIndex?: boolean
  topInfo?: React.ReactNode
}

export default function BlocksWithToc({
  textBlocks,
  category,
  categoryData,
  linkColorClass = "text-violet-500",
  showIndex = false,
  topInfo,
}: BlocksWithTocProps) {
  const [showTableOfContents, setShowTableOfContents] = useState(showIndex)

  const numberingMap = (() => {
    const counters = [0, 0, 0] as number[] // depth 1,2,3
    const map: Record<string, string> = {}
    for (const block of textBlocks) {
      const idx = Math.max(0, Math.min(2, block.depth - 1))
      counters[idx] += 1
      for (let i = idx + 1; i < counters.length; i++) counters[i] = 0
      const label = counters.slice(0, idx + 1).filter(n => n > 0).join(".")
      map[block.id] = label
    }
    return map
  })()

  return (
    <>
      {/* 목차 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowTableOfContents(!showTableOfContents)}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">목차</h2>
          {showTableOfContents ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>

        {showTableOfContents && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <ol className="space-y-2">
              {textBlocks.map((block) => {
                const indentClass =
                  block.depth === 1 ? "ml-0" : block.depth === 2 ? "ml-4" : "ml-8"
                const label = numberingMap[block.id]
                return (
                  <li key={block.id} className={indentClass}>
                    <a href={`#${block.id}`} className={`${linkColorClass} hover:underline`}>
                      <span className="mr-1">{label}.</span> {block.title}
                    </a>
                  </li>
                )
              })}
            </ol>
          </div>
        )}
      </div>

      {topInfo}

      {/* 본문 렌더링 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <LivePreview 
          category={category}
          categoryData={categoryData}
          textBlocks={textBlocks}
        />
      </div>
    </>
  )
}


