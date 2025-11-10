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


