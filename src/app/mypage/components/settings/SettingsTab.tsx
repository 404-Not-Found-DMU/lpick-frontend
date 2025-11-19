'use client';

import React, { useCallback, useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Eye,
  Loader2,
} from 'lucide-react';
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

const ToggleSwitch: React.FC<ToggleSwitchProps> = React.memo(({ checked, onChange, label, description }) => (
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
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
));

ToggleSwitch.displayName = 'ToggleSwitch';

const SettingCard: React.FC<SettingCardProps> = React.memo(({ icon: Icon, title, description, children }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/20">
        <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
    </div>
    {children}
  </div>
));

SettingCard.displayName = 'SettingCard';

const SettingsTab: React.FC = () => {
  const { settings, loading, error, updateSettings } = useUserSettings();
  
  // 로컬 상태로 즉시 UI 업데이트
  const [localPrivacy, setLocalPrivacy] = useState<UserPrivacySettings | null>(null);
  const [localNotification, setLocalNotification] = useState<UserNotificationSettings | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 설정 로드 시 로컬 상태 동기화
  useEffect(() => {
    if (settings && !isInitialized) {
      setLocalPrivacy(settings.privacy);
      setLocalNotification(settings.notification);
      setIsInitialized(true);
    }
  }, [settings, isInitialized]);

  // 프라이버시 설정 업데이트
  const updatePrivacy = useCallback(async (key: keyof UserPrivacySettings, value: boolean) => {
    if (!settings || !localPrivacy) return;
    
    // 1. 즉시 로컬 상태 업데이트 (UI 즉시 반영)
    const newPrivacy = { ...localPrivacy, [key]: value };
    setLocalPrivacy(newPrivacy);
    
    // 2. 백그라운드에서 API 호출
    try {
      await updateSettings({
        privacy: newPrivacy,
        theme: settings.theme,
        notification: settings.notification
      });
    } catch (err) {
      console.error('프라이버시 설정 업데이트 실패:', err);
      // 실패 시 로컬 상태 되돌리기
      setLocalPrivacy(localPrivacy);
    }
  }, [settings, localPrivacy, updateSettings]);

  // 알림 설정 업데이트
  const updateNotification = useCallback(async (key: keyof UserNotificationSettings, value: boolean) => {
    if (!settings || !localNotification) return;
    
    // 1. 즉시 로컬 상태 업데이트 (UI 즉시 반영)
    const newNotification = { ...localNotification, [key]: value };
    setLocalNotification(newNotification);
    
    // 2. 백그라운드에서 API 호출
    try {
      await updateSettings({
        privacy: settings.privacy,
        theme: settings.theme,
        notification: newNotification
      });
    } catch (err) {
      console.error('알림 설정 업데이트 실패:', err);
      // 실패 시 로컬 상태 되돌리기
      setLocalNotification(localNotification);
    }
  }, [settings, localNotification, updateSettings]);

  // 개별 토글 컴포넌트로 최적화
  const PrivacyToggle = React.memo(({ privacyKey, label, description }: {
    privacyKey: keyof UserPrivacySettings;
    label: string;
    description?: string;
  }) => {
    const handleChange = useCallback((value: boolean) => {
      updatePrivacy(privacyKey, value);
    }, [privacyKey]);

    return (
      <ToggleSwitch
        checked={displayPrivacy[privacyKey]}
        onChange={handleChange}
        label={label}
        description={description}
      />
    );
  });

  const NotificationToggle = React.memo(({ notificationKey, label, description }: {
    notificationKey: keyof UserNotificationSettings;
    label: string;
    description?: string;
  }) => {
    const handleChange = useCallback((value: boolean) => {
      updateNotification(notificationKey, value);
    }, [notificationKey]);

    return (
      <ToggleSwitch
        checked={displayNotification[notificationKey]}
        onChange={handleChange}
        label={label}
        description={description}
      />
    );
  });

  PrivacyToggle.displayName = 'PrivacyToggle';
  NotificationToggle.displayName = 'NotificationToggle';

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

  // 로딩 상태
  if (loading && !isInitialized) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">설정을 불러오는 중...</span>
      </div>
    );
  }

  // 에러 상태
  if (error && !isInitialized) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
        <div className="text-red-600 dark:text-red-400">설정을 불러올 수 없습니다: {error}</div>
      </div>
    );
  }

  // 초기화되지 않은 경우 기본값으로 렌더링
  const displayPrivacy = localPrivacy || {
    allowViewActCount: false,
    allowViewRecentAct: false,
    allowViewGear: false,
    allowViewCollection: false
  };

  const displayNotification = localNotification || {
    isAlarmWikiEdit: false,
    isAlarmNewDebateAnswer: false,
    isAlarmCommented: false,
    isAlarmEvent: false
  };

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
            <PrivacyToggle
              key={key}
              privacyKey={key}
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
            <NotificationToggle
              key={key}
              notificationKey={key}
              label={label}
              description={description}
            />
          ))}
        </div>
      </SettingCard>
    </div>
  );
};

export default SettingsTab;
