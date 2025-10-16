'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import { lyricsByTrackId } from '../temp/lyrics.temp';
import { useCoverPalette } from '../hooks/useCoverPalette';
import { Music2 } from 'lucide-react';

export default function LyricsMiniBar() {
  const { playlist, currentTrackId, isPlaying } = useAudioPlayerStore();
  const current = playlist.find((t) => t.id === currentTrackId) || playlist[0];
  const palette = useCoverPalette(current?.cover);

  const lines = useMemo(() => {
    const raw = lyricsByTrackId[current?.id || 0];
    if (!raw) return [] as string[];
    return raw
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean);
  }, [current?.id]);

  const [idx, setIdx] = useState(0);

  useEffect(() => { setIdx(0); }, [current?.id]);

  useEffect(() => {
    if (!isPlaying || lines.length <= 1) return;
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % lines.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPlaying, lines.length]);

  const text = lines[idx] || '가사가 아직 등록되지 않았습니다.';

  return (
    <div className="mx-auto mt-6 w-full max-w-3xl px-3">
      <div
        className="flex items-center gap-2 rounded-full border px-3 py-2 text-xs shadow-sm backdrop-blur"
        style={{
          background: 'rgba(255,255,255,0.85)',
          borderColor: 'rgba(0,0,0,0.06)',
        }}
        aria-label="가사 미니 바"
      >
        <span
          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: palette.accent }}
        >
          <Music2 size={14} />
        </span>
        <div className="relative h-5 flex-1 overflow-hidden">
          <div
            key={`${current?.id}-${idx}`}
            className="absolute inset-0 flex items-center text-gray-700 dark:text-gray-200 animate-[fadeUp_300ms_ease]"
            style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
            title={text}
          >
            {text}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}


