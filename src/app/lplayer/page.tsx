'use client';

import React, { useEffect } from 'react';

import Player from './components/Player';
import Playlist from './components/Playlist';
import { fetchPlaylist } from './api/playlist.api';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';

const LPlayerPage = () => {
  const { setPlaylist, setIsPlaying } = useAudioPlayerStore();

  useEffect(() => {
    fetchPlaylist().then((data) => setPlaylist(data));

    return () => {
      setPlaylist([]);
      setIsPlaying(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // setIsPlaying, setPlaylist은 zustand store에서 stable하므로 제외

  return (
    <div className="w-full bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-2 py-4 dark:from-gray-900 dark:via-gray-800 dark:to-violet-900/20 md:px-4 md:py-6">
      <div className="mx-auto flex flex-col items-center justify-center gap-6 md:gap-8 lg:flex-row lg:items-start lg:gap-10 lg:px-6">
        <Player />
        <Playlist />
      </div>
    </div>
  );
};

export default LPlayerPage;
