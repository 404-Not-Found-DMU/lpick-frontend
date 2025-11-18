'use client';

import React from 'react';
import {
  Key,
  Mail,
  Trash2,
  Settings as SettingsIcon,
  ChevronRight,
  User,
  Lock,
  Brain,
  Bell,
  Eye,
  Loader2,
} from 'lucide-react';
import { useAccountDelete } from '../../hooks/useAccountDelete';
import { useUserStore } from '@/store/userStore';
import { useUserSettings } from '@/shared/hooks';
import { UserPrivacySettings, UserNotificationSettings } from '@/shared/types';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

interface SettingCardProps {
  icon: React.ElementType;
  title: string;
  description?: string;
  children: React.ReactNode;
}

interface MenuButtonProps {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  danger?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex-1">
      <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        checked ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
      }`}
      aria-label={`${label} ${checked ? '켜짐' : '꺼짐'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

const SettingCard: React.FC<SettingCardProps> = ({ icon: Icon, title, description, children }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
        <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
    </div>
    {children}
  </div>
);

const MenuButton: React.FC<MenuButtonProps> = ({
  icon: Icon,
  title,
  subtitle,
  onClick,
  danger = false,
}) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center justify-between rounded-xl p-4 transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${
      danger ? 'hover:bg-red-50 dark:hover:bg-red-900/20' : ''
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon className={`h-5 w-5 ${danger ? 'text-red-600 dark:text-red-400' : 'text-gray-500'}`} />
      <div className="text-left">
        <div
          className={`font-medium ${danger ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}
        >
          {title}
        </div>
        {subtitle && <div className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</div>}
      </div>
    </div>
    <ChevronRight
      className={`h-4 w-4 ${danger ? 'text-red-600 dark:text-red-400' : 'text-gray-400'}`}
    />
  </button>
);

const SettingsTab: React.FC = () => {
  const { handleDeleteAccount, isLoading: isDeleting } = useAccountDelete();
  const { userInfo } = useUserStore();
  const { settings, loading, error, updateSettings } = useUserSettings();

  // LPTI 유효성 체크 함수
  const hasValidLPTI = () => {
    if (!userInfo?.lpti) return false;
    
    if (typeof userInfo.lpti === 'string') {
      return userInfo.lpti.trim() !== '';
    }
    
    if (typeof userInfo.lpti === 'object') {
      return !!(userInfo.lpti.code && userInfo.lpti.code.trim() !== '');
    }
    
    return false;
  };

  // 프라이버시 설정 업데이트
  const updatePrivacy = async (key: keyof UserPrivacySettings, value: boolean) => {
    if (!settings) return;
    
    try {
      // 부분 업데이트: 해당 프라이버시 설정만 전송
      await updateSettings({
        privacy: {
          [key]: value,
        }
      });
    } catch (err) {
      console.error('프라이버시 설정 업데이트 실패:', err);
    }
  };

  // 알림 설정 업데이트
  const updateNotification = async (key: keyof UserNotificationSettings, value: boolean) => {
    if (!settings) return;
    
    try {
      // 부분 업데이트: 해당 알림 설정만 전송
      await updateSettings({
        notification: {
          [key]: value,
        }
      });
    } catch (err) {
      console.error('알림 설정 업데이트 실패:', err);
    }
  };

  // 프라이버시 설정 항목들
  const privacyItems = [
    { 
      key: 'allowViewActCount' as keyof UserPrivacySettings, 
      label: '활동 통계 공개', 
      description: '다른 사용자가 내 활동 통계를 볼 수 있습니다' 
    },
    { 
      key: 'allowViewRecentAct' as keyof UserPrivacySettings, 
      label: '최근 활동 공개', 
      description: '다른 사용자가 내 최근 활동을 볼 수 있습니다' 
    },
    { 
      key: 'allowViewGear' as keyof UserPrivacySettings, 
      label: '장비 정보 공개', 
      description: '다른 사용자가 내 장비 정보를 볼 수 있습니다' 
    },
    { 
      key: 'allowViewCollection' as keyof UserPrivacySettings, 
      label: '컬렉션 공개', 
      description: '다른 사용자가 내 앨범 컬렉션을 볼 수 있습니다' 
    },
  ];

  // 알림 설정 항목들
  const notificationItems = [
    { 
      key: 'isAlarmWikiEdit' as keyof UserNotificationSettings, 
      label: '위키 편집 알림', 
      description: '위키 페이지가 수정되었을 때 알림을 받습니다' 
    },
    { 
      key: 'isAlarmNewDebateAnswer' as keyof UserNotificationSettings, 
      label: '토론 답변 알림', 
      description: '토론에 새로운 답변이 달렸을 때 알림을 받습니다' 
    },
    { 
      key: 'isAlarmCommented' as keyof UserNotificationSettings, 
      label: '댓글 알림', 
      description: '내 게시글에 댓글이 달렸을 때 알림을 받습니다' 
    },
    { 
      key: 'isAlarmEvent' as keyof UserNotificationSettings, 
      label: '이벤트 알림', 
      description: '새로운 이벤트가 있을 때 알림을 받습니다' 
    },
  ];

  const accountMenuItems = [
    { icon: User, title: '프로필 정보 수정', subtitle: '이름, 프로필 사진 등' },
    { icon: Key, title: '비밀번호 변경', subtitle: '새로운 비밀번호로 변경' },
    { icon: Mail, title: '이메일 변경', subtitle: '계정 이메일 주소 변경' },
    { icon: Lock, title: '2단계 인증', subtitle: '보안 강화를 위한 2FA 설정' },
  ];

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">설정을 불러오는 중...</span>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
        <div className="text-red-600 dark:text-red-400">설정을 불러올 수 없습니다: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <SettingsIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">설정</h2>
            <p className="text-indigo-100">계정과 개인정보를 관리하세요</p>
          </div>
        </div>
      </div>

      {/* 프라이버시 설정 */}
      <SettingCard
        icon={Eye}
        title="프라이버시 설정"
        description="내 정보 공개 범위를 설정하세요"
      >
        <div className="space-y-1">
          {privacyItems.map(({ key, label, description }) => (
            <ToggleSwitch
              key={key}
              checked={settings?.privacy[key] || false}
              onChange={(value) => updatePrivacy(key, value)}
              label={label}
              description={description}
            />
          ))}
        </div>
      </SettingCard>

      {/* 알림 설정 */}
      <SettingCard
        icon={Bell}
        title="알림 설정"
        description="받고 싶은 알림을 선택하세요"
      >
        <div className="space-y-1">
          {notificationItems.map(({ key, label, description }) => (
            <ToggleSwitch
              key={key}
              checked={settings?.notification[key] || false}
              onChange={(value) => updateNotification(key, value)}
              label={label}
              description={description}
            />
          ))}
        </div>
      </SettingCard>

      {/* LPTI Information */}
      <SettingCard
        icon={Brain}
        title="내 LPTI"
        description="나의 LP 성향 유형"
      >
        <div className="space-y-4">
          {hasValidLPTI() ? (
            <div className="rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-4 dark:from-purple-900/20 dark:to-pink-900/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg">
                  {typeof userInfo!.lpti === 'string' ? userInfo!.lpti : userInfo!.lpti!.code}
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">
                    {typeof userInfo!.lpti === 'string' 
                      ? userInfo!.lpti 
                      : (userInfo!.lpti!.nickname || userInfo!.lpti!.code)
                    }
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    LP 성향 유형
                  </p>
                </div>
              </div>
              {typeof userInfo!.lpti === 'object' && userInfo!.lpti.summary && (
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {userInfo!.lpti.summary}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                아직 LPTI 검사를 받지 않았습니다
              </p>
              <button 
                onClick={() => window.location.href = '/lpti'}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
              >
                LPTI 검사 받기
              </button>
            </div>
          )}
        </div>
      </SettingCard>

      {/* Account Management */}
      <SettingCard
        icon={User}
        title="계정 관리"
        description="계정 정보를 변경하거나 계정을 삭제할 수 있습니다"
      >
        <div className="space-y-1">
          {accountMenuItems.map((item, index) => (
            <MenuButton key={index} {...item} />
          ))}
          <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
            <MenuButton
              icon={Trash2}
              title="계정 삭제"
              subtitle={isDeleting ? "삭제 중..." : "계정을 영구적으로 삭제합니다"}
              onClick={handleDeleteAccount}
              danger
            />
          </div>
        </div>
      </SettingCard>
    </div>
  );
};

export default SettingsTab;
