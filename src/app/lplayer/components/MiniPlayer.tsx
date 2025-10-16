'use client';

import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import { Pause, Play, SkipForward } from 'lucide-react';
import { useCoverPalette } from '../hooks/useCoverPalette';

const MiniPlayer = () => {
  const { playlist, currentTrackId, isPlaying, togglePlay, goToNextTrack } = useAudioPlayerStore();
  const current = playlist.find((t) => t.id === currentTrackId) || playlist[0];
  const palette = useCoverPalette(current?.cover);

  if (!current) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-40 flex items-center gap-3 rounded-full px-4 py-2 shadow-lg backdrop-blur-md"
      style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.06)' }}
      aria-label="미니 플레이어"
    >
      <div className="max-w-[150px] truncate text-sm text-gray-800">
        {current.title}
      </div>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: palette.accent }}
        onClick={togglePlay}
        aria-label={isPlaying ? '일시정지' : '재생'}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <button className="h-8 w-8 rounded-full border text-gray-700" onClick={goToNextTrack} aria-label="다음 트랙">
        <SkipForward size={18} className="mx-auto" />
      </button>
    </div>
  );
};

export default MiniPlayer;


