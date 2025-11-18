'use client';

import React, { useEffect } from 'react';
import { X, Star, Trash2, Loader2, Settings } from 'lucide-react';
import { useGearCategoryList } from '../../hooks/useGearList';
import { useGearManager } from '../../hooks/useUserGear';

interface AllGearModalProps {
  isOpen: boolean;
  onClose: () => void;
  gearClass: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE';
  onSuccess?: () => void;
}

const AllGearModal: React.FC<AllGearModalProps> = ({
  isOpen,
  onClose,
  gearClass,
  onSuccess
}) => {
  const { gearList, isLoading, error, fetchGearList } = useGearCategoryList();
  const { toggleFavorite, deleteGear, isLoading: actionLoading } = useGearManager();

  // 모달이 열릴 때 해당 분류의 장비 목록을 불러옴
  useEffect(() => {
    if (isOpen && gearClass) {
      fetchGearList(gearClass);
    }
  }, [isOpen, gearClass, fetchGearList]);

  const getGearClassName = (gearClass: string) => {
    switch (gearClass) {
      case 'TURNTABLE': return '턴테이블';
      case 'SPEAKER': return '스피커';
      case 'HEADPHONE': return '헤드폰';
      default: return '장비';
    }
  };

  const getGearIcon = (gearClass: string) => {
    switch (gearClass) {
      case 'TURNTABLE': return '🎛️';
      case 'SPEAKER': return '🔊';
      case 'HEADPHONE': return '🎧';
      default: return '📻';
    }
  };

  const handleToggleFavorite = async (gearId: string, currentFavorite: boolean) => {
    const success = await toggleFavorite(gearId, !currentFavorite);
    if (success) {
      // 목록 새로고침
      fetchGearList(gearClass);
      onSuccess?.(); // 메인 페이지도 새로고침
    }
  };

  const handleDeleteGear = async (gearId: string) => {
    if (confirm('정말로 이 장비를 삭제하시겠습니까?')) {
      const success = await deleteGear(gearId);
      if (success) {
        // 목록 새로고침
        fetchGearList(gearClass);
        onSuccess?.(); // 메인 페이지도 새로고침
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getGearIcon(gearClass)}</div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                내 {getGearClassName(gearClass)} 목록
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                현재 장비 분류: {getGearClassName(gearClass)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">장비 목록을 불러오는 중...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Settings className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-500 font-medium mb-2">장비 목록을 불러오는데 실패했습니다</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
              </div>
            </div>
          ) : gearList.length > 0 ? (
            <div className="space-y-4">
              {/* 장비 목록 안내 */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  즐겨찾기는 각 분류별로 1개만 설정 가능합니다. (즐겨찾기 → 최신순 정렬)
                </p>
              </div>

              {/* 장비 목록 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gearList.map((gear) => (
                  <div
                    key={gear.id}
                    className="group rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors dark:border-gray-700 dark:hover:border-gray-600"
                  >
                    <div className="flex items-start space-x-4">
                      {/* 장비 이미지 */}
                      <div className="flex-shrink-0">
                        {gear.img ? (
                          <img
                            src={gear.img}
                            alt={gear.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center dark:bg-gray-700">
                            <span className="text-2xl">{getGearIcon(gear.gearClass)}</span>
                          </div>
                        )}
                      </div>

                      {/* 장비 정보 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                              {gear.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {gear.brand}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              모델: {gear.modelName}
                            </p>
                            {gear.favorite && (
                              <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full dark:bg-yellow-900/20 dark:text-yellow-400">
                                즐겨찾기
                              </span>
                            )}
                          </div>

                          {/* 액션 버튼들 */}
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleToggleFavorite(gear.id, gear.favorite)}
                              disabled={actionLoading}
                              className="p-2 text-gray-400 hover:text-yellow-500 transition-colors disabled:opacity-50"
                              title={gear.favorite ? '즐겨찾기 해제' : '즐겨찾기 설정'}
                            >
                              <Star 
                                className={`h-5 w-5 ${
                                  gear.favorite ? 'fill-current text-yellow-400' : ''
                                }`} 
                              />
                            </button>
                            <button
                              onClick={() => handleDeleteGear(gear.id)}
                              disabled={actionLoading}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                              title="장비 삭제"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 장비 개수 표시 */}
              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  총 {gearList.length}개의 {getGearClassName(gearClass)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  등록된 {getGearClassName(gearClass)}가 없습니다.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  장비 추가 버튼을 눌러 첫 번째 장비를 등록해보세요.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllGearModal;