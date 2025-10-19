'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import { lyricsByTrackId } from '../temp/lyrics.temp';
import { useCoverPalette } from '../hooks/useCoverPalette';

// YouTube Music 스타일: 중앙 하이라이트, 위/아래 페이드
const KaraokeLine = ({
  children,
  active,
}: {
  children: string
  active: boolean
}) => (
  <p
    className={`mx-auto max-w-2xl px-4 py-1 text-center transition-all duration-300 ${
      active
        ? 'text-[16px] leading-7 font-semibold text-gray-900 dark:text-gray-100 md:text-[18px]'
        : 'text-[14px] leading-6 text-gray-600/70 dark:text-gray-300/70'
    }`}
  >
    {children}
  </p>
)

export default function LyricsPanel() {
  const { playlist, currentTrackId, isPlaying } = useAudioPlayerStore();
  const current = playlist.find((t) => t.id === currentTrackId) || playlist[0];
  const palette = useCoverPalette(current?.cover);

  // 라인 단위 배열 (타임스탬프 없이 1줄씩 순환)
  const lines = useMemo(() => {
    const raw = lyricsByTrackId[current?.id || 0]
    if (!raw) return [] as string[]
    return raw
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean)
  }, [current?.id])

  const [activeIdx, setActiveIdx] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    setActiveIdx(0)
  }, [current?.id])

  // 재생 중 자동 스크롤/순환
  useEffect(() => {
    if (!isPlaying || lines.length <= 1) return
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % lines.length)
    }, 3000)
    return () => clearInterval(t)
  }, [isPlaying, lines.length])

  // 현재 라인을 중앙 근처로 스크롤
  useEffect(() => {
    const el = activeRef.current
    const parent = containerRef.current
    if (el && parent) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [activeIdx])

  return (
    <section
      className="mt-0 flex min-h-[180px] flex-1 flex-col rounded-2xl border border-gray-100 bg-white/80 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60"
      style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
      aria-label="가사"
    >
      <div className="border-b border-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 dark:border-gray-800 dark:text-gray-200">
        가사
      </div>
      <div
        ref={containerRef}
        className="relative flex-1 overflow-y-auto py-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* 상/하단 페이드 */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/80 to-transparent dark:from-gray-900/80" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80" />

        {lines.length === 0 ? (
          <div className="mx-auto max-w-2xl px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            가사가 등록되지 않았습니다. 나중에 다시 확인해 주세요.
          </div>
        ) : (
          <div className="relative">
            {lines.map((line, i) => (
              <KaraokeLine
                key={`${i}-${line.slice(0, 12)}`}
                active={i === activeIdx}
                // @ts-expect-error ref for active only
                ref={i === activeIdx ? activeRef : undefined}
              >
                {line}
              </KaraokeLine>
            ))}
          </div>
        )}
      </div>

      {/* 미니 가사 바: 패널 내부 좌측 하단, 컴팩트 사이즈 */}
      <MiniInlineBar trackId={current?.id} isPlaying={isPlaying} accent={palette.accent} />
    </section>
  );
}

function MiniInlineBar({ trackId, isPlaying, accent }: { trackId?: number; isPlaying: boolean; accent: string }) {
  const lines = useMemo(() => {
    const raw = lyricsByTrackId[trackId || 0];
    if (!raw) return [] as string[];
    return raw.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  }, [trackId]);

  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [trackId]);
  useEffect(() => {
    if (!isPlaying || lines.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % lines.length), 3500);
    return () => clearInterval(t);
  }, [isPlaying, lines.length]);

  const text = lines[idx] || '가사가 아직 등록되지 않았습니다.';

  return (
    <div className="px-3 pb-3 mt-auto">
      <div
        className="inline-flex max-w-[420px] items-center gap-2 rounded-full border px-3 py-1.5 text-xs shadow-sm backdrop-blur"
        style={{ background: 'rgba(255,255,255,0.9)', borderColor: 'rgba(0,0,0,0.06)' }}
      >
        <span className="inline-block h-5 w-5 rounded-full" style={{ backgroundColor: accent }} />
        <div className="relative h-5 max-w-[360px] overflow-hidden">
          <div key={`${trackId}-${idx}`} className="absolute inset-0 flex items-center animate-[fadeUp_300ms_ease] text-gray-700 dark:text-gray-200" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }} title={text}>
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}


