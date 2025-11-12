import { fetcher } from './fetchers';

export type WikiPageClass = 'ARTIST' | 'GEAR' | 'ALBUM' | 'OTHER';

export interface CreateWikiRequest {
    title: string;
    wikiPageClass: WikiPageClass;
    content: unknown;
}

export interface CreateWikiResponse {
    id: string;
}

export async function createWikiPage(payload: CreateWikiRequest): Promise<CreateWikiResponse> {
    return fetcher<CreateWikiResponse>('/api/v1/wiki', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export interface UpdateWikiRequest {
    title: string;
    content: unknown;
}

export async function updateWikiPage(id: string, payload: UpdateWikiRequest): Promise<void> {
    return fetcher<void>(`/api/v1/wiki/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export interface CreateRevisionRequest {
    content: unknown;
}

export interface CreateRevisionResponse {
    revisionId: string;
    content: unknown;
    createdAt: string;
    createWho: {
        oauthId: string;
        nickName: string;
    };
}

export async function createWikiRevision(id: string, payload: CreateRevisionRequest): Promise<CreateRevisionResponse> {
    return fetcher<CreateRevisionResponse>(`/api/v1/wiki/${encodeURIComponent(id)}/revision`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

// Revision list
export interface RevisionItem {
    revisionId: string;
    content: unknown;
    createdAt: string;
    createWho: {
        oauthId: string;
        nickName: string;
    };
}

export interface RevisionPage {
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    size: number;
    content: RevisionItem[];
    number: number;
    first: boolean;
    last: boolean;
}

export async function getWikiRevisions(
    id: string,
    params?: { page?: number; size?: number; sortParam?: string }
): Promise<RevisionPage> {
    const query = new URLSearchParams();
    if (params?.page !== undefined) query.set('page', String(params.page));
    if (params?.size !== undefined) query.set('size', String(params.size));
    if (params?.sortParam) query.set('sortParam', params.sortParam);

    const qs = query.toString();
    const path = `/api/v1/wiki/${encodeURIComponent(id)}/revision${qs ? `?${qs}` : ''}`;
    return fetcher<RevisionPage>(path);
}

export type RevisionDetail = RevisionItem;

export async function getWikiRevision(id: string, version: string): Promise<RevisionDetail> {
    // 1) 서버 명세 우선: 경로 파라미터 (/revision/{version})
    try {
        const res = await fetcher<RevisionDetail>(`/api/v1/wiki/${encodeURIComponent(id)}/revision/${encodeURIComponent(version)}`);
        if (res && typeof (res as unknown as { content?: unknown }).content === 'string') {
            try {
                const parsed = JSON.parse((res as unknown as { content: string }).content);
                return { ...res, content: parsed } as RevisionDetail;
            } catch {}
        }
        return res;
    } catch {
        // 2) 쿼리 파라미터 폴백 (?revisionId=)
        try {
            const q = new URLSearchParams({ revisionId: version });
            const res = await fetcher<RevisionDetail>(`/api/v1/wiki/${encodeURIComponent(id)}/revision?${q.toString()}`);
            if (res && typeof (res as unknown as { content?: unknown }).content === 'string') {
                try {
                    const parsed = JSON.parse((res as unknown as { content: string }).content);
                    return { ...res, content: parsed } as RevisionDetail;
                } catch {}
            }
            return res;
        } catch {
            // 3) 전역 경로 폴백 (/api/v1/wiki/revision/{revisionId})
            const res = await fetcher<RevisionDetail>(`/api/v1/wiki/revision/${encodeURIComponent(version)}`);
            if (res && typeof (res as unknown as { content?: unknown }).content === 'string') {
                try {
                    const parsed = JSON.parse((res as unknown as { content: string }).content);
                    return { ...res, content: parsed } as RevisionDetail;
                } catch {}
            }
            return res;
        }
    }
}

// ===== Bookmark APIs =====
export interface WikiBookmarkStatusResponse {
    wikiBookmarkId?: string;
}

// 북마크 여부/아이디 조회
export async function getWikiBookmarkStatus(wikiId: string): Promise<string | null> {
    try {
        const res = await fetcher<WikiBookmarkStatusResponse>(`/api/v1/wiki/${encodeURIComponent(wikiId)}/bookmark`);
        return res?.wikiBookmarkId ?? null;
    } catch {
        // 명세 외 응답(404 등)일 경우 북마크 없음으로 처리
        return null;
    }
}

// 북마크 추가
export async function addWikiBookmark(wikiId: string): Promise<'SUCCESS' | unknown> {
    // 서버 명세상 본문은 SUCCESS. 파싱 실패 가능성이 있어도 fetcher 사용(서버에서 JSON 문자열 반환 가정)
    try {
        const res = await fetcher<unknown>(`/wiki/${encodeURIComponent(wikiId)}/book-mark`, {
            method: 'POST',
        });
        return (res as 'SUCCESS') ?? 'SUCCESS';
    } catch (e) {
        throw e;
    }
}

// 북마크 해제
export async function removeWikiBookmark(bookmarkId: string): Promise<'SUCCESS' | unknown> {
    try {
        const res = await fetcher<unknown>(`/wiki-bookmark/${encodeURIComponent(bookmarkId)}`, {
            method: 'DELETE',
        });
        return (res as 'SUCCESS') ?? 'SUCCESS';
    } catch (e) {
        throw e;
    }
}


