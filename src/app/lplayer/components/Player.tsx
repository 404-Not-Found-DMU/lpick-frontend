'use client';

import { useEffect, useRef, useState } from 'react';
import RecordPlayer from './RecordPlayer';
import ProgressBar from './ProgressBar';
import Controls from './Controls';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import { fetchPlaylist } from '../api/playlist.api';
import type { TempTrack } from '../temp/playlist.temp';

const Player = () => {
  const [playlist, setPlaylist] = useState<TempTrack[]>([]);
  useEffect(() => {
    fetchPlaylist().then((data) => setPlaylist(data));
  }, []);
  const { currentTrackId, setIsPlaying, setCurrentTrackId } = useAudioPlayerStore();
  const currentTrack = playlist.find((item) => item.id === currentTrackId) || playlist[0];
  const currentTrackIndex = playlist.findIndex((item) => item.id === currentTrackId);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.pause();
    audio.src = currentTrack.mp3;
    audio.currentTime = 0;
    setIsPlaying(false);
  }, [currentTrack, audioRef, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoaded = () => {
      if (!isNaN(audio.duration)) {
        useAudioPlayerStore.getState().setDuration(audio.duration);
        setIsPlaying(true);
        audio.play();
      }
    };

    const handleEnded = () => {
      goToNextTrack();
    };

    audio.addEventListener('loadedmetadata', handleLoaded);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoaded);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, audioRef]);

  return (
    <div className="animate-slide-up mx-auto flex w-full min-w-0 max-w-[95vw] flex-col items-center justify-center rounded-2xl bg-white px-6 py-8 shadow-lg dark:bg-gray-900 sm:max-w-[700px] md:max-w-[900px] md:px-12 md:py-10 xl:max-w-[1200px] xl:px-32 xl:py-20 2xl:max-w-[1400px]">
      <audio ref={audioRef} preload="metadata" className="hidden">
        {currentTrack && (
          <>
            <source src={currentTrack.mp3} type="audio/mpeg" />
          </>
        )}
        브라우저가 오디오를 지원하지 않습니다.
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
        <Controls
          audioRef={audioRef}
          playlist={playlist}
          currentTrackIndex={currentTrackIndex}
          setCurrentTrackId={setCurrentTrackId}
        />
      </div>
    </div>
  );
};

export default Player;
