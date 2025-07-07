'use client';

import { useState } from 'react';
import { useProgressBar } from '../hooks/useProgressBar';
import { Volume2, VolumeOff } from 'lucide-react';

const VolumeBar = () => {
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);

  const { ref, percent, setPercent, handleMouseDown } = useProgressBar(volume);

  const handleBarClick = (e: React.MouseEvent) => {
    handleMouseDown(e);
    setTimeout(() => {
      setVolume(ref.current ? percent : 0);
    }, 0);
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(prevVolume);
      setPercent(prevVolume);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setPercent(0);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={toggleMute} aria-label={volume === 0 ? '음소거 해제' : '음소거'}>
        {volume === 0 ? (
          <VolumeOff size={20} className="text-gray-700" />
        ) : (
          <Volume2 size={20} className="text-gray-700" />
        )}
      </button>

      <div
        ref={ref}
        onMouseDown={handleBarClick}
        className="relative h-1 w-32 cursor-pointer rounded-full bg-gray-200 sm:w-40"
      >
        <div
          className="absolute left-0 top-0 h-1 rounded-full bg-purple-400"
          style={{ width: `${percent}%` }}
        />
        <div
          className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-purple-500 shadow-md transition-transform"
          style={{ left: `calc(${percent}% - 0.375rem)` }}
        />
      </div>
    </div>
  );
};

export default VolumeBar;
