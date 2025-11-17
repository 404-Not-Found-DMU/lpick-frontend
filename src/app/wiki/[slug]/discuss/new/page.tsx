"use client";

import { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components";
import { Textarea } from "@/components/textarea";
import { createDebate, type DebateSubject } from "@/hooks/api/debate.api";

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
  const [content, setContent] = useState(""); // 서버 스펙 상 본문은 요구하지 않지만, 기획에 따라 메모용 보관 가능. 현재 전송 안 함.
  const [submitting, setSubmitting] = useState(false);

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
      <h1 className="mb-6 text-2xl font-bold">새 토론 개설</h1>

      <Card>
        <CardHeader>
          <CardTitle>토론 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="text-sm text-gray-600">
              문서: <span className="font-medium break-all">{decodeURIComponent(slug)}</span>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">제목</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="토론 제목을 입력하세요" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">주제</label>
                <select
                  className="w-full rounded-md border px-3 py-2"
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
                <label className="mb-1 block text-sm font-medium">리비전 ID</label>
                <Input value={revisionId} onChange={(e) => setRevisionId(e.target.value)} placeholder="리비전 ID를 입력하세요" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">개설 글</label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="의견을 입력하세요" />
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                취소
              </Button>
              <Button type="submit" disabled={!canSubmit}>
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

