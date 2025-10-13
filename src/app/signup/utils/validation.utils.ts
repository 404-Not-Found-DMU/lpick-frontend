/**
 * API 에러를 사용자 친화적인 메시지로 변환
 * @param error 에러 객체
 * @returns 사용자에게 표시할 에러 메시지
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // HTTP 에러인 경우
    if (error.message.includes('HTTP error!')) {
      const status = error.message.match(/status: (\d+)/)?.[1];
      
      switch (status) {
        case '400':
          return '입력한 정보를 다시 확인해주세요.';
        case '401':
          return '인증이 필요합니다. 다시 로그인해주세요.';
        case '403':
          return '접근 권한이 없습니다.';
        case '404':
          return '요청하신 정보를 찾을 수 없습니다.';
        case '409':
          return '이미 사용 중인 닉네임입니다.';
        case '500':
          return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
        default:
          return '네트워크 오류가 발생했습니다. 다시 시도해주세요.';
      }
    }
    
    return error.message;
  }
  
  return '알 수 없는 오류가 발생했습니다.';
};

/**
 * 닉네임 유효성 검증
 * @param nickname 검증할 닉네임
 * @returns 에러 메시지 (유효한 경우 null)
 */
export const validateNickname = (nickname: string): string | null => {
  const trimmed = nickname.trim();
  
  if (!trimmed) {
    return '닉네임을 입력해주세요.';
  }
  
  if (trimmed.length < 2) {
    return '닉네임은 2글자 이상이어야 합니다.';
  }
  
  if (trimmed.length > 20) {
    return '닉네임은 20글자 이하여야 합니다.';
  }
  
  // 특수문자 제한 (한글, 영문, 숫자, 일부 특수문자만 허용)
  const validPattern = /^[가-힣a-zA-Z0-9._-]+$/;
  if (!validPattern.test(trimmed)) {
    return '닉네임에는 한글, 영문, 숫자, ., _, - 만 사용할 수 있습니다.';
  }
  
  return null;
};