'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeOff } from 'lucide-react';
import { useProgressBar } from '../hooks/useProgressBar';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';

interface VolumeBarProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const VolumeBar = ({ audioRef }: VolumeBarProps) => {
  const { volume, setVolume, toggleMute, isMuted } = useAudioPlayerStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { ref, percent, setPercent, handleMouseDown } = useProgressBar({
    vertical: true,
    onChange: (p) => {
      const audio = audioRef.current;
      if (!audio) return;
      const vol = p / 100;
      audio.volume = vol;
      setVolume(vol);
    },
  });

  useEffect(() => {
    setPercent(volume * 100);
  }, [volume, setPercent]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      toggleMute();
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      <button onClick={handleToggle} className="mr-1">
        {isMuted || volume === 0 ? (
          <VolumeOff size={24} className="text-gray-700" />
        ) : (
          <Volume2 size={24} className="text-gray-700" />
        )}
      </button>

      {isOpen && (
        <div
          onMouseDown={handleMouseDown}
          className="absolute bottom-8 left-1/2 z-10 flex h-40 w-10 -translate-x-1/2 flex-col-reverse items-center justify-center rounded-md bg-white p-3 shadow-md"
        >
          <div ref={ref} className="relative h-full w-2 rounded-full bg-gray-200">
            <div
              className="absolute bottom-0 left-0 w-full rounded-full bg-purple-400"
              style={{ height: `${percent}%` }}
            />
            <div
              className="absolute left-1/2 h-4 w-4 -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-full bg-purple-500 shadow-md transition-transform"
              style={{ bottom: `calc(${percent}% + 2px)` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VolumeBar;
