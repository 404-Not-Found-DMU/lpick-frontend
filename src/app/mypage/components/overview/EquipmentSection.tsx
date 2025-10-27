'use client';

import React, { useState } from 'react';
import { Headphones, Plus, Star, ExternalLink, Loader2, Settings, Trash2, X } from 'lucide-react';
import { useGearManager, useGearList } from '../../hooks';
import { useUserStore } from '@/store/userStore';
import type { AddGearRequest } from '../../api/types';

const EquipmentSection = () => {
  const { userInfo } = useUserStore();
  const { 
    data: gearData, 
    isLoading, 
    error, 
    toggleFavorite, 
    addGear, 
    deleteGear 
  } = useGearManager();
  const gearList = useGearList(gearData);
  
  // 장비 추가 모달 상태
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGear, setNewGear] = useState<AddGearRequest>({
    gearClass: 'SPEAKER',
    gearId: ''
  });

  // 아이콘 매핑
  const getGearIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'speaker':
        return '🔊';
      case 'headphone':
        return '🎧';
      case 'turntable':
        return '🎛️';
      default:
        return '📻';
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

  const handleAddGear = async () => {
    if (!newGear.gearId.trim()) {
      alert('장비 ID를 입력해주세요.');
      return;
    }
    
    const success = await addGear(newGear);
    if (success) {
      setShowAddModal(false);
      setNewGear({ gearClass: 'SPEAKER', gearId: '' });
    }
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

  // 에러 처리
  if (error) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Settings className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-500 mb-2 font-semibold">장비 정보를 불러오는데 실패했습니다</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              잠시 후 다시 시도해주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          onClick={() => setShowAddModal(true)}
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
        ) : gearList.length > 0 ? (
          // 실제 장비 데이터
          gearList.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:border-teal-200 hover:bg-gradient-to-br hover:from-teal-50/50 hover:to-cyan-50/50 hover:shadow-lg dark:border-gray-800 dark:hover:border-teal-700"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getGearIcon(item.type)}</div>
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
          // 장비가 없는 경우
          <div className="col-span-1 md:col-span-2 text-center py-8">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">등록된 장비가 없습니다.</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">상단의 &apos;장비 추가&apos; 버튼을 눌러 첫 번째 장비를 등록해보세요.</p>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        {gearList.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              총 {gearList.length}개의 장비
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
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">장비 추가</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  장비 종류
                </label>
                <select
                  value={newGear.gearClass}
                  onChange={(e) => setNewGear({ ...newGear, gearClass: e.target.value as 'SPEAKER' | 'HEADPHONE' | 'TURNTABLE' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                  <option value="SPEAKER">스피커</option>
                  <option value="HEADPHONE">헤드폰</option>
                  <option value="TURNTABLE">턴테이블</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  장비 ID
                </label>
                <input
                  type="text"
                  value={newGear.gearId}
                  onChange={(e) => setNewGear({ ...newGear, gearId: e.target.value })}
                  placeholder="장비 ID를 입력하세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleAddGear}
                disabled={isLoading || !newGear.gearId.trim()}
                className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '추가 중...' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentSection;
