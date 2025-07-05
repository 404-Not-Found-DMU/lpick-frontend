'use client';

import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import { useRef, useEffect } from 'react';

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isPlaying, setIsPlaying, setCurrentTime, setDuration, isMuted, loopMode, isShuffle } =
    useAudioPlayerStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.play();
    else audio.pause();
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
    const loaded = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', update);
    audio.addEventListener('loadedmetadata', loaded);
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('loadedmetadata', loaded);
    };
  }, [isShuffle]);

  return { audioRef };
};
