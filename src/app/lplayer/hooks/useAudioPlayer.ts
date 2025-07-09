'use client';

import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import { useRef, useEffect } from 'react';

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    isPlaying,
    currentTime,
    isMuted,
    loopMode,
    isShuffle,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    goToNextTrack,
  } = useAudioPlayerStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    audio.loop = loopMode === 'one';
  }, [isMuted, loopMode]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => setCurrentTime(audio.currentTime);
    const loaded = () => {
      setDuration(audio.duration);

      if (isPlaying && audio) {
        setIsPlaying(true);
      }
    };

    audio.addEventListener('loadedmetadata', loaded);
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('ended', goToNextTrack);

    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('loadedmetadata', loaded);
      audio.addEventListener('ended', goToNextTrack);
    };
  }, [isShuffle]);

  return { audioRef, currentTime };
};
