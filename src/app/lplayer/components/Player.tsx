'use client';

import { useEffect } from 'react';
import RecordPlayer from './RecordPlayer';
import ProgressBar from './ProgressBar';
import PlayerControls from './Controls';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import { useAudio } from '../hooks/useAudioPlayer';

const Player = () => {
  const { playlist, currentTrackId, isPlaying } = useAudioPlayerStore();
  const currentTrack = playlist.find((item) => item.id === currentTrackId) || playlist[0];
  const { audioRef } = useAudio();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.src = currentTrack.mp3;
    audio.currentTime = 0;

    if (isPlaying) {
      audio.play();
    }
  }, [currentTrack, audioRef]);

  return (
    <div className="animate-slide-up mx-auto flex w-full min-w-0 max-w-[95vw] flex-col items-center justify-center rounded-2xl bg-white px-6 py-8 shadow-lg dark:bg-gray-900 sm:max-w-[700px] md:max-w-[900px] md:px-12 md:py-10 xl:max-w-[1200px] xl:px-32 xl:py-20 2xl:max-w-[1400px]">
      <audio ref={audioRef} controls className="w-full">
        {currentTrack && (
          <>
            <source src={currentTrack.mp3} type="audio/mpeg" />
          </>
        )}
      </audio>
      <div className="flex w-full flex-col items-center gap-4 md:gap-6">
        <RecordPlayer cover={currentTrack?.cover} />
        <div className="text-center">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 md:text-lg">
            {currentTrack?.title || '-'}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 md:text-sm">
            {currentTrack?.artist || '-'}
          </p>
        </div>
        <ProgressBar audioRef={audioRef} />
        <PlayerControls audioRef={audioRef} />
      </div>
    </div>
  );
};

export default Player;
