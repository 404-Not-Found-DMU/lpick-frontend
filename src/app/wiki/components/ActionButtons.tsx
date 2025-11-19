"use client"
import Link from "next/link"
import { Button } from "@/components/Button"
import { Edit, History, MessageSquare, Bookmark } from "lucide-react"
import { useToast } from "@/components/Toast/ToastProvider"
import { useState } from "react"

type Props = {
  slug: string
}

export default function ActionButtons({ slug }: Props) {
  const { push } = useToast()
  const [bookmarking, setBookmarking] = useState(false)
  const [bookmarked, setBookmarked] = useState<boolean | null>(null)



  const onBookmark = async () => {
    if (bookmarking) return
    setBookmarking(true)
    const prev = bookmarked
    setBookmarked(true)
    try {
      const res = await fetch(`/api/wiki/${encodeURIComponent(slug)}/bookmark`, { method: 'POST' })
      if (!res.ok) throw new Error('failed')
      push('북마크에 추가되었습니다.', 'success')
    } catch {
      setBookmarked(prev)
      push('북마크 처리 중 오류가 발생했습니다.', 'error')
    } finally {
      setBookmarking(false)
    }
  }

  const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"

  return (
    <div className="flex flex-wrap gap-3">
      <Link href={`/wiki/${encodeURIComponent(slug)}/edit`} className="inline-flex" aria-label="문서 편집 페이지로 이동">
        <Button variant="outline" size="sm" className={`h-8 ${focusRing}`}>
          <Edit className="w-4 h-4 mr-2" />
          편집하기
        </Button>
      </Link>
      <Link href={`/wiki/${encodeURIComponent(slug)}/history`} className="inline-flex" aria-label="문서 역사 페이지로 이동">
        <Button variant="outline" size="sm" className={`h-8 ${focusRing}`}>
          <History className="w-4 h-4 mr-2" />
          역사
        </Button>
      </Link>
      <Link href={`/wiki/${encodeURIComponent(slug)}/discuss`} className="inline-flex" aria-label="문서 토론 페이지로 이동">
        <Button variant="outline" size="sm" className={`h-8 ${focusRing}`}>
          <MessageSquare className="w-4 h-4 mr-2" />
          토론
        </Button>
      </Link>
      <Button variant="outline" size="sm" disabled={bookmarking} className={`h-8 ${focusRing}`} onClick={onBookmark} aria-label="문서 북마크">
        <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? 'fill-violet-600 text-violet-600' : ''}`} />
        {bookmarking ? '처리 중...' : (bookmarked ? '북마크됨' : '북마크')}
      </Button>
    </div>
  )
}


