export default function AdminBrandingSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">설정 · 브랜딩</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">로고, 브랜드 컬러 등 기본 브랜딩 요소를 관리합니다.</p>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">로고 이미지</label>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded bg-gray-100 dark:bg-gray-700" />
              <button className="rounded-md border px-3 py-2 text-sm">업로드</button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">브랜드 메인 컬러</label>
            <input type="color" defaultValue="#7C3AED" className="h-10 w-20 rounded-md border p-1" />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white">저장</button>
        </div>
      </div>
    </div>
  )
}
