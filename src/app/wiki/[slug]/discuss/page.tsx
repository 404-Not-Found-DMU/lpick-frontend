"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Input, Badge } from "@/components";
import { getDebatesByWiki, type DebateListItem, type DebateStatus, type DebateSubject } from "@/hooks/api/debate.api";

const categoryOptions: { label: string; value: DebateSubject | "all" }[] = [
  { label: "전체", value: "all" },
  { label: "내용", value: "DETAIL" },
  { label: "표기", value: "REPRESENTATION" },
];

const statusOptions: { label: string; value: DebateStatus | "all" }[] = [
  { label: "전체", value: "all" },
  { label: "진행중", value: "OPEN" },
  { label: "투표중", value: "VOTE" },
  { label: "종료됨", value: "CLOSE" },
];

function WikiDiscussListForDoc({ slug }: { slug: string }) {
  const router = useRouter();

  const [q, setQ] = useState("");
  const [category, setCategory] = useState<DebateSubject | "all">("all");
  const [status, setStatus] = useState<DebateStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"updated" | "opinions">("updated"); // opinions = chatCount
  const [items, setItems] = useState<DebateListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    getDebatesByWiki(slug)
      .then((list) => {
        if (!active) return;
        // 서버가 이미 정렬해 주더라도, 안전하게 OPEN -> VOTE -> CLOSE, updateAt 내림차순으로 보정
        const order: DebateStatus[] = ["OPEN", "VOTE", "CLOSE"];
        const sorted = [...list].sort((a, b) => {
          const sdiff = order.indexOf(a.status) - order.indexOf(b.status);
          if (sdiff !== 0) return sdiff;
          const at = new Date(a.updateAt).getTime();
          const bt = new Date(b.updateAt).getTime();
          return bt - at;
        });
        setItems(sorted);
      })
      .catch((e) => {
        if (active) setError(e instanceof Error ? e.message : "목록을 불러오지 못했습니다.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [slug]);

  const filtered = useMemo(() => {
    let data = items;
    if (q.trim()) {
      const qq = q.trim().toLowerCase();
      data = data.filter((it) => it.debateName.toLowerCase().includes(qq));
    }
    if (category !== "all") {
      data = data.filter((it) => it.debateSubject === category);
    }
    if (status !== "all") {
      data = data.filter((it) => it.status === status);
    }
    if (sortBy === "opinions") {
      data = [...data].sort((a, b) => b.chatCount - a.chatCount);
    } else {
      data = [...data].sort((a, b) => new Date(b.updateAt).getTime() - new Date(a.updateAt).getTime());
    }
    return data;
  }, [items, q, category, status, sortBy]);

  const docTitle = useMemo(() => {
    try {
      const decoded = decodeURIComponent(slug);
      return decoded.replace(/-/g, ' ');
    } catch {
      return slug;
    }
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">위키 토론</h1>
          <div className="text-base font-medium">
            문서: <Link href={`/wiki/${slug}`} className="text-violet-600 hover:underline">{docTitle}</Link>
          </div>
        </div>
        <Button onClick={() => router.push(`/wiki/${encodeURIComponent(slug)}/discuss/new`)}>새 토론 개설</Button>
      </div>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="md:w-1/2">
          <Input placeholder="제목 검색" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1">
            <button
              className={`rounded-full px-3 py-1 text-sm ${sortBy === 'updated' ? 'bg-white shadow' : 'text-gray-600'}`}
              onClick={() => setSortBy('updated')}
              type="button"
            >
              최신순
            </button>
            <button
              className={`rounded-full px-3 py-1 text-sm ${sortBy === 'opinions' ? 'bg-white shadow' : 'text-gray-600'}`}
              onClick={() => setSortBy('opinions')}
              type="button"
            >
              의견 많은 순
            </button>
          </div>
          <select
            className="rounded-md border px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value as DebateSubject | 'all')}
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            className="rounded-md border px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as DebateStatus | 'all')}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <Button
            variant="outline"
            onClick={() => { setQ(''); setCategory('all'); setStatus('all'); setSortBy('updated'); }}
          >
            초기화
          </Button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {error && <div className="rounded-lg border p-8 text-center text-red-500">{error}</div>}
        {loading && <div className="rounded-lg border p-8 text-center text-gray-500">불러오는 중...</div>}
        {!loading && filtered.map((t) => (
          <div key={t.debateId} className="block rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 cursor-pointer" onClick={() => router.push(`/wiki/${encodeURIComponent(slug)}/discuss/${t.debateId}`)}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-lg font-semibold">{t.debateName}</span>
                  <Badge>{t.debateSubject === 'DETAIL' ? '내용' : '표기'}</Badge>
                  <Badge className={
                    t.status === "OPEN"
                      ? "bg-green-100 text-green-700"
                      : t.status === "VOTE"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-200 text-gray-700"
                  }>
                    {t.status === "OPEN" ? "진행중" : t.status === "VOTE" ? "투표중" : "종료됨"}
                  </Badge>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  개설자 {t.debateWriter} · 의견 {t.chatCount} · 최근 업데이트 {new Date(t.updateAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        {!loading && filtered.length === 0 && !error && (
          <div className="rounded-lg border p-8 text-center text-gray-500">조건에 맞는 토론이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default function WikiDiscussListPage() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">로딩 중...</div>}>
      <WikiDiscussListForDoc slug={slug} />
    </Suspense>
  );
}


