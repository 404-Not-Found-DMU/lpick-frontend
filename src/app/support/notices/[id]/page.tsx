import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import NoticeDetailClient from '../parts/NoticeDetailClient'

export default function NoticeDetailPage({ params }: { params: { id: string } }) {
  const noticeId = decodeURIComponent(params.id)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8 py-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-6">
            <Link href="/support/notices" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">뒤로가기</span>
            </Link>
          </div>

          <NoticeDetailClient noticeId={noticeId} />
        </div>
      </div>
    </div>
  )
}


