export default function AdminEmailsSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">설정 · 이메일 템플릿</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">알림/승인/답변 등 발송 템플릿을 관리합니다. 미리보기와 변수 치환을 확인할 수 있어요.</p>
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            <label className="mb-2 block text-sm font-medium">템플릿 선택</label>
            <select className="w-full rounded-md border px-3 py-2 text-sm">
              <option>문의 답변 안내</option>
              <option>전문가 승인 안내</option>
              <option>비밀번호 재설정</option>
            </select>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">사용 변수: {`{userName}, {link}, {date}`}</div>
          </div>
          <div className="md:col-span-2 grid gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">본문</label>
              <textarea className="h-48 w-full rounded-md border px-3 py-2 text-sm" defaultValue={"안녕하세요, {userName}님.\n요청하신 사항의 진행 링크: {link}\n{date} 기준 내용입니다."} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">미리보기</label>
              <div className="rounded-md border bg-gray-50 p-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
                안녕하세요, 홍길동님.
                <br />요청하신 사항의 진행 링크: https://lpick.example.com/link
                <br />2025-10-15 기준 내용입니다.
              </div>
            </div>
            <div className="flex justify-end">
              <button className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white">저장</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
