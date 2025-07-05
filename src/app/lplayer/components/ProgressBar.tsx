'use client';

import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import { useRef } from 'react';

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60).toString();
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};

const ProgressBar = () => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const { currentTime, duration, setCurrentTime } = useAudioPlayerStore();
  const percent = (currentTime / duration) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    const boundedClickX = Math.min(Math.max(clickX, 0), rect.width);

    const newTime = (boundedClickX / rect.width) * duration;
    setCurrentTime(newTime);
  };

  return (
    <div className="w-full px-4">
      <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div
        ref={barRef}
        onMouseDown={handleMouseDown}
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

export default ProgressBar;
