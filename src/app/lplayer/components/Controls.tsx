'use client';

import React from 'react';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import clsx from 'clsx';
import { Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward } from 'lucide-react';

interface ControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  playlist: { id: string }[];
  currentTrackIndex: number;
}

const Controls = ({ audioRef, playlist, currentTrackIndex }: ControlsProps) => {
  const { loopMode, isPlaying, isShuffle, cycleLoopMode, toggleShuffle, setIsPlaying } =
    useAudioPlayerStore();

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-8">
      {loopMode === 'one' ? (
        <Repeat1
          size={24}
          strokeWidth={3}
          className="cursor-pointer text-purple-600 transition-all"
          onClick={cycleLoopMode}
        />
      ) : (
        <Repeat
          size={24}
          strokeWidth={loopMode === 'none' ? 2 : 3}
          className={clsx(
            'cursor-pointer transition-all',
            loopMode === 'none' ? 'text-gray-700' : 'text-purple-600',
          )}
          onClick={cycleLoopMode}
        />
      )}
      <SkipBack onClick={handlePrev} size={24} className="cursor-pointer text-gray-700" />

      <button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-lg text-white"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <Pause size={24} strokeWidth={0.5} fill={'#ffffff'} className="text-white" />
        ) : (
          <Play size={24} strokeWidth={0.5} fill={'#ffffff'} className="text-white" />
        )}
      </button>

      <SkipForward onClick={handleNext} size={24} className="cursor-pointer text-gray-700" />
      <Shuffle
        size={24}
        strokeWidth={isShuffle ? 3 : 2}
        className={clsx(
          'cursor-pointer transition-all',
          isShuffle ? 'text-purple-600' : 'text-gray-700',
        )}
        onClick={toggleShuffle}
      />
    </div>
  );
};

export default Controls;
