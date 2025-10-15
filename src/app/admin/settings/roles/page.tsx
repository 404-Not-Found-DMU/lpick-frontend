export default function AdminRolesSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">설정 · 권한</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">관리 역할과 접근 범위를 안내합니다.</p>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <li>admin: 모든 관리자 페이지 접근 가능</li>
          <li>user: 읽기 전용 접근(예: 목록 확인)</li>
        </ul>
      </div>
    </div>
  )
}
