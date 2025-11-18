'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Plus, Upload, Disc3, Speaker, Headphones } from 'lucide-react';
import { useGearSearch } from '../../hooks/useGearSearch';
import { useAddGear, useCreateTempGear } from '../../hooks/useUserGear';
import type { GearSearchResult } from '../../api/types';

interface GearAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  gearClass?: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE';
}

const GearAddModal: React.FC<GearAddModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  gearClass
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedGearClass, setSelectedGearClass] = useState<'TURNTABLE' | 'SPEAKER' | 'HEADPHONE'>(gearClass || 'TURNTABLE');
  const [selectedGear, setSelectedGear] = useState<GearSearchResult | null>(null);
  const [showTempGearForm, setShowTempGearForm] = useState(false);
  
  // 임시 장비 폼 상태
  const [tempGearData, setTempGearData] = useState({
    modelName: '',
    brand: '',
    gearClass: selectedGearClass,
  });
  const [tempGearImage, setTempGearImage] = useState<File | null>(null);
  
  const searchTimeout = useRef<NodeJS.Timeout>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { searchResults, isSearching, searchError, search, clearSearch } = useGearSearch();
  const { isAdding, addError, addGear } = useAddGear();
  const { isCreating, createError, createGear } = useCreateTempGear();

  // 검색 키워드 변경 시 디바운스 검색
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      if (searchKeyword.trim()) {
        search(searchKeyword, selectedGearClass);
      } else {
        clearSearch();
      }
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchKeyword, selectedGearClass, search, clearSearch]);

  // 장비 클래스 변경 시 검색 초기화
  useEffect(() => {
    if (gearClass) {
      setSelectedGearClass(gearClass);
    }
  }, [gearClass]);

  useEffect(() => {
    setTempGearData(prev => ({
      ...prev,
      gearClass: selectedGearClass
    }));
  }, [selectedGearClass]);

  // 모달 닫기 시 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setSearchKeyword('');
      setSelectedGear(null);
      setShowTempGearForm(false);
      clearSearch();
      setTempGearData({
        modelName: '',
        brand: '',
        gearClass: selectedGearClass,
      });
      setTempGearImage(null);
    }
  }, [isOpen, selectedGearClass, clearSearch]);

  const handleAddGear = async () => {
    if (!selectedGear) return;

    const success = await addGear({
      gearId: selectedGear.gearId,
      gearClass: selectedGear.eqClass
    });

    if (success) {
      onSuccess();
      onClose();
    }
  };

  // 검색 결과 클릭 시 바로 장비 추가
  const handleGearClick = async (gear: GearSearchResult) => {
    if (isAdding) return; // 이미 추가 중이면 클릭 방지

    const success = await addGear({
      gearId: gear.gearId,
      gearClass: gear.eqClass
    });

    if (success) {
      onSuccess();
      onClose();
    }
  };

  const handleCreateTempGear = async () => {
    if (!tempGearData.modelName.trim() || !tempGearData.brand.trim()) {
      alert('모델명과 브랜드를 입력해주세요.');
      return;
    }

    const result = await createGear({
      modelName: tempGearData.modelName.trim(),
      brand: tempGearData.brand.trim(),
      gearClass: tempGearData.gearClass,
      specJson: {}
    }, tempGearImage || undefined);

    if (result) {
      alert('임시 장비가 생성되었습니다. 관리자 승인 후 검색에 나타납니다.');
      setShowTempGearForm(false);
      // 검색을 다시 해서 새로 생성된 장비가 나타나는지 확인
      if (searchKeyword.trim()) {
        search(searchKeyword, selectedGearClass);
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTempGearImage(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            장비 추가
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* 임시 장비 생성 폼 */}
          {showTempGearForm ? (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  새 기기 추가하기
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  원하는 장비가 검색되지 않는다면 직접 추가해보세요.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    장비 분류 *
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: 'TURNTABLE', label: '턴테이블', icon: Disc3 },
                      { value: 'SPEAKER', label: '스피커', icon: Speaker },
                      { value: 'HEADPHONE', label: '헤드폰', icon: Headphones }
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setTempGearData(prev => ({
                          ...prev,
                          gearClass: value as 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE'
                        }))}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-lg border transition-all ${
                          tempGearData.gearClass === value
                            ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    브랜드 *
                  </label>
                  <input
                    type="text"
                    value={tempGearData.brand}
                    onChange={(e) => setTempGearData(prev => ({
                      ...prev,
                      brand: e.target.value
                    }))}
                    placeholder="브랜드명을 입력해주세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    모델명 *
                  </label>
                  <input
                    type="text"
                    value={tempGearData.modelName}
                    onChange={(e) => setTempGearData(prev => ({
                      ...prev,
                      modelName: e.target.value
                    }))}
                    placeholder="모델명을 입력해주세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    이미지 (선택사항)
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      이미지 선택
                    </button>
                    {tempGearImage && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {tempGearImage.name}
                      </span>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {createError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                  {createError}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowTempGearForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  취소
                </button>
                <button
                  onClick={handleCreateTempGear}
                  disabled={isCreating || !tempGearData.modelName.trim() || !tempGearData.brand.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? '생성 중...' : '만들기'}
                </button>
              </div>
            </div>
          ) : (
            /* 장비 검색 */
            <div className="space-y-6">
              <div className="text-center mb-4">
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  📝 모든 장비 검색은 영문에 기준합니다
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  브랜드명이나 모델명을 영어로 검색해주세요
                </p>
              </div>

              {/* 검색 필터 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  장비 분류
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'TURNTABLE', label: '턴테이블', icon: Disc3 },
                    { value: 'SPEAKER', label: '스피커', icon: Speaker },
                    { value: 'HEADPHONE', label: '헤드폰', icon: Headphones }
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSelectedGearClass(value as 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                        selectedGearClass === value
                          ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 검색 입력 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="장비명을 검색해주세요 (영문)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* 검색 결과 */}
              <div className="min-h-[300px] max-h-[400px] overflow-y-auto border border-gray-200 rounded-lg dark:border-gray-700">
                {isSearching ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-gray-500">검색 중...</div>
                  </div>
                ) : searchError ? (
                  <div className="p-4 text-red-500 text-center">{searchError}</div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-2 p-4">
                    {searchResults.map((gear) => (
                      <div
                        key={gear.gearId}
                        onClick={() => handleGearClick(gear)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          isAdding 
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50 dark:border-gray-700 dark:bg-gray-800' 
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-blue-900/20'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {gear.img ? (
                            <img
                              src={gear.img}
                              alt={gear.name}
                              className="w-12 h-12 object-cover rounded-lg"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center dark:bg-gray-700">
                              <span className="text-gray-400 text-xs">No Image</span>
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {gear.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {gear.brand} · {gear.modelName}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchKeyword.trim() ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="text-gray-500 mb-2">검색 결과가 없습니다</div>
                      <button
                        onClick={() => setShowTempGearForm(true)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        직접 장비를 추가해보세요
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-gray-400">장비명을 검색해보세요</div>
                  </div>
                )}
              </div>

              {/* 새 기기 추가 버튼 */}
              <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <button
                  onClick={() => setShowTempGearForm(true)}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  새 기기 추가하기
                </button>
              </div>

              {addError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                  {addError}
                </div>
              )}

              {/* 액션 버튼 */}
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  취소
                </button>
                <button
                  onClick={handleAddGear}
                  disabled={!selectedGear || isAdding}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAdding ? '추가 중...' : '추가'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GearAddModal;