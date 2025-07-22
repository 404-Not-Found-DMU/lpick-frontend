'use client';

import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import { useRef, useEffect, useCallback } from 'react';

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    isPlaying,
    currentTime,
    isMuted,
    loopMode,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    goToNextTrack,
  } = useAudioPlayerStore();

  const memoizedSetCurrentTime = useCallback(
    (time: number) => {
      setCurrentTime(time);
    },
    [setCurrentTime],
  );

  const memoizedSetDuration = useCallback(
    (duration: number) => {
      setDuration(duration);
    },
    [setDuration],
  );

  const memoizedSetIsPlaying = useCallback(
    (playing: boolean) => {
      setIsPlaying(playing);
    },
    [setIsPlaying],
  );

  const memoizedGoToNextTrack = useCallback(() => {
    goToNextTrack();
  }, [goToNextTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
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

    const update = () => memoizedSetCurrentTime(audio.currentTime);
    const loaded = () => {
      memoizedSetDuration(audio.duration);

      if (isPlaying && audio) {
        memoizedSetIsPlaying(true);
      }
    };

    audio.addEventListener('loadedmetadata', loaded);
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('ended', memoizedGoToNextTrack);

    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('loadedmetadata', loaded);
      audio.removeEventListener('ended', memoizedGoToNextTrack);
    };
  }, [
    audioRef,
    isPlaying,
    memoizedGoToNextTrack,
    memoizedSetCurrentTime,
    memoizedSetDuration,
    memoizedSetIsPlaying,
  ]);

  return { audioRef, currentTime };
};
