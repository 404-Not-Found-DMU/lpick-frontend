export default function AdminRolesSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">설정 · 권한</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">역할별 기능 접근 권한을 매트릭스로 설정합니다.</p>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">역할-권한 매트릭스</h3>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400">
                <th className="px-3 py-2">기능</th>
                <th className="px-3 py-2">일반 사용자</th>
                <th className="px-3 py-2">전문가</th>
                <th className="px-3 py-2">관리자</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {[ 
                { k: 'wikiPropose', label: '위키 문서 제안' },
                { k: 'wikiReview', label: '위키 검수' },
                { k: 'noticeManage', label: '공지 관리' },
                { k: 'faqManage', label: 'FAQ 관리' },
                { k: 'inquiryManage', label: '문의 관리' },
                { k: 'userManage', label: '사용자 관리' },
                { k: 'lplayerManage', label: 'LPlayer 관리' },
              ].map((row) => (
                <tr key={row.k}>
                  <td className="px-3 py-2 text-gray-800 dark:text-gray-200 whitespace-nowrap">{row.label}</td>
                  <td className="px-3 py-2"><input type="checkbox" defaultChecked={row.k === 'wikiPropose'} disabled={row.k !== 'wikiPropose'} /></td>
                  <td className="px-3 py-2"><input type="checkbox" defaultChecked={['wikiPropose'].includes(row.k)} disabled={row.k !== 'wikiPropose'} /></td>
                  <td className="px-3 py-2"><input type="checkbox" defaultChecked /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white">저장</button>
        </div>
      </div>
    </div>
  )
}
