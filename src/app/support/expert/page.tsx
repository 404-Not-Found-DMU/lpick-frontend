'use client'

import { BadgeCheck, CheckCircle2, FileUp, Info, Mail, MapPin, Phone, Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ExpertApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8 py-10">
        <div className="max-w-3xl mx-auto">
        {/* back link */}
        <div className="mb-8">
          <Link href="/support" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">고객센터로 돌아가기</span>
          </Link>
        </div>

        {/* header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 ring-2 ring-amber-200 dark:bg-amber-900/30">
            <BadgeCheck className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">전문가 등업 신청</h1>
          <p className="mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            음향/디스크 분야 전문가 인증을 통해 LPick에서 특별한 혜택을 받아보세요.
          </p>
        </div>

        {/* highlight banner (amber card with star and benefits) */}
        <div className="mb-10 relative overflow-hidden rounded-xl border border-amber-300 bg-amber-50 p-6 md:p-7">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-50/20 via-amber-50/40 to-amber-100/70" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-amber-600" />
              <h3 className="text-lg font-bold text-amber-800">전문가 등급 혜택</h3>
            </div>
            <p className="text-sm text-amber-700 mb-4">전문가 인증을 받으시면 다음과 같은 특별한 혜택을 제공합니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-amber-900">전문가 뱃지</div>
                    <div className="text-sm text-amber-700">사용자명 옆에 전문가 뱃지 표시</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-amber-900">전문가 의견 표시</div>
                    <div className="text-sm text-amber-700">토론 시 전문가 의견으로 표시</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-amber-900">무제한 편집 권한</div>
                    <div className="text-sm text-amber-700">포인트 제한 없이 문서 편집 가능</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-amber-900">전문가 답변</div>
                    <div className="text-sm text-amber-700">커뮤니티 질문에 전문가 답변 표시</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* form card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <div className="p-7 md:p-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">신청서 작성</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">아래 정보를 정확히 입력해 주세요. 모든 항목은 필수입니다.</p>

            <div className="mt-6 text-sm font-semibold text-gray-900 dark:text-gray-100">신청자 정보</div>

            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">이름 <span className="text-violet-500">*</span></label>
                <input className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10" placeholder="실명을 입력해주세요" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">이메일 <span className="text-violet-500">*</span></label>
                <input className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10" placeholder="연락 가능한 이메일" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">연락처 <span className="text-red-500">*</span></label>
                <input className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10" placeholder="010-0000-0000" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">소속(선택)</label>
                <input className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10" placeholder="회사/단체명 또는 프리랜서" />
              </div>
            </div>

            {/* 분야 */}
            <div className="mt-8">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">전문 분야 <span className="text-violet-500">*</span></div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">해당하는 분야를 모두 선택해주세요.</p>
              <div className="mt-3 grid grid-cols-2 gap-x-12 text-sm text-gray-700 dark:text-gray-300">
                <div className="space-y-3">
                  {['턴테이블','앰프','케이블','DAC'].map((label) => (
                    <label key={label} className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 accent-violet-600" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div className="space-y-3">
                  {['스피커','카트리지','프리앰프','기타'].map((label) => (
                    <label key={label} className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 accent-violet-600" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 인증 서류 체크 */}
            <div className="mt-8 space-y-3">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">인증 서류 선택 <span className="text-violet-500">*</span></div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">아래 중 하나 이상의 서류를 제출해주세요.</p>
              <label className="flex items-start gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-4 text-sm hover:border-violet-300 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-colors peer-checked:border-violet-400 peer-checked:bg-violet-50">
                <input type="checkbox" className="mt-1 accent-violet-600 peer" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 peer-checked:text-violet-700 dark:peer-checked:text-violet-300">사업자 등록증</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">음향/오디오 관련 업종의 사업자 등록증 (업종 코드가 관련성이 명확해야 함)</p>
                </div>
              </label>
              <label className="flex items-start gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-4 text-sm hover:border-violet-300 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-colors peer-checked:border-violet-400 peer-checked:bg-violet-50">
                <input type="checkbox" className="mt-1 accent-violet-600 peer" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 peer-checked:text-violet-700 dark:peer-checked:text-violet-300">관련 자격증</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">국가공인 기술자격(전자기사, 음향기사) 또는 신뢰도 있는 민간 자격증</p>
                </div>
              </label>
              <label className="flex items-start gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-4 text-sm hover:border-violet-300 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-colors peer-checked:border-violet-400 peer-checked:bg-violet-50">
                <input type="checkbox" className="mt-1 accent-violet-600 peer" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 peer-checked:text-violet-700 dark:peer-checked:text-violet-300">재직 증명서</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">오디오 관련 회사 재직증명서 또는 명함 + 회사 웹사이트</p>
                </div>
              </label>
              <label className="flex items-start gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-4 text-sm hover:border-violet-300 hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-colors peer-checked:border-violet-400 peer-checked:bg-violet-50">
                <input type="checkbox" className="mt-1 accent-violet-600 peer" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 peer-checked:text-violet-700 dark:peer-checked:text-violet-300">경력 인증</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">포트폴리오(블로그/유튜브/강의 등) 제출 + 검토</p>
                </div>
              </label>
            </div>

            {/* 파일 업로드 가짜 영역 (퍼블리싱) */}
            <div className="mt-8">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">서류 첨부</div>
              <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 p-10 min-h-[180px] text-center text-sm text-gray-500 dark:text-gray-400">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <FileUp className="h-5 w-5 text-gray-500" />
                </div>
                파일을 드래그하거나 클릭하여 업로드
                <div className="mt-1 text-xs text-gray-400">PDF, JPG, PNG, DOCX 최대 10MB</div>
              </div>
            </div>

            {/* 상세 입력 */}
            <div className="mt-8 space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">경력 및 전문성 설명 <span className="text-violet-500">*</span></label>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">음향/오디오 분야에서의 경력, 전문성, 주요 활동 등을 상세히 작성해주세요.</p>
                <textarea
                  className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-3 text-sm placeholder:text-gray-400 placeholder:text-xs placeholder:leading-6 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10"
                  rows={8}
                  placeholder={`예시:\n- 오디오 장비 판매업 5년 경력\n- 턴테이블 수리 및 세팅 전문\n- 오디오 관련 블로그 운영 (링크 첨부)\n- 주요 취급 브랜드 및 제품군\n- 기타 관련 활동 및 경력`}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">추가 정보 (선택)</label>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">전문가 인증에 도움이 될 수 있는 추가 정보가 있다면 작성해주세요.</p>
                <textarea
                  className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-3 text-sm placeholder:text-gray-400 placeholder:text-xs placeholder:leading-6 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10"
                  rows={6}
                  placeholder={`예시:\n- 관련 커뮤니티 활동\n- 강의 또는 세미나 경험\n- 특별한 전문 분야\n- 기타 참고 사항`}
                />
              </div>
            </div>

            {/* 안내 & 동의 */}
            <div className="mt-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-5 text-sm text-blue-800 dark:text-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                  <Info className="h-3.5 w-3.5 text-blue-600" />
                </span>
                <span className="font-semibold">신청 전 확인사항</span>
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>입력 내용이 사실과 다를 경우 승인이 거절될 수 있습니다.</li>
                <li>심사 진행 상황은 이메일로 안내드립니다.</li>
                <li>제출한 자료는 내부 검토 목적으로만 활용됩니다.</li>
              </ul>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-violet-600" />
                <span>위 주의사항을 모두 확인했으며, 제출한 정보가 사실임을 확인합니다. <span className="text-violet-500">*</span></span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-violet-600" />
                <span>개인정보 수집 및 이용에 동의합니다. <span className="text-violet-500">*</span></span>
              </label>
            </div>

            <div className="mt-8 flex items-center justify-end gap-4">
              <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">취소</button>
              <button className="rounded-lg bg-violet-600 w-28 py-2 text-sm font-semibold text-white hover:bg-violet-700">신청하기</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}


