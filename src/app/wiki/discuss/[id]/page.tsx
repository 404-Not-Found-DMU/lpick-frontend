"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from "@/components";
import { Textarea } from "@/components/textarea";
import { useDiscussions } from "../hooks/useDiscussions";
import type { DiscussionStance } from "../types";

export default function DiscussionDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { isReady, getThread, listOpinions, addOpinion, likeOpinion, closeThread } = useDiscussions();

  const thread = useMemo(() => (isReady ? getThread(id) : undefined), [isReady, getThread, id]);
  const opinions = useMemo(() => (isReady ? listOpinions(id) : []), [isReady, listOpinions, id]);

  const [stance, setStance] = useState<DiscussionStance>("neutral");
  const [content, setContent] = useState("");
  const [closing, setClosing] = useState(false);
  const [closeSummary, setCloseSummary] = useState("");

  if (!isReady) return null;
  if (!thread) return <div className="container mx-auto px-4 py-8">존재하지 않는 토론입니다.</div>;

  const canAdd = thread.status === "open" && content.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canAdd) return;
    addOpinion({ threadId: id, author: "현재사용자", stance, content });
    setContent("");
  };

  const handleClose = () => {
    if (!closeSummary.trim()) return;
    closeThread(id, closeSummary);
    setClosing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold">{thread.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <Badge>{thread.category}</Badge>
            <Badge className={thread.status === "open" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}>
              {thread.status === "open" ? "진행중" : "종료됨"}
            </Badge>
            <span>개설자 {thread.createdBy}</span>
            <span>개설 {new Date(thread.createdAt).toLocaleString()}</span>
            {thread.closedAt && <span>종료 {new Date(thread.closedAt).toLocaleString()}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push('/wiki/discuss')}>목록</Button>
          {thread.status === "open" && (
            <Button variant="danger" onClick={() => setClosing((s) => !s)}>
              {closing ? "종료 취소" : "토론 종료"}
            </Button>
          )}
        </div>
      </div>

      {closing && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>종료 사유/합의 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Textarea
                placeholder="종료 이유와 합의 내용을 요약해 주세요"
                value={closeSummary}
                onChange={(e) => setCloseSummary(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={handleClose}>종료하기</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>의견 {opinions.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opinions.map((op) => (
              <div key={op.id} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Badge className={
                      op.stance === "agree"
                        ? "bg-green-100 text-green-700"
                        : op.stance === "disagree"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }>
                      {op.stance === "agree" ? "찬성" : op.stance === "disagree" ? "반대" : "중립"}
                    </Badge>
                    <span>{op.author}</span>
                    <span>{new Date(op.createdAt).toLocaleString()}</span>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => likeOpinion(op.id)}>
                    👍 {op.likes}
                  </Button>
                </div>
                <div className="whitespace-pre-wrap text-sm leading-6">{op.content}</div>
              </div>
            ))}

            {thread.status === "open" ? (
              <form onSubmit={handleSubmit} className="rounded-lg border p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                  <select
                    className="rounded-md border px-3 py-2"
                    value={stance}
                    onChange={(e) => setStance(e.target.value as DiscussionStance)}
                  >
                    <option value="agree">찬성</option>
                    <option value="disagree">반대</option>
                    <option value="neutral">중립</option>
                  </select>
                </div>
                <div className="mt-3">
                  <Textarea
                    placeholder="의견을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="mt-3 flex justify-end">
                  <Button type="submit" disabled={!canAdd}>
                    의견 작성
                  </Button>
                </div>
              </form>
            ) : (
              thread.closedSummary && (
                <div className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-700">
                  <div className="mb-2 font-semibold">종료 요약</div>
                  <div className="whitespace-pre-wrap">{thread.closedSummary}</div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


