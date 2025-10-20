/**
 * 사용자 정보 타입 정의
 */
export interface UserInfo {
  oauthId: string;
  nickname: string;
  about: string;
  profile: string;
}

/**
 * 사용자 정보 API 응답 타입
 */
export type UserInfoResponse = UserInfo;

/**
 * 사용자 상태 관리를 위한 타입
 */
export interface UserState {
  userInfo: UserInfo | null;
  isLoading: boolean;
  error: string | null;
}
