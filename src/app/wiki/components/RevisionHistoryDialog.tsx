'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/Dialog';
import { getWikiRevisions, getWikiRevision, type RevisionItem, type RevisionPage } from '@/hooks/api/wiki.api';
import type { WikiCategory } from '@/types/hierarchical.editor.types';

interface RevisionHistoryDialogProps {
  wikiId: string | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: WikiCategory;
}

export default function RevisionHistoryDialog({ wikiId, open, onOpenChange, category }: RevisionHistoryDialogProps) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RevisionPage | null>(null);
  const [selecting, setSelecting] = useState<string | null>(null);

  const getVersionParam = (rev: RevisionItem): string => {
    const anyRev = rev as unknown as Record<string, unknown>;
    const candidates = [
      anyRev.version,
      anyRev.number,
      anyRev.seq,
      anyRev.revisionNumber,
      rev.revisionId,
    ];
    const picked = candidates.find((v) => v !== undefined && v !== null && String(v).length > 0);
    return String(picked ?? rev.revisionId);
  };

  useEffect(() => {
    let active = true;
    async function run() {
      if (!open || !wikiId) return;
      try {
        setLoading(true);
        setError(null);
        const res = await getWikiRevisions(wikiId, { page, size });
        if (active) setData(res);
      } catch {
        if (active) setError('버전 목록을 불러오지 못했습니다.');
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => {
      active = false;
    };
  }, [open, wikiId, page, size]);

  const items: RevisionItem[] = data?.content ?? [];

  return (
    <Dialog open={open} onOpenChange={(v) => { setPage(0); onOpenChange(v); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>문서 역사</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {loading && <div className="text-sm text-muted-foreground">로딩 중...</div>}
          {error && <div className="text-sm text-red-500">{error}</div>}
          {!loading && !error && (
            <>
              {items.length === 0 ? (
                <div className="text-sm text-muted-foreground">버전이 없습니다.</div>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {items.map((rev) => (
                    <li
                      key={rev.revisionId}
                      className="py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/60 rounded px-2 -mx-2"
                      onClick={async () => {
                        if (!wikiId) return;
                        const primary = getVersionParam(rev);
                        const secondary = rev.revisionId !== primary ? rev.revisionId : undefined;
                        try {
                          setSelecting(rev.revisionId);
                          // 사전 조회로 API 요청이 실제로 발생하도록 강제
                          try {
                            await getWikiRevision(wikiId, primary);
                          } catch (e) {
                            if (secondary) {
                              await getWikiRevision(wikiId, secondary);
                            } else {
                              throw e;
                            }
                          }
                          onOpenChange(false);
                          const finalParam = secondary ? secondary : primary;
                          router.push(`/wiki/${category}/${encodeURIComponent(wikiId)}?rev=${encodeURIComponent(finalParam)}`);
                          router.refresh?.();
                        } catch {
                          alert('해당 리비전을 불러오지 못했습니다.');
                        } finally {
                          setSelecting(null);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-medium">
                            {new Date(rev.createdAt).toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {rev.createWho?.nickName ?? rev.createWho?.oauthId ?? '알 수 없음'}
                          </div>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          {selecting === rev.revisionId ? '로드 중...' : (
                            <>
                              <div>revId: {rev.revisionId}</div>
                              {(() => {
                                const anyRev = rev as unknown as Record<string, unknown>;
                                const v = anyRev.version ?? anyRev.number ?? anyRev.seq ?? anyRev.revisionNumber;
                                return v ? <div>version: {String(v)}</div> : null;
                              })()}
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  className="px-3 py-1.5 text-sm rounded border hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={data?.first || loading}
                >
                  이전
                </button>
                <div className="text-xs text-muted-foreground">
                  페이지 { (data?.number ?? 0) + 1 } / { Math.max(1, data?.totalPages ?? 1) } · 총 { data?.totalElements ?? 0 }개
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 text-sm rounded border hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={data?.last || loading || (data?.totalPages ?? 0) === 0}
                >
                  다음
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


