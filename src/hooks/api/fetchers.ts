// fetch 사용을 위한 코드
export async function fetcher<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    
    // 환경 변수 디버깅
    if (typeof window !== 'undefined') {
        console.log('API Base URL:', baseUrl);
        console.log('Full URL:', `${baseUrl}${path}`);
    }

    const res = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json', // json 방식 사용
            ...(options.headers || {}),
    },
    credentials: 'include', // 쿠키 전달 필요
    cache: 'no-store',      // Server Component에서 fresh fetch
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
    }

    return res.json();
}