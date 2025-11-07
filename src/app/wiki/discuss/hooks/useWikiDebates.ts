"use client";

import { useQuery } from "@tanstack/react-query";
import { getWikiDebates } from "@/hooks/api/wiki.debate.api";

export interface ApiDebateThread {
  id: string;
  title: string;
  category?: string;
  status?: "open" | "closed";
  opinionsCount?: number;
  lastUpdatedAt?: string;
  createdBy?: string;
  docId?: string;
}

function toCategoryLabel(subject?: string): string | undefined {
  if (!subject) return undefined;
  const upper = String(subject).toUpperCase();
  if (upper === "REPRESENTATION") return "표기";
  if (upper === "DETAIL") return "내용";
  return subject;
}

function toStatus(value?: string): "open" | "closed" | undefined {
  if (!value) return undefined;
  const lower = String(value).toLowerCase();
  if (lower === "open") return "open";
  if (lower === "closed") return "closed";
  // e.g. "OPEN"/"CLOSED"
  if (value === "OPEN") return "open";
  if (value === "CLOSED") return "closed";
  return undefined;
}

function mapRawToThread(raw: any): ApiDebateThread | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const id: string | undefined = raw.id ?? raw.debateId ?? raw.uuid;
  const title: string | undefined = raw.title ?? raw.debateName ?? raw.name;
  const category = toCategoryLabel(raw.category ?? raw.debateSubject);
  const status = toStatus(raw.status);
  const opinionsCount: number | undefined = raw.opinionsCount ?? raw.commentsCount ?? raw.messageCount ?? raw.count;
  const lastUpdatedAt: string | undefined = raw.lastUpdatedAt ?? raw.updatedAt ?? raw.openedAt ?? raw.createdAt;
  const createdBy: string | undefined = raw.createdBy ?? raw.openedBy ?? raw.author;
  const docId: string | undefined = raw.docId ?? raw.wikiId;
  if (!id) return undefined;
  return {
    id,
    title: title ?? "",
    category,
    status,
    opinionsCount,
    lastUpdatedAt,
    createdBy,
    docId,
  };
}

function normalizeResponse(data: any): ApiDebateThread[] {
  if (!data) return [];
  const arr: any[] = Array.isArray(data)
    ? data
    : Array.isArray((data as any).items)
    ? (data as any).items
    : Array.isArray((data as any).data)
    ? (data as any).data
    : Array.isArray((data as any).content)
    ? (data as any).content
    : [];
  return arr.map(mapRawToThread).filter(Boolean) as ApiDebateThread[];
}

export function useWikiDebates(wikiId: string) {
  return useQuery<ApiDebateThread[]>({
    queryKey: ["wikiDebates", wikiId],
    queryFn: async () => {
      const res = await getWikiDebates(wikiId);
      return normalizeResponse(res);
    },
    enabled: !!wikiId,
    staleTime: 1000 * 30,
  });
}


