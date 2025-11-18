'use client';

import React, { useState } from 'react';
import { Headphones, Plus, Star, ExternalLink, Loader2, Settings, Disc3, Speaker } from 'lucide-react';
import { useGearManager, useUserGearList } from '../../hooks';
import { useUserStore } from '@/store/userStore';
import GearAddModal from '../modals/GearAddModal';
import AllGearModal from '../modals/AllGearModal';

const EquipmentSection = () => {
  const { userInfo } = useUserStore();
  const { 
    data: gearData, 
    isLoading, 
    error, 
    toggleFavorite, 
    refetch
  } = useGearManager();
  const gearList = useUserGearList(gearData);
  
  // 모달 상태
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAllGearModal, setShowAllGearModal] = useState(false);
  const [selectedGearClass, setSelectedGearClass] = useState<'TURNTABLE' | 'SPEAKER' | 'HEADPHONE'>('TURNTABLE');

  // 아이콘 매핑
  const getGearIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'speaker':
        return <Speaker className="h-6 w-6" />;
      case 'headphone':
        return <Headphones className="h-6 w-6" />;
      case 'turntable':
        return <Disc3 className="h-6 w-6" />;
      default:
        return <Settings className="h-6 w-6" />;
    }
  };

  // 이벤트 핸들러들
  const handleToggleFavorite = async (userGearId: string, currentFavorite: boolean) => {
    await toggleFavorite(userGearId, !currentFavorite);
  };

  const handleOpenAddModal = (gearClass: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE') => {
    setSelectedGearClass(gearClass);
    setShowAddModal(true);
  };

  const handleOpenAllGearModal = (gearClass: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE') => {
    setSelectedGearClass(gearClass);
    setShowAllGearModal(true);
  };

  const handleAddSuccess = () => {
    refetch(); // 장비 목록 새로고침
  };

  // 로그인하지 않은 경우
  if (!userInfo) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">로그인 후 장비 정보를 확인해보세요.</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 처리 - 장비가 없는 것으로 표시, 최대 4개까지만 표시
  const effectiveGearList = error ? [] : gearList.slice(0, 4);

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
        <button 
          onClick={() => handleOpenAddModal('TURNTABLE')}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
        >
          <Plus className="h-4 w-4" />
          장비 추가
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          // 로딩 상태 (3개 항목)
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-gray-100 p-4 dark:border-gray-800">
              <div className="animate-pulse">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded dark:bg-gray-700" />
                    <div>
                      <div className="h-3 w-16 bg-gray-200 rounded mb-2 dark:bg-gray-700" />
                      <div className="h-4 w-32 bg-gray-200 rounded mb-1 dark:bg-gray-700" />
                      <div className="h-3 w-20 bg-gray-200 rounded dark:bg-gray-700" />
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
              </div>
            </div>
          ))
        ) : effectiveGearList.length > 0 ? (
          // 실제 장비 데이터
          effectiveGearList.map((item, index) => (
            <div
              key={item.id || `gear-${index}`}
              onClick={() => handleOpenAllGearModal(item.type.toUpperCase() as 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE')}
              className="group rounded-2xl border border-gray-100 p-3 transition-all duration-300 hover:border-teal-200 hover:bg-gradient-to-br hover:from-teal-50/50 hover:to-cyan-50/50 hover:shadow-lg cursor-pointer dark:border-gray-800 dark:hover:border-teal-700"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="text-teal-600 dark:text-teal-400 flex-shrink-0">{getGearIcon(item.type)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      {item.type}
                    </div>
                    <h4 className="font-bold text-gray-900 transition-colors group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400 truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{item.brand}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(item.id, item.favorite);
                    }}
                    disabled={isLoading}
                    className="transition-colors hover:scale-110 p-1"
                  >
                    <Star className={`h-4 w-4 ${item.favorite ? 'fill-current text-yellow-500' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  보유중
                </span>
                <div className="flex items-center gap-1">
                  {item.wikiId && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // 위키 페이지로 이동 로직 추가 가능
                      }}
                      className="flex items-center gap-1 text-xs font-medium text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400"
                    >
                      <ExternalLink className="h-3 w-3" />
                      정보
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          // 장비가 없는 경우 (에러 포함)
          <div 
            onClick={() => handleOpenAddModal('TURNTABLE')}
            className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors dark:hover:bg-gray-800"
          >
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">장비가 없습니다.</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">상단의 &apos;장비 추가&apos; 버튼을 눌러 첫 번째 장비를 등록해보세요.</p>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            로딩 중...
          </div>
        )}
      </div>
      
      {/* 장비 추가 모달 */}
      <GearAddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
        gearClass={selectedGearClass}
      />
      
      {/* 전체 장비 모달 */}
      <AllGearModal
        isOpen={showAllGearModal}
        onClose={() => setShowAllGearModal(false)}
        gearClass={selectedGearClass}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
};

export default EquipmentSection;
