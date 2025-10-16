'use client';

import { useMemo, useState } from 'react';

import TabMenu from './TabMenu';

import { useAudioPlayerStore } from '@/store/audioPlayerStore';

import PlaylistDuration from './PlaylistDuration';

const Playlist = () => {
  const [selected, setSelected] = useState<'playlist' | 'collection'>('playlist');
  const { playlist, currentTrackId, setCurrentTrackId, currentTime, duration } = useAudioPlayerStore();

  // 현재 트랙 진행 퍼센트 (리스트에서 1px 진행바)
  const progressPercent = useMemo(() => {
    if (!duration || duration <= 0) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  return (
    <div className="animate-slide-up mx-auto flex max-h-[60vh] w-full min-w-[260px] max-w-[400px] flex-col gap-6 sm:mx-0 md:max-w-[400px] lg:min-w-[400px] xl:max-w-[400px]">
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
                className={`group relative flex min-h-[56px] cursor-pointer items-center justify-between gap-2 rounded-lg p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isActive ? 'bg-violet-100 font-semibold text-violet-700' : ''
                }`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentTrackId(item.id);
                  }
                }}
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

                {/* 우측 메타(현재 곡만 표기) */}
                <div className="ml-2 flex items-center gap-2">
                  {isActive && (
                    <>
                      <span className="inline-flex items-end gap-[2px] text-violet-700">
                        <span className="h-[8px] w-[2px] animate-[eq1_0.6s_ease-in-out_infinite] rounded-sm bg-violet-600"></span>
                        <span className="h-[12px] w-[2px] animate-[eq2_0.6s_ease-in-out_infinite] rounded-sm bg-violet-600"></span>
                        <span className="h-[6px] w-[2px] animate-[eq3_0.6s_ease-in-out_infinite] rounded-sm bg-violet-600"></span>
                      </span>
                      <span className="font-semibold text-violet-700">
                        <PlaylistDuration />
                      </span>
                    </>
                  )}
                </div>

                {/* 재생중 진행 바 (1px) */}
                {isActive && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden rounded-b-lg bg-violet-200"
                  >
                    <div className="h-full bg-violet-600" style={{ width: `${progressPercent}%` }} />
                  </div>
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
