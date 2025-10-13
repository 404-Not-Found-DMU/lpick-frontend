import { RegisterUserParams, UserRegistrationResponse } from '../types/registration.types';

/**
 * 사용자 회원가입 API (multipart/form-data)
 * @param params 회원가입 정보와 프로필 이미지
 * @returns 회원가입 완료된 사용자 정보
 */
export const registerUser = async (
  params: RegisterUserParams
): Promise<UserRegistrationResponse> => {
  try {
    const formData = new FormData();
    
    // userinfo를 JSON 문자열로 추가
    formData.append('userinfo', JSON.stringify(params.userInfo));
    
    // 프로필 이미지가 있으면 추가
    if (params.profileImage) {
      formData.append('profileImage', params.profileImage);
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    if (!baseUrl) {
      throw new Error('API Base URL이 설정되지 않았습니다.');
    }
    
    const response = await fetch(`${baseUrl}/api/v1/auth/registration`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('회원가입 API 호출 오류:', error);
    throw error;
  }
};