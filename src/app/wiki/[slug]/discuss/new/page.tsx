"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components";
import { createDebate, type DebateSubject } from "@/hooks/api/debate.api";
import { getWikiRevisions, type RevisionItem, getPublicWiki, type PublicWikiResponse } from "@/hooks/api/wiki.api";

const subjects: { label: string; value: DebateSubject }[] = [
  { label: "내용", value: "DETAIL" },
  { label: "표기", value: "REPRESENTATION" },
];

function NewDiscussionInnerForDoc() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<DebateSubject>("DETAIL");
  const [revisionId, setRevisionId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [revisions, setRevisions] = useState<RevisionItem[]>([]);
  const [wikiInfo, setWikiInfo] = useState<PublicWikiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const [revPage, wiki] = await Promise.all([
          // 서버 정렬 파라미터는 환경에 따라 500이 발생할 수 있어 클라이언트 정렬로 보정
          getWikiRevisions(slug, { size: 100 }),
          getPublicWiki(slug),
        ]);
        if (!active) return;
        const list = [...(revPage.content ?? [])];
        // createdAt 기준 오름차순 정렬(없으면 revisionNumber 숫자 정렬, 둘다 없으면 원본 유지)
        list.sort((a, b) => {
          const at = a.createdAt ? new Date(a.createdAt).getTime() : NaN;
          const bt = b.createdAt ? new Date(b.createdAt).getTime() : NaN;
          if (!Number.isNaN(at) && !Number.isNaN(bt)) return at - bt;
          const an = Number((a as unknown as { revisionNumber?: string }).revisionNumber ?? NaN);
          const bn = Number((b as unknown as { revisionNumber?: string }).revisionNumber ?? NaN);
          if (!Number.isNaN(an) && !Number.isNaN(bn)) return an - bn;
          return 0;
        });
        setRevisions(list);
        if (list.length > 0) setRevisionId(list[list.length - 1].revisionId);
        setWikiInfo(wiki);
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "문서 정보를 불러오지 못했습니다.");
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => { active = false; };
  }, [slug]);

  const revisionOptions = useMemo(() => {
    const len = revisions.length;
    return revisions.map((r, idx) => ({
      value: r.revisionId,
      label: `v${idx + 1}${idx === len - 1 ? "(최신 버전)" : ""}`,
    }));
  }, [revisions]);

  const canSubmit = title.trim().length > 0 && revisionId.trim().length > 0 && !submitting;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    createDebate(slug, { debateName: title, debateSubject: subject, revisionId })
      .then((res) => {
        router.push(`/wiki/${encodeURIComponent(slug)}/discuss/${res.id}`);
      })
      .catch(() => {
        alert("토론 생성에 실패했습니다.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold">새 토론 개설</h1>
        <Button
          variant="outline"
          onClick={() => {
            // 토론 목록으로 이동
            router.push(`/wiki/${encodeURIComponent(slug)}/discuss`);
          }}
        >
          목록으로
        </Button>
      </div>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">문서의 특정 버전을 기준으로 토론을 시작합니다.</p>

      <Card>
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-lg">토론 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={onSubmit}>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">문서</span>
              <span className="font-medium break-all">
                {wikiInfo ? wikiInfo.title : decodeURIComponent(slug)}
              </span>
              {wikiInfo && (
                <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {wikiInfo.wikiPageClass}
                </span>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">제목</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="토론 제목을 입력하세요" className="h-11" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">주제</label>
                <select
                  className="w-full rounded-md border px-3 h-11 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as DebateSubject)}
                >
                  {subjects.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">리비전</label>
                <select
                  className="w-full rounded-md border px-3 h-11 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  value={revisionId}
                  onChange={(e) => setRevisionId(e.target.value)}
                  disabled={loading || revisionOptions.length === 0}
                >
                  {revisionOptions.length === 0 ? (
                    <option value="" disabled>리비전이 없습니다</option>
                  ) : (
                    revisionOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))
                  )}
                </select>
                {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
              </div>
            </div>

            

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => router.back()} className="h-10">
                취소
              </Button>
              <Button type="submit" disabled={!canSubmit} className="h-10">
                {submitting ? '처리 중...' : '개설하기'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function NewDiscussionPageForDoc() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">로딩 중...</div>}>
      <NewDiscussionInnerForDoc />
    </Suspense>
  );
}

