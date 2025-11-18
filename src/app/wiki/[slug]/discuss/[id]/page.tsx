"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  type DebateChatItem,
} from "@/hooks/api/debate.api";
import { useDebateSocket } from "@/hooks/ws/useDebateSocket";
import { useUserStore } from "@/store/userStore";
import { User } from "lucide-react";
import Image from "next/image";

export default function DiscussionDetailPageForDoc() {
  const router = useRouter();
  const params = useParams<{ slug: string; id: string }>();
  const { slug, id } = params;

  const [thread, setThread] = useState<DebateListItem | null>(null);
  const [chats, setChats] = useState<DebateChatItem[]>([]);
  const [ballot, setBallot] = useState<DebateBallotResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<"AGREE" | "DISAGREE" | "ABSTAIN" | "">("");
  // 답변 대상
  const [replyTo, setReplyTo] = useState<DebateChatItem | null>(null);

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

  // 현재 사용자 정보 (좌/우 정렬 판별용)
  const currentUserId = useUserStore((s) => s.userInfo?.oauthId ?? null);
  const currentUserNickname = useUserStore((s) => s.userInfo?.nickname ?? "나");
  const currentUserProfile = useUserStore((s) => s.userInfo?.profile ?? null);
  const isLoggedIn = useUserStore((s) => !!s.userInfo);

  // 웹소켓 연결 (OPEN 상태에서만)
  const { connected, sendChat } = useDebateSocket({
    debateId: id,
    enabled: !!thread && thread.status === "OPEN",
    onMessage: async () => {
      // 서버에서 닉네임/시각이 포함된 전체 스냅샷을 재조회
      try {
        const list = await getDebateChatList(id);
        setChats(list);
      } catch {
        // ignore
      }
    },
    onErrorMessage: (message) => {
      // 간단히 경고로 표기
      alert(message);
    },
  });

  const [input, setInput] = useState<string>("");

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
              if (!isLoggedIn) {
                alert("로그인 후 이용할 수 있습니다.");
                return;
              }
              try {
                await updateDebateStatus(id, "VOTE");
                router.refresh();
              } catch {
                alert("투표 시작에 실패했습니다.");
              }
            }} disabled={!isLoggedIn}>투표 시작</Button>
          )}
          {thread && thread.status !== "CLOSE" && (
            <Button variant="danger" onClick={async () => {
              if (!confirm('토론을 종료할까요?')) return;
              if (!isLoggedIn) {
                alert("로그인 후 이용할 수 있습니다.");
                return;
              }
              try {
                await updateDebateStatus(id, "CLOSE");
                router.refresh();
              } catch {
                alert("토론 종료에 실패했습니다.");
              }
            }} disabled={!isLoggedIn}>토론 종료</Button>
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
              const isMine = currentUserId ? op.userId === currentUserId : false;
              const parent = op.isAnswerTo ? chats.find((c) => c.chatId === op.isAnswerTo) ?? null : null;
              return (
                <div key={op.chatId} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] flex items-end ${isMine ? "flex-row-reverse" : "flex-row"} gap-2`}>
                    <div className="shrink-0">
                      {op.profile ? (
                        <Image
                          src={op.profile}
                          alt={`${op.userNickname} 프로필`}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full border-2 border-violet-300 bg-gray-100 dark:border-violet-700 dark:bg-gray-800 grid place-items-center">
                          <User className={`${isMine ? "text-violet-400" : "text-violet-500"} h-4 w-4`} />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                        isMine
                          ? "bg-violet-500 text-white rounded-br-md"
                          : "bg-gray-100 text-gray-900 rounded-bl-md dark:bg-gray-800 dark:text-gray-100"
                      }`}
                    >
                      {op.isBlind
                        ? "블라인드 처리된 메시지입니다."
                        : (
                          <>
                            {parent && (
                              <div className="mb-2">
                                <div className={`text-xs font-medium ${isMine ? "text-violet-100/90" : "text-gray-600"}`}>
                                  {parent.userNickname}님에게 답변
                                </div>
                                <div
                                  className={`mt-1 text-xs ${isMine ? "text-violet-50/90" : "text-gray-600"} ${isMine ? "border-violet-200/40" : "border-gray-300"} border-l-2 pl-2 opacity-90`}
                                >
                                  {parent.isBlind ? "블라인드 처리된 메시지입니다." : parent.content}
                                </div>
                                <div className={`mt-2 h-px ${isMine ? "bg-violet-300/30" : "bg-gray-200"} w-full`} />
                              </div>
                            )}
                            {op.content}
                          </>
                        )}
                      </div>
                      <div className={`mt-1 flex items-center gap-2 text-xs ${isMine ? "justify-end text-violet-600/80" : "justify-start text-gray-500"}`}>
                        <span className="text-sm font-medium">{op.userNickname}</span>
                        <span>{new Date(op.createdAt).toLocaleTimeString()}</span>
                        <button
                          type="button"
                          className={`underline offset-2 ${isMine ? "text-violet-100/90 hover:text-white" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
                          onClick={() => setReplyTo(op)}
                          aria-label={`${op.userNickname}님에게 답변`}
                        >
                          답변
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {thread && thread.status === "OPEN" && (
              <form
                className="rounded-lg border p-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isLoggedIn) {
                    alert("로그인 후 이용할 수 있습니다.");
                    return;
                  }
                  const text = input.trim();
                  if (!text) return;
                  // Optimistic append for immediate UX feedback
                  const optimistic: DebateChatItem = {
                    chatId: `tmp-${Date.now()}`,
                    userId: currentUserId ?? "me",
                    userNickname: currentUserNickname,
                    profile: currentUserProfile,
                    content: text,
                    createdAt: new Date().toISOString(),
                    isBlind: false,
                    isAnswerTo: replyTo?.chatId ?? null,
                  };
                  setChats((prev) => [...prev, optimistic]);
                  sendChat(text, replyTo?.chatId ?? null);
                  // Best-effort sync with server state shortly after send
                  setTimeout(() => {
                    getDebateChatList(id)
                      .then((list) => setChats(list))
                      .catch(() => { /* ignore */ });
                  }, 400);
                  setInput("");
                  setReplyTo(null);
                }}
              >
                {replyTo && (
                  <div className="mb-3 flex items-center justify-between rounded border bg-gray-50 p-2 text-xs dark:bg-gray-800 dark:border-gray-700">
                    <div className="truncate pr-2">
                      <span className="font-medium">{replyTo.userNickname}</span>님에게 답변
                    </div>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white underline"
                      onClick={() => setReplyTo(null)}
                      aria-label="답변 취소"
                    >
                      취소
                    </button>
                  </div>
                )}
                <Textarea
                  placeholder={
                    !isLoggedIn
                      ? "로그인 후 이용할 수 있습니다."
                      : connected
                        ? (replyTo ? `${replyTo.userNickname}님에게 답변` : "메시지를 입력하세요")
                        : "연결 중... 잠시만 기다려주세요"
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={!connected || !isLoggedIn}
                />
                <div className="mt-3 flex justify-end">
                  <Button type="submit" disabled={!connected || !isLoggedIn || input.trim().length === 0}>
                    보내기
                  </Button>
                </div>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


