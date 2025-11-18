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

    // 헤더 구성: 기본 캐시 무효화, Content-Type은 body 있을 때만 설정
    const baseHeaders: Record<string, string> = {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...(options.headers as Record<string, string> || {}),
    };
    const shouldSetJson =
        options.body !== undefined &&
        !(typeof FormData !== 'undefined' && (options.body as unknown) instanceof FormData) &&
        !('Content-Type' in baseHeaders);
    if (shouldSetJson) {
        baseHeaders['Content-Type'] = 'application/json';
    }

    const res = await fetch(fullUrl, {
        ...options,
        headers: baseHeaders,
        credentials: 'include', // 쿠키 전달 필요
        cache: 'no-store',      // 브라우저 캐시 사용 안 함
    });

    // 302 리다이렉트 처리
    if (res.status === 302) {
        // public API 경로인 경우는 인증 오류로 처리하지 않음
        if (path.includes('/public/')) {
            console.warn('Public API에서 302 응답:', path);
            // 302 응답의 실제 데이터를 반환하거나 빈 응답 처리
            try {
                return res.json();
            } catch {
                return {} as T;
            }
        }
        
        // 일반 API의 경우 기존 로직 유지
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
                const retryHeaders: Record<string, string> = {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                    ...(options.headers as Record<string, string> || {}),
                };
                const retryShouldSetJson =
                    options.body !== undefined &&
                    !(typeof FormData !== 'undefined' && (options.body as unknown) instanceof FormData) &&
                    !('Content-Type' in retryHeaders);
                if (retryShouldSetJson) {
                    retryHeaders['Content-Type'] = 'application/json';
                }
                const retryRes = await fetch(fullUrl, {
                    ...options,
                    headers: retryHeaders,
                    credentials: 'include',
                    cache: 'no-store',
                });

                if (!retryRes.ok) {
                    throw new Error(`HTTP error! status: ${retryRes.status} - ${retryRes.statusText}`);
                }

                const retryCt = retryRes.headers.get('content-type')?.toLowerCase() ?? '';
                if (retryCt.includes('application/json')) {
                    return retryRes.json();
                } else {
                    const text = await retryRes.text();
                    try {
                        return JSON.parse(text) as T;
                    } catch {
                        return text as unknown as T;
                    }
                }
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
        // 서버 응답 본문을 확인하여 더 자세한 에러 메시지 추출
        let errorMessage = `HTTP error! status: ${res.status} - ${res.statusText}`;
        try {
            const errorData = await res.clone().json();
            if (errorData && typeof errorData === 'object') {
                if (errorData.message) {
                    errorMessage = errorData.message;
                } else if (errorData.error) {
                    errorMessage = errorData.error;
                } else if (typeof errorData === 'string') {
                    errorMessage = errorData;
                }
            }
        } catch {
            // JSON 파싱 실패 시 원본 에러 메시지 사용
        }
        throw new Error(errorMessage);
    }

    const ct = res.headers.get('content-type')?.toLowerCase() ?? '';
    if (ct.includes('application/json')) {
        return res.json();
    } else {
        const text = await res.text();
        try {
            return JSON.parse(text) as T;
        } catch {
            return text as unknown as T;
        }
    }
}