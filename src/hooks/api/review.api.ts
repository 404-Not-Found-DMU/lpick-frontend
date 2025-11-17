import { fetcher } from './fetchers';

export interface ReviewPayload {
    content: string;
    starScore: number;
}

// ===== List (조회) =====
export interface WikiReviewListItem {
    reviewId: string;
    starScore: number;
    content: string;
    createdAt: string;
}

export interface WikiReviewsPage {
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    size: number;
    content: WikiReviewListItem[];
    number: number; // current page (0-based)
    first: boolean;
    last: boolean;
    empty: boolean;
    // Optional fields returned by server; we keep them loose to avoid over-typing
    pageable?: unknown;
    sort?: unknown;
}

/**
 * 위키 리뷰 조회 (페이지)
 * GET /api/v1/wiki/{wikiId}/review?page=0&size=10&sort=...
 * page는 0-based
 */
export async function getWikiReviews(
    wikiId: string,
    params?: { page?: number; size?: number; sort?: string }
): Promise<WikiReviewsPage> {
    const q = new URLSearchParams();
    if (params?.page !== undefined) q.set('page', String(params.page));
    if (params?.size !== undefined) q.set('size', String(params.size));
    if (params?.sort) q.set('sort', params.sort);
    const qs = q.toString();
    const path = `/api/v1/wiki/${encodeURIComponent(wikiId)}/review${qs ? `?${qs}` : ''}`;
    return fetcher<WikiReviewsPage>(path, { method: 'GET' });
}

/**
 * 위키 리뷰 작성
 * POST /api/v1/wiki/{wikiId}/review
 */
export async function createWikiReview(wikiId: string, payload: ReviewPayload): Promise<unknown> {
    return fetcher<unknown>(`/wiki/${encodeURIComponent(wikiId)}/review`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

/**
 * 위키 리뷰 수정
 * PATCH /api/v1/review/{reviewId}
 */
export async function updateWikiReview(reviewId: string, payload: ReviewPayload): Promise<unknown> {
    return fetcher<unknown>(`/review/${encodeURIComponent(reviewId)}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
    });
}

/**
 * 위키 리뷰 삭제
 * DELETE /api/v1/review/{reviewId}
 */
export async function deleteWikiReview(reviewId: string): Promise<unknown> {
    return fetcher<unknown>(`/review/${encodeURIComponent(reviewId)}`, {
        method: 'DELETE',
    });
}


