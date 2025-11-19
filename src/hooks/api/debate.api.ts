import { fetcher } from './fetchers';

// ===== Types =====
export type DebateStatus = 'OPEN' | 'VOTE' | 'CLOSE';
export type DebateSubject = 'REPRESENTATION' | 'DETAIL';

export interface DebateListItem {
    debateId: string;
    debateName: string;
    debateSubject: DebateSubject;
    debateWriter: string;
    createdAt: string;
    updateAt: string;
    chatCount: number;
    status: DebateStatus;
}

export interface DebateCreatePayload {
    debateName: string;
    debateSubject: DebateSubject;
    revisionId: string;
}

export interface DebateCreateResponse {
    id: string;
    result: 'SUCCESS' | string;
}

export interface DebateChatItem {
    chatId: string;
    userId: string;
    userNickname: string;
    profile?: string | null;
    content: string;
    createdAt: string;
    isBlind: boolean;
    isAnswerTo?: string | null;
}

export interface DebateBallotResult {
    debateId: string;
    total: number;
    agree: number;
    disagree: number;
    abstain: number;
    agreePct: number;
    disagreePct: number;
    abstainPct: number;
}

export type BallotValue = 'AGREE' | 'DISAGREE' | 'ABSTAIN';

// ===== APIs =====

// List debates by wiki
export async function getDebatesByWiki(wikiId: string): Promise<DebateListItem[]> {
    return fetcher<DebateListItem[]>(`/api/v1/wiki/${encodeURIComponent(wikiId)}/debate`, {
        method: 'GET',
    });
}

// Create debate for a wiki
export async function createDebate(wikiId: string, payload: DebateCreatePayload): Promise<DebateCreateResponse> {
    return fetcher<DebateCreateResponse>(`/api/v1/wiki/${encodeURIComponent(wikiId)}/debate`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

// Update debate status
export async function updateDebateStatus(debateId: string, status: DebateStatus): Promise<'SUCCESS' | string> {
    const res = await fetcher<string>(`/api/v1/debate/${encodeURIComponent(debateId)}?status=${encodeURIComponent(status)}`, {
        method: 'PATCH',
    });
    return res as unknown as 'SUCCESS' | string;
}

// Get chat list for a debate
export async function getDebateChatList(debateId: string): Promise<DebateChatItem[]> {
    return fetcher<DebateChatItem[]>(`/api/v1/debate/${encodeURIComponent(debateId)}/chat-list`, {
        method: 'GET',
    });
}

// Get ballot result for a debate (only when status is VOTE or CLOSE)
export async function getDebateBallot(debateId: string): Promise<DebateBallotResult> {
    return fetcher<DebateBallotResult>(`/api/v1/debate/${encodeURIComponent(debateId)}/ballot`, {
        method: 'GET',
    });
}

// Cast a ballot
export async function postDebateBallot(debateId: string, ballotValue: BallotValue): Promise<'SUCCESS' | string> {
    const res = await fetcher<string>(`/api/v1/debate/${encodeURIComponent(debateId)}/ballot`, {
        method: 'POST',
        body: JSON.stringify({ ballotValue }),
    });
    return res as unknown as 'SUCCESS' | string;
}

// Get my ballot history/status for a debate
export interface DebateBallotHistory {
    votedBallotValue?: BallotValue;
    voted: boolean;
}

export async function getDebateBallotHistory(debateId: string): Promise<DebateBallotHistory> {
    return fetcher<DebateBallotHistory>(`/api/v1/debate/${encodeURIComponent(debateId)}/ballot/history`, {
        method: 'GET',
    });
}


