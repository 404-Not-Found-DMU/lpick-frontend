import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserInfo, UserState } from '@/app/login/types';
import { fetchUserInfo } from '@/app/login/hooks';

interface UserStoreActions {
  // 사용자 정보 조회
  getUserInfo: () => Promise<void>;
  // 사용자 정보 설정
  setUserInfo: (userInfo: UserInfo | null) => void;
  // 사용자 정보 업데이트 (부분 업데이트)
  updateUserInfo: (updates: Partial<UserInfo>) => void;
  // 에러 설정
  setError: (error: string | null) => void;
  // 로딩 상태 설정
  setLoading: (isLoading: boolean) => void;
  // 스토어 초기화 (로그아웃 시 사용)
  clearUserInfo: () => void;
}

type UserStore = UserState & UserStoreActions;

export const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      // 초기 상태
      userInfo: null,
      isLoading: false,
      error: null,

      // 사용자 정보 조회
      getUserInfo: async () => {
        const { isLoading } = get();
        
        // 이미 로딩 중이면 중복 호출 방지
        if (isLoading) return;

        set({ isLoading: true, error: null });

        try {
          const userInfo = await fetchUserInfo();
          set({ userInfo, isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '사용자 정보를 불러올 수 없습니다.';
          set({ error: errorMessage, isLoading: false, userInfo: null });
          // 에러를 다시 throw하여 useAuth에서 catch할 수 있도록 함
          throw error;
        }
      },

      // 사용자 정보 직접 설정
      setUserInfo: (userInfo) => {
        set({ userInfo, error: null });
      },

      // 사용자 정보 부분 업데이트
      updateUserInfo: (updates) => {
        set((state) => ({
          userInfo: state.userInfo ? { ...state.userInfo, ...updates } : null,
        }));
      },

      // 에러 설정
      setError: (error) => {
        set({ error });
      },

      // 로딩 상태 설정
      setLoading: (isLoading) => {
        set({ isLoading });
      },

      // 사용자 정보 초기화
      clearUserInfo: () => {
        set({ userInfo: null, error: null, isLoading: false });
      },
    }),
    {
      name: 'user-store',
    }
  )
);