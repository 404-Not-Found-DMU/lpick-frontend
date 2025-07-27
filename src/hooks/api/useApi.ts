// Kakao Login 호출 기능입니다. 현재는 로컬환경이라 사용하지 않습니다.
export const redirectToKakaoLogin = () => {
    const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log(backendBaseUrl);
    window.location.href = `${backendBaseUrl}/oauth2/authorization/kakao`;
};