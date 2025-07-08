'use client';

import { useState } from 'react';

import TabMenu from './TabMenu';

import { useAudioPlayerStore } from '@/store/audioPlayerStore';

import PlaylistDuration from './PlaylistDuration';

const Playlist = () => {
  const [selected, setSelected] = useState<'playlist' | 'collection'>('playlist');
  const { playlist, currentTrackId, setCurrentTrackId } = useAudioPlayerStore();

  return (
    <div className="animate-slide-up mx-auto flex max-h-[70vh] w-full min-w-[260px] max-w-[400px] flex-col gap-8 overflow-y-auto sm:mx-0 md:max-w-[400px] lg:min-w-[400px] xl:max-w-[400px]">
      <TabMenu selected={selected} setSelected={setSelected} />
      <div className="rounded-2xl bg-white p-4 shadow-md dark:bg-gray-900">
        <h3 className="mb-4 font-bold text-gray-800 dark:text-white">
          {selected === 'playlist' ? '현재 재생 목록' : '내 컬렉션'}
        </h3>
        <ul className="space-y-2">
          {playlist.map((item, i) => {
            const isActive = item.id === currentTrackId;
            return (
              <li
                key={item.id}
                onClick={() => setCurrentTrackId(item.id)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isActive ? 'bg-violet-100 font-semibold text-violet-700' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full text-xl text-white ${
                      isActive ? 'bg-violet-600' : 'bg-gradient-to-r from-violet-400 to-blue-400'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p>{item.title}</p>
                    <p className="text-xs text-gray-500">{item.artist}</p>
                  </div>
                </div>
                {/* duration은 Player에서 동적으로 관리되므로, 현재 곡만 표시 */}
                {isActive && (
                  <span className="font-semibold text-violet-700">
                    <PlaylistDuration />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Playlist;
