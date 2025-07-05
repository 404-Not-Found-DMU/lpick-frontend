'use client';

import { useState } from 'react';
import TabMenu from './TabMenu';

const playlist = [
  {
    id: 1,
    title: 'Pink Floyd - The Dark Side of the Moon',
    artist: 'Pink Floyd',
    duration: '3:45',
  },
  { id: 2, title: 'Miles Davis - Kind of Blue', artist: 'Miles Davis', duration: '4:12' },
  { id: 3, title: 'Fleetwood Mac - Rumours', artist: 'Fleetwood Mac', duration: '3:58' },
  { id: 4, title: 'The Beatles - Abbey Road', artist: 'The Beatles', duration: '4:30' },
  { id: 5, title: 'Radiohead - OK Computer', artist: 'Radiohead', duration: '5:15' },
];

const Playlist = () => {
  const [selected, setSelected] = useState<'playlist' | 'collection'>('playlist');
  const [selectedTrackId, setSelectedTrackId] = useState<number>(1);

  return (
    <div className="animate-slide-up mx-auto flex max-h-[70vh] w-full max-w-[400px] flex-col gap-8 overflow-y-auto sm:mx-0">
      <TabMenu selected={selected} setSelected={setSelected} />
      <div className="rounded-2xl bg-white p-4 shadow-md">
        <h3 className="mb-4 font-bold text-gray-800">
          {selected === 'playlist' ? '현재 재생 목록' : '내 컬렉션'}
        </h3>
        <ul className="space-y-2">
          {playlist.map((item, i) => {
            const isActive = item.id === selectedTrackId;
            return (
              <li
                key={item.id}
                onClick={() => setSelectedTrackId(item.id)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg p-2 text-sm hover:bg-gray-100 ${
                  isActive ? 'bg-purple-100 font-semibold text-purple-700' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full text-xl text-white ${
                      isActive ? 'bg-purple-600' : 'bg-gradient-to-r from-purple-400 to-blue-400'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p>{item.title}</p>
                    <p className="text-xs text-gray-500">{item.artist}</p>
                  </div>
                </div>
                <span className={`${isActive ? 'font-semibold text-purple-700' : 'text-gray-500'}`}>
                  {item.duration}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Playlist;
