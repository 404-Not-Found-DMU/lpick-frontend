// fetch 사용을 위한 코드
export async function fetcher<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) {
        throw new Error('NEXT_PUBLIC_API_BASE_URL이 설정되어 있지 않습니다.');
    }
    const baseUrl = base.replace(/\/$/, '');
    const normalizedPath = path.startsWith('http') ? path : `${path.startsWith('/') ? path : `/${path}`}`;
    const fullUrl = normalizedPath.startsWith('http') ? normalizedPath : `${baseUrl}${normalizedPath}`;

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            'Content-Type': 'application/json', // json 방식 사용
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            ...(options.headers || {}),
        },
        credentials: 'include', // 쿠키 전달 필요
        cache: 'no-store',      // 브라우저 캐시 사용 안 함
    });

    // 302 리다이렉트는 바로 인증 실패로 처리 (로그아웃 후 카카오 로그인으로 리다이렉트)
    if (res.status === 302) {
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
        throw new Error('인증이 필요합니다.');
    }

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
        // if (typeof window !== 'undefined') {
        //     window.location.href = '/login';
        // }
        throw new Error('인증이 필요합니다.');
    }

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
    }

    return res.json();
}