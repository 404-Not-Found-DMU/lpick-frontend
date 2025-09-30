'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import TextEditor from '@/components/TextEditor/TextEditor'

export default function InquiryNewClient() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSecret, setIsSecret] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('제목을 입력해 주세요.')
      return
    }
    if (!content || content === '<p>내용을 작성해주세요...</p>') {
      alert('내용을 입력해 주세요.')
      return
    }

    // TODO: API 연동
    console.log('문의 등록', { title, content, isSecret })
    alert('임시 저장: 콘솔을 확인해 주세요.')
    window.location.href = '/support/inquiry'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8 py-10">
        <div className="max-w-[1440px] mx-auto">
          {/* 돌아가기 */}
          <div className="mb-6">
            <Link href="/support/inquiry" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">목록으로</span>
            </Link>
          </div>

          {/* 작성 카드 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">문의사항 작성</h1>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">제목</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">내용</label>
                <TextEditor
                  initialContent="<p>내용을 작성해주세요...</p>"
                  height="420px"
                  imageDomainType="QUESTION"
                  imageServerType="user"
                  onChange={setContent}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={isSecret}
                    onChange={(e) => setIsSecret(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                  />
                  비밀글로 등록
                </label>

                <div className="flex items-center gap-2">
                  <Link href="/support/inquiry" className="rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">취소</Link>
                  <button onClick={handleSubmit} className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">등록</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


