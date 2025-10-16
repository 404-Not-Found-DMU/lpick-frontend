'use client';

import React, { useEffect } from 'react';

import Player from './components/Player';
import Playlist from './components/Playlist';
import MiniPlayer from './components/MiniPlayer';
import LyricsPanel from './components/LyricsPanel';
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
    <div className="w-full min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-2 py-4 pb-24 dark:from-gray-900 dark:via-gray-800 dark:to-violet-900/20 md:px-4 md:py-6 md:pb-28">
      <div className="mx-auto flex flex-col items-center justify-center gap-6 md:gap-8 lg:flex-row lg:items-stretch lg:gap-10 lg:px-6">
        <Player />
        <div className="flex w-full max-w-[400px] flex-col justify-between gap-4 md:max-w-[400px] lg:min-w-[400px]">
          <Playlist />
          <div className="flex grow">
            <LyricsPanel />
          </div>
        </div>
      </div>
      <MiniPlayer />
    </div>
  );
};

export default LPlayerPage;
