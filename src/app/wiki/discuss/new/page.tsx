"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components";
import { Textarea } from "@/components/textarea";
import { useDiscussions } from "../hooks/useDiscussions";
import type { DiscussionCategory, DiscussionStance } from "../types";

const categories: DiscussionCategory[] = ["내용", "표기", "분류", "문서관리", "기타"];
const stances: { label: string; value: DiscussionStance }[] = [
  { label: "찬성", value: "agree" },
  { label: "반대", value: "disagree" },
  { label: "중립", value: "neutral" },
];

export default function NewDiscussionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const docId = searchParams.get("docId") ?? undefined;
  const { createThread, isReady } = useDiscussions();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<DiscussionCategory>("내용");
  const [stance, setStance] = useState<DiscussionStance>("neutral");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("현재사용자");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = title.trim().length > 0 && content.trim().length > 0 && isReady && !submitting;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    const thread = createThread({ title, category, content, author, docId, stance });
    router.push(`/wiki/discuss/${thread.id}`);
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
              <label className="mb-1 block text-sm font-medium">제목</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="토론 제목을 입력하세요" />
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


