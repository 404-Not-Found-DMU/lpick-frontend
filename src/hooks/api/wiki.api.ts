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
    return fetcher<RevisionDetail>(`/api/v1/wiki/${encodeURIComponent(id)}/revision/${encodeURIComponent(version)}`);
}


