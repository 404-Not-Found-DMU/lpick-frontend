import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import InquiryListClient, { InquiryItem } from './parts/InquiryListClient'


// 원시 데이터: 같은 threadId의 문의/답변이 한 묶음
const RAW_INQUIRIES: InquiryItem[] = [
  { id: 701, threadId: 701, type: '문의', title: '비밀글입니다.', author: '김**', date: '2025-09-27', views: 0, isSecret: true, authorId: 'user-1' },
  { id: 600, threadId: 600, type: '문의', title: '홈페이지 문의', author: '김현수', date: '2025-08-03', views: 0, authorId: 'user-2' },
  { id: 601, threadId: 600, type: '답변', title: '[RE] 홈페이지 문의', author: '총관리자', date: '2025-08-03', views: 0 },
  { id: 500, threadId: 500, type: '문의', title: '비밀글입니다.', author: '김**', date: '2025-08-03', views: 0, isSecret: true, authorId: 'user-3' },
]

const MORE_THREADS: InquiryItem[] = Array.from({ length: 15 }).flatMap((_, i) => {
  const base = 490 - i
  const question: InquiryItem = {
    id: base,
    threadId: base,
    type: '문의',
    title: `문의 사항 ${i + 1}`,
    author: '이**',
    date: '2025-08-03',
    views: 0,
    isSecret: i % 5 === 0,
    authorId: i % 5 === 0 ? 'user-secret' : 'user-normal'
  }
  const answered = i % 3 === 0
  return answered
    ? [question, { id: base - 1, threadId: base, type: '답변', title: `[RE] 문의 사항 ${i + 1}`, author: '총관리자', date: '2025-08-03', views: 0 }]
    : [question]
})

const ALL_ITEMS: InquiryItem[] = [...RAW_INQUIRIES, ...MORE_THREADS]

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

          {/* 검색 + 글등록 */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative flex items-center gap-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                placeholder="문의사항 검색..."
                className="w-full rounded-full border border-gray-200 bg-white px-10 py-3 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
              <Link href="/support/inquiry/new" className="whitespace-nowrap rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">글등록</Link>
            </div>
          </div>

          {/* currentUserId는 로그인 연동 시 실제 사용자 ID로 교체 */}
          <InquiryListClient items={ALL_ITEMS} currentUserId="user-normal" />
        </div>
      </div>
    </div>
  )
}


