export type DiscussionStatus = 'open' | 'closed';

export type DiscussionCategory =
  | '내용'
  | '표기'
  | '분류'
  | '문서관리'
  | '기타';

export type DiscussionStance = 'agree' | 'disagree' | 'neutral';

export interface DiscussionThread {
  id: string;
  title: string;
  category: DiscussionCategory;
  status: DiscussionStatus;
  createdAt: string; // ISO string
  createdBy: string;
  lastUpdatedAt: string; // ISO string
  opinionsCount: number;
  docId?: string; // 특정 위키 문서에 대한 토론인 경우
  closedAt?: string;
  closedSummary?: string;
  // 투표 상태 요약(빠른 필터/표시에 활용)
  voteStatus?: 'none' | 'open' | 'closed';
}

export interface DiscussionOpinion {
  id: string;
  threadId: string;
  author: string;
  stance: DiscussionStance;
  content: string;
  createdAt: string; // ISO string
  likes: number;
}

export interface CreateThreadInput {
  title: string;
  category: DiscussionCategory;
  content: string; // 개설 글(첫 의견)
  author: string;
  docId?: string;
  stance?: DiscussionStance;
}

export interface AddOpinionInput {
  threadId: string;
  content: string;
  author: string;
  stance: DiscussionStance;
}

// ===== 투표 타입 =====
export type VoteStatus = 'open' | 'closed';

export interface DiscussionVoteOption {
  id: string;
  text: string;
  count: number;
}

export interface DiscussionVote {
  threadId: string;
  status: VoteStatus;
  allowMultiple: boolean; // 기본 단일선택
  options: DiscussionVoteOption[];
  startedAt: string; // ISO
  endedAt?: string; // ISO
  // userId -> optionId(단일) 또는 optionIds(복수)
  userChoices: Record<string, string | string[]>;
}


