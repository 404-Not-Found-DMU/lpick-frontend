'use client';

import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import React, { useEffect, useState, useRef } from 'react';

interface ProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const ProgressBar = ({ audioRef }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const { setCurrentTime } = useAudioPlayerStore();
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        const current = audio.currentTime;
        const total = audio.duration;
        setProgress((current / total) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [audioRef]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = barRef.current;
    if (!audio || !bar || !audio.duration) return;

    const rect = bar.getBoundingClientRect();

    const update = (clientX: number) => {
      const x = clientX - rect.left;
      const clampedX = Math.min(Math.max(x, 0), rect.width);
      const ratio = clampedX / rect.width;
      const newTime = ratio * audio.duration;

      audio.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(ratio * 100);
    };

    update(e.clientX);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      update(moveEvent.clientX);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

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
        ref={barRef}
        onMouseDown={handleMouseDown}
        className="relative h-2 w-full cursor-pointer rounded-full bg-gray-200"
      >
        <div
          className="absolute left-0 top-0 h-2 rounded-full bg-purple-400"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-purple-500 shadow-md transition-transform"
          style={{ left: `calc(${progress}% - 0.5rem)` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
