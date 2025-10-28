"use client"
import WikiLayout from "@/app/wiki/components/WikiLayout"
import { Button } from "@/components/Button"
import Link from "next/link"
import { Edit, History, MessageSquare, Star, Share2, Bookmark } from "lucide-react"
import { getDummyData } from "@/app/wiki/edit/data/dummyData"
import type { WikiCategory } from "@/types/hierarchical.editor.types"
import BlocksWithToc from "@/app/wiki/components/BlocksWithToc"

export default function WikiLPPage() {
  const wikiData = getDummyData('lp')
  const category: WikiCategory = 'lp'
  const categoryData = wikiData.categoryData
  const textBlocks = wikiData.textBlocks
  const title = categoryData.data.infobox.title

  return (
    <WikiLayout
      title={title}
      category={"음반"}
      lastUpdated={"2023년 5월 20일"}
      views={1245}
      contributors={24}
      showDocInfo={false}
      showRelatedPages={false}
      badgeClassName="bg-violet-500/10 text-violet-500"
      headerActions={(
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="h-8">
            <Edit className="w-4 h-4 mr-2" />
            편집하기
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <History className="w-4 h-4 mr-2" />
            역사
          </Button>
          <Link href="/wiki/discuss" className="inline-flex">
            <Button variant="outline" size="sm" className="h-8">
              <MessageSquare className="w-4 h-4 mr-2" />
              토론
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="h-8">
            <Star className="w-4 h-4 mr-2" />
            평가
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Share2 className="w-4 h-4 mr-2" />
            공유
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Bookmark className="w-4 h-4 mr-2" />
            북마크
          </Button>
        </div>
      )}
    >
      <BlocksWithToc
        textBlocks={textBlocks}
        category={category}
        categoryData={categoryData}
        linkColorClass="text-violet-500"
        showIndex={false}
      />
    </WikiLayout>
  )
}
