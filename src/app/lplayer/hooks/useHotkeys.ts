'use client';

import { useEffect } from 'react';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';

export function useHotkeys(audioRef: React.RefObject<HTMLAudioElement | null>) {
  const {
    togglePlay,
    setCurrentTime,
    setVolume,
    volume,
    goToNextTrack,
    goToPrevTrack,
  } = useAudioPlayerStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const audio = audioRef.current;
      if (!audio) return;
      // Avoid typing in inputs
      const target = e.target as HTMLElement;
      const tag = target?.tagName;
      const isEditable = target?.isContentEditable;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || isEditable) return;
      // Enter는 리스트 항목 포커스에서만 동작, 글로벌에선 무시

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft': {
          e.preventDefault();
          const t = Math.max(0, audio.currentTime - 5);
          audio.currentTime = t; setCurrentTime(t);
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          const t = Math.min(audio.duration || Number.MAX_VALUE, audio.currentTime + 5);
          audio.currentTime = t; setCurrentTime(t);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const v = Math.min(1, volume + 0.05);
          audio.volume = v; setVolume(v);
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          const v = Math.max(0, volume - 0.05);
          audio.volume = v; setVolume(v);
          break;
        }
        case 'Enter':
          return; // 글로벌 핫키로는 처리하지 않음
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [audioRef, goToNextTrack, setCurrentTime, setVolume, togglePlay, volume, goToPrevTrack]);
}


