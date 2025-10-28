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
  const [showTableOfContents, setShowTableOfContents] = useState(true)

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
            <ol className="list-decimal list-inside space-y-2">
              {textBlocks.map((block, index) => (
                <li key={block.id}>
                  <a href={`#${block.id}`} className={`${linkColorClass} hover:underline`}>
                    {showIndex ? `${index + 1}. ` : ''}{block.title}
                  </a>
                </li>
              ))}
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


