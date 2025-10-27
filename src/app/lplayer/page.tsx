'use client';

import React, { useEffect, useState } from 'react';
import { Library, Upload, Play } from 'lucide-react';

import Player from './components/Player';
import Playlist from './components/Playlist';
import MiniPlayer from './components/MiniPlayer';
import LyricsPanel from './components/LyricsPanel';
import { RecordingUpload } from './components/RecordingUpload';
import { PlaylistManager } from './components/PlaylistManager';
import { fetchPlaylist } from './api/playlist.api';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';

type ViewMode = 'player' | 'library' | 'upload';

const LPlayerPage = () => {
  const { setPlaylist, setIsPlaying } = useAudioPlayerStore();
  const [viewMode, setViewMode] = useState<ViewMode>('player');

  useEffect(() => {
    loadPlaylist();

    return () => {
      setPlaylist([]);
      setIsPlaying(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPlaylist = async () => {
    try {
      const data = await fetchPlaylist();
      setPlaylist(data);
    } catch (error) {
      console.error('플레이리스트 로드 실패:', error);
    }
  };

  const handleUploadSuccess = async (url: string) => {
    console.log('업로드 성공:', url);
    await loadPlaylist();
    setViewMode('player');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-2 py-4 pb-24 dark:from-gray-900 dark:via-gray-800 dark:to-violet-900/20 md:px-4 md:py-6 md:pb-28">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* 서브 헤더 */}
        <div className="mb-6 space-y-4 px-2 sm:px-4 lg:px-8">
          {/* 메인 헤더 섹션 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 p-6 text-white shadow-xl">
            {/* 배경 장식 */}
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/5"></div>

            <div className="relative flex items-center gap-3">
              <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold lg:text-3xl">LPlayer</h1>
                <p className="mt-1 text-sm text-violet-100">LP 녹음 파일을 업로드하고 재생하세요</p>
              </div>
            </div>
          </div>

          {/* 탭 네비게이션 */}
          <div className="flex items-center gap-2 overflow-x-auto rounded-xl bg-white p-2 shadow-md dark:bg-gray-800">
            <button
              onClick={() => setViewMode('player')}
              className={`flex min-w-fit items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                viewMode === 'player'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Play className="h-4 w-4" />
              <span>재생</span>
            </button>
            <button
              onClick={() => setViewMode('library')}
              className={`flex min-w-fit items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                viewMode === 'library'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Library className="h-4 w-4" />
              <span>라이브러리</span>
            </button>
            <button
              onClick={() => setViewMode('upload')}
              className={`flex min-w-fit items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                viewMode === 'upload'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Upload className="h-4 w-4" />
              <span>업로드</span>
            </button>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="mt-8 px-2 sm:px-4 lg:px-8">
          {viewMode === 'player' && (
            <div className="mx-auto flex flex-col items-center justify-center gap-6 md:gap-8 lg:flex-row lg:items-stretch lg:gap-10">
              <Player />
              <div className="flex w-full max-w-[400px] flex-col justify-between gap-4 md:max-w-[400px] lg:min-w-[400px]">
                <Playlist />
                <div className="flex grow">
                  <LyricsPanel />
                </div>
              </div>
            </div>
          )}

          {viewMode === 'library' && <PlaylistManager />}

          {viewMode === 'upload' && <RecordingUpload onUploadSuccess={handleUploadSuccess} />}
        </div>
      </div>

      <MiniPlayer />
    </div>
  );
};

export default LPlayerPage;
