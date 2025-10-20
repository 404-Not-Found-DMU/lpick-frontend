"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  AddOpinionInput,
  CreateThreadInput,
  DiscussionOpinion,
  DiscussionThread,
  DiscussionStatus,
  DiscussionCategory,
  DiscussionVote,
} from "../types";

const THREADS_KEY = "lpick_wiki_discussions_threads";
const OPINIONS_KEY = "lpick_wiki_discussions_opinions";
const VOTES_KEY = "lpick_wiki_discussions_votes";

function nowIso(): string {
  return new Date().toISOString();
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function seedThreads(): DiscussionThread[] {
  const base: DiscussionThread[] = [
    {
      id: "1",
      title: "문서 제목 표기 방식에 대한 논의",
      category: "표기",
      status: "open",
      createdAt: nowIso(),
      createdBy: "위키유저A",
      lastUpdatedAt: nowIso(),
      opinionsCount: 2,
    },
    {
      id: "2",
      title: "수록곡 섹션 정렬 기준 제안",
      category: "내용",
      status: "closed",
      createdAt: nowIso(),
      createdBy: "위키유저B",
      lastUpdatedAt: nowIso(),
      opinionsCount: 3,
      closedAt: nowIso(),
      closedSummary: "가나다 순 정렬로 합의",
    },
  ];
  return base;
}

function seedOpinions(): DiscussionOpinion[] {
  const base: DiscussionOpinion[] = [
    {
      id: "o1",
      threadId: "1",
      author: "위키유저A",
      stance: "agree",
      content: "국문 표기는 일관되게 유지해야 합니다.",
      createdAt: nowIso(),
      likes: 1,
    },
    {
      id: "o2",
      threadId: "1",
      author: "위키유저C",
      stance: "neutral",
      content: "영문 병기도 함께 표기하면 좋겠습니다.",
      createdAt: nowIso(),
      likes: 0,
    },
    {
      id: "o3",
      threadId: "2",
      author: "위키유저D",
      stance: "agree",
      content: "가나다 순 정렬이 가장 직관적입니다.",
      createdAt: nowIso(),
      likes: 3,
    },
  ];
  return base;
}

export interface ThreadFilter {
  status?: DiscussionStatus | "all";
  category?: DiscussionCategory | "all";
  docId?: string;
  q?: string; // 검색어(제목)
}

export function useDiscussions() {
  const [threads, setThreads] = useState<DiscussionThread[]>([]);
  const [opinions, setOpinions] = useState<DiscussionOpinion[]>([]);
  const [votes, setVotes] = useState<DiscussionVote[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadedThreads = loadFromStorage<DiscussionThread[]>(THREADS_KEY, seedThreads());
    const loadedOpinions = loadFromStorage<DiscussionOpinion[]>(OPINIONS_KEY, seedOpinions());
    setThreads(loadedThreads);
    setOpinions(loadedOpinions);
    setVotes(loadFromStorage<DiscussionVote[]>(VOTES_KEY, []));
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    saveToStorage(THREADS_KEY, threads);
  }, [isReady, threads]);

  useEffect(() => {
    if (!isReady) return;
    saveToStorage(OPINIONS_KEY, opinions);
  }, [isReady, opinions]);

  useEffect(() => {
    if (!isReady) return;
    saveToStorage(VOTES_KEY, votes);
  }, [isReady, votes]);

  const listThreads = useCallback(
    (filter?: ThreadFilter): DiscussionThread[] => {
      const { status = "all", category = "all", docId, q } = filter ?? {};
      return threads
        .filter((t) => (status === "all" ? true : t.status === status))
        .filter((t) => (category === "all" ? true : t.category === category))
        .filter((t) => (docId ? t.docId === docId : true))
        .filter((t) => (q ? t.title.toLowerCase().includes(q.toLowerCase()) : true))
        .sort((a, b) => b.lastUpdatedAt.localeCompare(a.lastUpdatedAt));
    },
    [threads],
  );

  const getThread = useCallback(
    (id: string): DiscussionThread | undefined => threads.find((t) => t.id === id),
    [threads],
  );

  const listOpinions = useCallback(
    (threadId: string): DiscussionOpinion[] =>
      opinions
        .filter((o) => o.threadId === threadId)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [opinions],
  );

  const createThread = useCallback(
    (input: CreateThreadInput): DiscussionThread => {
      const newId = `${Date.now()}`;
      const now = nowIso();
      const thread: DiscussionThread = {
        id: newId,
        title: input.title,
        category: input.category,
        status: "open",
        createdAt: now,
        createdBy: input.author,
        lastUpdatedAt: now,
        opinionsCount: 1,
        docId: input.docId,
        voteStatus: "none",
      };
      const opinion: DiscussionOpinion = {
        id: `${newId}-o1`,
        threadId: newId,
        author: input.author,
        stance: input.stance ?? "neutral",
        content: input.content,
        createdAt: now,
        likes: 0,
      } as DiscussionOpinion;
      setThreads((prev) => [thread, ...prev]);
      setOpinions((prev) => [...prev, opinion]);
      return thread;
    },
    [],
  );

  const addOpinion = useCallback(
    (input: AddOpinionInput): DiscussionOpinion | undefined => {
      const thread = threads.find((t) => t.id === input.threadId);
      if (!thread || thread.status !== "open") return undefined;
      const op: DiscussionOpinion = {
        id: `${Date.now()}`,
        threadId: input.threadId,
        author: input.author,
        stance: input.stance,
        content: input.content,
        createdAt: nowIso(),
        likes: 0,
      };
      setOpinions((prev) => [...prev, op]);
      setThreads((prev) =>
        prev.map((t) =>
          t.id === input.threadId
            ? { ...t, opinionsCount: t.opinionsCount + 1, lastUpdatedAt: nowIso() }
            : t,
        ),
      );
      return op;
    },
    [threads],
  );

  const likeOpinion = useCallback((opinionId: string) => {
    setOpinions((prev) =>
      prev.map((o) => (o.id === opinionId ? { ...o, likes: o.likes + 1 } : o)),
    );
  }, []);

  const closeThread = useCallback(
    (threadId: string, summary: string) => {
      const closedAt = nowIso();
      setThreads((prev) =>
        prev.map((t) =>
          t.id === threadId
            ? {
                ...t,
                status: "closed",
                closedAt,
                closedSummary: summary,
                lastUpdatedAt: closedAt,
              }
            : t,
        ),
      );
    },
    [],
  );

  // ===== 투표 로직 =====
  const getVote = useCallback(
    (threadId: string): DiscussionVote | undefined => votes.find((v) => v.threadId === threadId),
    [votes],
  );

  const openVote = useCallback(
    (threadId: string, options: string[], allowMultiple = false) => {
      const vote: DiscussionVote = {
        threadId,
        status: "open",
        allowMultiple,
        options: options.map((text, idx) => ({ id: `opt-${idx + 1}`, text, count: 0 })),
        startedAt: nowIso(),
        userChoices: {},
      };
      setVotes((prev) => [vote, ...prev.filter((v) => v.threadId !== threadId)]);
      setThreads((prev) => prev.map((t) => (t.id === threadId ? { ...t, voteStatus: "open" } : t)));
    },
    [],
  );

  const closeVote = useCallback((threadId: string) => {
    const endedAt = nowIso();
    setVotes((prev) =>
      prev.map((v) => (v.threadId === threadId ? { ...v, status: "closed", endedAt } : v)),
    );
    setThreads((prev) => prev.map((t) => (t.id === threadId ? { ...t, voteStatus: "closed" } : t)));
  }, []);

  const castVote = useCallback(
    (threadId: string, userId: string, choiceIds: string | string[]) => {
      setVotes((prev) =>
        prev.map((v) => {
          if (v.threadId !== threadId || v.status !== "open") return v;
          const next = { ...v } as DiscussionVote;
          // 기존 선택 취소를 위해 count 롤백
          const prevChoice = next.userChoices[userId];
          const prevChoiceIds = Array.isArray(prevChoice) ? prevChoice : prevChoice ? [prevChoice] : [];
          for (const cid of prevChoiceIds) {
            const opt = next.options.find((o) => o.id === cid);
            if (opt && opt.count > 0) opt.count -= 1;
          }
          // 신규 선택 반영
          const newChoiceIds = Array.isArray(choiceIds) ? choiceIds : [choiceIds];
          if (!next.allowMultiple && newChoiceIds.length > 1) {
            newChoiceIds.splice(1); // 단일 선택 강제
          }
          for (const cid of newChoiceIds) {
            const opt = next.options.find((o) => o.id === cid);
            if (opt) opt.count += 1;
          }
          next.userChoices[userId] = next.allowMultiple ? newChoiceIds : newChoiceIds[0];
          return next;
        }),
      );
    },
    [],
  );

  return useMemo(
    () => ({
      isReady,
      threads,
      opinions,
      votes,
      listThreads,
      getThread,
      listOpinions,
      createThread,
      addOpinion,
      likeOpinion,
      closeThread,
      getVote,
      openVote,
      closeVote,
      castVote,
    }),
    [
      isReady,
      threads,
      opinions,
      votes,
      listThreads,
      getThread,
      listOpinions,
      createThread,
      addOpinion,
      likeOpinion,
      closeThread,
      getVote,
      openVote,
      closeVote,
      castVote,
    ],
  );
}


