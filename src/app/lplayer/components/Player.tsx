'use client';

import { useEffect } from 'react';
import RecordPlayer from './RecordPlayer';
import PlayerProgressBar from './PlayerProgressBar';
import PlayerControls from './Controls';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import { useAudio } from '../hooks/useAudioPlayer';
import { useCoverPalette } from '../hooks/useCoverPalette';
import { useHotkeys } from '../hooks/useHotkeys';

const Player = () => {
  const { playlist, currentTrackId, isPlaying, setIsPlaying } = useAudioPlayerStore();
  const currentTrack = playlist.find((item) => item.id === currentTrackId) || playlist[0];
  const { audioRef } = useAudio();
  const palette = useCoverPalette(currentTrack?.cover);
  useHotkeys(audioRef);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const isFirstLoad = !audio.src || audio.src === '';

    audio.src = currentTrack.mp3;
    audio.currentTime = 0;

    // 처음 로드가 아닐 때만 자동 재생 (트랙 변경 시에만)
    if (!isFirstLoad) {
      const handleLoadedData = () => {
        setIsPlaying(true);
        audio.play().catch((error) => {
          console.warn('Auto play failed:', error);
        });
      };

      audio.addEventListener('loadeddata', handleLoadedData, { once: true });

      return () => {
        audio.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [currentTrack, audioRef, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      if (isPlaying) {
        audio.play().catch((error) => {
          console.warn('Play failed:', error);
        });
      } else {
        audio.pause();
      }
    };

    if (audio.readyState >= 2) {
      handleCanPlay();
    } else {
      audio.addEventListener('canplay', handleCanPlay, { once: true });
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [isPlaying, audioRef]);

  return (
    <div
      className="animate-slide-up mx-auto flex w-full min-w-0 max-w-[95vw] flex-col items-center justify-center rounded-2xl px-6 py-8 shadow-lg sm:max-w-[700px] md:max-w-[900px] md:px-12 md:py-10 xl:max-w-[1200px] xl:px-32 xl:py-20 2xl:max-w-[1400px]"
      style={{
        background: `linear-gradient(180deg, ${palette.secondary} 0%, #ffffff 60%)`,
      }}
    >
      <audio ref={audioRef} controls className="hidden">
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
        <PlayerProgressBar audioRef={audioRef} />
        <div style={{ outlineColor: palette.accent }}>
          <PlayerControls audioRef={audioRef} />
        </div>
      </div>
    </div>
  );
};

export default Player;
