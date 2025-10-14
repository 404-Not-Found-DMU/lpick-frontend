export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">대시보드</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">운영 현황을 한눈에 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '신규 가입', value: '124' },
          { label: '미답변 문의', value: '8' },
          { label: '위키 검수 대기', value: '5' },
          { label: '공지 노출수', value: '12.4k' },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-5 shadow-sm">
            <div className="text-xs text-gray-500 dark:text-gray-400">{c.label}</div>
            <div className="mt-2 text-2xl font-extrabold text-gray-900 dark:text-gray-100">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">최근 활동</h3>
        <ul className="mt-3 text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <li>공지사항 1건이 공개되었습니다.</li>
          <li>전문가 등업 신청 2건이 접수되었습니다.</li>
          <li>1:1 문의 3건에 답변이 등록되었습니다.</li>
        </ul>
      </div>
    </div>
  )
}


