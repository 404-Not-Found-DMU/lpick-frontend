import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import InquiryListClient from './parts/InquiryListClient'

export default function InquiryPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8 py-10">
        <div className="max-w-[1440px] mx-auto">
          {/* 상단 타이틀 */}
          <div className="mb-3" />
          {/* 돌아가기 */}
          <div className="mb-8">
            <Link href="/support" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">고객센터로 돌아가기</span>
            </Link>
          </div>

          {/* 제목 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">1:1 문의</h1>
            <p className="mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400">개별 문의사항을 남겨주시면 빠르게 답변드릴게요.</p>
          </div>

          <InquiryListClient />
        </div>
      </div>
    </div>
  )
}
