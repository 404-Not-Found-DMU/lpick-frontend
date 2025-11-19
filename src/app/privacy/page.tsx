import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'LPick 개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-[60vh] bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">개인정보처리방침</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">시행일자: 2025-11-19</p>

        <section className="mt-8 space-y-8">
          <article className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">1. 수집하는 개인정보의 항목</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              서비스 제공을 위해 회원가입 시 이메일, 닉네임 등 기본 정보가 수집될 수 있으며, 서비스 이용 과정에서 로그 기록,
              접속 IP, 쿠키 등이 생성·수집될 수 있습니다.
            </p>
          </article>

          <article className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">2. 개인정보의 이용 목적</h2>
            <ul className="mt-2 list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>회원 식별 및 서비스 제공</li>
              <li>고객 문의 대응 및 공지사항 전달</li>
              <li>서비스 품질 향상을 위한 통계 분석</li>
            </ul>
          </article>

          <article className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">3. 보유 및 이용기간</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              수집된 개인정보는 이용 목적 달성 시까지 보관되며, 관련 법령에 따라 일정 기간 보관이 필요할 경우 해당 기간 동안
              안전하게 보관 후 파기합니다.
            </p>
          </article>

          <article className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">4. 개인정보의 제3자 제공</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              원칙적으로 사전 동의 없이 제3자에게 제공하지 않으며, 법령에 따른 예외 사유가 있는 경우에 한하여 제공될 수
              있습니다.
            </p>
          </article>

          <article className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">5. 이용자의 권리</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제를 요청할 수 있으며, 처리 정지를 요구할 권리가 있습니다.
            </p>
          </article>
        </section>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          개인정보 보호 관련 문의는 고객센터를 통해 접수해 주세요.
        </p>
      </div>
    </div>
  );
}


