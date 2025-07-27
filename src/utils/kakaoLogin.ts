export const redirectToKakaoLogin = () => {
    const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log(backendBaseUrl);
    window.location.href = `${backendBaseUrl}/oauth2/authorization/kakao`;
};