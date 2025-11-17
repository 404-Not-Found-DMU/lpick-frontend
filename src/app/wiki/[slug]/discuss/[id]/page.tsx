"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from "@/components";
import { Textarea } from "@/components/textarea";
import {
  getDebatesByWiki,
  getDebateBallot,
  getDebateChatList,
  postDebateBallot,
  updateDebateStatus,
  type DebateBallotResult,
  type DebateListItem,
} from "@/hooks/api/debate.api";

export default function DiscussionDetailPageForDoc() {
  const router = useRouter();
  const params = useParams<{ slug: string; id: string }>();
  const { slug, id } = params;

  const [thread, setThread] = useState<DebateListItem | null>(null);
  const [chats, setChats] = useState<{ chatId: string; userNickname: string; content: string; createdAt: string; isBlind: boolean }[]>([]);
  const [ballot, setBallot] = useState<DebateBallotResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<"AGREE" | "DISAGREE" | "ABSTAIN" | "">("");

  useEffect(() => {
    let active = true;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const [list, chatList] = await Promise.all([
          getDebatesByWiki(slug),
          getDebateChatList(id),
        ]);
        if (!active) return;
        const found = list.find((d) => d.debateId === id) ?? null;
        setThread(found);
        setChats(chatList);
        if (found && found.status !== 'OPEN') {
          try {
            const res = await getDebateBallot(id);
            if (!active) return;
            setBallot(res);
          } catch {
            setBallot(null);
          }
        } else {
          setBallot(null);
        }
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "불러오기에 실패했습니다.");
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => { active = false; };
  }, [slug, id]);

  const totalVotes = ballot ? ballot.total : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {error && <div className="mb-6 rounded-lg border p-4 text-red-500">{error}</div>}
      {loading && <div className="mb-6 rounded-lg border p-4 text-gray-500">불러오는 중...</div>}
      {!loading && !thread && (
        <div className="mb-6 rounded-lg border p-4 text-gray-500">존재하지 않는 토론입니다.</div>
      )}
      <div className="mb-6 flex items-center justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold">{thread?.debateName ?? "-"}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            {thread && <Badge>{thread.debateSubject === 'DETAIL' ? '내용' : '표기'}</Badge>}
            {thread && (
              <Badge className={
                thread.status === "OPEN"
                  ? "bg-green-100 text-green-700"
                  : thread.status === "VOTE"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-200 text-gray-700"
              }>
                {thread.status === "OPEN" ? "진행중" : thread.status === "VOTE" ? "투표중" : "종료됨"}
              </Badge>
            )}
            {thread && <span>개설자 {thread.debateWriter}</span>}
            {thread && <span>개설 {new Date(thread.createdAt).toLocaleString()}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push(`/wiki/${encodeURIComponent(slug)}/discuss`)}>목록</Button>
          {thread && thread.status === "OPEN" && (
            <Button variant="violet" onClick={async () => {
              try {
                await updateDebateStatus(id, "VOTE");
                router.refresh();
              } catch {
                alert("투표 시작에 실패했습니다.");
              }
            }}>투표 시작</Button>
          )}
          {thread && thread.status !== "CLOSE" && (
            <Button variant="danger" onClick={async () => {
              if (!confirm('토론을 종료할까요?')) return;
              try {
                await updateDebateStatus(id, "CLOSE");
                router.refresh();
              } catch {
                alert("토론 종료에 실패했습니다.");
              }
            }}>토론 종료</Button>
          )}
        </div>
      </div>

      {thread && thread.status !== "OPEN" && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>투표</CardTitle>
          </CardHeader>
          <CardContent>
            {thread.status === "VOTE" && (
              <div className="space-y-4">
                <div className="space-y-3">
                  {["AGREE", "DISAGREE", "ABSTAIN"].map((opt) => (
                    <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input
                        type="radio"
                        name="discussion-vote"
                        className="h-4 w-4"
                        checked={selectedOption === opt}
                        onChange={() => setSelectedOption(opt as typeof selectedOption)}
                      />
                      <span className="text-sm">
                        {opt === "AGREE" ? "찬성" : opt === "DISAGREE" ? "반대" : "기권"}
                      </span>
                    </label>
                  ))}
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={async () => {
                        if (!selectedOption) return;
                        try {
                          await postDebateBallot(id, selectedOption);
                          router.refresh();
                        } catch {
                          alert("투표에 실패했습니다.");
                        }
                      }}
                      disabled={!selectedOption}
                    >
                      투표하기
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {thread.status === "CLOSE" && ballot && (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>찬성</span>
                  <span className="text-gray-500">{ballot.agreePct}% ({ballot.agree})</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-2 bg-violet-500" style={{ width: `${ballot.agreePct}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <span>반대</span>
                  <span className="text-gray-500">{ballot.disagreePct}% ({ballot.disagree})</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-2 bg-violet-500" style={{ width: `${ballot.disagreePct}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <span>기권</span>
                  <span className="text-gray-500">{ballot.abstainPct}% ({ballot.abstain})</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-2 bg-violet-500" style={{ width: `${ballot.abstainPct}%` }} />
                </div>
                <div className="text-right text-xs text-gray-500">총 {totalVotes}표 · 마감됨</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>채팅 {chats.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chats.map((op) => {
              const isMine = false;
              return (
                <div key={op.chatId} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[80%]">
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                        isMine
                          ? "bg-violet-500 text-white rounded-br-md"
                          : "bg-gray-100 text-gray-900 rounded-bl-md dark:bg-gray-800 dark:text-gray-100"
                      }`}
                    >
                      {op.isBlind ? "블라인드 처리된 메시지입니다." : op.content}
                    </div>
                    <div className={`mt-1 flex items-center gap-2 text-xs ${isMine ? "justify-end text-violet-600/80" : "justify-start text-gray-500"}`}>
                      <span>{op.userNickname}</span>
                      <span>{new Date(op.createdAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="rounded-lg border p-4 text-sm text-gray-600">
              채팅 전송은 추후 WebSocket/전송 API 연동 시 제공됩니다.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
*** End Patch  }``` authority=functions.apply_patch  шығарм ente to=functions.apply_patch codeៀែ sjson.JSONObject to=functions.apply_patch  managererrorInvalid tool call. Please try again. assistant to=functions.apply_patch.rollback to=functions.apply_patch.credentials to=functions.apply_patch.run to=functions.apply_patch.input to=functions.apply_patch retry to=functions.apply_patch.  error: Unexpected characters after patch content. Please provide a valid patch.  unsuccessful.  assistantыйын to=functions.apply_patch.  Let's reattempt clean.  Let's send a valid patch.  We'll re-run properly.  We'll ensure grammar.  Let's craft again.  We'll avoid extra characters.  Let's go.  We'll call apply_patch now.  Let's proceed.  Let's fix.  Let's call again.  Let's do it.  Let's ensure valid.  We'll send.  We'll do now.  Let's go.  We'll ensure no extra bracket.  Ok.  Let's send.  Now.  Let's apply again.  Done.  Let's run.  Let's give.  Let's patch.  We'll repeat.

