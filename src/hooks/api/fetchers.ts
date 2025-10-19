// fetch 사용을 위한 코드
export async function fetcher<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    if (!baseUrl) {
        throw new Error('API Base URL이 설정되지 않았습니다.');
    }
    
    // 단순하게 baseUrl + path 조합 (baseUrl에는 슬래시 없음, path에는 슬래시 있음)
    const fullUrl = `${baseUrl}${path}`;
    
    // 환경 변수 디버깅
    if (typeof window !== 'undefined') {
        console.log('API Base URL:', baseUrl);
        console.log('Path:', path);
        console.log('Full URL:', fullUrl);
    }

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            'Content-Type': 'application/json', // json 방식 사용
            ...(options.headers || {}),
        },
        credentials: 'include', // 쿠키 전달 필요
        cache: 'no-store',      // Server Component에서 fresh fetch
    });

    // 401 에러 시 토큰 갱신 시도
    if (res.status === 401) {
        try {
            // 토큰 갱신 시도
            const refreshUrl = `${baseUrl}/api/v1/auth/refresh`;
            const refreshResponse = await fetch(refreshUrl, {
                method: 'POST',
                credentials: 'include',
            });

            if (refreshResponse.ok) {
                // 토큰 갱신 성공 시 원래 요청 재시도
                const retryRes = await fetch(fullUrl, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(options.headers || {}),
                    },
                    credentials: 'include',
                    cache: 'no-store',
                });

                if (!retryRes.ok) {
                    throw new Error(`HTTP error! status: ${retryRes.status} - ${retryRes.statusText}`);
                }

                return retryRes.json();
            }
        } catch (refreshError) {
            console.warn('토큰 갱신 실패:', refreshError);
        }
        
        // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
        throw new Error('인증이 필요합니다.');
    }

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
    }

    return res.json();
}