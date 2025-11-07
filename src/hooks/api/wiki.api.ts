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

// 위키 리비전 생성: POST /api/v1/wiki/{wikiId}/revision
export interface CreateWikiRevisionRequest {
    content: unknown;
}

export interface CreateWikiRevisionResponse {
    revisionId: string;
    content: unknown;
    createdAt: string;
    createWho?: {
        oauthId?: string;
        nickName?: string;
    };
}

export async function createWikiRevision(
    wikiId: string,
    payload: CreateWikiRevisionRequest
): Promise<CreateWikiRevisionResponse> {
    return fetcher<CreateWikiRevisionResponse>(`/api/v1/wiki/${encodeURIComponent(wikiId)}/revision`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}


