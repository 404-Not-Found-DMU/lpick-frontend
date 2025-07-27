'use client';

import React from 'react';
import { Headphones, Plus, Star, ExternalLink } from 'lucide-react';

const EquipmentSection = () => {
  const equipment = [
    {
      id: 1,
      category: '턴테이블',
      name: 'Technics SL-1200MK7',
      brand: 'Technics',
      rating: 4.8,
      image: '🎛️',
      status: '사용중',
      color: 'bg-blue-500',
    },
    {
      id: 2,
      category: '헤드폰',
      name: 'Sony WH-1000XM4',
      brand: 'Sony',
      rating: 4.6,
      image: '🎧',
      status: '사용중',
      color: 'bg-violet-500',
    },
    {
      id: 3,
      category: '앰프',
      name: 'Marantz PM6007',
      brand: 'Marantz',
      rating: 4.7,
      image: '📻',
      status: '사용중',
      color: 'bg-green-500',
    },
    {
      id: 4,
      category: '스피커',
      name: 'KEF LS50 Meta',
      brand: 'KEF',
      rating: 4.9,
      image: '🔊',
      status: '위시리스트',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg">
            <Headphones className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">내 장비 목록</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">오디오 장비와 위시리스트</p>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
          <Plus className="h-4 w-4" />
          장비 추가
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {equipment.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:border-teal-200 hover:bg-gradient-to-br hover:from-teal-50/50 hover:to-cyan-50/50 hover:shadow-lg dark:border-gray-800 dark:hover:border-teal-700"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{item.image}</div>
                <div>
                  <div className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                    {item.category}
                  </div>
                  <h4 className="font-bold text-gray-900 transition-colors group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.brand}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  item.status === '사용중'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.rating}
                </span>
              </div>
              <button className="flex items-center gap-1 text-xs font-medium text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400">
                <ExternalLink className="h-3 w-3" />
                상세정보
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
          장비 목록 전체보기
        </button>
      </div>
    </div>
  );
};

export default EquipmentSection;
