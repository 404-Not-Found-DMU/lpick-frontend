'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import { lyricsByTrackId } from '../temp/lyrics.temp';
import { useCoverPalette } from '../hooks/useCoverPalette';

const AppleStyleLyricLine = ({ children }: { children: string }) => (
  <p className="mx-auto max-w-2xl px-4 py-1 text-center text-[15px] leading-7 text-gray-700 dark:text-gray-200 md:text-base">
    {children}
  </p>
);

export default function LyricsPanel() {
  const { playlist, currentTrackId, isPlaying } = useAudioPlayerStore();
  const current = playlist.find((t) => t.id === currentTrackId) || playlist[0];
  const palette = useCoverPalette(current?.cover);

  const lyrics = useMemo(() => {
    const raw = lyricsByTrackId[current?.id || 0];
    if (!raw) return undefined;
    return raw
      .split(/\n\n+/)
      .map((stanza) => stanza.trim())
      .filter(Boolean)
      .map((stanza) => stanza.split(/\n/));
  }, [current?.id]);

  return (
    <section
      className="mt-8 rounded-2xl border border-gray-100 bg-white/80 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60"
      style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
      aria-label="가사"
    >
      <div className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 dark:border-gray-800 dark:text-gray-200">
        가사
      </div>
      <div
        className="max-h-[36vh] overflow-y-auto py-4"
        style={{ scrollBehavior: 'smooth', background: `linear-gradient(180deg, ${palette.secondary} 0%, transparent 40%)` }}
      >
        {!lyrics ? (
          <div className="mx-auto max-w-2xl px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            가사가 등록되지 않았습니다. 나중에 다시 확인해 주세요.
          </div>
        ) : (
          <div>
            {lyrics.map((stanza, i) => (
              <div key={i} className="mb-3">
                {stanza.map((line, j) => (
                  <AppleStyleLyricLine key={`${i}-${j}`}>{line}</AppleStyleLyricLine>
                ))}
              </div>
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
    <div className="px-3 pb-4">
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


