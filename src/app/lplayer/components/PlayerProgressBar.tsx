'use client';

import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import React, { useEffect } from 'react';
import { useProgressBar } from '../hooks/useProgressBar';

interface ProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const PlayerProgressBar = ({ audioRef }: ProgressBarProps) => {
  const { setIsPlaying, setCurrentTime } = useAudioPlayerStore();

  const { ref, percent, setPercent, handleMouseDown } = useProgressBar({
    onChange: (p) => {
      const audio = audioRef.current;
      if (!audio || !audio.duration) return;
      const newTime = (p / 100) * audio.duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    },
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!audio.duration) return;
      const current = audio.currentTime;
      const total = audio.duration;
      setPercent((current / total) * 100);
    };

    const resetProgress = () => setPercent(0);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', resetProgress);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', resetProgress);
    };
  }, [audioRef, setPercent]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
        <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
        <span>{formatTime(audioRef.current?.duration || 0)}</span>
      </div>

      <div
        ref={ref}
        onMouseDown={(e) => {
          handleMouseDown(e);
          setIsPlaying(true);
        }}
        className="relative h-2 w-full cursor-pointer rounded-full bg-gray-200"
      >
        <div
          className="absolute left-0 top-0 h-2 rounded-full bg-purple-400"
          style={{ width: `${percent}%` }}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-purple-500 shadow-md transition-transform"
          style={{ left: `calc(${percent}% - 0.5rem)` }}
        />
      </div>
    </div>
  );
};

export default PlayerProgressBar;
