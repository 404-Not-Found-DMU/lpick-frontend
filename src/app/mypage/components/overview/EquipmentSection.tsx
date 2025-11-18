'use client';

import React, { useState } from 'react';
import { Headphones, Plus, Star, ExternalLink, Loader2, Settings, Trash2, Disc3, Speaker } from 'lucide-react';
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
    deleteGear,
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

  const handleDeleteGear = async (userGearId: string) => {
    if (confirm('정말로 이 장비를 삭제하시겠습니까?')) {
      await deleteGear(userGearId);
    }
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

  // 에러 처리 - 장비가 없는 것으로 표시
  const effectiveGearList = error ? [] : gearList;

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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          // 로딩 상태
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
          effectiveGearList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenAllGearModal(item.type.toUpperCase() as 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE')}
              className="group rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:border-teal-200 hover:bg-gradient-to-br hover:from-teal-50/50 hover:to-cyan-50/50 hover:shadow-lg cursor-pointer dark:border-gray-800 dark:hover:border-teal-700"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-teal-600 dark:text-teal-400">{getGearIcon(item.type)}</div>
                  <div>
                    <div className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      {item.type}
                    </div>
                    <h4 className="font-bold text-gray-900 transition-colors group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.brand}</p>
                    {item.modelName && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">{item.modelName}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleToggleFavorite(item.id, item.favorite)}
                    disabled={isLoading}
                    className="transition-colors hover:scale-110"
                  >
                    <Star className={`h-4 w-4 ${item.favorite ? 'fill-current text-yellow-400' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={() => handleDeleteGear(item.id)}
                    disabled={isLoading}
                    className="transition-colors hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4 text-gray-400" />
                  </button>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    보유중
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    모델: {item.modelName || '정보 없음'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {item.wikiId && (
                    <button className="flex items-center gap-1 text-xs font-medium text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400">
                      <ExternalLink className="h-3 w-3" />
                      상세정보
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
            className="col-span-1 md:col-span-2 text-center py-8 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors dark:hover:bg-gray-800"
          >
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">장비가 없습니다.</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">상단의 &apos;장비 추가&apos; 버튼을 눌러 첫 번째 장비를 등록해보세요.</p>
          </div>
        )}
      </div>

      {/* 모든 기기 보기 버튼 */}
      {effectiveGearList.length > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              const firstGearType = effectiveGearList[0]?.type.toUpperCase() as 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE';
              handleOpenAllGearModal(firstGearType || 'TURNTABLE');
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
          >
            <Settings className="h-4 w-4 mr-2" />
            모든 기기 보기
          </button>
        </div>
      )}

      <div className="mt-4 text-center">
        {effectiveGearList.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              총 {effectiveGearList.length}개의 장비
            </span>
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                로딩 중...
              </div>
            )}
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
