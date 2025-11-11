import { fetcher } from './fetchers';

export interface ReviewPayload {
    content: string;
    starScore: number;
}

/**
 * 위키 리뷰 작성
 * POST /api/v1/wiki/{wikiId}/review
 */
export async function createWikiReview(wikiId: string, payload: ReviewPayload): Promise<unknown> {
    return fetcher<unknown>(`/api/v1/wiki/${encodeURIComponent(wikiId)}/review`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

/**
 * 위키 리뷰 수정
 * PATCH /api/v1/review/{reviewId}
 */
export async function updateWikiReview(reviewId: string, payload: ReviewPayload): Promise<unknown> {
    return fetcher<unknown>(`/api/v1/review/${encodeURIComponent(reviewId)}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
    });
}

/**
 * 위키 리뷰 삭제
 * DELETE /api/v1/review/{reviewId}
 */
export async function deleteWikiReview(reviewId: string): Promise<unknown> {
    return fetcher<unknown>(`/api/v1/review/${encodeURIComponent(reviewId)}`, {
        method: 'DELETE',
    });
}


