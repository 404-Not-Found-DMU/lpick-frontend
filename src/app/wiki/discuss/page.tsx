"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Badge, Card, CardHeader, CardTitle, CardContent } from "@/components";
import { useDiscussions } from "./hooks/useDiscussions";
import type { DiscussionCategory, DiscussionStatus } from "./types";

const categoryOptions: { label: string; value: DiscussionCategory | "all" }[] = [
  { label: "전체", value: "all" },
  { label: "내용", value: "내용" },
  { label: "표기", value: "표기" },
  { label: "분류", value: "분류" },
  { label: "문서관리", value: "문서관리" },
  { label: "기타", value: "기타" },
];

const statusOptions: { label: string; value: DiscussionStatus | "all" }[] = [
  { label: "전체", value: "all" },
  { label: "진행중", value: "open" },
  { label: "종료됨", value: "closed" },
];

function WikiDiscussListInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const docIdFromQuery = searchParams.get("docId") ?? undefined;

  const { isReady, listThreads } = useDiscussions();

  const [q, setQ] = useState("");
  const [category, setCategory] = useState<DiscussionCategory | "all">("all");
  const [status, setStatus] = useState<DiscussionStatus | "all">("all");

  const threads = useMemo(
    () => (isReady ? listThreads({ q, category, status, docId: docIdFromQuery }) : []),
    [isReady, listThreads, q, category, status, docIdFromQuery],
  );

  const docTitle = useMemo(() => {
    if (!docIdFromQuery) return null;
    try {
      const decoded = decodeURIComponent(docIdFromQuery);
      return decoded.replace(/-/g, ' ');
    } catch {
      return docIdFromQuery;
    }
  }, [docIdFromQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">위키 토론</h1>
          {docIdFromQuery && docTitle && (
            <div className="text-base font-medium">
              문서: <Link href={`/wiki/${docIdFromQuery}`} className="text-violet-600 hover:underline">{docTitle}</Link>
            </div>
          )}
        </div>
        <Button onClick={() => router.push(docIdFromQuery ? `/wiki/discuss/new?docId=${docIdFromQuery}` : "/wiki/discuss/new")}>새 토론 개설</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>필터</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <Input placeholder="제목 검색" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <select
              className="rounded-md border px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value as DiscussionCategory | "all")}
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <select
              className="rounded-md border px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value as DiscussionStatus | "all")}
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-3">
        {threads.map((t) => (
          <div key={t.id} className="block rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 cursor-pointer" onClick={() => router.push(`/wiki/discuss/${t.id}`)}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-lg font-semibold">{t.title}</span>
                  <Badge>{t.category}</Badge>
                  <Badge className={t.status === "open" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}>
                    {t.status === "open" ? "진행중" : "종료됨"}
                  </Badge>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  개설자 {t.createdBy} · 의견 {t.opinionsCount} · 최근 업데이트 {new Date(t.lastUpdatedAt).toLocaleString()}
                </div>
              </div>
              {t.docId && (
                <Link
                  href={`/wiki/${t.docId}`}
                  className="shrink-0 rounded-full p-2 text-violet-600 hover:bg-violet-50"
                  aria-label="문서로 이동"
                  onClick={(e) => e.stopPropagation()}
                >
                  ↗
                </Link>
              )}
            </div>
          </div>
        ))}

        {isReady && threads.length === 0 && (
          <div className="rounded-lg border p-8 text-center text-gray-500">조건에 맞는 토론이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default function WikiDiscussListPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">로딩 중...</div>}>
      <WikiDiscussListInner />
    </Suspense>
  );
}


