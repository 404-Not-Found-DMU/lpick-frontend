'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import DataTable from '../../components/DataTable'
import FilterBar from '../../components/FilterBar'
import Paginator from '../../components/Paginator'
import ConfirmModal from '../../components/ConfirmModal'
import { ChevronDown } from 'lucide-react'
import { fetchInquiryList, fetchInquiryDetail, deleteInquiryQuestion, deleteInquiryAnswer, type InquirySummary } from '@/app/support/inquiry/api'

type AdminStatus = '전체' | '대기' | '완료'

export default function InquiryAdminClient() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<AdminStatus>('전체')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [items, setItems] = useState<InquirySummary[]>([])
  const [total, setTotal] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<{ open: boolean; id?: string }>({ open: false })

  useEffect(() => {
    let active = true
    const load = async () => {
      setError(null)
      try {
        const res = await fetchInquiryList({ keyword: q, page, size: pageSize })
        if (!active) return
        setItems(res.content ?? [])
        setTotal(res.totalElements ?? 0)
      } catch (err) {
        if (!active) return
        let errorMessage = '문의 목록을 불러오지 못했습니다.'
        if (err instanceof Error) {
          // 데이터베이스 중복 데이터 에러인 경우
          if (err.message.includes('More than one row with the given identifier')) {
            errorMessage = '데이터베이스에 중복된 답변 데이터가 있습니다. 백엔드 관리자에게 문의해주세요.'
          } else {
            errorMessage = err.message
          }
        }
        setError(errorMessage)
        setItems([])
        setTotal(0)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [q, page, pageSize])

  const filtered = useMemo(() => {
    if (status === '전체') return items
    const answered = status === '완료'
    return items.filter((item) => item.answered === answered)
  }, [items, status])

  const current = filtered

  return (
    <div>
      <FilterBar
        right={
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                className="min-w-[120px] appearance-none rounded-full border pl-3 pr-12 py-2 text-sm bg-white dark:bg-gray-800"
                value={status}
                onChange={(e) => {
                  setPage(1)
                  setStatus(e.target.value as AdminStatus)
                }}
              >
                <option value="전체">전체</option>
                <option value="대기">대기</option>
                <option value="완료">완료</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative">
              <select
                className="min-w-[100px] appearance-none rounded-full border pl-3 pr-10 py-2 text-sm bg-white dark:bg-gray-800"
                value={pageSize}
                onChange={(e) => {
                  setPage(1)
                  setPageSize(Number(e.target.value))
                }}
              >
                <option value={10}>10개</option>
                <option value={20}>20개</option>
                <option value={50}>50개</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <input
              placeholder="검색..."
              className="w-64 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm placeholder-gray-400 shadow-sm hover:shadow focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              value={q}
              onChange={(e) => {
                setPage(1)
                setQ(e.target.value)
              }}
            />
          </div>
        }
      />
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          <p className="font-medium">오류가 발생했습니다</p>
          <p className="mt-1 text-xs opacity-90">{error}</p>
        </div>
      ) : null}
      <DataTable<InquirySummary & { rowNumber: number; statusLabel: string }>
        columns={[
          { key: 'rowNumber', header: '번호', className: 'text-center text-gray-500', headerClassName: 'text-center', span: 1, render: (_, r) => String(r.rowNumber ?? '-') },
          { key: 'statusLabel', header: '상태', className: 'text-center', headerClassName: 'text-center', span: 1, render: (_, r) => (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${(r.statusLabel as string) === '완료' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>
              {r.statusLabel as string}
            </span>
          ) },
          { key: 'title', header: '제목', headerClassName: 'text-center', span: 7, render: (_, r) => (
            <Link className="text-violet-600 hover:underline block truncate" href={`/admin/inquiry/${r.questionId}`}>
              {r.title}
            </Link>
          ) },
          { key: 'author', header: '작성자', className: 'text-center whitespace-nowrap', headerClassName: 'text-center', span: 1 },
          { key: 'createdAt', header: '작성일', className: 'text-center whitespace-nowrap', headerClassName: 'text-center', span: 1, render: (_, r) => formatDate(r.createdAt as string) },
          { key: 'questionId', header: '작업', className: 'text-right', headerClassName: 'text-center', span: 1, truncate: false, render: (_, r) => (
            <div className="flex justify-end gap-1">
              <Link href={`/admin/inquiry/${r.questionId}`} className="rounded-md border px-2 py-1 text-xs">보기</Link>
              <button onClick={() => setConfirm({ open: true, id: r.questionId })} className="rounded-md border px-2 py-1 text-xs text-red-600">삭제</button>
            </div>
          ) },
        ]}
        rows={current.map((item, idx) => ({
          ...item,
          rowNumber: total - ((page - 1) * pageSize + idx),
          statusLabel: item.answered ? '완료' : '대기',
        }))}
      />

      <Paginator page={page} total={total} pageSize={pageSize} onChange={setPage} onChangePageSize={(s) => { setPage(1); setPageSize(s) }} />

      <ConfirmModal
        open={confirm.open}
        title="문의사항 삭제"
        message="이 문의사항을 삭제하시겠습니까? 삭제 후에는 되돌릴 수 없습니다."
        onClose={() => setConfirm({ open: false })}
        onConfirm={async () => {
          if (!confirm.id) {
            setConfirm({ open: false })
            return
          }
          try {
            // 삭제 전에 상세 정보를 가져와서 답변 정보 확인 (목록의 answerInfo가 불완전할 수 있음)
            let answerId: string | undefined
            try {
              const detail = await fetchInquiryDetail(confirm.id)
              answerId = detail.answerInfo?.answerId
            } catch (detailErr) {
              // 상세 정보를 가져오지 못한 경우 목록 정보로 확인
              const targetItem = items.find(item => item.questionId === confirm.id)
              answerId = targetItem?.answerInfo?.answerId
            }
            
            // 답변이 있는 경우 먼저 답변 삭제
            if (answerId) {
              try {
                await deleteInquiryAnswer(answerId)
              } catch (answerErr) {
                const answerErrorMsg = answerErr instanceof Error ? answerErr.message : '답변 삭제 중 오류가 발생했습니다.'
                alert(`답변 삭제 실패: ${answerErrorMsg}\n문의를 삭제하려면 먼저 답변을 삭제해야 합니다.`)
                setConfirm({ open: false })
                return
              }
            }
            
            // 문의 삭제
            await deleteInquiryQuestion(confirm.id)
            setConfirm({ open: false })
            // 삭제 후 목록 새로고침
            const res = await fetchInquiryList({ keyword: q, page: page, size: pageSize })
            setItems(res.content ?? [])
            setTotal(res.totalElements ?? 0)
            // 현재 페이지에 데이터가 없으면 이전 페이지로 이동
            if (res.content.length === 0 && page > 1) {
              setPage(page - 1)
            }
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.'
            // 백엔드 에러 메시지가 있는 경우 더 명확하게 표시
            if (errorMessage.includes('TransientObjectException') || errorMessage.includes('Hibernate')) {
              alert('문의 삭제 중 백엔드 오류가 발생했습니다. 상세 페이지에서 답변을 먼저 삭제한 후 문의를 삭제해주세요.')
            } else {
              alert(`문의 삭제 실패: ${errorMessage}`)
            }
            // 에러 발생 시에도 모달은 닫기
            setConfirm({ open: false })
          }
        }}
      />
    </div>
  )
}

function formatDate(value?: string) {
  if (!value) return '-'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value.slice(0, 10)
  return d.toISOString().slice(0, 10)
}



