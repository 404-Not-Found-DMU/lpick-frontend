import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import FaqClient from './parts/FaqClient'

export default function FaqPage() {
  const faqs = [
    { q: 'LPick은 어떤 서비스인가요?', a: 'LP/오디오 애호가를 위한 위키, 커뮤니티, 플레이어를 제공하는 플랫폼입니다.' },
    { q: '회원가입 없이도 이용 가능한가요?', a: '일부 공개 문서는 열람 가능하지만 참여와 관리 기능은 회원가입이 필요합니다.' },
    { q: '음반은 어떻게 검색하나요?', a: '이미지/QR/텍스트 등 다양한 방식으로 검색할 수 있습니다.' },
  ]
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8 py-10">
        <div className="max-w-[1440px] mx-auto">
          {/* 상단 돌아가기 */}
          <div className="mb-8">
            <Link href="/support" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">고객센터로 돌아가기</span>
            </Link>
          </div>

          {/* 제목 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">자주 묻는 질문</h1>
            <p className="mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400">LPick 이용 중 자주 문의되는 질문과 답변을 모았습니다.</p>
          </div>

          <FaqClient faqs={faqs} />
        </div>
      </div>
    </div>
  )
}


