import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관',
  description: 'LPick 이용약관',
};

export default function TermsPage() {
  return (
    <div className="min-h-[60vh] bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">이용약관</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">시행일자: 2025-11-19</p>

        <section className="mt-8 space-y-8">
          <article className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">제1조 목적</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              본 약관은 LPick(이하 “서비스”)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을
              규정함을 목적으로 합니다.
            </p>
          </article>

          <article className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">제2조 정의</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              “이용자”란 본 약관에 동의하고 서비스를 이용하는 회원 및 비회원을 말합니다. “콘텐츠”란 이용자가 서비스 내에
              게시하거나 업로드한 글, 이미지, 댓글 등 일체의 자료를 의미합니다.
            </p>
          </article>

          <article className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">제3조 약관의 게시와 개정</h2>
            <ul className="mt-2 list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기화면 또는 연결화면에 게시합니다.</li>
              <li>회사는 관련 법령을 위배하지 않는 범위에서 약관을 개정할 수 있습니다.</li>
              <li>약관 변경 시 시행일자 및 개정사유를 명시하여 공지합니다.</li>
            </ul>
          </article>

          <article className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">제4조 이용자의 의무</h2>
            <ul className="mt-2 list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
              <li>법령 및 약관, 서비스 안내에 따라 서비스를 이용해야 합니다.</li>
              <li>타인의 권리를 침해하거나 명예를 훼손하는 게시물을 등록해서는 안 됩니다.</li>
              <li>서비스의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.</li>
            </ul>
          </article>

          <article className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">제5조 게시물의 관리</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              이용자가 등록한 게시물로 인해 발생하는 법적 분쟁에 대한 책임은 게시자 본인에게 있으며, 회사는 관련 법령 및 본
              약관에 따라 필요한 경우 게시물을 사전 통지 없이 수정, 제한, 삭제할 수 있습니다.
            </p>
          </article>

          <article className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">제6조 서비스의 변경 및 중단</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              회사는 서비스 개선을 위해 서비스 내용을 변경할 수 있으며, 불가피한 경우 서비스의 전부 또는 일부를 중단할 수
              있습니다. 이 경우 사전에 공지합니다.
            </p>
          </article>
        </section>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          본 약관에 대한 문의는 고객센터를 통해 접수해 주세요.
        </p>
      </div>
    </div>
  );
}


