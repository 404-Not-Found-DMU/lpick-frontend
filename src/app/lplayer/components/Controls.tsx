'use client';

import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import clsx from 'clsx';
import { Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward } from 'lucide-react';

const Controls = () => {
  const { loopMode, isPlaying, isShuffle, togglePlay, cycleLoopMode, toggleShuffle } =
    useAudioPlayerStore();

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
      <SkipBack size={24} className="cursor-pointer text-gray-700" />

      <button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-lg text-white"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Play size={24} strokeWidth={0.5} fill={'#ffffff'} className="text-white" />
        ) : (
          <Pause size={24} strokeWidth={0.5} fill={'#ffffff'} className="text-white" />
        )}
      </button>

      <SkipForward size={24} className="cursor-pointer text-gray-700" />
      <Shuffle
        size={24}
        strokeWidth={isShuffle ? 2 : 3}
        className={clsx(
          'cursor-pointer transition-all',
          isShuffle ? 'text-gray-700' : 'text-purple-600',
        )}
        onClick={toggleShuffle}
      />
    </div>
  );
};

export default Controls;
