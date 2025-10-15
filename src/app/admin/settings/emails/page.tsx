export default function AdminEmailsSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">설정 · 이메일 템플릿</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">알림/승인/답변 등 발송 템플릿을 관리합니다.</p>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <label className="mb-1 block text-sm font-medium">문의 답변 안내 메일</label>
        <textarea className="h-40 w-full rounded-md border px-3 py-2 text-sm" defaultValue={"안녕하세요, LPick입니다.\n문의에 대한 답변을 등록했습니다. 마이페이지에서 확인해주세요."} />
        <div className="mt-4 flex justify-end">
          <button className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white">저장</button>
        </div>
      </div>
    </div>
  )
}
