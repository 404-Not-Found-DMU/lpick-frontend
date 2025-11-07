import { fetcher } from './fetchers';

type QueryParams = Record<string, string | number | boolean | undefined | null>;

function toQueryString(params?: QueryParams): string {
    if (!params) return '';
    const query = Object.entries(params)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&');
    return query ? `?${query}` : '';
}

// 위키별 토론 목록 조회: GET /api/v1/wiki/{wikiId}/debate
export async function getWikiDebates(
    wikiId: string,
    params?: QueryParams
): Promise<unknown> {
    const qs = toQueryString(params);
    return fetcher<unknown>(`/api/v1/wiki/${encodeURIComponent(wikiId)}/debate${qs}`);
}

// 토론 채팅 메시지 목록: GET /api/v1/debate/{debateId}/chat-list
export async function getDebateChatList(
    debateId: string,
    params?: QueryParams
): Promise<unknown> {
    const qs = toQueryString(params);
    return fetcher<unknown>(`/api/v1/debate/${encodeURIComponent(debateId)}/chat-list${qs}`);
}

// 토론 상태 수정: PATCH /api/v1/debate/{debateId}
export async function patchDebateStatus(
    debateId: string,
    payload: unknown
): Promise<unknown> {
    return fetcher<unknown>(`/api/v1/debate/${encodeURIComponent(debateId)}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
    });
}

// 토론 생성: POST /api/v1/wiki/{wikiId}/debate
export async function createDebate(
    wikiId: string,
    payload: unknown
): Promise<unknown> {
    return fetcher<unknown>(`/api/v1/wiki/${encodeURIComponent(wikiId)}/debate`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

// 토론 투표 상황/결과 조회: GET /api/v1/debate/{debateId}/ballot
export async function getDebateBallot(
    debateId: string
): Promise<unknown> {
    return fetcher<unknown>(`/api/v1/debate/${encodeURIComponent(debateId)}/ballot`);
}

// 토론 투표: POST /api/v1/debate/{debateId}/ballot
export async function postDebateBallot(
    debateId: string,
    payload: unknown
): Promise<unknown> {
    return fetcher<unknown>(`/api/v1/debate/${encodeURIComponent(debateId)}/ballot`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}


