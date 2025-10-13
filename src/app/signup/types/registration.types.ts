// 회원가입 요청 타입
export interface UserRegistrationRequest {
  nickname: string;
  about?: string;
}

// 회원가입 API 파라미터 타입
export interface RegisterUserParams {
  userInfo: UserRegistrationRequest;
  profileImage?: File | null;
}

// 회원가입 응답 타입
export interface UserRegistrationResponse {
  id: number;
  nickname: string;
  about?: string;
  profileImg?: string;
  createdAt: string;
}