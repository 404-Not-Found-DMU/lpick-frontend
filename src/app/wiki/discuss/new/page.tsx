"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components";
import { Textarea } from "@/components/textarea";
import { useDiscussions } from "../hooks/useDiscussions";
import { createDebate } from "@/hooks/api/wiki.debate.api";
import type { DiscussionCategory, DiscussionStance } from "../types";

const categories: DiscussionCategory[] = ["내용", "표기", "분류", "문서관리", "기타"];
const stances: { label: string; value: DiscussionStance }[] = [
  { label: "찬성", value: "agree" },
  { label: "반대", value: "disagree" },
  { label: "중립", value: "neutral" },
];

function NewDiscussionInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const docId = searchParams.get("docId") ?? undefined;
  const { createThread, isReady } = useDiscussions();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<DiscussionCategory>("내용");
  const [stance, setStance] = useState<DiscussionStance>("neutral");
  const [content, setContent] = useState("");
  const [author] = useState("현재사용자");
  const [submitting, setSubmitting] = useState(false);
  const [docInput, setDocInput] = useState(docId ?? "");
  const [revisionId, setRevisionId] = useState("");

  const canSubmit = title.trim().length > 0 && content.trim().length > 0 && isReady && !submitting;

  const normalizeDocId = (raw: string): string | undefined => {
    const value = raw.trim();
    if (!value) return undefined;
    try {
      if (value.startsWith("http")) {
        const u = new URL(value);
        const idx = u.pathname.indexOf("/wiki/");
        if (idx >= 0) {
          const after = u.pathname.substring(idx + "/wiki/".length);
          return after.replace(/^\//, "");
        }
        return u.pathname.replace(/^\//, "");
      }
    } catch {
      // fallthrough to plain text handling
    }
    return value.replace(/\s+/g, "-");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const normalized = normalizeDocId(docInput) ?? docId;
      // docId가 있고 revisionId가 있어야 API 생성 가능
      if (normalized) {
        if (!revisionId.trim()) {
          alert("revisionId를 입력하세요.");
          setSubmitting(false);
          return;
        }
        const debateSubject = category === "표기" ? "REPRESENTATION" : "DETAIL";
        const res = (await createDebate(normalized, {
          debateName: title,
          debateSubject,
          revisionId: revisionId.trim(),
        } as any)) as any;
        const newId: string | undefined = res?.id;
        if (!newId) throw new Error("생성 결과에 id가 없습니다.");
        router.push(`/wiki/discuss/${newId}`);
        return;
      }
      // 문서와 연결하지 않는 경우: 기존 로컬 훅 fallback 유지
      const thread = createThread({ title, category, content, author, docId: normalized, stance });
      router.push(`/wiki/discuss/${thread.id}`);
    } catch (err) {
      console.error(err);
      alert("토론을 생성하지 못했습니다.");
    } finally {
      setSubmitting(false);
    }
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
            <div>
              <label className="mb-1 block text-sm font-medium">문서 링크 또는 슬러그</label>
              <Input
                value={docInput}
                onChange={(e) => setDocInput(e.target.value)}
                placeholder="예) /wiki/michael-jackson 또는 https://.../wiki/michael-jackson"
              />
              {docInput && (
                <div className="mt-1 text-xs text-gray-500">미입력 시 토론은 문서와 연결되지 않습니다.</div>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">제목</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="토론 제목을 입력하세요" />
            </div>

            {/** API 생성에 필요한 revisionId 입력 */}
            <div>
              <label className="mb-1 block text-sm font-medium">revisionId</label>
              <Input
                value={revisionId}
                onChange={(e) => setRevisionId(e.target.value)}
                placeholder="예) 최근 문서 리비전 ID"
              />
              {docInput && (
                <div className="mt-1 text-xs text-gray-500">문서와 연결하여 생성 시 필수입니다.</div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">분류</label>
                <select
                  className="w-full rounded-md border px-3 py-2"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as DiscussionCategory)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">입장</label>
                <select
                  className="w-full rounded-md border px-3 py-2"
                  value={stance}
                  onChange={(e) => setStance(e.target.value as DiscussionStance)}
                >
                  {stances.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
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
                개설하기
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function NewDiscussionPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">로딩 중...</div>}>
      <NewDiscussionInner />
    </Suspense>
  );
}

