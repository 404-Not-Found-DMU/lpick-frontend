import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/Button"

interface HierarchicalHeaderProps {
  documentTitle: string
}

export function HierarchicalHeader({ documentTitle }: HierarchicalHeaderProps) {
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
